import axios from 'axios';
import config from './config';

import SecureStorage from 'react-native-secure-storage';

export {
  getReviewList,
  getReviewCateList,
  getReplyList,
  setReviewReg,
  getFreeList,
  getFreeplyList,
  setFreeTalkReg,
  getFreeCateList,
  setReviewReplyReg,
  setFreeReplyReg,
  getCmmAuthTalk,
  setAuthStore,
  getAuthStore,
};

const SERVER_URL = config.url;
const secureConfig = config.configLoginHeaders;
const secureCmmConfig = config.configCmmHeader;

const getReviewList = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/anapatalk/review`;
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

const getReviewCateList = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/anapatalk/reviewcate`;
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

const setReviewReg = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/anapatalk/reviewreg`;

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

const getReplyList = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/anapatalk/review/reply`;
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

const getFreeList = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/anapatalk/freetalk`;
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

const getFreeplyList = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/anapatalk/freetalk/reply`;
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

const getFreeCateList = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/anapatalk/freetalkcate`;
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

const setReviewReplyReg = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/anapatalk/reviewreplyreg`;

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

const setFreeTalkReg = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/anapatalk/freetalkreg`;

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

  /*const USER_ENDPOINT = `${SERVER_URL}/anapatalk/freetalkreg`;
  let oauth_access_token_id = await getAuthStore('access_token');
  let authHeader = 'Bearer ' + oauth_access_token_id;
  fetch(USER_ENDPOINT, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'multipart/form-data;',
      Authorization: authHeader,
    },
  })
    .then(response => {
      console.log('upload succes', JSON.stringify(response));
      //rsData = response.data;
    })
    .catch(error => {
      console.log('upload error', error);
      //rsData.msg = error;
    });*/
};

const setFreeReplyReg = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/anapatalk/freetalkreplyreg`;

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

const getCmmAuthTalk = async (data, target) => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = SERVER_URL + target;
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
