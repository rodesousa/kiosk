import { forwardRef, useImperativeHandle } from 'react'
import { Table, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useTranslation } from 'react-i18next'
import { SectionCard } from './section-card'
import type { GlobalValues } from '../types'

const ROWS: { key: keyof GlobalValues; labelKey: string; suffix?: string }[] = [
  { key: 'headcount', labelKey: 'global.headcount' },
  { key: 'average', labelKey: 'global.average' },
  { key: 'left', labelKey: 'global.left' },
  { key: 'turnover', labelKey: 'global.turnover', suffix: ' (%)' },
]

export interface GlobalSectionRef {
  getValues: () => GlobalValues
}

interface GlobalSectionProps {
  initialData?: GlobalValues
}

export const GlobalSection = forwardRef<GlobalSectionRef, GlobalSectionProps>(
  function GlobalSection({ initialData }, ref) {
    const { t } = useTranslation()
    const form = useForm<GlobalValues>({
      initialValues: initialData ?? { headcount: 0, average: 0, left: 0, turnover: 0 },
    })

    useImperativeHandle(ref, () => ({
      getValues: () => form.values,
    }))

    return (
      <SectionCard titleKey="global.title" defaultOpened>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t('global.question')}</Table.Th>
              <Table.Th>{t('global.value')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {ROWS.map(({ key, labelKey, suffix }) => (
              <Table.Tr key={key}>
                <Table.Td>{t(labelKey)}{suffix}</Table.Td>
                <Table.Td>
                  <TextInput
                    type="number"
                    min={0}
                    value={String(form.values[key])}
                    onChange={(e) => form.setFieldValue(key, Number(e.target.value) || 0)}
                  />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </SectionCard>
    )
  },
)
