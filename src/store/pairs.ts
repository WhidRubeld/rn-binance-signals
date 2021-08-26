import { IPair } from '@interfaces'
import { createSlice } from '@reduxjs/toolkit'
import { StorageService } from '@services'

export interface PairState {
  data: IPair[]
}

const initialState: PairState = {
  data: [],
}

export const pairSlice = createSlice({
  name: 'pairs',
  initialState,
  reducers: {
    addPair(state, { payload }: { payload: IPair }) {
      state.data.push(payload)
      StorageService.setPairs(state.data)
    },
    removePair(state, { payload }: { payload: IPair }) {
      const index = state.data.findIndex(
        (v) => v.first === payload.first && v.second === payload.second
      )

      if (index !== -1) state.data.splice(index, 1)
      StorageService.setPairs(state.data)
    },
    changePair(state, { payload }: { payload: { old: IPair; new: IPair } }) {
      const index = state.data.findIndex(
        (v) => v.first === payload.old.first && v.second === payload.old.second
      )

      if (index !== -1) state.data.splice(index, 1, payload.new)
      StorageService.setPairs(state.data)
    },
  },
})

export const { addPair } = pairSlice.actions

export default pairSlice.reducer
