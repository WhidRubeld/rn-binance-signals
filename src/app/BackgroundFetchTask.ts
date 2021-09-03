import { sma, unix2time } from '@helpers'
import { IPair, IResult } from '@interfaces'
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

const notificationHandler = (
  results: IResult[],
  pair: IPair,
  values: {
    sma7: number
    sma25: number
  },
  timestamp: number
) => {
  // если история была ранее сформирована для этой пары
  if (results.length > 0) {
    // получаю последний результат из истории
    const last = results[results.length - 1]

    // Получаем силу тяги для прошлого результата
    const latest = (last.sma7 / last.sma25 - 1) * 100
    // Получаем силу тяги для текущего результата
    const current = (values.sma7 / values.sma25 - 1) * 100

    /**
     * ПЕРВЫЙ ВИД ПУША
     * 1. MA7 / MA25 - 1 = сила тяги
     * 2. Если сила тяги отрицательна => тренд нисходящий
     * 3. Если сила тяги положительна => тренд восходящий
     */

    // Если смена тренда на восходящий
    const isUpper = current >= 0 && latest < 0
    // Если смена тренда на нисходящий
    const isLower = current <= 0 && latest > 0

    if (isUpper || isLower) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: `${pair.first} / ${pair.second} - смена тренда`,
          body: `Направление: ${isUpper ? '🔺' : '🔻'}\nТяга: ${current.toFixed(
            4
          )}\nВремя: ${unix2time(timestamp)}`,
        },
        trigger: null,
      })
    }

    /**
     * ВТОРОЙ ВИД ПУША
     * Получаем верхний и нижний уровни силы для пары
     * Если прошлый результат был за пределами уровня,
     * а текущий преодолел данный предел, то отправляем пуш
     */

    // получем нижний и верхний уровни силы, указанные для пары
    const { percent } = pair
    const { up, down } = percent

    const lowerStatus = current >= down && latest <= down
    const upperStatus = current <= up && latest >= up

    if (lowerStatus || upperStatus) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: `${pair.first} / ${pair.second} - преодоление рубежа`,
          body: `Рубеж: ${lowerStatus ? down : up}\nТяга: ${current.toFixed(
            4
          )}\nВремя: ${unix2time(timestamp)}`,
        },
        trigger: null,
      })
    }
  }
}

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
          notificationHandler(
            info[index].results,
            pair,
            { sma7, sma25 },
            timestamp
          )

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
