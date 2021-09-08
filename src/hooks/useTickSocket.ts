import { TickSocketContext } from '@providers/TickSocket'
import { useContext } from 'react'

export default function useTickSocket() {
  return useContext(TickSocketContext)
}
