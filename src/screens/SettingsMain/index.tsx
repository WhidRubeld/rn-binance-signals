import { SettingStackParamList } from '@app/navigation/stack/SettingStack'
import { Card, List, Text } from '@components'
import { useSelector } from '@hooks'
import { StackScreenProps } from '@interfaces'
import { useTheme } from '@react-navigation/native'
import { RootState } from '@store'
import React, { FC } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

const ListIcon = ({ color, badge }: { color: string; badge?: string }) => {
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
      <List.Icon color={color} icon="chevron-right" />
    </View>
  )
}

// TODO
const ScreenComponent: FC<
  StackScreenProps<SettingStackParamList, 'SettingsMain'>
> = ({ navigation }) => {
  const availablePermissions = useSelector((state: RootState) => {
    return Object.keys(state.permissions.data).reduce((acc, curr) => {
      // @ts-ignore
      const permission = state.permissions.data[curr]
      if (!permission || !permission.granted) return acc + 1
      return acc
    }, 0)
  })

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        <List.Section>
          <List.Item
            title="Права доступа"
            description="Настройка прав доступа для корректной работы приложения"
            right={(props) => (
              <ListIcon
                {...props}
                badge={
                  availablePermissions > 0
                    ? availablePermissions.toString()
                    : undefined
                }
              />
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
})

const ScreenParams: any = {
  component: ScreenComponent,
  options: {
    title: 'Настройки',
    headerLargeTitle: true,
  },
}

export default ScreenParams
