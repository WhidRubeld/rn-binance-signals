import { configureStore } from '@reduxjs/toolkit'

import pairReducer from './pairs'
import permissionsReducer from './permissions'
import resultReducer from './results'

const store = configureStore({
  reducer: {
    permissions: permissionsReducer,
    pairs: pairReducer,
    results: resultReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
