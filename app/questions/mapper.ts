import dayjs from 'dayjs'
import { type Employee } from "./types"
import { getRegionFromPostalCode } from "./regions"

/**
 * Returns employees who are currently active.
 * @example getActiveEmployees(employees) // => [Employee, Employee]
 */
export const getActiveEmployees = (employees: Employee[]): Employee[] => {
  const today = dayjs().format('YYYY-MM-DD')
  return employees.filter(e =>
    !e.date_fin_previsionnelle || e.date_fin_previsionnelle >= today
  )
}

/**
 * Returns employees who have left the company.
 * @example getLeftEmployees(employees) // => [Employee]
 */
export const getLeftEmployees = (employees: Employee[]): Employee[] => {
  const today = dayjs().format('YYYY-MM-DD')
  return employees.filter(e =>
    e.date_fin_previsionnelle && e.date_fin_previsionnelle < today
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
 * @example countEmployeesByCountry(employees) // => { "FR": 2, "BE": 1 }
 */
export const countEmployeesByCountry = (employees: Employee[]): Record<string, number> =>
  employees.reduce((acc, e) => {
    acc[e.code_pays] = (acc[e.code_pays] || 0) + 1
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
    const nature = natureLabels[e.nature] || e.nature
    if (!acc[nature]) acc[nature] = { male: 0, female: 0 }
    if (e.sexe === "01") acc[nature].male++
    else if (e.sexe === "02") acc[nature].female++
    return acc
  }, {} as Record<string, { male: number; female: number }>)

/**
 * Groups employees by statut_conventionnel (Contract)
 * @example countEmployeesByCategory(employees) // => { "02": 3, "03": 1 }
 */
export const countEmployeesByCategory = (employees: Employee[]): Record<string, number> =>
  employees.reduce((acc, e) => {
    const cat = e.statut_conventionnel || "?"
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {} as Record<string, number>)
