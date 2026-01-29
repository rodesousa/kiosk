import { ENVOI_FIELDS } from "./entities/envoi"
import { EMETTEUR_FIELDS } from "./entities/emetteur"
import { ETABLISSEMENT_FIELDS } from "./entities/etablissement"
import { INDIVIDU_FIELDS } from "./entities/individu"
import { CONTRAT_FIELDS } from "./entities/contrat"
import { VERSEMENT_FIELDS } from "./entities/versement"
import { REMUNERATION_FIELDS } from "./entities/remuneration"
import { DECLARATION_FIELDS } from "./entities/declaration"
import { CONTACT_EMETTEUR_FIELDS } from "./entities/contact-emetteur"
import { ENTREPRISE_FIELDS } from "./entities/entreprise"
import type { Etablissement } from "./entities/etablissement"
import type { Contrat } from "./entities/contrat"
import type { Versement } from "./entities/versement"
import type { Remuneration } from "./entities/remuneration"
import { type DSNIndividu, type DSNDocument } from "../type/dsn"

export const DSN_BLOCK_CODES = {
  ENVOI: "S10.G00.00",
  EMETTEUR: "S10.G00.01",
  CONTACT_EMETTEUR: "S10.G00.02",
  DECLARATION: "S20.G00.05",
  ENTREPRISE: "S21.G00.06",
  ETABLISSEMENT: "S21.G00.11",
  INDIVIDU: "S21.G00.30",
  CONTRAT: "S21.G00.40",
  VERSEMENT: "S21.G00.50",
  REMUNERATION: "S21.G00.51",
}

type DSNLine = {
  code: string
  value: string
}

interface CurrentState {
  etablissement: Etablissement | null
  individu: DSNIndividu | null
  contrat: Contrat | null
  versement: Versement | null
  remuneration: Remuneration | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapFields(target: any, fields: Record<string, string>, fieldNum: string, value: string): void {
  const key = fields[fieldNum]
  if (key) {
    target[key] = value
  }
}

export function parseDSN(content: string): DSNDocument {
  const dsn: DSNDocument = {
    envoi: {},
    emetteur: {},
    declaration: {},
    entreprise: {},
    contact: {},
    etablissement: {},
    individus: [],
  }

  const current_state: CurrentState = {
    etablissement: null,
    individu: null,
    contrat: null,
    versement: null,
    remuneration: null,
  }

  const lines = content.split("\n")
  for (const line of lines) {
    const parsed = parseLine(line)
    if (!parsed) continue
    const { code, value } = parsed
    const fieldNum = getFieldNumber(code)

    if (isBlockStart(code, value)) {
      parseBloc(dsn, code, current_state)
    } else {
      const block = getBlockPrefix(code)
      switch (block) {
        case DSN_BLOCK_CODES.ENVOI:
          mapFields(dsn.envoi, ENVOI_FIELDS, fieldNum, value)
          break
        case DSN_BLOCK_CODES.EMETTEUR:
          mapFields(dsn.emetteur, EMETTEUR_FIELDS, fieldNum, value)
          break
        case DSN_BLOCK_CODES.CONTACT_EMETTEUR:
          mapFields(dsn.contact, CONTACT_EMETTEUR_FIELDS, fieldNum, value)
          break
        case DSN_BLOCK_CODES.DECLARATION:
          mapFields(dsn.declaration, DECLARATION_FIELDS, fieldNum, value)
          break
        case DSN_BLOCK_CODES.ENTREPRISE:
          mapFields(dsn.entreprise, ENTREPRISE_FIELDS, fieldNum, value)
          break
        case DSN_BLOCK_CODES.ETABLISSEMENT:
          if (current_state.etablissement)
            mapFields(current_state.etablissement, ETABLISSEMENT_FIELDS, fieldNum, value)
          break
        case DSN_BLOCK_CODES.INDIVIDU:
          if (current_state.individu)
            mapFields(current_state.individu.individu, INDIVIDU_FIELDS, fieldNum, value)
          break
        case DSN_BLOCK_CODES.CONTRAT:
          if (current_state.contrat)
            mapFields(current_state.contrat, CONTRAT_FIELDS, fieldNum, value)
          break
        case DSN_BLOCK_CODES.VERSEMENT:
          if (current_state.versement)
            mapFields(current_state.versement, VERSEMENT_FIELDS, fieldNum, value)
          break
        case DSN_BLOCK_CODES.REMUNERATION:
          if (current_state.remuneration)
            mapFields(current_state.remuneration, REMUNERATION_FIELDS, fieldNum, value)
          break
      }
    }
  }

  return dsn
}

function parseBloc(dsn: DSNDocument, code: string, current_state: CurrentState) {
  switch (code) {
    case DSN_BLOCK_CODES.ETABLISSEMENT:
      current_state.etablissement = {}
      current_state.individu = null
      current_state.contrat = null
      current_state.versement = null
      current_state.remuneration = null
      dsn.etablissement = current_state.etablissement
      break
    case DSN_BLOCK_CODES.INDIVIDU:
      current_state.individu = {
        individu: {},
        contrat: {},
        versement: {},
        remuneration: {},
      }
      dsn.individus.push(current_state.individu)
      current_state.contrat = null
      current_state.versement = null
      current_state.remuneration = null
      break
    case DSN_BLOCK_CODES.CONTRAT:
      current_state.contrat = {}
      if (current_state.individu) {
        current_state.individu.contrat = current_state.contrat
      }
      current_state.versement = null
      current_state.remuneration = null
      break
    case DSN_BLOCK_CODES.VERSEMENT:
      current_state.versement = {}
      if (current_state.individu) {
        current_state.individu.versement = current_state.versement
      }
      break
    case DSN_BLOCK_CODES.REMUNERATION:
      current_state.remuneration = {}
      if (current_state.individu) {
        current_state.individu.remuneration = current_state.remuneration
      }
      break
  }
}

function parseLine(line: string): DSNLine | null {
  const trimmed = line.trim()
  if (!trimmed) return null

  const match = trimmed.match(/^([^,]+),'([^']*)'$/)
  if (!match) return null

  return {
    code: match[1],
    value: match[2],
  }
}

function getBlockPrefix(code: string): string {
  const parts = code.split(".")
  if (parts.length === 3) return code
  return parts.slice(0, 3).join(".")
}

function getFieldNumber(code: string): string {
  const parts = code.split(".")
  return parts[parts.length - 1]
}

function isBlockStart(code: string, value: string): boolean {
  return value === "" && code.split(".").length === 3
}
