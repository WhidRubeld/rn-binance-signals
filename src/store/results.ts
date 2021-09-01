import { IPair, IResult } from '@interfaces'
import { createSlice } from '@reduxjs/toolkit'
import { StorageService } from '@services'
import * as Notifications from 'expo-notifications'

export interface ResultState {
  data: {
    pair: IPair
    results: IResult[]
  }[]
}

const initialState: ResultState = {
  data: [],
}

export const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults(state, { payload }: { payload: ResultState['data'] }) {
      state.data = payload
    },
    resetResults(state) {
      state.data = []
      StorageService.setResults(state.data)
    },
    addPairResult(
      state,
      { payload }: { payload: { pair: IPair; result: IResult } }
    ) {
      const { pair, result } = payload
      const index = state.data.findIndex((v) => {
        return v.pair.first === pair.first && v.pair.second === pair.second
      })

      if (index !== -1) {
        const data = state.data[index].results

        if (data.length > 0) {
          const last = data[data.length - 1]

          if (
            (last.sma25 > last.sma7 && result.sma25 < result.sma7) ||
            (last.sma25 < last.sma7 && result.sma25 > result.sma7)
          ) {
            Notifications.scheduleNotificationAsync({
              content: {
                title: `${pair.first} / ${pair.second}`,
                body: `Смена тренда`,
              },
              trigger: null,
            })
          }
        }

        data.push(result)
        if (data.length > 10) {
          state.data[index].results = data.slice(-10)
        }
      } else {
        state.data.push({
          pair,
          results: [result],
        })
      }

      StorageService.setResults(state.data)
    },
  },
})

export const { setResults, resetResults, addPairResult } = resultSlice.actions

export default resultSlice.reducer
