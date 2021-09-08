import { setPermissions } from '@store/permissions'
import * as Notifications from 'expo-notifications'
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  createContext,
  ReactNode,
} from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { useDispatch } from 'react-redux'

export type AppStateContextValue = {
  foreground: boolean
  status: AppStateStatus
}

export const AppStateContext = createContext<AppStateContextValue>({
  foreground: AppState.currentState === 'active',
  status: AppState.currentState,
})

export default function AppStateProvider({
  children,
}: {
  children: ReactNode
}) {
  const dispatch = useDispatch()
  const appState = useRef(AppState.currentState)
  const [state, setState] = useState<AppStateContextValue>({
    foreground: appState.current === 'active',
    status: appState.current,
  })

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange)
    }
  }, [])

  const checkPermissions = useCallback(async () => {
    try {
      const notifications = await Notifications.getPermissionsAsync()
      dispatch(setPermissions({ notifications }))
    } catch (e) {
      console.warn(e)
    }
  }, [])

  useEffect(() => {
    checkPermissions()
  }, [state])

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    const foreground = !!(
      appState.current.match(/inactive|background/) && nextAppState === 'active'
    )

    appState.current = nextAppState
    setState({
      foreground,
      status: appState.current,
    })
  }

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  )
}
