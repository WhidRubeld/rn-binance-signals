import { ActivityIndicator, Card, DataTable, Text, Title } from '@components'
import { unix2time } from '@helpers'
import {
  useForceTrends,
  useTheme,
  useTickSocket,
  useTractionForce,
} from '@hooks'
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

  const trends = useForceTrends(res)

  const forceColor = (force: number | null) => {
    if (force === null) return colors.text
    if (force > 0) return 'green'
    if (force < 0) return 'red'
    return 'orange'
  }

  if (!res.length) return null

  return (
    <>
      <Title style={styles.title} numberOfLines={1}>
        Тренд MA (4 ч.)
      </Title>
      <Card style={styles.table}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Валюта</DataTable.Title>
            <DataTable.Title numeric>Сила тяги</DataTable.Title>
          </DataTable.Header>

          {trends.map((v) => {
            return (
              <DataTable.Row key={v.currency}>
                <DataTable.Cell>{v.currency}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text
                    style={{
                      color: forceColor(v.force),
                      fontWeight: 'bold',
                    }}
                  >
                    {v.force !== null ? `${v.force.toFixed(5)}` : '-'}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            )
          })}
        </DataTable>
      </Card>
      <Title style={styles.title} numberOfLines={1}>
        Тренды по парам (4 ч.)
      </Title>
      <Card style={styles.table}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Валютная пара</DataTable.Title>
            <DataTable.Title numeric>Сила тяги</DataTable.Title>
          </DataTable.Header>

          {res.map((v) => {
            return (
              <DataTable.Row key={v.pair.symbol}>
                <DataTable.Cell>{v.pair.symbol}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text
                    style={{
                      color: forceColor(v.force),
                      fontWeight: 'bold',
                    }}
                  >
                    {v.force !== null ? `${v.force.toFixed(5)}` : '-'}
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
  title: {
    fontWeight: '200',
    marginTop: 10,
    marginBottom: 5,
  },
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
