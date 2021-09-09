import { Card, List, Text } from '@components'
import { useSelector, useNavigation } from '@hooks'
import { useTheme } from '@react-navigation/native'
import { RootState } from '@store'
import React from 'react'
import { View, StyleSheet } from 'react-native'

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
const Settings = () => {
  const navigation = useNavigation()

  const availablePermissions = useSelector((state: RootState) => {
    return Object.keys(state.permissions.data).reduce((acc, curr) => {
      // @ts-ignore
      const permission = state.permissions.data[curr]
      if (!permission || !permission.granted) return acc + 1
      return acc
    }, 0)
  })

  return (
    <Card style={styles.card}>
      <List.Section>
        <List.Item
          title="Сменить пароль"
          description="Изменить пароль для входа в аккаунт"
          right={(props) => <ListIcon {...props} />}
          onPress={() => navigation.navigate('ChangePassword')}
        />
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
}

const styles = StyleSheet.create({
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
})

export default Settings
