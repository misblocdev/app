import {combineReducers} from 'redux';

import walletReducer from './walletReducer';
import socketReducer from './socketReducer';
import loginReducer from './loginReducer';
import tokenActionReducer from './tokenActionReducer';
import pointActionReducer from './pointActionReducer';
import unreadReducer from './unreadReducer';


const rootReducer = combineReducers({
    wallet: walletReducer,
    socketData: socketReducer,
    accountData: loginReducer,
    tokenActions: tokenActionReducer,
    pointActions: pointActionReducer,
    unreadAlerts: unreadReducer,
})

export default rootReducer;