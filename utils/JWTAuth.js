import axios from 'axios';
import config from './config';

import SecureStorage from 'react-native-secure-storage';

export {
  login,
  register,
  logout,
  setAuthStore,
  getAuthStore,
  getUserInfo,
  getRefreshToken,
  getKYCInfo,
  signup,
  userExists,
  getUserInfoData,
};

const SERVER_URL = config.url;
const secureConfig = config.configLoginHeaders;
const secureCmmConfig = config.configCmmHeader;
const secureGraphConfig = config.kycHeaders;

const login = async (data) => {
  // const LOGIN_ENDPOINT = `${SERVER_URL}/login`;
  const LOGIN_ENDPOINT = `http://3.34.206.68/login.php`;
  let outMsg = {
    code: 0,
    msg: 'error',
    others: '',
  };
  try {
    let response = await axios.post(
      LOGIN_ENDPOINT,
      {
        cmd: 'login',
        email: data.Username,
        pwd: data.Password,
      },
      {
        headers: secureConfig,
      }
    );
    console.log(response.data);
    if (response.status === 200 && response.data.usr_no !== null) {
      outMsg.code = 1;
      outMsg.msg = 'success';

      setAuthStore('token_type', response.data.token_type);
      setAuthStore('access_token', response.data.access_token);
      setAuthStore('refresh_token', response.data.refresh_token);
      setAuthStore('expires_in', response.data.expires_in.toString());

      return outMsg;
    } else {
      outMsg.msg = 'error2';
      return outMsg;
    }
  } catch (e) {
    console.log(e);
    outMsg.msg = JSON.stringify(e);
    //outMsg.msg = 'error 3';
    return outMsg;
  }
};

const register = async (data) => {
  console.log('🚀 ~ file: JWTAuth.js ~ line 63 ~ register ~ data', data);
  // const SIGNUP_ENDPOINT = `${SERVER_URL}/user/register`;
  const SIGNUP_ENDPOINT = `http://3.34.206.68/register.php`;
  try {
    let response = await axios({
      method: 'post',
      responseType: 'json',
      url: SIGNUP_ENDPOINT,
      data: data,
    });
    console.log(response.data);
    if (response.data.usr_no !== null) return true;
    else return false;
  } catch (e) {
    console.log(e);
  }

  // try {
  //   let response = await axios.post(SIGNUP_ENDPOINT, data, {
  //     headers: secureConfig,
  //   });
  //   console.log(response, 123);

  //   if (response.data.code === 1) return true;
  //   else return false;
  // } catch (e) {
  //   console.log(e);
  //   return e;
  // }
};

const logout = async () => {
  await SecureStorage.removeItem('token_type');
  await SecureStorage.removeItem('access_token');
  await SecureStorage.removeItem('refresh_token');
  await SecureStorage.removeItem('expires_in');
  await SecureStorage.removeItem('userinfo');
};

const getUserInfo = async () => {
  let userinfo = {
    userId: 0,
    decUserID: '',
    decName: '',
    decNick: '',
    nType: '',
    regDate: '',
  };

  try {
    const USER_ENDPOINT = `${SERVER_URL}/user`;
    let oauth_access_token_id = await getAuthStore('access_token');
    //let oauth_refresh_token_id = await getAuthStore('refresh_token');
    const sHeaders = secureCmmConfig;
    sHeaders.headers.Authorization = 'Bearer ' + oauth_access_token_id;
    //console.log('headers :' + JSON.stringify(sHeaders));

    await axios
      .get(USER_ENDPOINT, sHeaders)
      .then((response) => {
        // userinfo = response.data.data.userInfo;
        console.log(response.data, 123123);
        // console.log('userinfo :' + JSON.stringify(userinfo));
        // if (typeof userinfo !== 'object') {
        //   userinfo.userId = -1;
        // } else {
        //   setAuthStore('userinfo', JSON.stringify(userinfo), secureConfig);
        // }
      })
      .catch((error) => {
        console.log('🚀 ~ getUserInfo ~ error', error);
        //console.log('catch :' + JSON.stringify(error));
      });
  } catch (e) {
    //console.log('getUserInfo error :' + e);
  }

  return userinfo;
};

const getRefreshToken = async (refresh_token) => {
  let inputParam = {
    grant_type: 'refresh_token',
    client_id: 'misblock-app',
    client_secret: 'misblock',
    scope: 'all',
    refresh_token: refresh_token,
  };

  const LOGIN_ENDPOINT = `${SERVER_URL}/refreshToken`;

  try {
    let response = await axios.post(LOGIN_ENDPOINT, inputParam, {
      headers: secureConfig,
    });

    if (response.status === 200) {
      setAuthStore('token_type', response.data.token_type);
      setAuthStore('access_token', response.data.access_token);
      setAuthStore('refresh_token', response.data.refresh_token);
      setAuthStore('expires_in', response.data.expires_in.toString());
      return true;
    }
  } catch (e) {
    console.log('getRefreshToken error :' + e);
    return false;
  }
};

const getKYCInfo = async (accountName) => {
  let query = `
    {
      GetUserPrivacy(ledAccount: "${accountName}") {
          ok
          error
          userPrivacy {
            name
            birth
            phone
            gender
        }
      }
    }
  `;

  try {
    let response = await axios.post(
      config.graphURL,
      JSON.stringify({
        query: query,
      }),
      {
        headers: secureGraphConfig,
      }
    );

    return response.data;
  } catch (e) {
    console.log('Exception at getKYCInfo: ', e);
  }
};

const signup = async (userData) => {
  const SIGNUP_ENDPOINT = `${SERVER_URL}/login/signup`;

  try {
    let response = await axios.post(SIGNUP_ENDPOINT, userData, {
      headers: secureConfig,
    });
    console.log(response);

    if (response.data.code === 1) return true;
    else return false;
  } catch (e) {
    return e;
  }
};

const userExists = async (accountName) => {
  let inputParam = {
    userId: accountName,
  };

  const USER_CHECK_ENDPOINT = `${SERVER_URL}/login/usercheck`;

  try {
    let response = await axios.post(USER_CHECK_ENDPOINT, inputParam, {
      headers: secureConfig,
    });

    if (response.data.code === 1) {
      console.log('exists: ', response.data.other);
      if (response.data.other === 'y') return false;
    } else {
      return true;
    }
  } catch (e) {
    console.log('userCheck error :' + e);
  }
};

const getUserInfoData = async (data) => {
  let rsData = { code: 0, msg: '', other: '' };

  const sHeaders = secureConfig;

  try {
    const USER_ENDPOINT = `${SERVER_URL}/login/isuserinfodata`;

    await axios
      .post(USER_ENDPOINT, data, sHeaders)
      .then((response) => {
        rsData = response.data;
      })
      .catch((error) => {
        rsData.msg = error;
      });
  } catch (e) {
    rsData.msg = e;
  }
  return rsData;
};

const getAuthStore = async (sKey) => {
  let sToken = await SecureStorage.getItem(sKey, secureConfig);
  return sToken;
};

const setAuthStore = async (sKey, sVal) => {
  /*
  switch (sKey) {
    case 'access_key':
      access_token_id = sVal;
      break;
    case 'refresh_token':
      refresh_token = sVal;
      break;
    case 'expires_in':
      expires_in_id = sVal.toString();
      break;
  }
  */
  if (sKey === 'expires_in') {
    sVal = sVal.toString();
  }
  await SecureStorage.setItem(sKey, sVal, secureConfig);
};
