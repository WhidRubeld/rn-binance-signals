import { TextInput, Button, HelperText } from '@components'
import { StackActions, useDispatch, useNavigation, useSnackbar } from '@hooks'
import { register } from '@store/auth'
import React, { useMemo, useRef, useState, useCallback } from 'react'
import { View, StyleSheet, TextInput as TextInputType } from 'react-native'

import Header from './Header'

export default function Form() {
  const { add } = useSnackbar()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [passwordConfirmVisible, setPasswordConfirmVisible] =
    useState<boolean>(false)
  const PasswordInputRef = useRef<TextInputType>(null)
  const PasswordConfirmInputRef = useRef<TextInputType>(null)

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
          text: 'Пароль должен быть длинее или равен 4 символам',
        }
      }
      if (password.length > 100) {
        return {
          status: true,
          text: 'Пароль должен быть короче или равен 100 символам',
        }
      }

      if (password !== passwordConfirm) {
        return {
          status: true,
          text: 'Пароли не совпадают',
        }
      }
    }

    return { status: false, text: null }
  }, [password, passwordConfirm])

  const passwordConfirmErrors = useMemo(() => {
    if (passwordConfirm) {
      if (passwordConfirm.length < 4) {
        return {
          status: true,
          text: 'Пароль должен быть длинее или равен 4 символам',
        }
      }
      if (passwordConfirm.length > 100) {
        return {
          status: true,
          text: 'Пароль должен быть короче или равен 100 символам',
        }
      }

      if (password !== passwordConfirm) {
        return {
          status: true,
          text: 'Пароли не совпадают',
        }
      }
    }

    return { status: false, text: null }
  }, [password, passwordConfirm])

  const submitDisabled = useMemo(() => {
    if (
      !username ||
      !password ||
      usernameErrors.status ||
      passwordErrors.status ||
      passwordConfirmErrors.status
    ) {
      return true
    }
    return false
  }, [
    username,
    password,
    usernameErrors,
    passwordErrors,
    passwordConfirmErrors,
  ])

  const onSubmit = useCallback(() => {
    if (loading || submitDisabled) return
    setLoading(true)
    dispatch(register({ username, password }))
      .unwrap()
      .then(() => {
        navigation.dispatch(StackActions.replace('Login'))
        add({
          id: 'register-complete',
          text: 'Аккаунт успешно создан',
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }, [loading, submitDisabled, username, password])

  return (
    <View style={styles.container}>
      <Header />
      <TextInput
        label="Придумайте логин"
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
        label="Придумайте пароль"
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
        returnKeyType="next"
        onSubmitEditing={() => PasswordConfirmInputRef.current?.focus()}
        disabled={loading}
      />
      <HelperText
        type="error"
        visible={passwordErrors.status}
        style={styles.helperText}
      >
        {passwordErrors.text}
      </HelperText>
      <TextInput
        ref={PasswordConfirmInputRef}
        label="Подтвердите пароль"
        mode="outlined"
        error={passwordConfirmErrors.status}
        right={
          <TextInput.Icon
            name={passwordConfirmVisible ? 'eye-off' : 'eye'}
            disabled={loading}
            onPress={() => setPasswordConfirmVisible((v: boolean) => !v)}
          />
        }
        autoCapitalize="none"
        secureTextEntry={!passwordConfirmVisible}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        returnKeyType="send"
        onSubmitEditing={onSubmit}
        disabled={loading}
      />
      <HelperText
        type="error"
        visible={passwordConfirmErrors.status}
        style={styles.helperText}
      >
        {passwordConfirmErrors.text}
      </HelperText>
      <Button
        mode="contained"
        style={styles.submitButton}
        disabled={loading || submitDisabled}
        loading={loading}
        onPress={onSubmit}
      >
        {loading ? 'Ожидайте' : 'Зарегистрироваться'}
      </Button>
      <Button
        mode="outlined"
        style={styles.registerButton}
        disabled={loading}
        onPress={() => {
          navigation.dispatch(StackActions.replace('Login'))
        }}
      >
        Войти в аккаунт
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
