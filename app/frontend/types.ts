import type { Employee } from '../questions/types'

export type TableData = Record<string, Record<string, number>>

export interface GlobalValues {
  headcount: number
  average: number
  left: number
  turnover: number
}

export interface MethodologyValues {
  unit: string
  period: string
  context: string
  relationship: string
}
