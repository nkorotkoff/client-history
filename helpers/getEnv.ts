import Constants from 'expo-constants';

export function getEnv(name: string): string {
    // @ts-ignore
    if (Constants?.expoConfig?.extra[name]) {
        return Constants.expoConfig.extra[name]
    }
    throw Error('env param does not exist ')
}


export const API_URL_CONST = 'API_URL'

export const SECRET_KEY_CONST = 'SECRET_KEY'