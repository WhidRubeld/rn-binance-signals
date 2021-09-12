import moment from 'moment-timezone'

export const toLocalTime = (p: string) => {
  return moment.tz(p, 'Etc/GMT').local()
}

export const unix2time = (time: number, format: string) => {
  return moment.unix(time).tz('Etc/GMT').local().format(format)
}

export const ma = (data: number[], period: number) => {
  if (data.length < period) {
    return undefined
  }

  let info = [...data]
  if (info.length > period) {
    info = info.slice(0, period)
  }

  return info.reduce((a, b) => a + b, 0) / period
}
