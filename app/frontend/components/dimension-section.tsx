import { forwardRef, useImperativeHandle } from 'react'
import { Stack, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useTranslation } from 'react-i18next'
import { EditTable, type Column } from './edit-table'
import { SectionCard } from './section-card'
import type { TableData } from '../types'

export interface DimensionValues {
  headcount: TableData
  average: TableData
}

export interface DimensionSectionRef {
  getValues: () => DimensionValues
}

interface DimensionSectionProps {
  i18nPrefix: string
  columns: Column[]
  initialData?: DimensionValues
}

/**
 * @example
 * const ref = useRef<DimensionSectionRef>(null)
 * <DimensionSection
 *   ref={ref}
 *   i18nPrefix="country"
 *   columns={[{ key: "count", headerKey: "country.count" }]}
 *   initialData={{ headcount: { "France": { count: 80 } }, average: { "France": { count: 80 } } }}
 * />
 * // At export time:
 * ref.current.getValues() // → { headcount: {...}, average: {...} }
 */
export const DimensionSection = forwardRef<DimensionSectionRef, DimensionSectionProps>(
  function DimensionSection({ i18nPrefix, columns, initialData }, ref) {
    const { t } = useTranslation()
    const form = useForm<DimensionValues>({
      initialValues: initialData ?? { headcount: {}, average: {} },
    })

    useImperativeHandle(ref, () => ({
      getValues: () => form.values,
    }))

    return (
      <SectionCard titleKey={`${i18nPrefix}.title`}>
        <Stack gap="md" p="md">
          <Title order={5}>{t(`${i18nPrefix}.headcount`)}</Title>
          <EditTable
            data={form.values.headcount}
            labelHeaderKey={`${i18nPrefix}.label`}
            columns={columns}
            onChange={(row, col, val) => form.setFieldValue(`headcount.${row}.${col}`, val)}
          />

          <Title order={5}>{t(`${i18nPrefix}.average`)}</Title>
          <EditTable
            data={form.values.average}
            labelHeaderKey={`${i18nPrefix}.label`}
            columns={columns}
            onChange={(row, col, val) => form.setFieldValue(`average.${row}.${col}`, val)}
          />
        </Stack>
      </SectionCard>
    )
  },
)
