import { AppStackParamList } from '@app/navigation/stack/AppStack'
import { EdgeInsets, useSafeAreaInsets } from '@hooks'
import { StackScreenProps } from '@interfaces'
import React, { FC } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import Footer from './extra/Footer'
import Header from './extra/Header'
import Settings from './extra/Settings'

// TODO
const ScreenComponent: FC<StackScreenProps<AppStackParamList, 'Settings'>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets()
  const styles = useStyles(insets)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header />
      <Settings />
      <Footer />
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
    title: 'Настройки',
  },
}

export default ScreenParams
