import {instance} from "./axiosBase";
import {CHECK_AUTH, LOGIN, REGISTER} from "./actions";
import {AxiosResponse} from "axios";
import {LoginResponse} from "../../interfaces/auth";


export function actionLogin(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
   return instance.post(LOGIN, {
        email, password
    })
}

export function actionRegister(email:string, login:string, password:string) {
    return instance.post(REGISTER, {
        email, login, password
    })
}

export function actionCheckAuth() {
    return instance.get(CHECK_AUTH)
}