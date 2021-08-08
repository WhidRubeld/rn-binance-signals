import { useSnackbar, useTheme } from '@hooks'
import { SnackbarTypes } from '@providers/Snackbar'
import * as Haptics from 'expo-haptics'
import React, { useEffect } from 'react'
import { Colors, Snackbar as DefaultSnackbar } from 'react-native-paper'

type SnakbarHapticsProps = {
  event: any
  value: any
}

type SneakbarHapticsTypes = {
  [key: string]: SnakbarHapticsProps
}

const SnakbarHaptics: SneakbarHapticsTypes = {
  [SnackbarTypes.Default]: {
    event: Haptics.impactAsync,
    value: Haptics.ImpactFeedbackStyle.Medium,
  },
  [SnackbarTypes.Success]: {
    event: Haptics.notificationAsync,
    value: Haptics.NotificationFeedbackType.Success,
  },
  [SnackbarTypes.Error]: {
    event: Haptics.notificationAsync,
    value: Haptics.NotificationFeedbackType.Error,
  },
}

type SnackbarColorTypes = {
  [name: string]: string
}

const SnackbarColors: SnackbarColorTypes = {
  [SnackbarTypes.Default]: Colors.blueA200,
  [SnackbarTypes.Success]: Colors.green700,
  [SnackbarTypes.Error]: Colors.red700,
}

function QueueSnackbar() {
  const { visible, message, close } = useSnackbar()
  const { colors } = useTheme()

  useEffect(() => {
    if (message) {
      const { event, value } =
        SnakbarHaptics[message.type || SnackbarTypes.Default]
      event(value)
    }
  }, [message])

  if (message) {
    return (
      <DefaultSnackbar
        visible={visible}
        onDismiss={close}
        duration={message.duration}
        style={{
          backgroundColor:
            SnackbarColors[message.type || SnackbarTypes.Default],
        }}
        action={{
          label: message.buttonText || 'Закрыть',
          onPress: message.buttonAction,
          color: colors.surface,
        }}
      >
        {message.text}
      </DefaultSnackbar>
    )
  }

  return null
}

export default QueueSnackbar
