import DebugScreen from '@screens/Debug'
import PermissionScreen from '@screens/Permissions'
import SettingScreen from '@screens/Settings'
import StatScreen from '@screens/Stats'
import React, { ReactElement } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

export type AppStackParamList = {
  Stats: undefined
  Debug: undefined
  Settings: undefined
  Permissions: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>()

export default function AppStack(): ReactElement {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Stats" {...StatScreen} />
      <Stack.Screen name="Debug" {...DebugScreen} />
      <Stack.Screen name="Settings" {...SettingScreen} />
      <Stack.Screen name="Permissions" {...PermissionScreen} />
    </Stack.Navigator>
  )
}
