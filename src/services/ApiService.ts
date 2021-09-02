import { API_URL } from '@env'
import { convertKline } from '@helpers'
import { ICandlestick, IPair, _candlestick, _interval } from '@interfaces'
import axios from 'axios'

export type PairKlinesResult = {
  pair: IPair
  result: ICandlestick[]
  timestamp: number
}
export default class ApiService {
  static async getPairKlines(
    pair: IPair,
    interval: _interval = '4h',
    limit: number = 25
  ): Promise<PairKlinesResult> {
    return new Promise<PairKlinesResult>((resolve, reject) => {
      axios
        .get(`${API_URL}/klines`, {
          params: {
            symbol: `${pair.first}${pair.second}`.toUpperCase(),
            interval,
            limit,
          },
        })
        .then(({ data }: { data: _candlestick[] }) => {
          return resolve({
            pair,
            result: data.map(convertKline),
            timestamp: new Date().getTime() / 1e3,
          })
        })
        .catch(reject)
    })
  }
}
