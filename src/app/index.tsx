import { Snackbar } from '@components'
import { DefaultThemeColor } from '@constants'
import { useDispatch } from '@hooks'
import Navigator from '@navigation'
import {
  AppStateProvider,
  PaperProvider,
  ReduxProvider,
  SnackbarProvider,
} from '@providers'
import { SnackbarRef } from '@refs'
import Store from '@store'
import React, { ReactElement, useLayoutEffect } from 'react'

import TaskManager, { ResultType } from './extra/TaskManager'
import { defaultConfig, loadingTasks } from './tasks'

function App({ args }: { args: ResultType }) {
  const {} = args

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    // set store data
  }, [])

  return <Navigator theme={DefaultThemeColor} />
}

export default function Launcher(): ReactElement {
  return (
    <PaperProvider theme={DefaultThemeColor}>
      <SnackbarProvider ref={SnackbarRef}>
        <ReduxProvider store={Store}>
          <AppStateProvider>
            <TaskManager tasks={loadingTasks} initialConfig={defaultConfig}>
              {(args) => <App args={args} />}
            </TaskManager>
          </AppStateProvider>
        </ReduxProvider>
        <Snackbar />
      </SnackbarProvider>
    </PaperProvider>
  )
}
