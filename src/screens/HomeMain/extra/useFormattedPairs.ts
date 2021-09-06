import { unix2time } from '@helpers'
import { useSelector } from '@hooks'
import { RootState } from '@store'
import { useMemo } from 'react'

export default function useFormattedPairs() {
  const { data: pairs } = useSelector((state: RootState) => state.pairs)
  const { data: results, timestamp: lastResultsCheck } = useSelector(
    (state: RootState) => state.results
  )

  const output = useMemo(() => {
    let lastLaunch = null
    const lastCheck = lastResultsCheck ? unix2time(lastResultsCheck) : null

    const res = pairs
      .map((pair) => {
        let value = null
        const data = results.find((v) => {
          return v.pair.first === pair.first && v.pair.second === pair.second
        })

        if (data && data.results.length) {
          const { sma7, sma25, timestamp } =
            data.results[data.results.length - 1]

          lastLaunch = unix2time(timestamp)

          value = parseFloat(((sma7 / sma25 - 1) * 100).toFixed(4))
        }

        return {
          data: pair,
          text: `${pair.first} / ${pair.second}`,
          value,
        }
      })
      .sort((a, b) => {
        return Math.abs(a.value || 0) - Math.abs(b.value || 0)
      })

    return { lastLaunch, pairs: res, lastCheck }
  }, [pairs, results, lastResultsCheck])

  return output
}
