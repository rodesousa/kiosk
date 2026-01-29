export interface Envoi {
	nom_logiciel?: string,
	nom_editeur?: string,
	logiciel_version?: string,
	code_conformite?: string,
	code_envoi?: string,
	norme_version?: string,
	point_depot?: string,
	type_envoi?: string,
}

// DSN block S10.G00.00 - Envoi
export const ENVOI_FIELDS: Record<string, keyof Envoi> = {
	"001": "nom_logiciel",
	"002": "nom_editeur",
	"003": "logiciel_version",
	"004": "code_conformite",
	"005": "code_envoi",
	"006": "norme_version",
	"007": "point_depot",
	"008": "type_envoi",
}
