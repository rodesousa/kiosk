import { type Entreprise } from "./entities/entreprise"
import { type Envoi } from "./entities/envoi"
import { type Emetteur } from "./entities/emetteur"
import { type Etablissement } from "./entities/etablissement"
import { type Individu } from "./entities/individu"
import { type Contrat } from "./entities/contrat"
import { type Versement } from "./entities/versement"
import { type Remuneration } from "./entities/remuneration"
import { type Declaration } from "./entities/declaration"
import { type ContactEmetteur } from "./entities/contact-emetteur"
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
      switch (getBlockPrefix(code)) {
        case DSN_BLOCK_CODES.ENTREPRISE:
          mapEntrepriseField(dsn.entreprise, fieldNum, value)
          break
        case DSN_BLOCK_CODES.ENVOI:
          mapEnvoiField(dsn.envoi, fieldNum, value)
          break
        case DSN_BLOCK_CODES.EMETTEUR:
          mapEmetteurField(dsn.emetteur, fieldNum, value)
          break
        case DSN_BLOCK_CODES.ETABLISSEMENT:
          if (current_state.etablissement) {
            mapEtablissementField(current_state.etablissement, fieldNum, value)
          }
          break
        case DSN_BLOCK_CODES.CONTRAT:
          if (current_state.contrat) {
            mapContratField(current_state.contrat, fieldNum, value)
          }
          break
        case DSN_BLOCK_CODES.INDIVIDU:
          if (current_state.individu) {
            mapIndividuField(current_state.individu.individu, fieldNum, value)
          }
          break
        case DSN_BLOCK_CODES.DECLARATION:
          mapDeclarationField(dsn.declaration, fieldNum, value)
          break
        case DSN_BLOCK_CODES.CONTACT_EMETTEUR:
          mapContactField(dsn.contact, fieldNum, value)
          break
        case DSN_BLOCK_CODES.VERSEMENT:
          if (current_state.versement) {
            mapVersementField(current_state.versement, fieldNum, value)
          }
          break
        case DSN_BLOCK_CODES.REMUNERATION:
          if (current_state.remuneration) {
            mapRemunerationField(current_state.remuneration, fieldNum, value)
          }
          break
        default:
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
    default:
      break
  }
}

function mapDeclarationField(declaration: Declaration, field_num: string, value: string): void {
  switch (field_num) {
    case "001": declaration.nature = value; break
    case "002": declaration.type = value; break
    case "003": declaration.fraction = value; break
    case "004": declaration.ordre = value; break
    case "005": declaration.mois = value; break
    case "006": declaration.identifiant_annulation = value; break
    case "007": declaration.date_fichier = value; break
    case "008": declaration.champ = value; break
    case "009": declaration.identifiant_metier = value; break
    case "010": declaration.devise_declaration = value; break
    case "011": declaration.nature_evenement = value; break
    case "012": declaration.dernier_siret = value; break
    case "013": declaration.nature_dsn_substitution = value; break
    default: break
  }
}

function mapContactField(contact: ContactEmetteur, field_num: string, value: string): void {
  switch (field_num) {
    case "001": contact.civilite = value; break
    case "002": contact.nom = value; break
    case "004": contact.email = value; break
    case "005": contact.tel = value; break
    case "006": contact.fax = value; break
    default: break
  }
}

function mapEntrepriseField(entreprise: Entreprise, field_num: string, value: string): void {
  switch (field_num) {
    case "001": entreprise.siren = value; break
    case "002": entreprise.nic = value; break
    case "003": entreprise.apen = value; break
    case "004": entreprise.voie = value; break
    case "005": entreprise.code_postal = value; break
    case "006": entreprise.localite = value; break
    case "007": entreprise.code_distribution = value; break
    case "008": entreprise.effectif_moyen = value; break
    case "009": entreprise.code_pays = value; break
    case "010": entreprise.code_distribution = value; break
    case "011": entreprise.implantation_entreprise = value; break
    case "012": entreprise.code_convention_collective = value; break
    default: break
  }
}

function mapEnvoiField(envoi: Envoi, field_num: string, value: string) {
  switch (field_num) {
    case "001": envoi.nom_logiciel = value; break
    case "002": envoi.nom_editeur = value; break
    case "003": envoi.logiciel_version = value; break
    case "004": envoi.code_conformite = value; break
    case "005": envoi.code_envoi = value; break
    case "006": envoi.norme_version = value; break
    case "007": envoi.point_depot = value; break
    case "008": envoi.type_envoi = value; break
    default: break
  }
}

