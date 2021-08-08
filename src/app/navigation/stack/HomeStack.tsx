import HomeMainScreen from '@screens/HomeMain'
import React, { ReactElement } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

export type HomeStackParamList = {
  HomeMain: undefined
}

const Stack = createNativeStackNavigator<HomeStackParamList>()

export default function HomeStack(): ReactElement {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" {...HomeMainScreen} />
    </Stack.Navigator>
  )
}
