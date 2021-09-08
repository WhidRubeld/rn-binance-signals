import { Text, Button, Portal, Modalize, Title, Subheading } from '@components'
import { appVersion } from '@constants'
import { EdgeInsets, useDispatch, useSafeAreaInsets, useTheme } from '@hooks'
import { resetGlobalState } from '@store/extra/resetGlobalState'
import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'

// TODO
const Settings = () => {
  const dispatch = useDispatch()
  const modalRef = useRef<Modalize>()
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  const styles = useStyles(insets)

  const [loading, setLoading] = useState<boolean>(false)

  const onConfirm = () => {
    resetGlobalState(dispatch)
  }

  return (
    <>
      <Text style={styles.appVersionText}>{appVersion}</Text>
      <Portal>
        <Modalize
          ref={modalRef}
          adjustToContentHeight
          modalStyle={{ backgroundColor: colors.background }}
        >
          <View style={styles.container}>
            <Title style={styles.title}>Подтверждение</Title>
            <Subheading style={styles.description}>
              Вы действительно хотите выйти из своего аккаунта?
            </Subheading>
            <Button mode="contained" style={styles.button} onPress={onConfirm}>
              {!loading ? 'Подтверждаю' : 'Ожидайте'}
            </Button>
          </View>
        </Modalize>
      </Portal>
      <Button mode="contained" onPress={() => modalRef.current?.open()}>
        Выйти из аккаунта
      </Button>
    </>
  )
}

const useStyles = (insets: EdgeInsets) => {
  return StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: insets.bottom > 20 ? insets.bottom : 20,
    },
    title: {
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 10,
    },
    description: { textAlign: 'center', fontSize: 14 },
    button: { marginTop: 20 },
    appVersionText: {
      marginTop: 'auto',
      marginBottom: 10,
      fontSize: 12,
      textAlign: 'center',
      color: '#6d6d6d',
    },
  })
}

export default Settings
