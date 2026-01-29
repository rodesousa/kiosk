import { forwardRef, useImperativeHandle } from 'react'
import { Select, Textarea, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useTranslation } from 'react-i18next'
import { SectionCard } from './section-card'
import type { MethodologyValues } from '../types'

export interface MethodologySectionRef {
  getValues: () => MethodologyValues
}

export const MethodologySection = forwardRef<MethodologySectionRef>(
  function MethodologySection(_props, ref) {
    const { t } = useTranslation()
    const form = useForm<MethodologyValues>({
      initialValues: { unit: 'headcount', period: 'end', context: '', relationship: '' },
    })

    useImperativeHandle(ref, () => ({
      getValues: () => form.values,
    }))

    const unitOptions = [
      { value: 'headcount', label: t('methodology.unit.headcount') },
      { value: 'fte', label: t('methodology.unit.fte') },
    ]

    const periodOptions = [
      { value: 'end', label: t('methodology.period.end') },
      { value: 'average', label: t('methodology.period.average') },
      { value: 'other', label: t('methodology.period.other') },
    ]

    return (
      <SectionCard titleKey="methodology.title">
        <Stack gap="md" p="md">
          <Select
            label={t('methodology.unit.label')}
            data={unitOptions}
            value={form.values.unit}
            onChange={(val) => form.setFieldValue('unit', val ?? '')}
          />
          <Select
            label={t('methodology.period.label')}
            data={periodOptions}
            value={form.values.period}
            onChange={(val) => form.setFieldValue('period', val ?? '')}
          />
          <Textarea
            label={t('methodology.context.label')}
            rows={4}
            value={form.values.context}
            onChange={(e) => form.setFieldValue('context', e.target.value)}
          />
          <Textarea
            label={t('methodology.relationship.label')}
            rows={4}
            value={form.values.relationship}
            onChange={(e) => form.setFieldValue('relationship', e.target.value)}
          />
        </Stack>
      </SectionCard>
    )
  },
)
