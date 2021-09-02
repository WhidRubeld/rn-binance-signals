import { SettingStackParamList } from '@app/navigation/stack/SettingStack'
import { Subheading, Surface, Button } from '@components'
import {
  useSelector,
  useAppState,
  useBackgroundTask,
  useDispatch,
} from '@hooks'
import { StackScreenProps } from '@react-navigation/stack'
import { RootState } from '@store'
import { resetPairState } from '@store/pairs'
import { resetResultState } from '@store/results'
import React, { FC } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import JSONTree from 'react-native-json-tree'

const ScreenComponent: FC<StackScreenProps<SettingStackParamList, 'Debug'>> = ({
  navigation,
}) => {
  const dispatch = useDispatch()
  const appState = useAppState()
  const { isRegistered, status } = useBackgroundTask()

  const reduxState = useSelector((state: RootState) => state)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Button
        mode="contained"
        style={styles.blockButton}
        onPress={() => {
          dispatch(resetResultState())
          dispatch(resetPairState())
        }}
      >
        Сбросить состояние
      </Button>
      <Subheading>App state</Subheading>
      <Surface style={styles.blockButton}>
        <JSONTree data={appState} />
      </Surface>
      <Subheading>Redux state</Subheading>
      <Surface style={styles.blockButton}>
        <JSONTree data={reduxState as any} />
      </Surface>
      <Subheading>Background task state</Subheading>
      <Surface style={styles.blockButton}>
        <JSONTree data={{ isRegistered, status }} />
      </Surface>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 10,
  },
  block: {
    padding: 10,
    marginBottom: 10,
  },
  blockButton: {
    marginBottom: 10,
  },
})

const ScreenParams: any = {
  component: ScreenComponent,
  options: {
    title: 'Debug',
  },
}

export default ScreenParams
