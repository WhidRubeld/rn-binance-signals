import useSnackbar, { SnackbarTypes } from '@hooks/useSnackbar'
import { setResponse } from '@store/ticks'
import React, { useState, createContext, ReactNode, useCallback } from 'react'
import { useDispatch } from 'react-redux'

export type TickSockerContextValue = {
  status: boolean
  loading: boolean
  updatedAt: number | null
  open: () => void
  close: () => void
}
export const TickSocketContext = createContext<TickSockerContextValue>({
  status: false,
  loading: false,
  updatedAt: null,
  open: () => null,
  close: () => null,
})

export default function TickSocketProvider({
  children,
}: {
  children: ReactNode
}) {
  const { add } = useSnackbar()
  const dispatch = useDispatch()
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [updatedAt, setUpdatedAt] = useState<number | null>(null)

  const open = useCallback(() => {
    if (!socket) {
      const ws = new WebSocket('ws://localhost:3000/echo')
      setLoading(true)

      ws.onmessage = (e) => {
        dispatch(setResponse(JSON.parse(e.data)))
        setUpdatedAt(new Date().getTime())
      }
      ws.onerror = () => {
        setSocket(null)
        setUpdatedAt(null)
        setLoading(false)
        add({
          id: `tick-socket-error-${new Date().getTime()}`,
          type: SnackbarTypes.Error,
          text: 'Ошибка подключения к сокету вещания',
        })
      }
      ws.onopen = () => {
        setLoading(false)
        add({
          id: `tick-socket-success-${new Date().getTime()}`,
          type: SnackbarTypes.Success,
          text: 'Сокет вещания успешно включен',
        })
      }
      ws.onclose = () => {
        setSocket(null)
        setUpdatedAt(null)
        setLoading(false)
      }
      setSocket(ws)
    }
  }, [socket])

  const close = useCallback(() => {
    if (socket) {
      socket.close()
    }
  }, [socket])

  return (
    <TickSocketContext.Provider
      value={{ status: !!socket, loading, updatedAt, open, close }}
    >
      {children}
    </TickSocketContext.Provider>
  )
}
