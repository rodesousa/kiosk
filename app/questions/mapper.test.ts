import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'
import { getActiveEmployees, getLeftEmployees, countEmployeesByRegion } from './mapper'
import { type Employee } from "./types"

const baseEmployee: Employee = {
  sexe: "01",
  code_pays: "FR",
  code_postal: "75001",
  nature: "01",
  code_categorie_service: "01",
  date_fin_previsionnelle: null,
}

const pastDate = dayjs().subtract(101, 'year').format('YYYY-MM-DD')
const futureDate = dayjs().add(1, 'year').format('YYYY-MM-DD')

describe('getActiveEmployees', () => {
  it('employee without date_fin_previsionnelle → active', () => {
    const employees = [{ ...baseEmployee, date_fin_previsionnelle: null }]
    expect(getActiveEmployees(employees).length).toBe(1)
  })

  it('employee with date_fin_previsionnelle > today → active', () => {
    const employees = [{ ...baseEmployee, date_fin_previsionnelle: futureDate }]
    expect(getActiveEmployees(employees).length).toBe(1)
  })

  it('employee with date_fin_previsionnelle < today → not active', () => {
    const employees = [{ ...baseEmployee, date_fin_previsionnelle: pastDate }]
    expect(getActiveEmployees(employees).length).toBe(0)
  })
})

describe('getLeftEmployees', () => {
  it('employee without date_fin_previsionnelle → not left', () => {
    const employees = [{ ...baseEmployee, date_fin_previsionnelle: null }]
    expect(getLeftEmployees(employees).length).toBe(0)
  })

  it('employee with date_fin_previsionnelle > today → not left', () => {
    const employees = [{ ...baseEmployee, date_fin_previsionnelle: futureDate }]
    expect(getLeftEmployees(employees).length).toBe(0)
  })

  it('employee with date_fin_previsionnelle < today → left', () => {
    const employees = [{ ...baseEmployee, date_fin_previsionnelle: pastDate }]
    expect(getLeftEmployees(employees).length).toBe(1)
  })
})

describe('countEmployeesByRegion', () => {
  it('groups employees by French region', () => {
    const employees = [
      { ...baseEmployee, code_postal: "75001" },
      { ...baseEmployee, code_postal: "75020" },
      { ...baseEmployee, code_postal: "35000" },
    ]
    const result = countEmployeesByRegion(employees)
    expect(result["Île-de-France"]).toBe(2)
    expect(result["Bretagne"]).toBe(1)
  })

  it('returns Unknown for invalid postal code', () => {
    const employees = [{ ...baseEmployee, code_postal: "99999" }]
    const result = countEmployeesByRegion(employees)
    expect(result["Unknown"]).toBe(1)
  })
})
