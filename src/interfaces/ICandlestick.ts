import { IPair } from '@interfaces'

export type _interval = keyof {
  '1m': never
  '3m': never
  '5m': never
  '15m': never
  '30m': never
  '1h': never
  '2h': never
  '4h': never
  '6h': never
  '8h': never
  '12h': never
  '1d': never
  '3d': never
  '1w': never
  '1M': never
}

export interface ITick {
  id: number
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  closeTime: string
  assetVolume: number
  trades: number
  buyBaseVolume: number
  buyAssetVolume: number
  ignored: number
  createdAt: string
  updatedAt: string
}

export enum TickResponseType {
  add = 'add',
  refresh = 'refresh',
}

export interface TickResponseUpdate {
  type: TickResponseType.add
  pair: IPair
  interval: _interval
  tick: ITick
}

export interface TickResponseInitial {
  type: TickResponseType.refresh
  pair: IPair
  interval: _interval
  ticks: ITick[]
}
