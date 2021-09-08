import { Card, List, Text } from '@components'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { unix2time } from '@helpers'
import { useSelector, useTheme } from '@hooks'
import { RootState } from '@store'
import React from 'react'
import { View, StyleSheet } from 'react-native'

// TODO
const Header = () => {
  const { profile } = useSelector((state: RootState) => state.auth)
  const { colors } = useTheme()

  if (!profile) return null

  return (
    <Card style={styles.card}>
      <List.Section>
        <List.Item
          left={() => (
            <MaterialCommunityIcons
              name="face"
              size={48}
              style={styles.icon}
              color={colors.text}
            />
          )}
          title={
            <View style={styles.nameContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {profile.username}
              </Text>
              <Text style={styles.id}>#{profile.id}</Text>
            </View>
          }
          description={`Обновление профиля: ${unix2time(
            profile.updatedAt / 1e3,
            'D MMM в HH:mm'
          )}`}
        />
      </List.Section>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: { marginBottom: 10 },
  icon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginHorizontal: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: 24,
  },
  id: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: '200',
  },
})

export default Header
