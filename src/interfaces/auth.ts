import {NavigationProp} from "@react-navigation/native";

export interface AuthState {
    isLoggedIn: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export type NavigationProps = {
    navigation: NavigationProp<Record<string, object>>;
}

export type loginType =  {
    login: string, password: string
}

export type error = {
    code:number, message: string
}

export interface LoginResponse {
    message: string;
    code: number;
    result: number;
    headers: {
        'access-token': string;
        'refresh-token': string;
    }
}

export interface User {
    username: string;
    password: string;
}

export interface AuthStore {
    isAuthenticated: boolean;
    user: User | null;
    loginError: error | null
    registerError: error | null
    login: (email: string, password: string) => void;
    register: (data: { login: string, password: string, email: string }) => void;
    logout: () => void;
    checkAuth: () => void;
}