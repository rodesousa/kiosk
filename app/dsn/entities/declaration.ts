export interface Declaration {
	nature?: string
	type?: string
	fraction?: string
	ordre?: string
	mois?: string
	identifiant_annulation?: string
	date_fichier?: string
	champ?: string
	identifiant_metier?: string
	devise_declaration?: string
	nature_evenement?: string
	dernier_siret?: string
	nature_dsn_substitution?: string
}

// DSN block S20.G00.05 - Declaration
export const DECLARATION_FIELDS: Record<string, keyof Declaration> = {
	"001": "nature",
	"002": "type",
	"003": "fraction",
	"004": "ordre",
	"005": "mois",
	"006": "identifiant_annulation",
	"007": "date_fichier",
	"008": "champ",
	"009": "identifiant_metier",
	"010": "devise_declaration",
	"011": "nature_evenement",
	"012": "dernier_siret",
	"013": "nature_dsn_substitution",
}
