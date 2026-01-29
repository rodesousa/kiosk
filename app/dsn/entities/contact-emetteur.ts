export interface ContactEmetteur {
	civilite?: string,
	nom?: string,
	email?: string,
	tel?: string,
	fax?: string
}

// DSN block S10.G00.02 - Contact emetteur
export const CONTACT_EMETTEUR_FIELDS: Record<string, keyof ContactEmetteur> = {
	"001": "civilite",
	"002": "nom",
	"004": "email",
	"005": "tel",
	"006": "fax",
}
