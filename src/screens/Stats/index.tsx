import { AppStackParamList } from '@app/navigation/stack/AppStack'
import { StackScreenProps } from '@interfaces'
import { useTheme } from '@react-navigation/native'
import React, { FC } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import useCustomHeader from './extra/useCustomHeader'

// TODO
const ScreenComponent: FC<StackScreenProps<AppStackParamList, 'Stats'>> =
  () => {
    const { colors } = useTheme()
    useCustomHeader()

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      />
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
  table: { overflow: 'hidden' },
  datetime: {
    marginTop: 10,
    color: '#a6a6a6',
    fontSize: 12,
  },
})

const ScreenParams: any = {
  component: ScreenComponent,
  options: {
    title: 'Статистика',
  },
}

export default ScreenParams
