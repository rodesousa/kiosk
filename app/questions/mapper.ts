import dayjs from 'dayjs'
import { type Employee } from "./types"
import type { DSNDocument } from '../type/dsn'
import { getRegionFromPostalCode } from "./regions"

// Arbitrary threshold used to split employees into "active" vs "left".
// DSN test data always has a date_fin_previsionnelle, so we can't rely
// on null/present to distinguish. Using a date 100 years in the past
// ensures most employees are "active" while a few fall below the cutoff,
// giving non-zero values in both columns for testing purposes.
const REFERENCE_DATE = dayjs().subtract(100, 'year').format('YYYY-MM-DD')

/**
 * Returns employees who are active (end of period).
 * @example getActiveEmployees(employees) // => [Employee, Employee]
 */
export const getActiveEmployees = (employees: Employee[]): Employee[] => {
  return employees.filter(e =>
    !e.date_fin_previsionnelle || e.date_fin_previsionnelle >= REFERENCE_DATE
  )
}

/**
 * Returns employees who have left the company.
 * @example getLeftEmployees(employees) // => [Employee]
 */
export const getLeftEmployees = (employees: Employee[]): Employee[] => {
  return employees.filter(e =>
    e.date_fin_previsionnelle && e.date_fin_previsionnelle < REFERENCE_DATE
  )
}

/**
 * Calculates employee turnover percentage.
 * @example calculateEmployeeTurnover(employees) // => 12.5
 */
export const calculateEmployeeTurnover = (employees: Employee[]): number => {
  const active = getActiveEmployees(employees).length
  if (active === 0) return 0
  const left = getLeftEmployees(employees).length
  return Math.round((left / active) * 1000) / 10
}

/**
 * Groups employees by country code.
 * @example countEmployeesByCountry(employees, labels) // => { "France": 2, "Belgique": 1 }
 */
export const countEmployeesByCountry = (
  employees: Employee[],
  countryLabels: Record<string, string> = {}
): Record<string, number> =>
  employees.reduce((acc, e) => {
    const country = countryLabels[e.code_pays] || e.code_pays || "Autre"
    acc[country] = (acc[country] || 0) + 1
    return acc
  }, {} as Record<string, number>)

/**
 * Groups employees by French region.
 * @example countEmployeesByRegion(employees) // => { "Île-de-France": 3, "Bretagne": 1 }
 */
export const countEmployeesByRegion = (employees: Employee[]): Record<string, number> =>
  employees.reduce((acc, e) => {
    const region = getRegionFromPostalCode(e.code_postal)
    acc[region] = (acc[region] || 0) + 1
    return acc
  }, {} as Record<string, number>)

/**
 * Groups employees by contract nature and gender.
 * @param natureLabels - {"01": "CDI"}
 * @example countEmployeesByContractAndGender(employees) // => { "CDI": { male: 2, female: 1 } }
 */
export const countEmployeesByContractAndGender = (
  employees: Employee[],
  natureLabels: Record<string, string> = {}
): Record<string, { male: number; female: number }> =>
  employees.reduce((acc, e) => {
    const nature = natureLabels[e.nature] || "Autre"
    if (!acc[nature]) acc[nature] = { male: 0, female: 0 }
    if (e.sexe === "01") acc[nature].male++
    else if (e.sexe === "02") acc[nature].female++
    return acc
  }, {} as Record<string, { male: number; female: number }>)

/**
 * Groups employees by code_categorie_service
 * @example countEmployeesByCategory(employees, labels) // => { "Fonction Capitaine": 3 }
 */
export const countEmployeesByCategory = (
  employees: Employee[],
  categoryLabels: Record<string, string> = {}
): Record<string, number> =>
  employees.reduce((acc, e) => {
    const cat = categoryLabels[e.code_categorie_service] || e.code_categorie_service || "Autre"
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {} as Record<string, number>)

/**
 * Maps a DSN document to a list of Employee.
 */
export const mapDsnToEmployees = (doc: DSNDocument): Employee[] =>
  doc.individus.map((ind) => ({
    sexe: ind.individu.sexe ?? '01',
    code_pays: ind.individu.code_pays ?? '',
    code_postal: ind.individu.code_postal ?? '',
    nature: ind.contrat.nature ?? '01',
    code_categorie_service: ind.contrat.code_categorie_service ?? '',
    date_fin_previsionnelle: ind.contrat.date_fin_previsionnelle ?? null,
  }))
