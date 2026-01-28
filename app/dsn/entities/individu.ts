export interface Individu {
  indentifiant?: string
  nom_famille?: string
  nom_usage?: string
  prenoms?: string
  sexe?: string
  date_naissance?: string
  lieu_naissance?: string
  voie?: string
  code_postal?: string
  localite?: string
  code_pays?: string
  code_distribution?: string
  codification_ue?: string
  departement_naissance?: string
  pays_naissance?: string
  complement_construction?: string
  complement_voie?: string
  email?: string
  matricule?: string
  ntt?: string
  status_etranger?: string
  cumul_emploi_retraite?: string
  niveau_formation_plus_eleve?: string
  niveau_diplome_prepare?: string
  libelle_pays_naiss?: string
}

/**
 * Validation rules for Individu fields.
 * Compatible with Mantine form
 */
export const IndividuRules = {
  sexe: (v: string) => ["01", "02"].includes(v) ? null : "Must be 01 or 02",
  code_pays: (v: string) => /^[A-Z]{2}$/.test(v) ? null : "Must be 2 uppercase letters",
  code_postal: (v: string) => !v || /^\d+$/.test(v) ? null : "Must be digits only",
}
