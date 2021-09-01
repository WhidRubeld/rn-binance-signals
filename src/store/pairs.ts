import { IPair } from '@interfaces'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiService, StorageService } from '@services'

export interface PairState {
  data: IPair[]
}

const initialState: PairState = {
  data: [],
}

export const addPair = createAsyncThunk(
  'pairs/add',
  async (pair: IPair, { rejectWithValue }) => {
    try {
      return await ApiService.getPairKlines(pair)
    } catch (e) {
      console.warn(e)
      return rejectWithValue('Error')
    }
  }
)

export const changePair = createAsyncThunk(
  'pairs/change',
  async (payload: { old: IPair; new: IPair }, { rejectWithValue }) => {
    try {
      return await ApiService.getPairKlines(payload.new)
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
    setPairs(state, { payload }: { payload: IPair[] }) {
      state.data = payload
      StorageService.setPairs(state.data)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPair.fulfilled, (state, { meta }) => {
      state.data.push(meta.arg)
      StorageService.setPairs(state.data)
    })
    builder.addCase(changePair.fulfilled, (state, { meta }) => {
      const index = state.data.findIndex(
        (v) =>
          v.first === meta.arg.old.first && v.second === meta.arg.old.second
      )
      if (index !== -1) state.data.splice(index, 1, meta.arg.new)
      StorageService.setPairs(state.data)
    })
    builder.addCase(removePair.fulfilled, (state, { meta }) => {
      const index = state.data.findIndex(
        (v) => v.first === meta.arg.first && v.second === meta.arg.second
      )

      if (index !== -1) state.data.splice(index, 1)
      StorageService.setPairs(state.data)
    })
  },
})

export const { setPairs } = pairSlice.actions

export default pairSlice.reducer
