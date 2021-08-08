import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react'

export enum SnackbarTypes {
  Default = 'default',
  Success = 'success',
  Error = 'error',
}

export interface SnackbarInterface {
  id: number | string
  type?: SnackbarTypes
  duration?: number
  text: string
  buttonText?: string
  buttonAction?(): void
}

export type SnackbarContextValue = {
  visible: boolean
  message?: SnackbarInterface | null
  add(props: SnackbarInterface): void
  close(): void
}

export const SnackbarContext = createContext<Partial<SnackbarContextValue>>({})

export const SnackbarRef = createRef<any>()

export default forwardRef(
  ({ children }: { children: ReactNode }, ref?: any) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [message, setMessage] = useState<SnackbarInterface | null>(null)
    const [queue, setQueue] = useState<SnackbarInterface[]>([])

    useImperativeHandle(ref, () => ({
      add,
      close,
      visible,
      message,
    }))

    function add(props: SnackbarInterface): void {
      // id, type, text, buttonText, buttonAction, duration
      const { id } = props

      const copy = queue.find((el: SnackbarInterface) => el.id === id)
      if (copy || (message && message.id === id)) return

      setQueue((v) => [
        ...v,
        { ...props, type: props.type || SnackbarTypes.Default },
      ])
    }

    function close(): void {
      setVisible(false)
      setTimeout(() => {
        setMessage(null)
      }, 5e2)
    }

    useEffect(() => {
      if (queue.length) {
        if (message) return
        setMessage(queue[0])
        setQueue((v) => v.slice(1, v.length))
      }
    }, [queue, message])

    useEffect(() => {
      if (message) {
        setVisible(true)
      }
    }, [message])

    return (
      <SnackbarContext.Provider value={{ visible, message, add, close }}>
        {children}
      </SnackbarContext.Provider>
    )
  }
)
