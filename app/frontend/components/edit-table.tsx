import { Table, Text, TextInput } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export interface Column {
  key: string
  headerKey: string
}

interface EditTableProps {
  data: Record<string, Record<string, number>>
  labelHeaderKey: string
  columns: Column[]
  onChange: (rowKey: string, colKey: string, value: number) => void
}

/**
 * Each row corresponds to an entry in `data` (key = row label).
 * Each column renders a numeric TextInput.
 * Shows an i18n placeholder when `data` is empty.
 *
 * @example
 * <EditTable
 *   data={{ "France": { count: 80 }, "Germany": { count: 20 } }}
 *   labelHeaderKey="country.label"
 *   columns={[{ key: "count", headerKey: "country.count" }]}
 *   onChange={(row, col, val) => console.log(row, col, val)}
 * />
 */
export function EditTable({ data, labelHeaderKey, columns, onChange }: EditTableProps) {
  const { t } = useTranslation()
  const entries = Object.entries(data)

  if (entries.length === 0) {
    return <Text c="dimmed" size="sm">{t('upload.drag')}</Text>
  }

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{t(labelHeaderKey)}</Table.Th>
          {columns.map(col => (
            <Table.Th key={col.key}>{t(col.headerKey)}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {entries.map(([rowKey, row]) => (
          <Table.Tr key={rowKey}>
            <Table.Td>{rowKey}</Table.Td>
            {columns.map(col => (
              <Table.Td key={col.key}>
                <TextInput
                  type="number"
                  min={0}
                  value={String(row[col.key] ?? 0)}
                  onChange={(e) => onChange(rowKey, col.key, Number(e.target.value) || 0)}
                />
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
