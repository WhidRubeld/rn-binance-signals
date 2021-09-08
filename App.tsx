import App from '@app'
import * as Notifications from 'expo-notifications'
import { StatusBar } from 'expo-status-bar'
import moment from 'moment'
import React from 'react'
import { Platform, UIManager } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import 'moment/locale/ru'

moment.locale('ru')

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
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
