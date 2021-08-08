import { SettingStackParamList } from '@app/navigation/stack/SettingStack'
import { StackScreenProps } from '@interfaces'
import React, { FC } from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'

// TODO
const ScreenComponent: FC<
  StackScreenProps<SettingStackParamList, 'SettingsMain'>
> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text>TODO</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
})

const ScreenParams: any = {
  component: ScreenComponent,
  options: {
    title: 'Настройки',
    headerLargeTitle: true,
  },
}

export default ScreenParams
