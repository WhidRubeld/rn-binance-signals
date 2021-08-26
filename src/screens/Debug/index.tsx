import { SettingStackParamList } from '@app/navigation/stack/SettingStack'
import { Subheading, Surface, Button } from '@components'
import { useSnackbar, useSelector, SnackbarTypes, useAppState } from '@hooks'
import { StackScreenProps } from '@react-navigation/stack'
import { RootState } from '@store'
import React, { FC } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import JSONTree from 'react-native-json-tree'

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 🏄🏻‍♀️ 💆🏻 🧑🏼‍🦲'

const ScreenComponent: FC<StackScreenProps<SettingStackParamList, 'Debug'>> = ({
  navigation,
}) => {
  const appState = useAppState()
  const { add } = useSnackbar()

  const reduxState = useSelector((state: RootState) => state)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Subheading>Локальные оповещения</Subheading>
      <Surface style={styles.block}>
        <Button
          mode="outlined"
          style={styles.blockButton}
          onPress={() => add({ id: 'default', text })}
        >
          Обычное
        </Button>
        <Button
          mode="outlined"
          style={styles.blockButton}
          onPress={() =>
            add({ id: 'success', text, type: SnackbarTypes.Success })
          }
        >
          Успешное
        </Button>
        <Button
          mode="outlined"
          onPress={() => add({ id: 'error', text, type: SnackbarTypes.Error })}
        >
          Ошибка
        </Button>
      </Surface>
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
    title: 'Debug',
  },
}

export default ScreenParams
