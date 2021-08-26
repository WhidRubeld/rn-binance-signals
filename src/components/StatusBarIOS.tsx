import { isIOS } from '@constants'
import { StatusBar, StatusBarProps } from 'expo-status-bar'
import React from 'react'

export default function StatusBarIOS(props: StatusBarProps) {
  if (isIOS) return <StatusBar {...props} />
  return null
}
