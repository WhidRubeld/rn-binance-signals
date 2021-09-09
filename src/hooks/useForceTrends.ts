import { IPair } from '@interfaces'
import { useMemo } from 'react'

const TRENDS = ['USDT', 'BTC']

export default function useForceTrends(
  data: {
    pair: IPair
    force: number | null
  }[]
) {
  const results = useMemo(() => {
    return TRENDS.map((v) => {
      const forces = data
        .filter((k) => {
          const { pair, force } = k
          const { symbol } = pair
          const mainCurrency = symbol.substr(
            symbol.length - v.length,
            symbol.length - 1
          )

          return mainCurrency === v && !!force
        })
        .map((v) => v.force as number)

      const force = forces.length
        ? forces.reduce((prev, curr) => {
            return prev + curr
          }, 0) / forces.length
        : null

      return {
        currency: v,
        force,
      }
    })
  }, [data])

  return results
}
