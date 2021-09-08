import LoginScreen from '@screens/Login'
import React, { ReactElement } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

export type AuthStackParamList = {
  Login: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthStack(): ReactElement {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" {...LoginScreen} />
    </Stack.Navigator>
  )
}
