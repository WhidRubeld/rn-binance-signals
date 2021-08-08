import { configureStore } from '@reduxjs/toolkit'

import permissionsReducer from './permissions'

const store = configureStore({
  reducer: {
    permissions: permissionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
