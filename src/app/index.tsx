import { Snackbar } from '@components'
import { DarkThemeColor, DefaultThemeColor } from '@constants'
import { useDispatch, useColorScheme } from '@hooks'
import Navigator from '@navigation'
import {
  AppStateProvider,
  PaperProvider,
  ReduxProvider,
  SnackbarProvider,
  TickSocketProvider,
} from '@providers'
import { SnackbarRef } from '@refs'
import Store from '@store'
import { setAuthState } from '@store/auth'
import React, { ReactElement, useLayoutEffect, useMemo } from 'react'

import TaskManager, { ResultType } from './extra/TaskManager'
import { defaultConfig, loadingTasks } from './tasks'

function App({ args, theme }: { args: ResultType; theme: any }) {
  const { auth } = args

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (auth) {
      dispatch(setAuthState(auth))
    }
  }, [])

  return <Navigator theme={theme} />
}

export default function Launcher(): ReactElement {
  const scheme = useColorScheme()
  const theme = useMemo(() => {
    return scheme === 'dark' ? DarkThemeColor : DefaultThemeColor
  }, [scheme])

  return (
    <PaperProvider theme={theme}>
      <SnackbarProvider ref={SnackbarRef}>
        <ReduxProvider store={Store}>
          <TickSocketProvider>
            <AppStateProvider>
              <TaskManager tasks={loadingTasks} initialConfig={defaultConfig}>
                {(args) => <App args={args} theme={theme} />}
              </TaskManager>
            </AppStateProvider>
          </TickSocketProvider>
        </ReduxProvider>
        <Snackbar />
      </SnackbarProvider>
    </PaperProvider>
  )
}
