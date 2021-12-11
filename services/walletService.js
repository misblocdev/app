import ledgis from '@ibct/ledgis-wallet-plugin';
import {store} from '../store/store';

import {JsonRpc} from 'eosjs-rn';

import {WALLET_LOGIN, REFRESH_TOKEN_BALANCE, REFRESH_POINT_BALANCE} from '../actions/walletActions';
import {SET_SOCKET_DATA} from '../actions/socketActions';

import config from '../utils/config';
import {Linking} from 'react-native';
import { SET_TOKEN_ACTIONS, IS_POLLING_TOKEN_ACTIONS } from '../actions/tokenActions';
import { IS_POLLING_POINT_ACTIONS, SET_POINT_ACTIONS } from '../actions/pointActions';

class WalletService {
  constructor() {
    this.connected = true;
    this.rpc = new JsonRpc(config.nodeURL);
    window.walletService = this;
  }

  getConnected() {
    return this.connected;
  }

  responseHandler(res) {
    console.debug(res);
    
    switch (res.action) {
      case 'login':
        if (res.data.account_name) {
          store.dispatch(WALLET_LOGIN(true, res.data.account_name, 'active'));
        }
        
        break;
        
        case 'transaction':
          if (typeof(res.data.transaction_id) === 'undefined') {
            store.dispatch(SET_SOCKET_DATA(false, res.data.data));
          } else {
            store.dispatch(SET_SOCKET_DATA(true, res.data.transaction_id));
          }
        break;

      default:
        alert('undefined action');
        console.log(JSON.stringify(res));
    }
  }

  connect() {
    if (typeof window.ledgis === 'undefined') {
      const options = {
        webSocketURL: config.websocketURL,
        callback: this.responseHandler,
        fallbackURL: config.fallbackURL,
        appName: `${config.appName}`,
      };
      console.log('Connection attempt');

      window.ledgis = new ledgis(options);
    }
  }

  getAccount() {
    // this.callback = callback;
    const loginURL = window.ledgis.getAccount(config.chainId);
    if (!window.ledgis.getIsConnected()) {
      window.ledgis.reconnectWebSocket().then(() => Linking.openURL(loginURL));
    } else {
      Linking.openURL(loginURL);
    }
  }

  static getTokenBalance() {
    let rpc = new JsonRpc(config.nodeURL);

    rpc
      .get_currency_balance(
        'led.token',
        `${store.getState().wallet.account}`,
        'MIS',
      )
      .then(r => {
        store.dispatch(REFRESH_TOKEN_BALANCE(r[0]));
      });
  }

  static getPointBalance() {
    let rpc = new JsonRpc(config.nodeURL);

    rpc
      .get_table_rows({
        json: true,
        code: config.misContract,
        scope: config.misContract,
        table: 'customers',
        lower_bound: `${store.getState().wallet.account}`
      })
      .then(r => {
        if(r.rows[0].owner === store.getState().wallet.account)
          store.dispatch(REFRESH_POINT_BALANCE(
            r.rows[0].point,
            r.rows[0].tier,
            r.rows[0].remainLike,
            r.rows[0].lastLikeTime,
            r.rows[0].hospitals,
          ));
        else 
          store.dispatch(REFRESH_POINT_BALANCE(
            0,
            0,
            3,
            '1970-01-01T00:00:00.000',
            [],
          ));
      })
      .catch(e => console.log(e));
  }

  static getTokenActionList() {
    let rpc = new JsonRpc(config.nodeURL);
    store.dispatch(IS_POLLING_TOKEN_ACTIONS(true));

    rpc
      .history_get_actions(
        `${store.getState().wallet.account}`
      )
      .then(r => {
        let misActions = [];
        r.actions.map(actionItem => {
          if (actionItem.action_trace.act.data.quantity && 
              actionItem.action_trace.act.data.quantity.includes(config.tokenSymbol) &&
              actionItem.action_trace.act.name === "transfer" &&
              // actionItem.action_trace.receipt.receiver !== `${store.getState().wallet.account}` && 
              actionItem.action_trace.action_ordinal > 2 && 
              actionItem.action_trace.receipt.receiver !== "led.token")

            misActions.push(actionItem)

        });
        store.dispatch(SET_TOKEN_ACTIONS(misActions.reverse()));
        store.dispatch(IS_POLLING_TOKEN_ACTIONS(false));
      })
      .catch(e => console.log(e));
  }

  static getPointActionList() {
    let rpc = new JsonRpc(config.nodeURL);
    store.dispatch(IS_POLLING_POINT_ACTIONS(true));

    rpc
      .history_get_actions(
        `${store.getState().wallet.account}`
      )
      .then(r => {
        let misActions = [];
        r.actions.map(actionItem => {
          if (
              (
              actionItem.action_trace.act.name === "burnpoint" ||
              actionItem.action_trace.act.name === "givepoint") &&
              actionItem.action_trace.receipt.receiver === config.misContract 
              ) 

            misActions.push(actionItem)

        });
        store.dispatch(SET_POINT_ACTIONS(misActions.reverse()));
        store.dispatch(IS_POLLING_TOKEN_ACTIONS(false));
      })
      .catch(e => console.log(e));
  }
}

export default WalletService;
