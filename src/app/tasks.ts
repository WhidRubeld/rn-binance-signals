import { IPair } from '@interfaces'
import { StorageService } from '@services'
import { ResultState } from '@store/results'

import { ITask } from './extra/TaskManager'

export const defaultConfig: {
  pairs: IPair[]
  results: ResultState['data']
} = {
  pairs: [],
  results: [],
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
  {
    once: false,
    launch: () => {
      return new Promise(async (resolve) => {
        try {
          const results = await StorageService.gerResults()
          resolve(['results', results])
        } catch (e) {
          console.warn(e)
          resolve(['results', []])
        }
      })
    },
  },
]
