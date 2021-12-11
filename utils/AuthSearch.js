import axios from 'axios';
import config from './config';

import SecureStorage from 'react-native-secure-storage';

export {
    getCmmAuthNote,
    setAuthStore,
    getAuthStore,
    getSearch
};

const SERVER_URL = config.url;
const secureConfig = config.configLoginHeaders;
const secureCmmConfig = config.configCmmHeader;


const getSearch = async data => {
    let rsData = { code: 0, msg: '', other: '' };

    try {
        const USER_ENDPOINT = `${SERVER_URL}/hospital/search`;
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



const getCmmAuthNote = async (data, target) => {
    let rsData = { code: 0, msg: '', other: '' };

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
