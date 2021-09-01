import { BACKGROUND_FETCH_TASK } from '@env'
import { sma } from '@helpers'
import { ApiService, StorageService } from '@services'
import store from '@store'
import { addPairResult } from '@store/results'
import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'
import moment from 'moment'

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const pairs = await StorageService.getPairs()
  console.log('hello1')

  pairs.forEach((pair) => {
    ApiService.getPairKlines(pair).then((res) => {
      const closeValues = res.map((v) => parseFloat(v.close))
      const sma7 = sma(closeValues, 7).pop()
      const sma25 = sma(closeValues, 25).pop()
      console.log('hello')

      if (sma7 && sma25) {
        const timestamp = moment.utc().unix()
        store.dispatch(
          addPairResult({ pair, result: { sma7, sma25, timestamp } })
        )
      }
    })
  })

  return BackgroundFetch.Result.NewData
})
