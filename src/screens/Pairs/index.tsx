// @ts-ignore
import { ExampleStackParamList } from '@app/navigation/stack/ExampleStack'
import { Card, DataTable, Button, Modalize } from '@components'
import { useSelector } from '@hooks'
import { IPair, StackScreenProps } from '@interfaces'
import { RootState } from '@store'
import React, { FC, useRef, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import PairSettings from './extra/PairSettings'

// TODO
const ScreenComponent: FC<StackScreenProps<ExampleStackParamList, 'Example'>> =
  ({ navigation }) => {
    const { data } = useSelector((state: RootState) => state.pairs)
    const modalRef = useRef<Modalize>(null)

    const [selectedPair, setSelectedPair] = useState<IPair | null>(null)

    const renderTableComponent = () => {
      if (!data.length) return null
      return (
        <Card style={styles.table}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Базовая валюта</DataTable.Title>
              <DataTable.Title>Дочерняя валюта</DataTable.Title>
            </DataTable.Header>

            {data.map((v) => {
              return (
                <DataTable.Row
                  onPress={() => {
                    setSelectedPair(v)
                    modalRef.current?.open()
                  }}
                  key={`${v.first}-${v.second}`}
                >
                  <DataTable.Cell>{v.first}</DataTable.Cell>
                  <DataTable.Cell>{v.second}</DataTable.Cell>
                </DataTable.Row>
              )
            })}
          </DataTable>
        </Card>
      )
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {renderTableComponent()}
        <Button mode="contained" onPress={() => modalRef.current?.open()}>
          Добавить
        </Button>
        <PairSettings
          ref={modalRef}
          onClose={() => setSelectedPair(null)}
          pair={selectedPair}
        />
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
  table: { marginBottom: 10, overflow: 'hidden' },
})

const ScreenParams: any = {
  component: ScreenComponent,
  options: {
    title: 'Валютные пары',
  },
}

export default ScreenParams
