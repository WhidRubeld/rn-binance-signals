import { BackgroundTaskContext } from '@providers/BackgroundTask'
import { useContext } from 'react'

export default function useBackgroundTask() {
  return useContext(BackgroundTaskContext)
}
