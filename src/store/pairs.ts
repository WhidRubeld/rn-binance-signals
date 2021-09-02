import { IPair } from '@interfaces'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiService, StorageService } from '@services'

type PairForm = Omit<IPair, 'uuid'>

export interface PairState {
  data: IPair[]
}

const initialState: PairState = {
  data: [],
}

export const addPair = createAsyncThunk(
  'pairs/add',
  async (pair: PairForm, { rejectWithValue }) => {
    try {
      return await ApiService.getPairKlines({ ...pair, uuid: 123456 })
    } catch (e) {
      console.warn(e)
      return rejectWithValue('Error')
    }
  }
)

export const changePair = createAsyncThunk(
  'pairs/change',
  async (pair: IPair, { rejectWithValue }) => {
    try {
      return await ApiService.getPairKlines(pair)
    } catch (e) {
      console.warn(e)
      return rejectWithValue('Error')
    }
  }
)

export const removePair = createAsyncThunk(
  'pairs/remove',
  async (payload: IPair) => {
    return await ApiService.getPairKlines(payload)
  }
)

export const pairSlice = createSlice({
  name: 'pairs',
  initialState,
  reducers: {
    resetPairState(state) {
      Object.assign(state, initialState)
      StorageService.setPairs([])
    },
    setPairs(state, { payload }: { payload: IPair[] }) {
      state.data = payload
      StorageService.setPairs(state.data)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPair.fulfilled, (state, { meta }) => {
      const uuid = new Date().getTime()
      state.data.push({ ...meta.arg, uuid })
      StorageService.setPairs(state.data)
    })
    builder.addCase(changePair.fulfilled, (state, { meta }) => {
      const index = state.data.findIndex((v) => v.uuid === meta.arg.uuid)
      if (index !== -1) state.data.splice(index, 1, meta.arg)
      StorageService.setPairs(state.data)
    })
    builder.addCase(removePair.fulfilled, (state, { meta }) => {
      const index = state.data.findIndex((v) => v.uuid === meta.arg.uuid)
      if (index !== -1) state.data.splice(index, 1)
      StorageService.setPairs(state.data)
    })
  },
})

export const { setPairs, resetPairState } = pairSlice.actions

export default pairSlice.reducer