function mapEmetteurField(emetteur: Emetteur, field_num: string, value: string): void {
  switch (field_num) {
    case "001": emetteur.siren = value; break
    case "002": emetteur.nic = value; break
    case "003": emetteur.raison_sociale = value; break
    case "004": emetteur.adresse = value; break
    case "005": emetteur.code_postal = value; break
    case "006": emetteur.commune = value; break
    case "007": emetteur.code_pays = value; break
    case "008": emetteur.code_distribution = value; break
    case "009": emetteur.complement_localisation = value; break
    case "010": emetteur.code_distribution = value; break
  }
}

function mapEtablissementField(etablissement: Etablissement, field_num: string, value: string): void {
  switch (field_num) {
    case "001": etablissement.nic = value; break
    case "002": etablissement.apet = value; break
    case "003": etablissement.voie = value; break
    case "004": etablissement.code_postal = value; break
    case "005": etablissement.localite = value; break
    case "006": etablissement.complement_construction = value; break
    case "007": etablissement.complement_voie = value; break
    case "008": etablissement.effectif_fin_periode = value; break
    case "009": etablissement.remuneration_expatries = value; break
    case "015": etablissement.code_pays = value; break
    case "016": etablissement.code_distribution = value; break
    case "017": etablissement.nature_juridique_employeur = value; break
    case "019": etablissement.date_effet = value; break
    case "020": etablissement.date_sortie = value; break
    case "022": etablissement.code_convention_collective = value; break
    case "023": etablissement.opco = value; break
    case "024": etablissement.demande_sortie_dsn = value; break
  }
}

export function mapIndividuField(individu: Individu, field_num: string, value: string): void {
  switch (field_num) {
    case "001": individu.indentifiant = value; break
    case "002": individu.nom_famille = value; break
    case "003": individu.nom_usage = value; break
    case "004": individu.prenoms = value; break
    case "005": individu.sexe = value; break
    case "006": individu.date_naissance = value; break
    case "007": individu.lieu_naissance = value; break
    case "008": individu.voie = value; break
    case "009": individu.code_postal = value; break
    case "010": individu.localite = value; break
    case "011": individu.code_pays = value; break
    case "012": individu.code_distribution = value; break
    case "013": individu.codification_ue = value; break
    case "014": individu.departement_naissance = value; break
    case "015": individu.pays_naissance = value; break
    case "016": individu.complement_construction = value; break
    case "017": individu.complement_voie = value; break
    case "018": individu.email = value; break
    case "019": individu.matricule = value; break
    case "020": individu.ntt = value; break
    case "022": individu.status_etranger = value; break
    case "023": individu.cumul_emploi_retraite = value; break
    case "024": individu.niveau_formation_plus_eleve = value; break
    case "025": individu.niveau_diplome_prepare = value; break
    case "029": individu.libelle_pays_naiss = value; break
  }
}

