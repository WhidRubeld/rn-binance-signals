import { SnackbarRef, SnackbarTypes } from '@refs'
import { AppDispatch } from '@store'
import axios, { AxiosResponse, AxiosError } from 'axios'

import { resetGlobalState } from './resetGlobalState'

const SnackbarEmmitier = (error: any) => {
  let text: any = 'Во время выполнения запроса произошла ошибка'
  if (error instanceof String) text = error
  else if (error instanceof Object && error.message)
    text = `Server error: ${error.message}`

  SnackbarRef.current?.add({
    id: `http-request-error-${new Date().getTime()}`,
    text,
    type: SnackbarTypes.Error,
  })
}

const connect = (dispatch: AppDispatch) => {
  axios.interceptors.response.use(
    (next: AxiosResponse) => {
      return Promise.resolve(next)
    },
    async (error: AxiosError) => {
      if (error.config && error.response) {
        if (error.response.status === 401) {
          resetGlobalState(dispatch)
          SnackbarEmmitier('Время жизни токена доступа истекло')
          return Promise.reject(error)
        } else if (error.response.status !== 404) {
          SnackbarEmmitier(error)
        }
      }
      return Promise.reject(error)
    }
  )
}

export default {
  connect,
}
