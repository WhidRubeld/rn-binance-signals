import { SnackbarRef, SnackbarTypes } from '@refs'
import axios, { AxiosResponse, AxiosError } from 'axios'

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

const launch = () => {
  axios.interceptors.response.use(
    (next: AxiosResponse) => {
      return Promise.resolve(next)
    },
    async (error: AxiosError) => {
      if (error.config && error.response) {
        if (error.response.status !== 404) {
          SnackbarEmmitier(error)
        }
      }
      return Promise.reject(error)
    }
  )
}

export { launch }
