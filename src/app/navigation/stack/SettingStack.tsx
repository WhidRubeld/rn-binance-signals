import SettingsMainScreen from '@screens/SettingsMain'
import React, { ReactElement } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

export type SettingStackParamList = {
  SettingsMain: undefined
}

const Stack = createNativeStackNavigator<SettingStackParamList>()

export default function HomeStack(): ReactElement {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsMain" {...SettingsMainScreen} />
    </Stack.Navigator>
  )
}
