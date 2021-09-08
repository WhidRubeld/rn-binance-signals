import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth'
import HttpInterсeptor from './extra/HttpInterсeptor'
import permissionsReducer from './permissions'
import tickReducer from './ticks'

const store = configureStore({
  reducer: {
    permissions: permissionsReducer,
    auth: authReducer,
    ticks: tickReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
HttpInterсeptor.connect(store.dispatch)

export default store
