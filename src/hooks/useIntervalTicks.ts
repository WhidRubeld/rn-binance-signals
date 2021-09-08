import { _interval } from '@interfaces'
import { RootState } from '@store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export default function useIntervalTicks(
  interval: _interval,
  limit: number = 25
) {
  const { data } = useSelector((state: RootState) => state.ticks)

  const response = useMemo(() => {
    return data.map((v) => {
      const { pair, results } = v
      const response = results.find((v) => v.interval === interval)

      return {
        pair,
        interval,
        results: response ? response.ticks.slice(0, limit) : [],
      }
    })
  }, [data])

  return response
}
