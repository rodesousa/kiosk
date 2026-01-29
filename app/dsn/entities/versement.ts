export interface Versement {
	date?: string,
	net_fiscal?: string,
	numero?: string,
	net_verse?: string,
	taux_pas?: string,
	type_taux_pas?: string,
	id_taux_pas?: string,
	montant_pas?: string,
	part_non_imposable_revenu?: string,
	montant_abattement_base_fiscale_non_deduit_rnf?: string,
	montant_soumis_pas?: string,
	mois_dsn_rattchmt_fctu?: string,
}

// DSN block S21.G00.50 - Versement
export const VERSEMENT_FIELDS: Record<string, keyof Versement> = {
	"001": "date",
	"002": "net_fiscal",
	"003": "numero",
	"004": "net_verse",
	"006": "taux_pas",
	"007": "type_taux_pas",
	"008": "id_taux_pas",
	"009": "montant_pas",
	"011": "part_non_imposable_revenu",
	"012": "montant_abattement_base_fiscale_non_deduit_rnf",
	"013": "montant_soumis_pas",
	"020": "mois_dsn_rattchmt_fctu",
}
