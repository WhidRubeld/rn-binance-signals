import { BACKGROUND_FETCH_TASK } from '@env'
import { sma } from '@helpers'
import { ApiService, StorageService } from '@services'
import { PairKlinesResult } from '@services/ApiService'
import * as BackgroundFetch from 'expo-background-fetch'
import * as Notifications from 'expo-notifications'
import * as TaskManager from 'expo-task-manager'
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
      Notifications.scheduleNotificationAsync({
        content: {
          title: `${pair.first} / ${pair.second}`,
          body: `Смена тренда для пары ${pair.first} / ${
            pair.second
          }. Нижний предел - ${pair.percent.down}%, верхний предел - ${
            pair.percent.up
          }%. Время - ${moment
            .unix(timestamp)
            .tz('Etc/GMT')
            .local()
            .format('DD/MM/YYYY HH:mm:ss')}`,
        },
        trigger: null,
      })

      if (sma7 && sma25) {
        if (index !== -1) {
          if (data.length > 0) {
            const last = info[index].results[info[index].results.length - 1]

            if (
              (last.sma25 > last.sma7 && sma25 < sma7) ||
              (last.sma25 < last.sma7 && sma25 > sma7)
            ) {
              Notifications.scheduleNotificationAsync({
                content: {
                  title: `${pair.first} / ${pair.second}`,
                  body: `Смена тренда для пары ${pair.first} / ${pair.second}.`,
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

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
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

  return BackgroundFetch.Result.NewData
})
