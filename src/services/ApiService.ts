import { API_URL } from '@env'
import { convertKline } from '@helpers'
import { ICandlestick, IPair, _candlestick, _interval } from '@interfaces'
import axios from 'axios'

export default class ApiService {
  static async getPairKlines(
    pair: IPair,
    interval: _interval = '4h',
    limit: number = 25
  ): Promise<ICandlestick[]> {
    return new Promise<ICandlestick[]>((resolve, reject) => {
      axios
        .get(`${API_URL}/klines`, {
          params: {
            symbol: `${pair.first}${pair.second}`.toUpperCase(),
            interval,
            limit,
          },
        })
        .then(({ data }: { data: _candlestick[] }) => {
          return resolve(data.map(convertKline))
        })
        .catch(reject)
    })
  }
}
