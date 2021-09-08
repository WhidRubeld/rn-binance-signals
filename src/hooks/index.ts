import { AppDispatch } from '@store'
import { useDispatch as useDefaultDispatch } from 'react-redux'
export { useNavigation, useFocusEffect } from '@react-navigation/core'
export { useHeaderHeight } from '@react-navigation/stack'
export {
  CommonActions,
  useIsFocused,
  StackActions,
} from '@react-navigation/native'
export { useSafeAreaInsets, EdgeInsets } from 'react-native-safe-area-context'
export { useSelector } from 'react-redux'

export { default as useSnackbar } from './useSnackbar'
export { SnackbarTypes } from './useSnackbar'
export { useTheme } from 'react-native-paper'
export { default as useColorScheme } from './useColorScheme'
export { default as useAppState } from './useAppState'

export const useDispatch = () => useDefaultDispatch<AppDispatch>()
