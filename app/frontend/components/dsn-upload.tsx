import { Group, Text } from '@mantine/core';
import { IconUpload, IconFileText, IconX } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';
import { useTranslation } from 'react-i18next';
import { readFileAsync } from '../file-reader'
import { parseDSN } from '../../dsn/parser'
import type { DSNDocument } from '../../type/dsn'

interface Props {
  onParsed: (dsn: DSNDocument) => void
}

export function DSNUpload({ onParsed }: Props) {
  const { t } = useTranslation()

  const handleDrop = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const content = await readFileAsync(file)
    const dsn = parseDSN(content)
    onParsed(dsn)
  }


  return (
    <Dropzone
      onDrop={handleDrop}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 * 1024}
      accept={{ 'text/plain': ['.txt'] }}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFileText size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            {t('upload.drag')}
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            {t('upload.hint')}
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
