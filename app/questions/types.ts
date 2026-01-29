export type QuestionContentType = "table" | "number" | "text" | "enum"

export interface Question {
  id: string
  labelFr: string
  labelEn: string
  content: QuestionContentType
  unit?: string
  enumFr?: string[]
  enumEn?: string[]
}

export interface QuestionGroup {
  id: string
  labelFr: string
  labelEn: string
  questions: Question[]
}

export type TableValue = Record<string, number> | Record<string, { male: number; female: number }>

export interface Answer {
  questionId: string
  value: number | string | TableValue | null
  source: "dsn" | "manual"
}

export interface Employee {
  sexe: string
  code_pays: string
  code_postal: string
  nature: string
  code_categorie_service: string
  date_fin_previsionnelle: string | null
}

export type AnswerMap = Record<string, Answer>
