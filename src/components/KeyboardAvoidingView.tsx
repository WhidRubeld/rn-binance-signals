import React, { ReactElement } from 'react'
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingViewProps,
} from 'react-native'

export default function Component({
  children,
  ...props
}: KeyboardAvoidingViewProps & { children: ReactElement }): ReactElement {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      {...props}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
