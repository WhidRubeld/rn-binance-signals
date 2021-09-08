import AsyncStorage from '@react-native-async-storage/async-storage'

enum Keys {
  TOKEN = 'token',
}

export default class AppStorage {
  static async getToken(): Promise<string | null> {
    return AsyncStorage.getItem(Keys.TOKEN).then((token) => {
      return token
    })
  }
  static async setToken(token: string): Promise<void> {
    return AsyncStorage.setItem(Keys.TOKEN, token)
  }
  static async removeToken(): Promise<void> {
    return AsyncStorage.removeItem(Keys.TOKEN)
  }
}
