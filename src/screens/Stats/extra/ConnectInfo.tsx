import { Text } from '@components'
import { unix2time } from '@helpers'
import { useTickSocket } from '@hooks'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function ConnectInfo() {
  const { status, loading, updatedAt } = useTickSocket()

  return (
    <>
      <Text style={styles.infoText}>
        Статус - {status ? 'включен' : 'выключен'}
      </Text>
      {updatedAt && (
        <Text style={styles.infoText}>
          Посл. обновление - {unix2time(updatedAt / 1e3, 'DD MMM HH:mm:ss')}
        </Text>
      )}
      {status && (
        <Text style={styles.infoText}>
          Состояние - {loading ? 'соединение' : 'вещание'}
        </Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  infoText: {
    marginTop: 5,
    fontSize: 12,
    color: '#6d6d6d',
  },
})
