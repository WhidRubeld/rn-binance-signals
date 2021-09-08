import { sma } from '@helpers'
import { _interval } from '@interfaces'
import { useMemo } from 'react'

import useIntervalTicks from './useIntervalTicks'

export default function useTractionForce({
  interval,
  first,
  second,
}: {
  interval: _interval
  first: number
  second: number
}) {
  const info = useIntervalTicks(interval, second)

  const results = useMemo(() => {
    return info.map((v) => {
      const { pair, results } = v
      let force = null

      if (results.length >= second) {
        const firstSma = sma(
          results.reverse().map((t) => t.close),
          first
        ).pop()
        const secondSma = sma(
          results.reverse().map((t) => t.close),
          second
        ).pop()

        if (firstSma && secondSma) {
          force = (firstSma / secondSma - 1) * 100
        }
      }

      return {
        pair,
        force,
      }
    })
  }, [info])

  return results
}
