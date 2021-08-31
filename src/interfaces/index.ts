export { StackScreenProps } from '@react-navigation/stack'
export { IPermissions } from './IPermissions'
export { IPair } from './IPair'
export { IResult } from './IResult'

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

export type _candlestick = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string
]

export interface ICandlestick {
  open_time: number
  open: string
  high: string
  low: string
  close: string
  volume: string
  close_time: number
  quote_asset_volume: string
  number_of_trades: number
  taker_by_asset_volume: string
  taker_buy_quote_asset_volume: string
  ignore: string
}
