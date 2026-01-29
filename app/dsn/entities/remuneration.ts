export interface Remuneration {
	date_debut?: string,
	date_fin?: string,
	numero_contrat?: string,
	type?: string,
	nombre_heures?: string,
	montant?: string,
	fp_taux_remunerationdelapositionstatutaire?: string,
	taux_conduite_centrale_nucleaire?: string,
	taux_majoration?: string,
	taux_remuneration_cotisee?: string,
	taux_majoration_exapprenti?: string,
}

// DSN block S21.G00.51 - Remuneration
export const REMUNERATION_FIELDS: Record<string, keyof Remuneration> = {
	"001": "date_debut",
	"002": "date_fin",
	"010": "numero_contrat",
	"011": "type",
	"012": "nombre_heures",
	"013": "montant",
	"014": "fp_taux_remunerationdelapositionstatutaire",
	"015": "taux_conduite_centrale_nucleaire",
	"016": "taux_majoration",
	"019": "taux_remuneration_cotisee",
	"020": "taux_majoration_exapprenti",
}
