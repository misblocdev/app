import axios from 'axios';
import config from './config';

import SecureStorage from 'react-native-secure-storage';

export {
  getMyReviewList,
  getMyFreetalkList,
  getSavedReviewList,
  getSavedFreetalkList,
  getReplyList,
  getMyInfo,
  getMyHospital,
  getMyAssets,
  getMyEvent,
  setAuthStore,
  getAuthStore,
  getMyPush,
  setMyPush,
  setProfilePhoto,
  getPointRatio,
  getUserInfoData,
  getPrivacyInfo,
};

const SERVER_URL = config.url;
const secureConfig = config.configLoginHeaders;
const secureCmmConfig = config.configCmmHeader;

const getMyReviewList = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/myreview`;
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

const getMyFreetalkList = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/myfreetalk`;
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

const getSavedReviewList = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/review`;
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

const getSavedFreetalkList = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/freetalk`;
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

const getMyInfo = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/myinfo`;
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

const getMyHospital = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/myhospital`;
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

const getMyAssets = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/myassets`;
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

const getMyEvent = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/myevent`;
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

const getMyPush = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/getpush`;
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

const setMyPush = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/setpush`;

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

const setProfilePhoto = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/setprofilephoto`;

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

const getPointRatio = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  let oauth_access_token_id = await getAuthStore('access_token');
  const sHeaders = secureCmmConfig;
  sHeaders.headers.Authorization = 'Bearer ' + oauth_access_token_id;

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/getpointratio`;

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

const getUserInfoData = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  let oauth_access_token_id = await getAuthStore('access_token');
  const sHeaders = secureConfig;
  // sHeaders.headers.Authorization = 'Bearer ' + oauth_access_token_id;

  try {
    const USER_ENDPOINT = `${SERVER_URL}/mypage/isuserinfodata`;

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
}

const getPrivacyInfo = async data => {
  let rsData = {code: 0, msg: '', other: ''};

  let oauth_access_token_id = await getAuthStore('access_token');
  const sHeaders = secureCmmConfig;
  // sHeaders.headers.Authorization = 'Bearer ' + oauth_access_token_id;

  try {
    const USER_ENDPOINT = `${SERVER_URL}/login/agreement`;

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
}

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
