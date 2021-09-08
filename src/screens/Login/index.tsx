// @ts-ignore
import { AuthStackParamList } from '@app/navigation/stack/AuthStack'
import { KeyboardAvoidingView } from '@components'
import { EdgeInsets, useSafeAreaInsets, useTheme } from '@hooks'
import { StackScreenProps } from '@interfaces'
import React, { FC } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import Form from './extra/Form'

// TODO
const ScreenComponent: FC<StackScreenProps<AuthStackParamList, 'Login'>> = ({
  navigation,
}) => {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  const styles = useStyles(insets, colors)

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.root}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.surface }]}
        contentContainerStyle={styles.content}
      >
        <Form />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const useStyles = (insets: EdgeInsets, colors: any) => {
  return StyleSheet.create({
    root: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    content: {
      flexGrow: 1,
      padding: 20,
      paddingBottom: insets.bottom > 20 ? insets.bottom : 20,
    },
  })
}

const ScreenParams: any = {
  component: ScreenComponent,
  options: {
    title: 'Вход в аккаунт',
    headerTranslucent: true,
    headerHideShadow: true,
    headerStyle: { backgroundColor: 'transparent' },
  },
}

export default ScreenParams
