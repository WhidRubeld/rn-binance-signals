import { ma } from '@helpers'
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
      let diff = false

      if (results.length >= second) {
        const one = ma(
          results.map((t) => t.close),
          first
        )

        const two = ma(
          results.map((t) => t.close),
          second
        )

        if (one && two) {
          force = (one / two - 1) * 100
        }
        const prevOne = ma(
          results.slice(1, first + 1).map((t) => t.close),
          first
        )

        if (prevOne && one && force) {
          if ((force > 0 && one < prevOne) || (force < 0 && one > prevOne)) {
            diff = true
          }
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
