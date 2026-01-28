import { describe, it, expect } from 'vitest'
import { IndividuRules } from './individu'

describe('IndividuRules', () => {
  describe('sexe', () => {
    it('accepts 01 (male)', () => {
      expect(IndividuRules.sexe("01")).toBeNull()
    })

    it('accepts 02 (female)', () => {
      expect(IndividuRules.sexe("02")).toBeNull()
    })

    it('rejects invalid value', () => {
      expect(IndividuRules.sexe("03")).not.toBeNull()
    })

    it('rejects empty string', () => {
      expect(IndividuRules.sexe("")).not.toBeNull()
    })
  })

  describe('code_pays', () => {
    it('accepts FR', () => {
      expect(IndividuRules.code_pays("FR")).toBeNull()
    })

    it('accepts BE', () => {
      expect(IndividuRules.code_pays("BE")).toBeNull()
    })

    it('rejects lowercase', () => {
      expect(IndividuRules.code_pays("fr")).not.toBeNull()
    })

    it('rejects 3 letters', () => {
      expect(IndividuRules.code_pays("FRA")).not.toBeNull()
    })

    it('rejects 1 letter', () => {
      expect(IndividuRules.code_pays("F")).not.toBeNull()
    })
  })

  describe('code_postal', () => {
    it('accepts digits', () => {
      expect(IndividuRules.code_postal("75001")).toBeNull()
    })

    it('accepts empty string', () => {
      expect(IndividuRules.code_postal("")).toBeNull()
    })

    it('rejects letters', () => {
      expect(IndividuRules.code_postal("75ABC")).not.toBeNull()
    })
  })
})
