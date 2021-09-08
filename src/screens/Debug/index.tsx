import { AppStackParamList } from '@app/navigation/stack/AppStack'
import { Subheading, Surface } from '@components'
import { useSelector, useAppState, useDispatch } from '@hooks'
import { StackScreenProps } from '@react-navigation/stack'
import { RootState } from '@store'
import React, { FC } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import JSONTree from 'react-native-json-tree'

const ScreenComponent: FC<StackScreenProps<AppStackParamList, 'Debug'>> = ({
  navigation,
}) => {
  const dispatch = useDispatch()
  const appState = useAppState()

  const reduxState = useSelector((state: RootState) => state)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Subheading>App state</Subheading>
      <Surface style={styles.blockButton}>
        <JSONTree data={appState} />
      </Surface>
      <Subheading>Redux state</Subheading>
      <Surface style={styles.blockButton}>
        <JSONTree data={reduxState as any} />
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
    title: 'Тестирование',
  },
}

export default ScreenParams
