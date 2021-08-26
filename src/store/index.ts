import { configureStore } from '@reduxjs/toolkit'

import pairReducer from './pairs'
import permissionsReducer from './permissions'

const store = configureStore({
  reducer: {
    permissions: permissionsReducer,
    pairs: pairReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
