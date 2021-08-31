import { IPair, IResult } from '@interfaces'
import { createSlice } from '@reduxjs/toolkit'
import { StorageService } from '@services'

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
    setResultPairs(state, { payload }: { payload: IPair[] }) {
      state.data = payload.map((pair) => {
        return {
          pair,
          results: [],
        }
      })
    },
  },
})

export const { setResultPairs } = resultSlice.actions

export default resultSlice.reducer
