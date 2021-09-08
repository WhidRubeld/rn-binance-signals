/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from '@hooks'
import Linking from '@navigation/LinkingConfiguration'
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import DebugScreen from '@screens/Debug'
import { RootState } from '@store'
import { resetGlobalState } from '@store/extra/resetGlobalState'
import React, { ReactElement, useEffect, useMemo, useRef } from 'react'
import { Host } from 'react-native-portalize'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

import AppStack from './stack/AppStack'
import AuthStack from './stack/AuthStack'

export type RootNavigatorParamList = {
  Auth: undefined
  App: undefined
  Debug: undefined
}

enableScreens()

const RootStack = createNativeStackNavigator<RootNavigatorParamList>()

export default function Navigator({ theme }: any): ReactElement {
  const { token, ready } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const initialRouteName = useMemo(() => {
    if (token) return 'App'
    return 'Auth'
  }, [token])

  const navigationRef = useRef<NavigationContainerRef>(null)
  const routeNameRef = useRef<any>(null)
  const rootRouteNameRef = useRef<any>(null)

  useEffect(() => {
    if (
      ready &&
      !token &&
      rootRouteNameRef &&
      rootRouteNameRef.current !== 'Auth'
    ) {
      resetGlobalState(dispatch)
      navigationRef?.current?.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      })
    }
  }, [ready, token, rootRouteNameRef, navigationRef])

  const onStateChange = () => {
    routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name

    const rootState = navigationRef?.current?.getRootState()
    if (rootState) {
      const { routes } = rootState
      if (routes) {
        rootRouteNameRef.current = routes[0].name
      }
    }
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={Linking}
      theme={theme}
      onReady={onStateChange}
      onStateChange={onStateChange}
    >
      <Host>
        <RootStack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name="Auth" component={AuthStack} />
          <RootStack.Screen name="App" component={AppStack} />
          <RootStack.Screen name="Debug" {...DebugScreen} />
        </RootStack.Navigator>
      </Host>
    </NavigationContainer>
  )
}
