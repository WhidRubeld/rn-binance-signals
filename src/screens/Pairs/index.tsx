// @ts-ignore
import { ExampleStackParamList } from '@app/navigation/stack/ExampleStack'
import { Card, DataTable, Button, Modalize } from '@components'
import { StackScreenProps } from '@interfaces'
import React, { FC, useRef } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import PairSettings from './extra/PairSettings'

// TODO
const ScreenComponent: FC<StackScreenProps<ExampleStackParamList, 'Example'>> =
  ({ navigation }) => {
    const ref = useRef<Modalize>(null)
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Card>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Базовая валюта</DataTable.Title>
              <DataTable.Title>Дочерняя валюта</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row onPress={() => {}}>
              <DataTable.Cell>ETH</DataTable.Cell>
              <DataTable.Cell>USD</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row onPress={() => {}}>
              <DataTable.Cell>XRP</DataTable.Cell>
              <DataTable.Cell>ETH</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card>
        <Button
          style={{ marginTop: 10 }}
          mode="contained"
          onPress={() => ref.current?.open()}
        >
          Добавить
        </Button>
        <PairSettings ref={ref} onClose={() => {}} pair={null} />
      </ScrollView>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 10,
  },
})

const ScreenParams: any = {
  component: ScreenComponent,
  options: {
    title: 'Валютные пары',
  },
}

export default ScreenParams
