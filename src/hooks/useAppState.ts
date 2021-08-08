import { AppStateContext } from '@providers/AppState'
import { useContext } from 'react'

export default function useSneakbarHook() {
  return useContext(AppStateContext)
}
