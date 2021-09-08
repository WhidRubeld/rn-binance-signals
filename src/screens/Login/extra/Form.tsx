import { TextInput, Button, HelperText } from '@components'
import {
  StackActions,
  useDispatch,
  useNavigation,
  useSelector,
  useSnackbar,
} from '@hooks'
import { RootState } from '@store'
import { login, profile } from '@store/auth'
import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, TextInput as TextInputType } from 'react-native'

import Header from './Header'

export default function Form() {
  const { add } = useSnackbar()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.auth)

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const PasswordInputRef = useRef<TextInputType>(null)

  const [loading, setLoading] = useState<boolean>(false)

  const usernameErrors = useMemo(() => {
    if (username) {
      if (username.length < 4) {
        return {
          status: true,
          text: 'Логин должен быть длинее и равен 4 символам',
        }
      }
      if (username.length > 20) {
        return {
          status: true,
          text: 'Логин должен быть короче или равен 20 символам',
        }
      }
    }

    return { status: false, text: null }
  }, [username])

  const passwordErrors = useMemo(() => {
    if (password) {
      if (password.length < 4) {
        return {
          status: true,
          text: 'Логин должен быть длинее или равен 4 символам',
        }
      }
      if (password.length > 100) {
        return {
          status: true,
          text: 'Логин должен быть короче или равен 100 символам',
        }
      }
    }

    return { status: false, text: null }
  }, [password])

  const submitDisabled = useMemo(() => {
    if (
      !username ||
      !password ||
      usernameErrors.status ||
      passwordErrors.status
    ) {
      return true
    }
    return false
  }, [username, password, usernameErrors, passwordErrors])

  const onSubmit = useCallback(() => {
    if (loading || submitDisabled) return
    setLoading(true)
    dispatch(login({ username, password })).then((res) => {
      setLoading(false)
    })
  }, [loading, submitDisabled, username, password])

  useEffect(() => {
    if (token) {
      navigation.dispatch(StackActions.replace('App'))
      add({
        id: 'login-complete',
        text: 'Добро пожаловать!',
      })
      dispatch(profile())
    }
  }, [token, navigation, add, dispatch])

  return (
    <View style={styles.container}>
      <Header />
      <TextInput
        label="Ваш логин"
        mode="outlined"
        error={usernameErrors.status}
        value={username}
        autoCapitalize="none"
        onChangeText={setUsername}
        onSubmitEditing={() => PasswordInputRef.current?.focus()}
        returnKeyType="next"
        disabled={loading}
      />
      <HelperText
        type="error"
        visible={usernameErrors.status}
        style={styles.helperText}
      >
        {usernameErrors.text}
      </HelperText>
      <TextInput
        ref={PasswordInputRef}
        label="Ваш пароль"
        mode="outlined"
        error={passwordErrors.status}
        right={
          <TextInput.Icon
            name={passwordVisible ? 'eye-off' : 'eye'}
            disabled={loading}
            onPress={() => setPasswordVisible((v: boolean) => !v)}
          />
        }
        autoCapitalize="none"
        secureTextEntry={!passwordVisible}
        value={password}
        onChangeText={setPassword}
        returnKeyType="send"
        onSubmitEditing={onSubmit}
        disabled={loading}
      />
      <HelperText
        type="error"
        visible={passwordErrors.status}
        style={styles.helperText}
      >
        {passwordErrors.text}
      </HelperText>
      <Button
        mode="contained"
        style={styles.submitButton}
        disabled={loading || submitDisabled}
        loading={loading}
        onPress={onSubmit}
      >
        {loading ? 'Ожидайте' : 'Войти'}
      </Button>
      <Button mode="outlined" style={styles.registerButton} disabled={loading}>
        Регистрация
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  helperText: {
    marginBottom: 5,
  },
  submitButton: {
    marginTop: 'auto',
  },
  registerButton: {
    marginTop: 10,
  },
})
