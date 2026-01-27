import { type Entreprise } from "../dsn/entities/entreprise"
import { type Envoi } from "../dsn/entities/envoi"
import { type Emetteur } from "../dsn/entities/emetteur"
import { type Etablissement } from "../dsn/entities/etablissement"
import { type Individu } from "../dsn/entities/individu"
import { type Contrat } from "../dsn/entities/contrat"
import { type Versement } from "../dsn/entities/versement"
import { type Remuneration } from "../dsn/entities/remuneration"
import { type Declaration } from "../dsn/entities/declaration"
import { type ContactEmetteur } from "../dsn/entities/contact-emetteur"

export interface DSNDocument {
	envoi: Envoi,
	emetteur: Emetteur,
	declaration: Declaration,
	entreprise: Entreprise,
	contact: ContactEmetteur,
	dsn_etablissement: DSNEtablissement[],
}

export interface DSNEtablissement {
	etablissement: Etablissement,
	dsn_individu: DSNIndividu[],
}

export interface DSNIndividu {
	individu: Individu,
	dsn_contrat: DSNContrat[],
}

export interface DSNContrat {
	contrat: Contrat,
	versements: Versement[],
	remunerations: Remuneration[],
}

