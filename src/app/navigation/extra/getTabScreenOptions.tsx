import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import React, { ComponentProps } from 'react'

export default function getTabScreenOptions(
  {
    icon,
    tabBarLabel,
  }: {
    icon: ComponentProps<typeof MaterialCommunityIcons>['name']
    tabBarLabel: string
  },
  disabledRoutes?: string[]
): any {
  return ({ route }: any) => {
    return {
      tabBarLabel,
      tabBarIcon: ({ color, focused }: any) => (
        <TabBarIcon name={icon} color={color} />
      ),
      tabBarVisible: setTabBarVisible(route, disabledRoutes),
    }
  }
}

function setTabBarVisible(route: any, disabledRoutes?: string[]) {
  if (!disabledRoutes) return true
  const routeName = getFocusedRouteNameFromRoute(route)
  if (routeName && disabledRoutes.includes(routeName)) return false
  return true
}

function TabBarIcon(props: {
  name: ComponentProps<typeof MaterialCommunityIcons>['name']
  color: string
}) {
  return (
    <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
  )
}
