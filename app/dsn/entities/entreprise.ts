export interface Entreprise {
	siren?: string,
	nic?: string,
	apen?: string,
	voie?: string,
	code_postal?: string,
	localite?: string,
	complement_construction?: string,
	code_voie?: string,
	effectif_moyen?: string,
	code_pays?: string,
	code_distribution?: string,
	implantation_entreprise?: string,
	code_convention_collective?: string,
}

// DSN block S21.G00.06 - Entreprise
export const ENTREPRISE_FIELDS: Record<string, keyof Entreprise> = {
	"001": "siren",
	"002": "nic",
	"003": "apen",
	"004": "voie",
	"005": "code_postal",
	"006": "localite",
	"007": "code_distribution",
	"008": "effectif_moyen",
	"009": "code_pays",
	"010": "code_distribution",
	"011": "implantation_entreprise",
	"012": "code_convention_collective",
}

