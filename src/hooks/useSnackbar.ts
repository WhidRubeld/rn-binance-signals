import {
  SnackbarContext,
  SnackbarContextValue,
  SnackbarTypes,
} from '@providers/Snackbar'
import { useContext } from 'react'

export { SnackbarTypes }
export default function useSneakbarHook(): SnackbarContextValue {
  return useContext(SnackbarContext) as SnackbarContextValue
}
