import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme, useNavigation, useTickSocket } from '@hooks'
import React, { useLayoutEffect } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

export default function useCustomHeader() {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { status, open, close } = useTickSocket()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            if (status) close()
            else open()
          }}
          style={styles.leftButton}
        >
          <MaterialCommunityIcons
            name={status ? 'pause' : 'play'}
            size={21}
            color={colors.primary}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Settings')
          }}
          style={styles.rightButton}
        >
          <MaterialCommunityIcons name="cog" size={21} color={colors.primary} />
        </TouchableOpacity>
      ),
    })
  }, [status])
}

const styles = StyleSheet.create({
  rightButton: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: -5,
  },
  leftButton: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -5,
  },
})
