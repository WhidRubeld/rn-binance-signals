import { SettingStackParamList } from '@app/navigation/stack/SettingStack'
import { Card, List, Text } from '@components'
import { isIOS } from '@constants'
import { useDispatch, useSelector } from '@hooks'
import { StackScreenProps } from '@interfaces'
import { useTheme } from '@react-navigation/native'
import { RootState } from '@store'
import { setNotificationPermission } from '@store/permissions'
import * as Application from 'expo-application'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Notifications from 'expo-notifications'
import React, { FC, useCallback } from 'react'
import { StyleSheet, ScrollView, Linking, View } from 'react-native'

const pkg = Application.applicationId

enum PermissionText {
  granted = 'Разрешено',
  undetermined = 'Запросить',
  denied = 'Запрещено',
}

const ScreenComponent: FC<
  StackScreenProps<SettingStackParamList, 'Permissions'>
> = ({ navigation }) => {
  const { colors } = useTheme()

  const dispatch = useDispatch()
  const { data } = useSelector((state: RootState) => state.permissions)
  const { notifications } = data

  const openSettingsHandler = useCallback(() => {
    if (isIOS) Linking.openURL('app-settings:')
    else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS,
        { data: 'package:' + pkg }
      )
    }
  }, [])

  const pressNotificationHandler = useCallback(() => {
    if (!notifications || notifications.status === 'undetermined') {
      requestNotificationPermission()
    } else {
      openSettingsHandler()
    }
  }, [notifications])

  const requestNotificationPermission = useCallback(async () => {
    const state = await Notifications.requestPermissionsAsync()
    dispatch(setNotificationPermission(state))
  }, [])

  const renderNotificationPermission = () => {
    return (
      <List.Item
        title="Оповещения"
        description="Для отправки локальных оповещений, пока приложение в работает в фоновом режиме"
        onPress={pressNotificationHandler}
        right={() => {
          return (
            <View style={styles.info}>
              <Text style={{ color: colors.primary }}>
                {notifications
                  ? PermissionText[notifications.status]
                  : 'Не определен'}
              </Text>
            </View>
          )
        }}
      />
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        <List.Section>{renderNotificationPermission()}</List.Section>
      </Card>
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
  info: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
})

const ScreenParams: any = {
  component: ScreenComponent,
  options: {
    title: 'Права доступа',
  },
}

export default ScreenParams
