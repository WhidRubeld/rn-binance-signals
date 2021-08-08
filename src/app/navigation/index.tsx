/* eslint-disable @typescript-eslint/no-unused-vars */
import Linking from '@navigation/LinkingConfiguration'
import TabNavigator from '@navigation/TabNavigator'
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { ReactElement, useRef, useEffect } from 'react'
import { Host } from 'react-native-portalize'
import { enableScreens } from 'react-native-screens'

export type RootNavigatorParamList = {
  Tabs: undefined
}

enableScreens()

const RootStack = createStackNavigator<RootNavigatorParamList>()

export default function Navigator({ theme }: any): ReactElement {
  const navigationRef = useRef<NavigationContainerRef>(null)
  const routeNameRef = useRef<any>(null)
  const rootRouteNameRef = useRef<any>(null)

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
        <RootStack.Navigator initialRouteName="Tabs" mode="modal">
          <RootStack.Screen
            name="Tabs"
            options={{ headerShown: false }}
            component={TabNavigator}
          />
        </RootStack.Navigator>
      </Host>
    </NavigationContainer>
  )
}
