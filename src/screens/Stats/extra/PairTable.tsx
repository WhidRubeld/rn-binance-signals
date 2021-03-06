import {
  ActivityIndicator,
  Card,
  DataTable,
  Text,
  Title,
  Colors,
} from '@components'
import { useColorScheme, useTheme, useTickSocket } from '@hooks'
import { IPair } from '@interfaces'
import React, { useState, useCallback, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'

enum SortTypes {
  ASC = 'asc',
  DESC = 'desc',
  MODE_ASC = 'm-asc',
  MODE_DESC = 'm-desc',
}

const forceColor = (force: number | null) => {
  if (force === null) return undefined
  if (force > 0) return 'green'
  if (force < 0) return 'red'
  return 'orange'
}

const PairLine = ({
  info,
}: {
  info: { pair: IPair; force: number | null; diff: boolean }
}) => {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  return (
    <DataTable.Row
      style={
        info.diff && {
          backgroundColor: !isDark
            ? Colors.deepOrange200
            : Colors.deepOrange300,
        }
      }
    >
      <DataTable.Cell>{info.pair.symbol}</DataTable.Cell>
      <DataTable.Cell numeric>
        <Text
          style={{
            color: forceColor(info.force),
            fontWeight: 'bold',
          }}
        >
          {info.force !== null ? `${info.force.toFixed(5)}` : '-'}
        </Text>
      </DataTable.Cell>
    </DataTable.Row>
  )
}

export default function PairsTable({
  res,
}: {
  res: { pair: IPair; force: number | null; diff: boolean }[]
}) {
  const { colors } = useTheme()
  const { loading } = useTickSocket()
  const [sort, setSort] = useState<SortTypes>(SortTypes.MODE_ASC)

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

  const sortChangeHandler = useCallback(() => {
    const values = Object.values(SortTypes)
    const index = values.indexOf(sort)
    const value = index === values.length - 1 ? values[0] : values[index + 1]
    setSort(value as SortTypes)
  }, [sort])

  return (
    <>
      <Title style={styles.title} numberOfLines={1}>
        ???????????? ???? ?????????? (4 ??.)
      </Title>
      <Card style={styles.table}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>???????????????? ????????</DataTable.Title>
            <DataTable.Title
              numeric
              onPress={sortChangeHandler}
              sortDirection={
                sort === SortTypes.ASC || sort === SortTypes.MODE_ASC
                  ? 'ascending'
                  : 'descending'
              }
            >
              ???????? ???????? ({sort})
            </DataTable.Title>
          </DataTable.Header>
          {sortedResult.map((v) => {
            return <PairLine info={v} key={v.pair.symbol} />
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
