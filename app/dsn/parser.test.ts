import { describe, it, expect } from "vitest"
import { type Entreprise, EntrepriseSchema } from "./entities/entreprise"
import * as Parser from "./parser"

import { type DSNDocument } from "../type/dns"

const entreprise_fixture = [
  { fieldNum: "001", value: "123456789", field: "siren" },
  { fieldNum: "002", value: "00012", field: "nic" },
  { fieldNum: "003", value: "6201Z", field: "apen" },
  { fieldNum: "004", value: "12 rue Test", field: "adresse" },
  { fieldNum: "005", value: "75001", field: "code_postal" },
  { fieldNum: "006", value: "Paris", field: "commune" },
]

describe("mapEntrepriseField", () => {
  it("should return valid Entreprise when fields are correct", () => {
    const entreprise: Entreprise = {}

    for (const { fieldNum, value } of entreprise_fixture) {
      Parser.mapEntrepriseField(entreprise, fieldNum, value)
    }

    const result = EntrepriseSchema.safeParse(entreprise)
    expect(result.success).toBe(true)

    expect(entreprise.siren).toBe("123456789")
    expect(entreprise.nic).toBe("00012")
    expect(entreprise.code_postal).toBe("75001")
  })

  it("should return invalid when field has wrong type", () => {
    const invalidData = {
      siren: 123456789,  // number au lieu de string
      nic: "00012",
    }

    const result = EntrepriseSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should parse DSN file and return DSNDocument', async () => {
    const dsn: DSNDocument = await Parser.parseFile("dsn.txt")
    const entreprise = {
      siren: '397096943',
      nic: '76756',
      apen: '1073i',
      voie: '105 Lake Driveport',
      code_postal: '44181',
      localite: 'San Bernardino',
      code_distribution: 'UA',
      effectif_moyen: 'intensely',
      code_pays: '6798',
      implantation_entreprise: 'you',
      code_convention_collective: '03'
    }
    const envoi = {
      nom_logiciel: 'Oysterhave',
      nom_editeur: 'KPMG',
      logiciel_version: '2.3.19',
      code_conformite: '8',
      code_envoi: '02',
      norme_version: 'P24V01',
      point_depot: '07',
      type_envoi: '16'
    }

    const emetteur = {
      siren: '790498192',
      nic: '69384',
      raison_sociale: 'Exversion',
      adresse: '3040 Unionstad',
      code_postal: '45649',
      commune: 'Fresno',
      code_pays: 'BF',
      code_distribution: 'weekly',
      complement_localisation: 'Sylvia Schmeler'
    }
    const etablissement = {
      nic: '92734',
      apet: '3629K',
      voie: '809 West Fallshire',
      code_postal: '29181',
      localite: 'Jersey',
      complement_construction: 'Ethan Jerde',
      complement_voie: 'army',
      effectif_fin_periode: '277',
      remuneration_expatries: '03',
      code_pays: 'IR',
      code_distribution: 'school',
      nature_juridique_employeur: '02',
      date_effet: '19090926',
      date_sortie: '20061216',
      code_convention_collective: '5360',
      opco: 'OPCO1',
      demande_sortie_dsn: 'OPCO1'
    }
    const contact = {
      civilite: '02',
      nom: 'Zoila Hilpert',
      email: 'naomiehansen@nienow.biz',
      tel: '8664421989',
      fax: '7713852766'
    }
    const declaration = {
      nature: '02',
      type: '03',
      fraction: '97',
      ordre: '836',
      mois: '19460720',
      identifiant_annulation: '6a164b47-70db-4b77-85a6-9ca698421f9a',
      date_fichier: '19270511',
      champ: '02',
      identifiant_metier: 'f8d3c86c-8b1b-430f-9a05-359aa2066661',
      devise_declaration: 'EUR',
      nature_evenement: '02',
      dernier_siret: '56997388289403',
      nature_dsn_substitution: '01'
    }
    const contrat = {
      date_debut: '19210629',
      statut_conventionnel: 'j',
      statut_rc: 'AZ',
      pcs_ese: '9226',
      complement_pcs_ese: '44',
      libelle_emploi: 'Associate',
      nature: '11',
      dispositif_politique: '02',
      numero: '85045',
      date_fin_previsionnelle: '19510601',
      unite_mesure: '70',
      quotite_categorie: '61.977112',
      quotite: '5.194875',
      modalite_temps: '79',
      complement_base: '07',
      ccn: '7961',
      regime_maladie: '018',
      lieu_travail: '7eb3e4e4-14ae-45ff-b954-238f9d818b53',
      regime_vieillesse: '253',
      motif_recours: '11',
      code_caisse_conges_payes: '07',
      taux_fraisprofessionnels: '93.505530',
      travailleur_etranger: '10',
      motif_exclusion_dsn: '34',
      status_emploi: '73',
      code_affectation_ac: '97',
      numero_interne: '3243732629',
      type_gestion_ac: '81',
      date_adhesion: '19581114',
      date_denonciation: '19390512',
      date_convention_gestion: '19380104',
      numero_convention_gestion: '5036752529',
      code_gestionnaire_risque: '133',
      code_emplois_multiples: '55',
      code_employeurs_multiples: '80',
      code_regime_risque_accident_travail: '577',
      code_risque_accident_travail: '745176',
      positionnement_convention_collective: '8747',
      code_statut_categoriel_apecita: '76',
      taux_accident_travail: '20.887022',
      temps_partiel_cotisant_temps_plein: '56',
      remuneration_pourboire: '64',
      siret_etablissement_utilisateur: '519b829c-7a89-443f-8cac-7c2c3699ef69',
      numero_label: '1990019242',
      numero_licence_entrepreneur_spectacle: '4823042758',
      numero_objet_spectacle: '7985702162',
      statut_organisateur_spectacle: '06',
      fp_code_complement_pcs_es: '2338',
      nature_poste: '63',
      fp_quotite_travail_temps_complet: '78.424854',
      taux_temps_travail_partiel: '34.455330',
      code_categorie_service: '42',
      fp_indice_brut: '144',
      fp_indice_majore: '515',
      fpnbi: '0',
      fp_indice_brut_origine: '886',
      fp_indice_brut_cotisation_emploi_superieur: '826',
      fp_ancien_employeur_public: '84',
      fp_indice_brut_origine_ancien_salarie_employeur_public: '751',
      fp_indice_brut_origine_spp: '488',
      fp_maintien_traitement_origine_contractuel_titulaire: '68',
      fp_type_detachement: '71',
      genre_navigation: '54',
      taux_service_actif: '40.553935',
      niveau_rx: '74',
      echelon: '73',
      coefficient_hierarchique: '8.719556',
      statut_boeth: '62',
      complement_dispositif_politique: '82',
      case_mise_disposition_externe: '39',
      categorie_classement_finale: '58',
      contrat_engagement_maritime: 'e67c009f-447b-405e-8737-a9e694f81f27',
      college_cnieg: '34',
      forme_amenagement_temps_partiel: '50',
      grade: 'EBE',
      cti: '63',
      finess_geo: '947626254'
    }

    const remuneration = {
      date_debut: '20251115',
      date_fin: '20251117',
      numero_contrat: '85045',
      type: '017',
      nombre_heures: '13',
      montant: '7628.742882',
      fp_taux_remunerationdelapositionstatutaire: '51.302579',
      taux_conduite_centrale_nucleaire: '94.976305',
      taux_majoration: '63.347880',
      taux_remuneration_cotisee: '76.597250',
      taux_majoration_exapprenti: '9.899069'
    }


    expect(dsn.dsn_etablissement.at(0)?.dsn_individu.at(0)?.dsn_contrat.at(0)?.remunerations?.at(0)).toStrictEqual(remuneration)
    expect(dsn.dsn_etablissement.at(0)?.dsn_individu.at(0)?.dsn_contrat.at(0)?.contrat).toStrictEqual(contrat)
    expect(dsn.dsn_etablissement.at(0)?.dsn_individu).toHaveLength(100)
    expect(dsn.dsn_etablissement).toHaveLength(1)
    expect(dsn.dsn_etablissement.at(0)?.etablissement).toStrictEqual(etablissement)
    expect(dsn.entreprise).toStrictEqual(entreprise)
    expect(dsn.envoi).toStrictEqual(envoi)
    expect(dsn.emetteur).toStrictEqual(emetteur)
    expect(dsn.contact).toStrictEqual(contact)
    expect(dsn.declaration).toStrictEqual(declaration)

  })
})
