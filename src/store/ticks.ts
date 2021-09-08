import {
  IPair,
  ITick,
  TickResponseInitial,
  TickResponseType,
  TickResponseUpdate,
  _interval,
} from '@interfaces'
import { createSlice } from '@reduxjs/toolkit'

export interface TickState {
  data: {
    pair: IPair
    results: {
      interval: _interval
      ticks: ITick[]
    }[]
  }[]
}

const initialState: TickState = {
  data: [],
}

export const tickSlice = createSlice({
  name: 'ticks',
  initialState,
  reducers: {
    resetTickState(state) {
      Object.assign(state, initialState)
    },
    setResponse(
      state,
      { payload }: { payload: TickResponseInitial | TickResponseUpdate }
    ) {
      const { type } = payload
      if (type === TickResponseType.refresh) {
        const { interval, pair, ticks } = payload
        const data = state.data.find((v) => v.pair.symbol === pair.symbol)
        if (data) {
          const results = data.results.find((v) => v.interval === interval)
          if (results) results.ticks = ticks
          else {
            data.results.push({
              interval,
              ticks,
            })
          }
        } else {
          state.data.push({
            pair,
            results: [{ interval, ticks }],
          })
        }
      } else {
        const { interval, pair, tick } = payload
        const data = state.data.find((v) => v.pair.symbol === pair.symbol)
        if (data) {
          const results = data.results.find((v) => v.interval === interval)
          if (results) results.ticks.unshift(tick)
        }
      }
    },
  },
})

export const { resetTickState, setResponse } = tickSlice.actions

export default tickSlice.reducer
