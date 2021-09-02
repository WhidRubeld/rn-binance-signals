import { IPair, IResult } from '@interfaces'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { StorageService } from '@services'

export interface ResultState {
  data: {
    pair: IPair
    results: IResult[]
  }[]
  timestamp: number | null
}

const initialState: ResultState = {
  data: [],
  timestamp: null,
}

export const refreshResults = createAsyncThunk(
  'results/refresh',
  async (payload, { rejectWithValue }) => {
    try {
      return await StorageService.getResults()
    } catch (e) {
      console.warn(e)
      return rejectWithValue('Error')
    }
  }
)

export const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    resetResultState(state) {
      Object.assign(state, initialState)
      StorageService.setResults(state.data)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshResults.fulfilled, (state, { payload }) => {
      state.data = payload
      state.timestamp = new Date().getTime() / 1e3
    })
  },
})

export const { resetResultState } = resultSlice.actions

export default resultSlice.reducer
