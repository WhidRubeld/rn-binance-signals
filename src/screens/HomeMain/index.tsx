import { HomeStackParamList } from '@app/navigation/stack/HomeStack'
import { Card, DataTable, Text } from '@components'
import { StackScreenProps } from '@interfaces'
import moment from 'moment-timezone'
import React, { FC } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import useFormattedPairs from './extra/useFormattedPairs'

// TODO
const ScreenComponent: FC<StackScreenProps<HomeStackParamList, 'HomeMain'>> = ({
  navigation,
}) => {
  const { pairs, datetime } = useFormattedPairs()

  const renderTableComponent = () => {
    if (!pairs.length) return null
    return (
      <>
        <Card style={styles.table}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Валютная пара</DataTable.Title>
              <DataTable.Title numeric>Процент</DataTable.Title>
            </DataTable.Header>

            {pairs.map((v) => {
              const color = () => {
                if (v.value < v.percent.down) return 'red'
                if (v.value >= v.percent.down && v.value <= v.percent.up)
                  return 'orange'
                return 'black'
              }
              return (
                <DataTable.Row key={v.text}>
                  <DataTable.Cell>{v.text}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Text
                      style={{
                        color: v.value ? color() : 'black',
                        fontWeight: 'bold',
                      }}
                    >
                      {v.value ? `${v.value}%` : 'NaN'}
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              )
            })}
          </DataTable>
        </Card>
        {datetime && <Text style={styles.datetime}>Выполнен - {datetime}</Text>}
      </>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {renderTableComponent()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  table: { overflow: 'hidden' },
  datetime: {
    marginTop: 10,
    textAlign: 'right',
    color: '#a6a6a6',
    fontSize: 12,
  },
})

const ScreenParams: any = {
  component: ScreenComponent,
  options: {
    title: 'Статистика',
    headerLargeTitle: true,
  },
}

export default ScreenParams