export function mapContratField(contrat: Contrat, field_num: string, value: string): void {
  switch (field_num) {
    case "001": contrat.date_debut = value; break
    case "002": contrat.statut_conventionnel = value; break
    case "003": contrat.statut_rc = value; break
    case "004": contrat.pcs_ese = value; break
    case "005": contrat.complement_pcs_ese = value; break
    case "006": contrat.libelle_emploi = value; break
    case "007": contrat.nature = value; break
    case "008": contrat.dispositif_politique = value; break
    case "009": contrat.numero = value; break
    case "010": contrat.date_fin_previsionnelle = value; break
    case "011": contrat.unite_mesure = value; break
    case "012": contrat.quotite_categorie = value; break
    case "013": contrat.quotite = value; break
    case "014": contrat.modalite_temps = value; break
    case "016": contrat.complement_base = value; break
    case "017": contrat.ccn = value; break
    case "018": contrat.regime_maladie = value; break
    case "019": contrat.lieu_travail = value; break
    case "020": contrat.regime_vieillesse = value; break
    case "021": contrat.motif_recours = value; break
    case "022": contrat.code_caisse_conges_payes = value; break
    case "023": contrat.taux_fraisprofessionnels = value; break
    case "024": contrat.travailleur_etranger = value; break
    case "025": contrat.motif_exclusion_dsn = value; break
    case "026": contrat.status_emploi = value; break
    case "027": contrat.code_affectation_ac = value; break
    case "028": contrat.numero_interne = value; break
    case "029": contrat.type_gestion_ac = value; break
    case "030": contrat.date_adhesion = value; break
    case "031": contrat.date_denonciation = value; break
    case "032": contrat.date_convention_gestion = value; break
    case "033": contrat.numero_convention_gestion = value; break
    case "035": contrat.code_gestionnaire_risque = value; break
    case "036": contrat.code_emplois_multiples = value; break
    case "037": contrat.code_employeurs_multiples = value; break
    case "039": contrat.code_regime_risque_accident_travail = value; break
    case "040": contrat.code_risque_accident_travail = value; break
    case "041": contrat.positionnement_convention_collective = value; break
    case "042": contrat.code_statut_categoriel_apecita = value; break
    case "043": contrat.taux_accident_travail = value; break
    case "044": contrat.temps_partiel_cotisant_temps_plein = value; break
    case "045": contrat.remuneration_pourboire = value; break
    case "046": contrat.siret_etablissement_utilisateur = value; break
    case "048": contrat.numero_label = value; break
    case "049": contrat.numero_licence_entrepreneur_spectacle = value; break
    case "050": contrat.numero_objet_spectacle = value; break
    case "051": contrat.statut_organisateur_spectacle = value; break
    case "052": contrat.fp_code_complement_pcs_es = value; break
    case "053": contrat.nature_poste = value; break
    case "054": contrat.fp_quotite_travail_temps_complet = value; break
    case "055": contrat.taux_temps_travail_partiel = value; break
    case "056": contrat.code_categorie_service = value; break
    case "057": contrat.fp_indice_brut = value; break
    case "058": contrat.fp_indice_majore = value; break
    case "059": contrat.fpnbi = value; break
    case "060": contrat.fp_indice_brut_origine = value; break
    case "061": contrat.fp_indice_brut_cotisation_emploi_superieur = value; break
    case "062": contrat.fp_ancien_employeur_public = value; break
    case "063": contrat.fp_indice_brut_origine_ancien_salarie_employeur_public = value; break
    case "064": contrat.fp_indice_brut_origine_spp = value; break
    case "065": contrat.fp_maintien_traitement_origine_contractuel_titulaire = value; break
    case "066": contrat.fp_type_detachement = value; break
    case "067": contrat.genre_navigation = value; break
    case "068": contrat.taux_service_actif = value; break
    case "069": contrat.niveau_rx = value; break
    case "070": contrat.echelon = value; break
    case "071": contrat.coefficient_hierarchique = value; break
    case "072": contrat.statut_boeth = value; break
    case "073": contrat.complement_dispositif_politique = value; break
    case "074": contrat.case_mise_disposition_externe = value; break
    case "075": contrat.categorie_classement_finale = value; break
    case "076": contrat.contrat_engagement_maritime = value; break
    case "077": contrat.college_cnieg = value; break
    case "078": contrat.forme_amenagement_temps_partiel = value; break
    case "079": contrat.grade = value; break
    case "080": contrat.cti = value; break
    case "081": contrat.finess_geo = value; break
  }
}

function mapVersementField(versement: Versement, field_num: string, value: string): void {
  switch (field_num) {
    case "001": versement.date = value; break
    case "002": versement.net_fiscal = value; break
    case "003": versement.numero = value; break
    case "004": versement.net_verse = value; break
    case "006": versement.taux_pas = value; break
    case "007": versement.type_taux_pas = value; break
    case "008": versement.id_taux_pas = value; break
    case "009": versement.montant_pas = value; break
    case "011": versement.part_non_imposable_revenu = value; break
    case "012": versement.montant_abattement_base_fiscale_non_deduit_rnf = value; break
    case "013": versement.montant_soumis_pas = value; break
    case "020": versement.mois_dsn_rattchmt_fctu = value; break
  }
}

function mapRemunerationField(remuneration: Remuneration, field_num: string, value: string): void {
  switch (field_num) {
    case "001": remuneration.date_debut = value; break
    case "002": remuneration.date_fin = value; break
    case "010": remuneration.numero_contrat = value; break
    case "011": remuneration.type = value; break
    case "012": remuneration.nombre_heures = value; break
    case "013": remuneration.montant = value; break
    case "014": remuneration.fp_taux_remunerationdelapositionstatutaire = value; break
    case "015": remuneration.taux_conduite_centrale_nucleaire = value; break
    case "016": remuneration.taux_majoration = value; break
    case "019": remuneration.taux_remuneration_cotisee = value; break
    case "020": remuneration.taux_majoration_exapprenti = value; break
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
