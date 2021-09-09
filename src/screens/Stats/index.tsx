import { AppStackParamList } from '@app/navigation/stack/AppStack'
import { EdgeInsets, useSafeAreaInsets, useKeepAwake } from '@hooks'
import { StackScreenProps } from '@interfaces'
import React, { FC } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import InfoTable from './extra/InfoTable'
import useCustomHeader from './extra/useCustomHeader'

// TODO
const ScreenComponent: FC<StackScreenProps<AppStackParamList, 'Stats'>> =
  () => {
    useKeepAwake()
    const insets = useSafeAreaInsets()
    const styles = useStyles(insets)
    useCustomHeader()
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <InfoTable />
      </ScrollView>
    )
  }

const useStyles = (insets: EdgeInsets) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flexGrow: 1,
      padding: 10,
      paddingBottom: insets.bottom > 10 ? insets.bottom : 10,
    },
  })
}

const ScreenParams: any = {
  component: ScreenComponent,
  options: {
    title: 'Статистика',
  },
}

export default ScreenParams
