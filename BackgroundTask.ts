import launchBackgroundTask from '@app/BackgroundFetchTask'
import { BACKGROUND_FETCH_TASK } from '@env'
import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  await launchBackgroundTask()
  return BackgroundFetch.Result.NewData
})
