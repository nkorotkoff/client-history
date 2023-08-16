import { create } from 'zustand';
import {AuthStore, error, loginType} from "../interfaces/auth";
import {actionCheckAuth, actionLogin, actionRegister} from "./requests/authRequests";
import {AsyncStorageService} from "./asyncStorageService";
import {OK, USER_ALREADY_EXISTS} from "./requests/requestCodes";

const AsyncStorageServiceLocal = new AsyncStorageService()

const authStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    user: null,
    loginError: null,
    registerError: null,

    login: async (email, password) => {
        try {
            const data = await actionLogin(email,password)
            set({loginError: null})
            await AsyncStorageServiceLocal.saveAuthTokens({accessToken:data.headers['access-token'], refreshToken:data.headers['refresh-token']})
            set({isAuthenticated: true})
        } catch (e: any) {
            if (e?.response?.data?.code) {
                set({loginError:e.response.data})
            } else {
                console.log('Login error, message:' + e)
            }
        }
    },

    register: async ({login, password, email}) => {
        try {
            const data = await actionRegister(email, login, password,)
            const code = data?.data?.code
            if (code) {
                switch (code) {
                    case OK : {
                        await AsyncStorageServiceLocal.saveAuthTokens({accessToken:data.headers['access-token'], refreshToken:data.headers['refresh-token']})
                        set({isAuthenticated: true})
                        break;
                    }
                    case USER_ALREADY_EXISTS : {
                        set({registerError: data.data})
                    }
                }

            } else {
                console.log('Wrong response code:' + code)
            }
        } catch (e: any) {
            console.log('Error to register user error:' + e.getMessage())
            set({registerError: e.getMessage()})
        }
    },
    checkAuth: async () => {
        try {
            const {data} = await actionCheckAuth()
            if (data.code === OK) {
                set({isAuthenticated: true})
            }
        } catch (e) {
            console.log(e)
        }

    },

    logout: async () => {
        set({ isAuthenticated: false, user: null });
        await AsyncStorageServiceLocal.saveAuthTokens({accessToken:'', refreshToken:''})
    },
}));

export default authStore;
