import AsyncStorage from '@react-native-async-storage/async-storage';


export class AsyncStorageService {
    async saveAuthTokens({accessToken, refreshToken}: { accessToken: string; refreshToken: string }) {
        try {
            await AsyncStorage.setItem('access-token', accessToken);
            await AsyncStorage.setItem('refresh-token', refreshToken);
        } catch (e) {
            console.log('Ошибка сохранения токенов:', e);
        }
    }

    async getAuthTokens() {
        try {
            const accessToken = await AsyncStorage.getItem('refresh-token');
            const refreshToken = await AsyncStorage.getItem('refresh-token');
            return {
                accessToken, refreshToken
            }
        } catch (e) {
            console.log('Ошибка получения токенов:', e);
            return null
        }
    }

}