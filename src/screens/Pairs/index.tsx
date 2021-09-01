// @ts-ignore
import { ExampleStackParamList } from '@app/navigation/stack/ExampleStack'
import { Card, DataTable, Button, Modalize } from '@components'
import { useDispatch, useSelector } from '@hooks'
import { IPair, StackScreenProps } from '@interfaces'
import { RootState } from '@store'
import { resetResults } from '@store/results'
import React, { FC, useRef, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import PairSettings from './extra/PairSettings'

// TODO
const ScreenComponent: FC<StackScreenProps<ExampleStackParamList, 'Example'>> =
  ({ navigation }) => {
    const dispatch = useDispatch()
    const { data } = useSelector((state: RootState) => state.pairs)
    const modalRef = useRef<Modalize>(null)

    const [selectedPair, setSelectedPair] = useState<IPair | null>(null)

    const renderTableComponent = () => {
      if (!data.length) return null
      return (
        <Card style={styles.table}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Валютная пара</DataTable.Title>
              <DataTable.Title numeric>Нижний %</DataTable.Title>
              <DataTable.Title numeric>Верхний %</DataTable.Title>
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
                  <DataTable.Cell>{`${v.first} / ${v.second}`}</DataTable.Cell>
                  <DataTable.Cell numeric>{v.percent.down}%</DataTable.Cell>
                  <DataTable.Cell numeric>{v.percent.up}%</DataTable.Cell>
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
          onChange={() => {
            dispatch(resetResults())
          }}
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
