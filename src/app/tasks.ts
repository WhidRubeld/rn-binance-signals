import { IProfile } from '@interfaces'
import { StorageService, HttpService, ApiService } from '@services'

import { ITask } from './extra/TaskManager'

export const defaultConfig: {
  auth: { profile: IProfile; token: string } | null
} = {
  auth: null,
}

export const loadingTasks: ITask[] = [
  {
    once: false,
    launch: () => {
      return new Promise(async (resolve) => {
        try {
          const token = await StorageService.getToken()
          if (!token) {
            resolve(['auth', null])
          } else {
            HttpService.setToken(token)
            const profile = await ApiService.profile()
            resolve(['auth', { profile, token }])
          }
        } catch (e) {
          console.warn(e)
          HttpService.removeToken()
          StorageService.removeToken()
          resolve(['auth', null])
        }
      })
    },
  },
]
