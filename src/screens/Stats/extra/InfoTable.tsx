import { ActivityIndicator, Card, DataTable, Text, Title } from '@components'
import { unix2time } from '@helpers'
import {
  useForceTrends,
  useTheme,
  useTickSocket,
  useTractionForce,
} from '@hooks'
import React, { useState, useCallback, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'

enum SortTypes {
  ASC = 'asc',
  DESC = 'desc',
  MODE_ASC = 'm-asc',
  MODE_DESC = 'm-desc',
}

export default function InfoTable() {
  const { colors } = useTheme()
  const { status, loading, updatedAt } = useTickSocket()
  const [sort, setSort] = useState<SortTypes>(SortTypes.MODE_ASC)
  const res = useTractionForce({
    interval: '4h',
    first: 7,
    second: 25,
  })

  const sortedResult = useMemo(() => {
    return res.sort((a, b) => {
      switch (sort) {
        case SortTypes.ASC:
          return (a.force || 0) - (b.force || 0)
        case SortTypes.DESC:
          return (b.force || 0) - (a.force || 0)
        case SortTypes.MODE_ASC:
          return Math.abs(a.force || 0) - Math.abs(b.force || 0)
        case SortTypes.MODE_DESC:
          return Math.abs(b.force || 0) - Math.abs(a.force || 0)
      }
    })
  }, [res, sort])
  const trends = useForceTrends(res)

  const forceColor = (force: number | null) => {
    if (force === null) return colors.text
    if (force > 0) return 'green'
    if (force < 0) return 'red'
    return 'orange'
  }

  const sortChangeHandler = useCallback(() => {
    const values = Object.values(SortTypes)
    const index = values.indexOf(sort)
    const value = index === values.length - 1 ? values[0] : values[index + 1]
    setSort(value as SortTypes)
  }, [sort])

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
            <DataTable.Title
              numeric
              onPress={sortChangeHandler}
              sortDirection={
                sort === SortTypes.ASC || sort === SortTypes.MODE_ASC
                  ? 'ascending'
                  : 'descending'
              }
            >
              Сила тяги ({sort})
            </DataTable.Title>
          </DataTable.Header>

          {sortedResult.map((v) => {
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
