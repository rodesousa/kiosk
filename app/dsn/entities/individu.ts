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

// DSN block S21.G00.30 - Individu
export const INDIVIDU_FIELDS: Record<string, keyof Individu> = {
  "001": "indentifiant",
  "002": "nom_famille",
  "003": "nom_usage",
  "004": "prenoms",
  "005": "sexe",
  "006": "date_naissance",
  "007": "lieu_naissance",
  "008": "voie",
  "009": "code_postal",
  "010": "localite",
  "011": "code_pays",
  "012": "code_distribution",
  "013": "codification_ue",
  "014": "departement_naissance",
  "015": "pays_naissance",
  "016": "complement_construction",
  "017": "complement_voie",
  "018": "email",
  "019": "matricule",
  "020": "ntt",
  "022": "status_etranger",
  "023": "cumul_emploi_retraite",
  "024": "niveau_formation_plus_eleve",
  "025": "niveau_diplome_prepare",
  "029": "libelle_pays_naiss",
}
