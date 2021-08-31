import App from '@app'
import { BACKGROUND_FETCH_TASK } from '@env'
import { lauchHttpInterceptor } from '@services'
import * as BackgroundFetch from 'expo-background-fetch'
import { StatusBar } from 'expo-status-bar'
import * as TaskManager from 'expo-task-manager'
import moment from 'moment'
import React from 'react'
import { Platform, UIManager } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import 'moment/locale/ru'

moment.locale('ru')
lauchHttpInterceptor()

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now()

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  )

  return BackgroundFetch.Result.NewData
})

export default function Boot() {
  return (
    <SafeAreaProvider>
      <App />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
