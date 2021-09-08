import { ActivityIndicator, Card, DataTable, Text } from '@components'
import { unix2time } from '@helpers'
import { useTheme, useTickSocket, useTractionForce } from '@hooks'
import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function InfoTable() {
  const { colors } = useTheme()
  const { status, loading, updatedAt } = useTickSocket()
  const res = useTractionForce({
    interval: '4h',
    first: 7,
    second: 25,
  }).sort((a, b) => {
    return Math.abs(a.force || 0) - Math.abs(b.force || 0)
  })

  if (!res.length) return null

  return (
    <>
      <Card style={styles.table}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Валютная пара</DataTable.Title>
            <DataTable.Title numeric>Тяга</DataTable.Title>
          </DataTable.Header>

          {res.map((v) => {
            const color = () => {
              if (v.force === null) return colors.text
              if (v.force > 0) return 'green'
              if (v.force < 0) return 'red'
              return 'orange'
            }
            return (
              <DataTable.Row key={v.pair.symbol}>
                <DataTable.Cell>{v.pair.symbol}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text
                    style={{
                      color: color(),
                      fontWeight: 'bold',
                    }}
                  >
                    {v.force !== null ? `${v.force.toFixed(3)}` : '-'}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            )
          })}
        </DataTable>
        {loading && (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: `${colors.background}75`,
              },
            ]}
          >
            <ActivityIndicator />
          </View>
        )}
      </Card>
      <Text style={styles.infoText}>
        Статус - {status ? 'включен' : 'выключен'}
      </Text>
      {updatedAt && (
        <Text style={styles.infoText}>
          Посл. обновление - {unix2time(updatedAt, 'DD MMM HH:mm:ss')}
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
  table: {
    position: 'relative',
    marginBottom: 5,
  },
  infoText: {
    marginTop: 5,
    fontSize: 12,
    color: '#6d6d6d',
  },
})
