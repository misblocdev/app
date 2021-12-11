import axios from 'axios';
import config from './config';

import SecureStorage from 'react-native-secure-storage';

export {getCmmAuth, setAuthStore, getAuthStore};

const SERVER_URL = config.url;
const secureConfig = config.configLoginHeaders;
const secureCmmConfig = config.configCmmHeader;
const secureFileConfig = config.configFileHeader;

const getCmmAuth = async (data, target) => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = SERVER_URL + target;
    const sHeaders = secureConfig;
    await axios
      .post(USER_ENDPOINT, data, sHeaders)
      .then(response => {
        console.log('data :' + JSON.stringify(response.data));
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
