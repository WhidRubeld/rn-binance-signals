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
      let diff = null

      if (results.length >= second) {
        const one = sma(
          results.reverse().map((t) => t.close),
          first
        ).pop()
        const two = sma(
          results.reverse().map((t) => t.close),
          second
        ).pop()

        if (one && two) {
          force = (one / two - 1) * 100
        }

        const prevOne = sma(
          results
            .reverse()
            .slice(1, first + 1)
            .map((t) => t.close),
          first
        ).pop()

        if (prevOne && one) {
          if (one > prevOne) diff = true
          if (one < prevOne) diff = false
        }
      }

      return {
        pair,
        force,
        diff,
      }
    })
  }, [info])

  return results
}
