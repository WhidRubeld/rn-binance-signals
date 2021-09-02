import { useDispatch, useIsFocused } from '@hooks'
import { refreshResults } from '@store/results'
import moment from 'moment'
import { useState, useEffect } from 'react'

export default function useRefresh() {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      dispatch(refreshResults())
    }
  }, [isFocused])
}
