import axios from 'axios';
import config from './config';

import SecureStorage from 'react-native-secure-storage';

export {
  getReservations,
  cancelReservations,
  setReservationsData,
  setAuthStore,
  getAuthStore,
};

const SERVER_URL = config.url;
const secureConfig = config.configLoginHeaders;
const secureCmmConfig = config.configCmmHeader;

const getReservations = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/reservations`;
    let oauth_access_token_id = await getAuthStore('access_token');
    const sHeaders = secureCmmConfig;
    sHeaders.headers.Authorization = 'Bearer ' + oauth_access_token_id;
    await axios
      .post(USER_ENDPOINT, data, sHeaders)
      .then(response => {
        rsData = response.data;
      })
      .catch(error => {
        rsData.msg = error;
      });
  } catch (e) {
    rsData.msg = e;
  }

  return rsData;
};

const cancelReservations = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/reservations/cancel`;
    let oauth_access_token_id = await getAuthStore('access_token');
    const sHeaders = secureCmmConfig;
    sHeaders.headers.Authorization = 'Bearer ' + oauth_access_token_id;
    await axios
      .post(USER_ENDPOINT, data, sHeaders)
      .then(response => {
        console.log(response.data);
        rsData = response.data;
      })
      .catch(error => {
        console.log('error_on_cancel', error.message);
        rsData.msg = error;
      });
  } catch (e) {
    rsData.msg = e;
  }

  return rsData;
};

const setReservationsData = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/reservations/setinfo`;
    let oauth_access_token_id = await getAuthStore('access_token');
    const sHeaders = secureCmmConfig;
    sHeaders.headers.Authorization = 'Bearer ' + oauth_access_token_id;
    await axios
      .post(USER_ENDPOINT, data, sHeaders)
      .then(response => {
        console.log('reservation success', response.data);
        rsData = response.data;
      })
      .catch(error => {
        console.log('reservation error', error.message);
        rsData.msg = error;
      });
  } catch (e) {
    rsData.msg = e;
  }

  return rsData;
};

const getAuthStore = async sKey => {
  let sToken = await SecureStorage.getItem(sKey, secureConfig);
  return sToken;
};

const setAuthStore = async (sKey, sVal) => {
  if (sKey === 'expires_in') {
    sVal = sVal.toString();
  }
  await SecureStorage.setItem(sKey, sVal, secureConfig);
};
