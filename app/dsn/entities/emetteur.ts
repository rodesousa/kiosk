export interface Emetteur {
	siren?: string,
	nic?: string,
	nom?: string,
	voie?: string,
	code_postal?: string,
	localite?: string,
	pays?: string,
	code_distribution?: string,
	complement_construction?: string,
	complement_voie?: string,
}

// DSN block S10.G00.01 - Emetteur
export const EMETTEUR_FIELDS: Record<string, keyof Emetteur> = {
	"001": "siren",
	"002": "nic",
	"003": "nom",
	"004": "voie",
	"005": "code_postal",
	"006": "localite",
	"007": "pays",
	"008": "code_distribution",
	"009": "complement_construction",
	"010": "complement_voie",
}
