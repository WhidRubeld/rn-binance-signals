import StatScreen from '@screens/Stats'
import React, { ReactElement } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

export type AppStackParamList = {
  Stats: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>()

export default function AppStack(): ReactElement {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Stats" {...StatScreen} />
    </Stack.Navigator>
  )
}
