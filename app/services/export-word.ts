import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  HeadingLevel,
  WidthType,
  ShadingType,
  BorderStyle,
} from 'docx'
import FileSaver from 'file-saver'

// --- Public types ---

export interface ExportTable {
  headers: string[]
  rows: string[][]
}

export interface ExportSection {
  title: string
  tables: { subtitle?: string; table: ExportTable }[]
}

// --- Public API ---

export async function exportToWord(title: string, sections: ExportSection[]): Promise<void> {
  const content: (Paragraph | Table)[] = []

  content.push(createTitle(title))
  content.push(createDate())

  for (const section of sections) {
    content.push(createHeading(section.title))

    for (const { subtitle, table } of section.tables) {
      if (subtitle) {
        content.push(createSubHeading(subtitle))
      }
      if (table.rows.length > 0) {
        content.push(createTable(table.headers, table.rows))
      }
    }
  }

  const doc = new Document({
    sections: [{ properties: {}, children: content }],
  })

  const blob = await Packer.toBlob(doc)
  const filename = `report-${new Date().toISOString().split('T')[0]}.docx`
    // @ts-ignore - file-saver CommonJS compatibility
    ; (FileSaver.saveAs || FileSaver)(blob, filename)
}

// --- Internal helpers ---

const BORDER_STYLE = {
  style: BorderStyle.SINGLE,
  size: 1,
  color: 'CCCCCC',
}

const TABLE_BORDERS = {
  top: BORDER_STYLE,
  bottom: BORDER_STYLE,
  left: BORDER_STYLE,
  right: BORDER_STYLE,
}

function createTitle(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.TITLE,
    children: [new TextRun({ text, bold: true })],
  })
}

function createDate(): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `Generated: ${new Date().toLocaleDateString('fr-FR')}` })],
    spacing: { after: 400 },
  })
}

function createHeading(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true })],
    spacing: { before: 400, after: 200 },
  })
}

function createSubHeading(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text })],
    spacing: { before: 200, after: 100 },
  })
}

function createTableCell(
  text: string,
  options?: { header?: boolean }
): TableCell {
  return new TableCell({
    shading: options?.header ? { fill: 'E8E8E8', type: ShadingType.CLEAR } : undefined,
    borders: TABLE_BORDERS,
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: options?.header })],
      }),
    ],
  })
}

function createTable(headers: string[], rows: string[][]): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: headers.map(h => createTableCell(h, { header: true })),
      }),
      ...rows.map(row =>
        new TableRow({
          children: row.map(cell => createTableCell(cell)),
        })
      ),
    ],
  })
}
