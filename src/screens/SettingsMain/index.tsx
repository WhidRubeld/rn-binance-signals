import launchBackgroundTask from '@app/BackgroundFetchTask'
import { SettingStackParamList } from '@app/navigation/stack/SettingStack'
import { Card, List, Text } from '@components'
import { appVersion } from '@constants'
import { useBackgroundTask, useDispatch, useSelector } from '@hooks'
import { StackScreenProps } from '@interfaces'
import { useTheme } from '@react-navigation/native'
import { RootState } from '@store'
import { resetResultState } from '@store/results'
import React, { FC, useCallback } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

const ListIcon = ({
  color,
  badge,
  icon = 'chevron-right',
}: {
  color: string
  badge?: string | number | null
  icon?: string
}) => {
  const { colors } = useTheme()

  return (
    <View style={styles.rightIcons}>
      {badge && (
        <View
          style={[
            {
              backgroundColor: colors.primary,
            },
            styles.badgeContainer,
          ]}
        >
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      <List.Icon color={color} icon={icon} />
    </View>
  )
}

// TODO
const ScreenComponent: FC<
  StackScreenProps<SettingStackParamList, 'SettingsMain'>
> = ({ navigation }) => {
  const dispatch = useDispatch()
  const { isRegistered, toggle } = useBackgroundTask()

  const availablePermissions = useSelector((state: RootState) => {
    return Object.keys(state.permissions.data).reduce((acc, curr) => {
      // @ts-ignore
      const permission = state.permissions.data[curr]
      if (!permission || !permission.granted) return acc + 1
      return acc
    }, 0)
  })

  const numberOfPairs = useSelector(
    (state: RootState) => state.pairs.data.length
  )

  const toggleBackgroundTask = useCallback(() => {
    if (!toggle) return
    toggle()
    dispatch(resetResultState())

    if (!isRegistered) launchBackgroundTask()
  }, [toggle, isRegistered, dispatch])

  const renderCryptoOptionsCard = () => (
    <Card style={styles.card}>
      <List.Section>
        <List.Item
          title={
            isRegistered ? 'Остановить отслеживание' : 'Запустить остлеживание'
          }
          right={(props) => (
            <ListIcon {...props} icon={isRegistered ? 'pause' : 'play'} />
          )}
          onPress={toggleBackgroundTask}
        />
        <List.Item
          title="Валютные пары"
          description="Пары, по которым собираются и анализируются данные"
          right={(props) => (
            <ListIcon {...props} badge={numberOfPairs || null} />
          )}
          onPress={() => navigation.navigate('Pairs')}
        />
      </List.Section>
    </Card>
  )

  const renderAppOptionsCard = () => (
    <Card style={styles.card}>
      <List.Section>
        <List.Item
          title="Права доступа"
          description="Настройка прав доступа для корректной работы приложения"
          right={(props) => (
            <ListIcon {...props} badge={availablePermissions || undefined} />
          )}
          onPress={() => navigation.navigate('Permissions')}
        />
        <List.Item
          title="Debug режим"
          description="Отображение состояния приложения"
          right={(props) => <ListIcon {...props} />}
          onPress={() => navigation.navigate('Debug')}
        />
      </List.Section>
    </Card>
  )

  const renderAppVerion = () => {
    return <Text style={styles.appVersionText}>{appVersion}</Text>
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {renderCryptoOptionsCard()}
      {renderAppOptionsCard()}
      {renderAppVerion()}
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
  card: { marginBottom: 10 },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: { color: '#fff', fontSize: 12 },
  appVersionText: {
    marginTop: 'auto',
    fontSize: 12,
    textAlign: 'center',
    color: '#6d6d6d',
  },
})

const ScreenParams: any = {
  component: ScreenComponent,
  options: {
    title: 'Настройки',
    headerLargeTitle: true,
  },
}

export default ScreenParams
