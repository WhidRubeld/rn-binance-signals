export interface IPair {
  uuid: number
  first: string
  second: string
  percent: {
    up: number
    down: number
  }
}
