import { Card, Box, Title, Group, ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

interface SectionCardProps {
  titleKey: string
  children: React.ReactNode
  defaultOpened?: boolean
}

export function SectionCard({ titleKey, children, defaultOpened = false }: SectionCardProps) {
  const { t } = useTranslation()
  const [opened, { toggle }] = useDisclosure(defaultOpened)

  return (
    <Card withBorder radius="md" padding={0}>
      <Box
        bg="gray.0"
        px="lg"
        py="md"
        style={{ borderBottom: opened ? '1px solid var(--mantine-color-gray-3)' : undefined, cursor: 'pointer' }}
        onClick={toggle}
      >
        <Group gap="xs">
          <ActionIcon variant="subtle" size="sm" aria-label="Toggle section">
            {opened ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
          </ActionIcon>
          <Title order={3}>{t(titleKey)}</Title>
        </Group>
      </Box>
      {opened && children}
    </Card>
  )
}
