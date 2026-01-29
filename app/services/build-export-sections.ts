import type { TFunction } from 'i18next'
import type { ExportSection } from './export-word'
import type { TableData, GlobalValues, MethodologyValues } from '../frontend/types'

interface DimensionData {
  headcount: TableData
  average: TableData
}

interface BuildExportParams {
  t: TFunction
  global: GlobalValues
  country: DimensionData
  region: DimensionData
  category: DimensionData
  contract: DimensionData
  methodology: MethodologyValues
}

export function buildExportSections({
  t,
  global,
  country,
  region,
  category,
  contract,
  methodology,
}: BuildExportParams): ExportSection[] {
  const toRows = (data: TableData): string[][] =>
    Object.entries(data).map(([key, cols]) =>
      [key, ...Object.values(cols).map(String)]
    )

  return [
    {
      title: t('global.title'),
      tables: [{
        table: {
          headers: [t('global.question'), t('global.value')],
          rows: [
            [t('global.headcount'), String(global.headcount)],
            [t('global.average'), String(global.average)],
            [t('global.left'), String(global.left)],
            [t('global.turnover') + ' (%)', String(global.turnover)],
          ],
        },
      }],
    },
    {
      title: t('country.title'),
      tables: [
        {
          subtitle: t('country.headcount'),
          table: { headers: [t('country.label'), t('country.count')], rows: toRows(country.headcount) },
        },
        {
          subtitle: t('country.average'),
          table: { headers: [t('country.label'), t('country.count')], rows: toRows(country.average) },
        },
      ],
    },
    {
      title: t('region.title'),
      tables: [
        {
          subtitle: t('region.headcount'),
          table: { headers: [t('region.label'), t('region.count')], rows: toRows(region.headcount) },
        },
        {
          subtitle: t('region.average'),
          table: { headers: [t('region.label'), t('region.count')], rows: toRows(region.average) },
        },
      ],
    },
    {
      title: t('category.title'),
      tables: [
        {
          subtitle: t('category.headcount'),
          table: { headers: [t('category.label'), t('category.count')], rows: toRows(category.headcount) },
        },
        {
          subtitle: t('category.average'),
          table: { headers: [t('category.label'), t('category.count')], rows: toRows(category.average) },
        },
      ],
    },
    {
      title: t('contract.title'),
      tables: [
        {
          subtitle: t('contract.headcount'),
          table: {
            headers: [t('contract.label'), t('contract.male'), t('contract.female')],
            rows: toRows(contract.headcount),
          },
        },
        {
          subtitle: t('contract.average'),
          table: {
            headers: [t('contract.label'), t('contract.male'), t('contract.female')],
            rows: toRows(contract.average),
          },
        },
      ],
    },
    {
      title: t('methodology.title'),
      tables: [{
        table: {
          headers: [t('global.question'), t('global.value')],
          rows: [
            [t('methodology.unit.label'), methodology.unit ? t(`methodology.unit.${methodology.unit}`) : ''],
            [t('methodology.period.label'), methodology.period ? t(`methodology.period.${methodology.period}`) : ''],
            [t('methodology.context.label'), methodology.context],
            [t('methodology.relationship.label'), methodology.relationship],
          ],
        },
      }],
    },
  ]
}
