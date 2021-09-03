import App from '@app'
import launchBackgroundTask from '@app/BackgroundFetchTask'
import { BACKGROUND_FETCH_TASK } from '@env'
import { lauchHttpInterceptor } from '@services'
import * as BackgroundFetch from 'expo-background-fetch'
import * as Notifications from 'expo-notifications'
import { StatusBar } from 'expo-status-bar'
import * as TaskManager from 'expo-task-manager'
import moment from 'moment'
import React from 'react'
import { Platform, UIManager } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import 'moment/locale/ru'

moment.locale('ru')
lauchHttpInterceptor()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  await launchBackgroundTask()
  return BackgroundFetch.Result.NewData
})

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function Boot() {
  return (
    <SafeAreaProvider>
      <App />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
