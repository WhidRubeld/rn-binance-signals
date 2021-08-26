import {
  Modalize,
  Subheading,
  Title,
  Button,
  Portal,
  StatusBarIOS,
  TextInput,
} from '@components'
import {
  useSafeAreaInsets,
  EdgeInsets,
  useTheme,
  useSnackbar,
  useDispatch,
} from '@hooks'
import { IPair } from '@interfaces'
import { ApiService } from '@services'
import { addPair } from '@store/pairs'
import React, { forwardRef, Ref, useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'

const PairSettings = forwardRef(
  (
    { onClose, pair }: { onClose: () => void; pair: IPair | null },
    ref: Ref<Modalize>
  ) => {
    const dispatch = useDispatch()
    const { add } = useSnackbar()
    const { colors } = useTheme()
    const insets = useSafeAreaInsets()
    const styles = useStyles(insets)

    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')

    const openHandler = useCallback(() => {
      setStatus(true)
      if (pair) {
        setFirst(pair.first)
        setSecond(pair.second)
      }
    }, [pair])

    const closeHandler = () => {
      setStatus(false)
      setFirst('')
      setSecond('')
      onClose()
    }

    const submitHandler = () => {
      setLoading(true)
      ApiService.getPairKlines({ first, second })
        .then((res) => {
          dispatch(addPair({ first, second }))
          // @ts-ignore
          ref.current?.close()
        })
        .catch(() => {
          add({
            id: `pair-not-found-${new Date().getTime()}`,
            text: `Пара ${first}/${second} - не найдена`,
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }

    return (
      <Portal>
        {status && <StatusBarIOS style="light" animated />}
        <Modalize
          ref={ref}
          adjustToContentHeight
          onClose={closeHandler}
          onOpen={openHandler}
          modalStyle={{ backgroundColor: colors.background }}
        >
          <View style={styles.container}>
            <Title style={styles.title}>Удалить авто</Title>
            <Subheading style={styles.description}>
              Вы уверены, что хотите удалить информацию о своем авто?
            </Subheading>
            <View style={styles.row}>
              <TextInput
                value={first}
                onChangeText={setFirst}
                autoCapitalize="characters"
                mode="outlined"
                onSubmitEditing={() => {}}
                label="Базовая валюта"
                style={styles.leftInput}
                disabled={loading}
              />
              <TextInput
                value={second}
                onChangeText={setSecond}
                autoCapitalize="characters"
                mode="outlined"
                onSubmitEditing={() => {}}
                label="Дочерняя валюта"
                style={styles.rightInput}
                disabled={loading}
              />
            </View>
            <Button
              mode="contained"
              style={styles.button}
              disabled={!first || !second || loading}
              onPress={submitHandler}
            >
              Добавить
            </Button>
          </View>
        </Modalize>
      </Portal>
    )
  }
)

const useStyles = (insets: EdgeInsets) => {
  return StyleSheet.create({
    container: { padding: 20, paddingBottom: insets.bottom || 20 },
    title: { textAlign: 'center' },
    description: { textAlign: 'center', marginTop: 10 },
    button: { marginTop: 10 },
    row: { flexDirection: 'row', marginVertical: 20 },
    leftInput: { flex: 1, marginRight: 5 },
    rightInput: { flex: 1, marginLeft: 5 },
  })
}

export default PairSettings
