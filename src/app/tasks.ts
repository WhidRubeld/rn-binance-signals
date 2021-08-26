import { IPair } from '@interfaces'
import { StorageService } from '@services'

import { ITask } from './extra/TaskManager'

export const defaultConfig: {
  pairs: IPair[]
} = {
  pairs: [],
}

export const loadingTasks: ITask[] = [
  {
    once: false,
    launch: () => {
      return new Promise(async (resolve) => {
        try {
          const pairs = await StorageService.getPairs()
          resolve(['pairs', pairs])
        } catch (e) {
          console.warn(e)
          resolve(['pairs', []])
        }
      })
    },
  },
]
