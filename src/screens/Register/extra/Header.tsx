import { Text } from '@components'
import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.action}>Регистрация</Text>
      <Text style={styles.title}>BINANCE</Text>
      <Text style={styles.subtitle}>RUNTIME SIGNALS</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingTop: 80, paddingBottom: 40 },
  action: {
    fontSize: 18,
    fontWeight: '200',
    textAlign: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 26,
    fontWeight: '200',
    textAlign: 'center',
  },
})
