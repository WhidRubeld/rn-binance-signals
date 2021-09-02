import { IPair } from '@interfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ResultState } from '@store/results'

enum Keys {
  PAIRS = 'pairs',
  RESULTS = 'results',
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
  /* PAIRS */
  static async getResults(): Promise<ResultState['data']> {
    return AsyncStorage.getItem(Keys.RESULTS).then((results) => {
      return results ? (JSON.parse(results) as ResultState['data']) : []
    })
  }
  static async setResults(results: ResultState['data']): Promise<void> {
    return AsyncStorage.setItem(Keys.RESULTS, JSON.stringify(results))
  }
  static async removeResults(): Promise<void> {
    return AsyncStorage.removeItem(Keys.RESULTS)
  }
}
