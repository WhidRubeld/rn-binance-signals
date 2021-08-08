import { SplashScreen } from '@components'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { FC } from 'react'

export const LoadFontsTask = async (fonts: any): Promise<any> => {
  return Font.loadAsync(fonts).then(() => null)
}

export const LoadAssetsTask = async (assets: string[]): Promise<any> => {
  const tasks = assets.map((source) => {
    return Asset.fromModule(source).downloadAsync()
  })

  return Promise.all(tasks).then(() => null)
}

export interface ITask {
  once: boolean
  launch: () => Promise<TaskResult>
}

export type TaskResult = [string, any]

export type ResultType = {
  [key: string]: any
}

export default function TaskManager({
  tasks,
  initialConfig,
  children,
}: {
  tasks: ITask[]
  initialConfig: ResultType
  children: FC
}) {
  const [bootstrap, setBootstrap] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(true)
  const result = initialConfig || {}

  const onTasksFinish = () => setLoading(false)

  const saveTaskResult = (res: TaskResult) => {
    if (res) {
      const [field, value] = res
      result[field] = value
    }
  }

  const createRunnableTask = (task: ITask) => {
    return task.launch().then(saveTaskResult)
  }

  const startLoading = () => {
    if (!bootstrap) {
      setBootstrap(true)
      return Promise.all(tasks.map(createRunnableTask))
    }
    return Promise.all(
      tasks.filter((task) => !task.once).map(createRunnableTask)
    )
  }

  React.useEffect(() => {
    startLoading().then(onTasksFinish)
  }, [])

  return (
    <>
      {!loading && children(result)}
      <SplashScreen loading={loading} />
    </>
  )
}
