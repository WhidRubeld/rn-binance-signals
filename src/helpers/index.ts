import { ICandlestick, _candlestick } from '@interfaces'
import moment from 'moment-timezone'

export const convertKline = (candlestick: _candlestick): ICandlestick => {
  const [
    open_time,
    open,
    high,
    low,
    close,
    volume,
    close_time,
    quote_asset_volume,
    number_of_trades,
    taker_by_asset_volume,
    taker_buy_quote_asset_volume,
    ignore,
  ] = candlestick

  return {
    open_time,
    open,
    high,
    low,
    close,
    volume,
    close_time,
    quote_asset_volume,
    number_of_trades,
    taker_by_asset_volume,
    taker_buy_quote_asset_volume,
    ignore,
  }
}

export const toLocalTime = (p: string) => {
  return moment.tz(p, 'Etc/GMT').local()
}

export const unix2time = (time: number) => {
  return moment.unix(time).tz('Etc/GMT').local().format('DD/MM/YYYY HH:mm:ss')
}

export const avg = (arr: number[], idx: number, range: number) => {
  return sum(arr.slice(idx - range, idx)) / range
}

export const sum = (arr: number[]) => {
  let len = arr.length
  let num = 0
  while (len--) num += Number(arr[len])
  return num
}

export const sma = (arr: number[], range: number) => {
  const num = range || arr.length
  const res = []
  const len = arr.length + 1
  let idx = num - 1
  while (++idx < len) {
    res.push(avg(arr, idx, num))
  }
  return res
}
