import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth'
import HttpInterсeptor from './extra/HttpInterсeptor'
import permissionsReducer from './permissions'

const store = configureStore({
  reducer: {
    permissions: permissionsReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
HttpInterсeptor.connect(store.dispatch)

export default store
