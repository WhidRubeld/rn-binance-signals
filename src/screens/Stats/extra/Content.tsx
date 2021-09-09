import { useTractionForce } from '@hooks'
import React from 'react'

import ConnectInfo from './ConnectInfo'
import PairsTable from './PairTable'
import TrendTable from './TrendTable'

export default function InfoTable() {
  const res = useTractionForce({
    interval: '4h',
    first: 7,
    second: 25,
  })

  if (!res.length) return null
  return (
    <>
      <TrendTable res={res} />
      <PairsTable res={res} />
      <ConnectInfo />
    </>
  )
}
