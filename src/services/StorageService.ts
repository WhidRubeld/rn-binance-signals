import { IPair } from '@interfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'

enum Keys {
  PAIRS = 'pairs',
}

export default class AppStorage {
  /* PAIRS */
  static async getPairs(): Promise<IPair[]> {
    return AsyncStorage.getItem(Keys.PAIRS).then((oauth) => {
      return oauth ? (JSON.parse(oauth) as IPair[]) : []
    })
  }
  static async setPairs(pairs: IPair[]): Promise<void> {
    return AsyncStorage.setItem(Keys.PAIRS, JSON.stringify(pairs))
  }
  static async removePairs(): Promise<void> {
    return AsyncStorage.removeItem(Keys.PAIRS)
  }
}
