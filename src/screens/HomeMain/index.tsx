import { HomeStackParamList } from '@app/navigation/stack/HomeStack'
import { Card, DataTable, Text } from '@components'
import { StackScreenProps } from '@interfaces'
import { useTheme } from '@react-navigation/native'
import React, { FC } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import useFormattedPairs from './extra/useFormattedPairs'
import useRefresh from './extra/useRefresh'

// TODO
const ScreenComponent: FC<StackScreenProps<HomeStackParamList, 'HomeMain'>> =
  () => {
    const { colors } = useTheme()
    useRefresh()
    const { pairs, lastCheck, lastLaunch } = useFormattedPairs()

    const renderTableComponent = () => {
      if (!pairs.length) return null
      return (
        <>
          <Card style={styles.table}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Валютная пара</DataTable.Title>
                <DataTable.Title numeric>Сила</DataTable.Title>
              </DataTable.Header>

              {pairs.map((v) => {
                const color = () => {
                  if (v.value === null) return colors.text
                  if (v.value > 0) return 'green'
                  if (v.value < 0) return 'red'
                  return 'orange'
                }
                return (
                  <DataTable.Row key={v.data.uuid}>
                    <DataTable.Cell>{v.text}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      <Text
                        style={{
                          color: color(),
                          fontWeight: 'bold',
                        }}
                      >
                        {v.value !== null ? `${v.value}` : '-'}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                )
              })}
            </DataTable>
          </Card>
          {lastCheck && (
            <Text style={styles.datetime}>
              Посл. обновление списка: {lastCheck}
            </Text>
          )}

          <Text style={styles.datetime}>
            Посл. выполнение таска: {lastLaunch || 'не запускался'}
          </Text>
        </>
      )
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
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
