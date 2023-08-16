import axios from 'axios';
import {API_URL_CONST, getEnv} from "../../../helpers/getEnv";
import {LOGIN} from "./actions";
import {AsyncStorageService} from "../asyncStorageService";
import authStore from "../auth";
import {USER_TOKENS_WRONG} from "./requestCodes";

const API_URL = getEnv(API_URL_CONST)

export const instance = axios.create({
    baseURL: API_URL,
});


instance.interceptors.request.use(
    async (config) => {
        const tokens = await new AsyncStorageService().getAuthTokens();

        if (tokens?.accessToken) {
            config.headers['Access-Token'] = tokens.accessToken;
        }

        if (tokens?.refreshToken) {
            config.headers['Refresh-Token'] = tokens.refreshToken;
        }

        return config;
    }
);

const errorInterceptor = (error: any) => {
    if (error.response && error.response?.status === 403 && error.response?.code === USER_TOKENS_WRONG) {
        const { logout } = authStore.getState();
        logout();
    }


    return Promise.reject(error);
};

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    errorInterceptor
);


