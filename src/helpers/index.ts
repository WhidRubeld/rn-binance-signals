import { ICandlestick, _candlestick } from '@interfaces'

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
