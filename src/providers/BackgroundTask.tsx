import { BACKGROUND_FETCH_TASK } from '@env'
import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'
import React, { useEffect, useState, createContext, ReactNode } from 'react'

export type BackgroundTaskContextValue = {
  isRegistered: boolean
  status: BackgroundFetch.Status | null
  toggle: (() => void) | null
  checkStatusAsync: (() => void) | null
}

export const BackgroundTaskContext = createContext<BackgroundTaskContextValue>({
  isRegistered: false,
  status: null,
  toggle: null,
  checkStatusAsync: null,
})

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 20, // time intecal in minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  })
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
}

export default function BackgroundTaskProvider({
  children,
}: {
  children: ReactNode
}) {
  const [isRegistered, setIsRegistered] = useState<boolean>(false)
  const [status, setStatus] = useState<BackgroundFetch.Status | null>(null)

  useEffect(() => {
    checkStatusAsync()
  }, [])

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync()
    } else {
      await registerBackgroundFetchAsync()
    }

    checkStatusAsync()
  }

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync()
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    )
    setStatus(status)
    setIsRegistered(isRegistered)
  }

  return (
    <BackgroundTaskContext.Provider
      value={{
        isRegistered,
        status,
        toggle: toggleFetchTask,
        checkStatusAsync,
      }}
    >
      {children}
    </BackgroundTaskContext.Provider>
  )
}
