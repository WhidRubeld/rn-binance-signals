import {
  Modalize,
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
import { addPair, changePair, removePair } from '@store/pairs'
import React, { forwardRef, Ref, useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

const PairSettings = forwardRef(
  (
    {
      onClose,
      pair,
      onChange,
    }: { onClose: () => void; pair: IPair | null; onChange: () => void },
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
    const [up, setUp] = useState('')
    const [down, setDown] = useState('')

    useEffect(() => {
      if (pair) {
        setFirst(pair.first)
        setSecond(pair.second)
        setUp(`${pair.percent.up}`)
        setDown(`${pair.percent.down}`)
      }
    }, [pair])

    const openHandler = useCallback(() => {
      setStatus(true)
    }, [])

    const closeHandler = useCallback(() => {
      setStatus(false)
      setFirst('')
      setSecond('')
      setUp('')
      setDown('')
      onClose()
    }, [onClose])

    const submitHandler = useCallback(() => {
      setLoading(true)

      const data = {
        first,
        second,
        percent: { up: parseFloat(up), down: parseFloat(down) },
      }

      const promise = !pair
        ? dispatch(addPair(data))
        : dispatch(changePair({ old: pair, new: data }))

      promise
        .then(() => {
          onChange()
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
    }, [first, second, up, down, pair, onChange])

    const deleteHandler = useCallback(() => {
      if (!pair) return
      dispatch(removePair(pair))
      // @ts-ignore
      ref.current?.close()
      onChange()
    }, [pair, onChange])

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
            <Title style={styles.title}>
              {pair ? 'Редактирование пары' : 'Добавление пары'}
            </Title>
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
            <View style={styles.row}>
              <TextInput
                value={down}
                onChangeText={setDown}
                mode="outlined"
                onSubmitEditing={() => {}}
                label="Нижний процент"
                keyboardType="numeric"
                style={styles.leftInput}
                disabled={loading}
              />
              <TextInput
                value={up}
                onChangeText={setUp}
                mode="outlined"
                onSubmitEditing={() => {}}
                label="Верхний процент"
                keyboardType="numeric"
                style={styles.rightInput}
                disabled={loading}
              />
            </View>
            <Button
              mode="contained"
              style={styles.button}
              disabled={!first || !second || loading || !up || !down}
              onPress={submitHandler}
            >
              {pair ? 'Обновить' : 'Добавить'}
            </Button>
            {pair && (
              <Button
                mode="outlined"
                style={styles.button}
                disabled={loading}
                onPress={deleteHandler}
              >
                Удалить
              </Button>
            )}
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
    button: { marginTop: 10 },
    row: { flexDirection: 'row', marginVertical: 10 },
    leftInput: { flex: 1, marginRight: 5 },
    rightInput: { flex: 1, marginLeft: 5 },
  })
}

export default PairSettings
