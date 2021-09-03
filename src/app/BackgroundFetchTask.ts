import { sma } from '@helpers'
import { ApiService, StorageService } from '@services'
import { PairKlinesResult } from '@services/ApiService'
import store from '@store'
import { refreshResults } from '@store/results'
import * as BackgroundFetch from 'expo-background-fetch'
import * as Notifications from 'expo-notifications'
import moment from 'moment-timezone'

interface PromiseFulfilledResult<T> {
  status: 'fulfilled'
  value: T
}

interface PromiseRejectedResult {
  status: 'rejected'
  reason: any
}

type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult

const informationProcessingHandler = async (
  res: PromiseSettledResult<PairKlinesResult>[]
) => {
  const info = await StorageService.getResults()

  for (const result of res) {
    // если таск успешен
    if (result.status === 'fulfilled') {
      const { result: data, pair, timestamp } = result.value
      const closeValues = data.map((v) => parseFloat(v.close))
      const sma7 = sma(closeValues, 7).pop()
      const sma25 = sma(closeValues, 25).pop()

      const index = info.findIndex((v) => v.pair.uuid === pair.uuid)

      if (sma7 && sma25) {
        if (index !== -1) {
          if (data.length > 0) {
            const last = info[index].results[info[index].results.length - 1]

            const latest = last.sma7 / last.sma25 - 1
            const current = sma7 / sma25 - 1

            const isUpper = current >= 0 && latest <= 0
            const isLower = current <= 0 && latest >= 0

            if (isUpper || isLower) {
              Notifications.scheduleNotificationAsync({
                content: {
                  title: `${pair.first} / ${pair.second}`,
                  body: `Смена тренда для пары ${pair.first} / ${
                    pair.second
                  }. Сила тяги - ${current}. Время - ${moment
                    .unix(timestamp)
                    .tz('Etc/GMT')
                    .local()
                    .format('DD/MM/YYYY HH:mm:ss')}`,
                },
                trigger: null,
              })
            }
          }

          info[index].results.push({ sma7, sma25, timestamp })

          if (info[index].results.length > 10) {
            info[index].results = info[index].results.slice(-10)
          }
        } else {
          info.push({
            pair,
            results: [{ sma7, sma25, timestamp }],
          })
        }

        StorageService.setResults(info)
      }
    }
  }
}

export default async function launchBackgroundTask() {
  const pairs = await StorageService.getPairs()

  const results = await Promise.all(
    pairs.map((pair) =>
      ApiService.getPairKlines(pair)
        .then((value) => ({ status: 'fulfilled', value }))
        .catch((reason) => ({ status: 'rejected', reason }))
    )
  )

  await informationProcessingHandler(
    results as PromiseSettledResult<PairKlinesResult>[]
  )

  store.dispatch(refreshResults())
  return BackgroundFetch.Result.NewData
}
