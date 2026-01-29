import { useRef, useState } from 'react'
import { Container, Stack, Title, Group, SegmentedControl, Button } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { DSNUpload } from '../components/dsn-upload'
import type { Column } from '../components/edit-table'
import { GlobalSection, type GlobalSectionRef } from '../components/global-section'
import { DimensionSection, type DimensionSectionRef, type DimensionValues } from '../components/dimension-section'
import { MethodologySection, type MethodologySectionRef } from '../components/methodology-section'
import type { GlobalValues, TableData } from '../types'
import type { DSNDocument } from '../../type/dsn'
import {
  mapDsnToEmployees,
  getActiveEmployees,
  getLeftEmployees,
  calculateEmployeeTurnover,
  countEmployeesByCountry,
  countEmployeesByContractAndGender,
  countEmployeesByRegion,
  countEmployeesByCategory,
} from '../../questions/mapper'
import { COUNTRY_LABELS } from '../../dsn/country'
import { CONTRAT_NATURE_LABELS } from '../../dsn/contrat-nature'
import { CATEGORIE_SERVICE_LABELS } from '../../dsn/categorie-service'
import { exportToWord } from '../../services/export-word'
import { buildExportSections } from '../../services/build-export-sections'

const COUNTRY_COLUMNS: Column[] = [{ key: 'count', headerKey: 'country.count' }]
const REGION_COLUMNS: Column[] = [{ key: 'count', headerKey: 'region.count' }]
const CATEGORY_COLUMNS: Column[] = [{ key: 'count', headerKey: 'category.count' }]
const CONTRACT_COLUMNS: Column[] = [
  { key: 'male', headerKey: 'contract.male' },
  { key: 'female', headerKey: 'contract.female' },
]

const toTableData = (data: Record<string, number>, colKey: string): TableData =>
  Object.fromEntries(Object.entries(data).map(([k, v]) => [k, { [colKey]: v }]))

const toGenderTableData = (data: Record<string, { male: number; female: number }>): TableData =>
  Object.fromEntries(Object.entries(data).map(([k, v]) => [k, { ...v }]))

interface DsnData {
  global: GlobalValues
  country: DimensionValues
  region: DimensionValues
  category: DimensionValues
  contract: DimensionValues
}

export default function Home() {
  const { t, i18n } = useTranslation()

  const [dsnData, setDsnData] = useState<DsnData | null>(null)
  const [importKey, setImportKey] = useState(0)

  const globalRef = useRef<GlobalSectionRef>(null)
  const countryRef = useRef<DimensionSectionRef>(null)
  const regionRef = useRef<DimensionSectionRef>(null)
  const categoryRef = useRef<DimensionSectionRef>(null)
  const contractRef = useRef<DimensionSectionRef>(null)
  const methodologyRef = useRef<MethodologySectionRef>(null)

  const handleDsnParsed = (doc: DSNDocument) => {
    const employees = mapDsnToEmployees(doc)
    const active = getActiveEmployees(employees)
    const left = getLeftEmployees(employees)

    const country = toTableData(countEmployeesByCountry(employees, COUNTRY_LABELS), 'count')
    const region = toTableData(countEmployeesByRegion(employees), 'count')
    const category = toTableData(countEmployeesByCategory(employees, CATEGORIE_SERVICE_LABELS), 'count')
    const contract = toGenderTableData(countEmployeesByContractAndGender(employees, CONTRAT_NATURE_LABELS))

    setDsnData({
      global: {
        headcount: active.length,
        average: active.length,
        left: left.length,
        turnover: calculateEmployeeTurnover(employees),
      },
      country: { headcount: country, average: country },
      region: { headcount: region, average: region },
      category: { headcount: category, average: category },
      contract: { headcount: contract, average: contract },
    })
    setImportKey((k) => k + 1)
  }

  const handleExport = () => {
    const sections = buildExportSections({
      t,
      global: globalRef.current!.getValues(),
      country: countryRef.current!.getValues(),
      region: regionRef.current!.getValues(),
      category: categoryRef.current!.getValues(),
      contract: contractRef.current!.getValues(),
      methodology: methodologyRef.current!.getValues(),
    })
    exportToWord(t('title'), sections)
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <Title>{t('title')}</Title>
          <Group>
            <Button onClick={handleExport} disabled={!dsnData}>
              {t('export')}
            </Button>
            <SegmentedControl
              value={i18n.language}
              onChange={(lang) => i18n.changeLanguage(lang)}
              data={[
                { label: 'FR', value: 'fr' },
                { label: 'EN', value: 'en' },
              ]}
            />
          </Group>
        </Group>

        <DSNUpload onParsed={handleDsnParsed} />

        <GlobalSection key={`global-${importKey}`} ref={globalRef} initialData={dsnData?.global} />

        <DimensionSection key={`country-${importKey}`} ref={countryRef} i18nPrefix="country" columns={COUNTRY_COLUMNS} initialData={dsnData?.country} />
        <DimensionSection key={`contract-${importKey}`} ref={contractRef} i18nPrefix="contract" columns={CONTRACT_COLUMNS} initialData={dsnData?.contract} />
        <DimensionSection key={`region-${importKey}`} ref={regionRef} i18nPrefix="region" columns={REGION_COLUMNS} initialData={dsnData?.region} />
        <DimensionSection key={`category-${importKey}`} ref={categoryRef} i18nPrefix="category" columns={CATEGORY_COLUMNS} initialData={dsnData?.category} />

        <MethodologySection key={`methodology-${importKey}`} ref={methodologyRef} />
      </Stack>
    </Container>
  )
}
