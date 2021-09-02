import { useSelector } from '@hooks'
import { RootState } from '@store'
import moment from 'moment'
import { useMemo } from 'react'

export default function useFormattedPairs() {
  const { data: pairs } = useSelector((state: RootState) => state.pairs)
  const { data: results, timestamp: lastResultsCheck } = useSelector(
    (state: RootState) => state.results
  )

  const output = useMemo(() => {
    let lastLaunch = null
    const lastCheck = lastResultsCheck
      ? moment
          .unix(lastResultsCheck)
          .tz('Etc/GMT')
          .local()
          .format('DD/MM/YYYY HH:mm:ss')
      : null

    const res = pairs
      .map((pair) => {
        let value = null
        const data = results.find((v) => {
          return v.pair.first === pair.first && v.pair.second === pair.second
        })

        if (data && data.results.length) {
          const { sma7, sma25, timestamp } =
            data.results[data.results.length - 1]

          lastLaunch = moment
            .unix(timestamp)
            .tz('Etc/GMT')
            .local()
            .format('DD/MM/YYYY HH:mm:ss')

          if (sma7 > sma25) {
            value = parseFloat((((sma7 - sma25) / sma7) * 100).toFixed(2))
          } else {
            value = parseFloat((((sma25 - sma7) / sma25) * 100).toFixed(2))
          }
        }

        return {
          data: pair,
          text: `${pair.first} / ${pair.second}`,
          value,
        }
      })
      .sort((a, b) => (a.value || 0) - (b.value || 0))

    return { lastLaunch, pairs: res, lastCheck }
  }, [pairs, results, lastResultsCheck])

  return output
}
