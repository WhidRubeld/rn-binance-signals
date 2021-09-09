import { TextInput, Button, HelperText } from '@components'
import { useDispatch, useSnackbar, SnackbarTypes } from '@hooks'
import { passwordChange } from '@store/auth'
import React, { useMemo, useRef, useState, useCallback } from 'react'
import { View, StyleSheet, TextInput as TextInputType } from 'react-native'

export default function Form() {
  const { add } = useSnackbar()
  const dispatch = useDispatch()

  const [oldPassword, setOldPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [passwordConfirmVisible, setPasswordConfirmVisible] =
    useState<boolean>(false)
  const PasswordInputRef = useRef<TextInputType>(null)
  const PasswordConfirmInputRef = useRef<TextInputType>(null)

  const [loading, setLoading] = useState<boolean>(false)

  const oldPasswordErrors = useMemo(() => {
    if (oldPassword) {
      if (oldPassword.length < 4) {
        return {
          status: true,
          text: 'Логин должен быть длинее и равен 4 символам',
        }
      }
      if (oldPassword.length > 100) {
        return {
          status: true,
          text: 'Логин должен быть короче или равен 20 символам',
        }
      }
    }

    return { status: false, text: null }
  }, [oldPassword])

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
      !oldPassword ||
      !password ||
      oldPasswordErrors.status ||
      passwordErrors.status ||
      passwordConfirmErrors.status
    ) {
      return true
    }
    return false
  }, [
    oldPassword,
    password,
    oldPasswordErrors,
    passwordErrors,
    passwordConfirmErrors,
  ])

  const onSubmit = useCallback(() => {
    if (loading || submitDisabled) return
    setLoading(true)
    dispatch(passwordChange({ oldPassword, newPassword: password }))
      .unwrap()
      .then(() => {
        add({
          id: 'password-change-complete',
          type: SnackbarTypes.Success,
          text: 'Пароль от вашего аккаунта успешно обновлен',
        })
        setOldPassword('')
        setPassword('')
        setPasswordConfirm('')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [loading, submitDisabled, oldPassword, password])

  return (
    <View style={styles.container}>
      <TextInput
        label="Старый пароль"
        mode="outlined"
        error={oldPasswordErrors.status}
        value={oldPassword}
        autoCapitalize="none"
        onChangeText={setOldPassword}
        secureTextEntry
        onSubmitEditing={() => PasswordInputRef.current?.focus()}
        returnKeyType="next"
        disabled={loading}
      />
      <HelperText
        type="error"
        visible={oldPasswordErrors.status}
        style={styles.helperText}
      >
        {oldPasswordErrors.text}
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
        {loading ? 'Ожидайте' : 'Изменить пароль'}
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
})
