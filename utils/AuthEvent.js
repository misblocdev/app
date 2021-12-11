import axios from 'axios';
import config from './config';

import SecureStorage from 'react-native-secure-storage';

export {
  getEventList,
  getEventData,
  setEventApply,
  setEventFavorit,
  getEventFavorit,
  getEventHospital,
  setAuthStore,
  getAuthStore,
  getEventPopup,
  getEventBanner
};

const SERVER_URL = config.url;
const secureConfig = config.configLoginHeaders;
const secureCmmConfig = config.configCmmHeader;



const getEventPopup = async data => {
  let rsData = { code: 0, msg: '', other: '' };

  try {
    const USER_ENDPOINT = `${SERVER_URL}/event/popup`;
    let oauth_access_token_id = await getAuthStore('access_token');
    const sHeaders = secureCmmConfig;
    sHeaders.headers.Authorization = 'Bearer ' + oauth_access_token_id;
    await axios
      .post(USER_ENDPOINT, data, sHeaders)
      .then(response => {
        //console.log('getEventList :' + JSON.stringify(response));
        /*if (typeof userinfo !== 'object') {
          userinfo.userId = -1;
        } else {
          setAuthStore('getEventList', JSON.stringify(response), secureConfig);
        }*/
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


const getEventBanner = async data => {
  let rsData = { code: 0, msg: '', other: '' };

  try {
    const USER_ENDPOINT = `${SERVER_URL}/event/banner`;
    let oauth_access_token_id = await getAuthStore('access_token');
    const sHeaders = secureCmmConfig;
    sHeaders.headers.Authorization = 'Bearer ' + oauth_access_token_id;
    await axios
      .post(USER_ENDPOINT, data, sHeaders)
      .then(response => {
        //console.log('getEventList :' + JSON.stringify(response));
        /*if (typeof userinfo !== 'object') {
          userinfo.userId = -1;
        } else {
          setAuthStore('getEventList', JSON.stringify(response), secureConfig);
        }*/
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

const getEventList = async data => {
  let rsData = { code: 0, msg: '', other: '' };

  try {
    const USER_ENDPOINT = `${SERVER_URL}/event`;
    let oauth_access_token_id = await getAuthStore('access_token');
    const sHeaders = secureCmmConfig;
    sHeaders.headers.Authorization = 'Bearer ' + oauth_access_token_id;
    await axios
      .post(USER_ENDPOINT, data, sHeaders)
      .then(response => {
        //console.log('getEventList :' + JSON.stringify(response));
        /*if (typeof userinfo !== 'object') {
          userinfo.userId = -1;
        } else {
          setAuthStore('getEventList', JSON.stringify(response), secureConfig);
        }*/
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

const getEventData = async data => {
  let rsData = { code: 0, msg: '', other: '' };

  try {
    const USER_ENDPOINT = `${SERVER_URL}/event/detail`;
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

const setEventApply = async data => {
  let rsData = { code: 0, msg: '', other: '' };

  try {
    const USER_ENDPOINT = `${SERVER_URL}/event/apply`;

    let oauth_access_token_id = await getAuthStore('access_token');
    const sHeaders = secureCmmConfig;
    sHeaders.headers.Authorization = 'Bearer ' + oauth_access_token_id;
    await axios
      .post(USER_ENDPOINT, data, sHeaders)
      .then(response => {
        console.log('res', response.data);
        rsData = response.data;
      })
      .catch(error => {
        console.log('data', error.message);
        rsData.msg = error;
      });
  } catch (e) {
    rsData.msg = e;
  }

  return rsData;
};

const setEventFavorit = async data => {
  let rsData = { code: 0, msg: '', other: '' };
  try {
    const USER_ENDPOINT = `${SERVER_URL}/event/setfavorite`;
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
    //console.log('getUserInfo error :' + e);
    rsData.msg = e;
  }

  return rsData;
};

const getEventFavorit = async data => {
  let rsData = { code: 0, msg: '', other: '' };
  try {
    const USER_ENDPOINT = `${SERVER_URL}/event/getfavorite`;
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
    //console.log('getUserInfo error :' + e);
    rsData.msg = e;
  }

  return rsData;
};
/*
const getEventHospital = async data => {
  let rsData = {code: 0, msg: '', other: ''};
  //console.log('event', data)
  try {
    const USER_ENDPOINT = `${SERVER_URL}/event/hospital`;
    let oauth_access_token_id = await getAuthStore('access_token');

    const sHeaders = secureCmmConfig;
    sHeaders.headers.Authorization = 'Bearer' + oauth_access_token_id;

    await axios
      .post(USER_ENDPOINT, data, sHeaders)
      .then(response => {
        rsData = response.data;
      })
      .catch(error => {
        rsData.msg = error;
      });
  } catch (error) {
    rsData.msg = error;
  }

  return rsData;
};
*/

const getEventHospital = async data => {
  let rsData = { code: 0, msg: '', other: '' };

  try {
    const USER_ENDPOINT = `${SERVER_URL}/event/hospital`;
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

// const getEventHospital = async (data) => {
//   let rsData={ code:0, msg:'', other: ''};
//   //console.log('event', data)
//   try {
//     const USER_ENDPOINT = `${SERVER_URL}/event/hospital`;
//     let oauth_access_token_id = await getAuthStore('access_token');

//     const sHeaders = secureCmmConfig;
//     sHeaders.headers.Authorization = 'Bearer' + oauth_access_token_id;

//     await axios.post(USER_ENDPOINT, data, sHeaders)
//       .then(res=>{
//         rsData=res.data;
//       })
//   } catch (error) {
//     rsData.msg = error;
//   }

//   return rsData;
// }
