import { Text } from '@components'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme, useNavigation } from '@hooks'
import React, { useLayoutEffect } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

export default function useCustomHeader() {
  const navigation = useNavigation()
  const { colors } = useTheme()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Settings')
          }}
          style={styles.buttonContainer}
        >
          <MaterialCommunityIcons name="cog" size={21} color={colors.primary} />
        </TouchableOpacity>
      ),
    })
  }, [])
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: -5,
  },
})
