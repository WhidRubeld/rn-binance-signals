import { AppStackParamList } from '@app/navigation/stack/AppStack'
import { EdgeInsets, useSafeAreaInsets } from '@hooks'
import { StackScreenProps } from '@react-navigation/stack'
import React, { FC } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import Form from './extra/Form'

const ScreenComponent: FC<
  StackScreenProps<AppStackParamList, 'ChangePassword'>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const styles = useStyles(insets)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Form />
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
    title: 'Смена пароля',
  },
}

export default ScreenParams
