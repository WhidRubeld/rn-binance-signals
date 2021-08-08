import HomeStack from '@navigation/stack/HomeStack'
import SettingStack from '@navigation/stack/SettingStack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { ReactElement } from 'react'

import getTabOptions from './extra/getTabOptions'
import getTabScreenOptions from './extra/getTabScreenOptions'

const BottomTab = createBottomTabNavigator()

export default function BottomTabNavigator(): ReactElement {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeStack"
      tabBarOptions={getTabOptions()}
    >
      <BottomTab.Screen
        name="HomeStack"
        component={HomeStack}
        options={getTabScreenOptions({ icon: 'home', tabBarLabel: 'Главная' })}
      />
      <BottomTab.Screen
        name="SettingStack"
        component={SettingStack}
        options={getTabScreenOptions({ icon: 'cog', tabBarLabel: 'Настройки' })}
      />
    </BottomTab.Navigator>
  )
}
