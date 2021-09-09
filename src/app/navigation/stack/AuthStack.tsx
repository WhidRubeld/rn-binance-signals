import LoginScreen from '@screens/Login'
import RegisterScreen from '@screens/Register'
import React, { ReactElement } from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

export type AuthStackParamList = {
  Login: undefined
  Register: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthStack(): ReactElement {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" {...LoginScreen} />
      <Stack.Screen name="Register" {...RegisterScreen} />
    </Stack.Navigator>
  )
}
