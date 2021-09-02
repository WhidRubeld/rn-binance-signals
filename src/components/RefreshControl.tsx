import { useTheme } from '@hooks'
import React from 'react'
import { RefreshControl, RefreshControlProps } from 'react-native'

export default function CustomRefreshControl(props: RefreshControlProps) {
  const { colors } = useTheme()
  return <RefreshControl tintColor={colors.primary} {...props} />
}
