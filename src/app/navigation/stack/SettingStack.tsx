import DebugScreen from '@screens/Debug'
import PairScreen from '@screens/Pairs'
import PermissionScreen from '@screens/Permissions'
import SettingsMainScreen from '@screens/SettingsMain'
import React, { ReactElement } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

export type SettingStackParamList = {
  SettingsMain: undefined
  Permissions: undefined
  Debug: undefined
  Pairs: undefined
}

const Stack = createNativeStackNavigator<SettingStackParamList>()

export default function HomeStack(): ReactElement {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsMain" {...SettingsMainScreen} />
      <Stack.Screen name="Permissions" {...PermissionScreen} />
      <Stack.Screen name="Debug" {...DebugScreen} />
      <Stack.Screen name="Pairs" {...PairScreen} />
    </Stack.Navigator>
  )
}
