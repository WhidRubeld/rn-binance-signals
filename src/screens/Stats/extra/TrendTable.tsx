import { Card, DataTable, Text, Title } from '@components'
import { useForceTrends } from '@hooks'
import { IPair } from '@interfaces'
import React from 'react'
import { StyleSheet } from 'react-native'

const forceColor = (force: number | null) => {
  if (force === null) return undefined
  if (force > 0) return 'green'
  if (force < 0) return 'red'
  return 'orange'
}

export default function TrendTable({
  res,
}: {
  res: { pair: IPair; force: number | null }[]
}) {
  const trends = useForceTrends(res)

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
})
