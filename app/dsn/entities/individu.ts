import { z } from "zod";

export const IndividuSchema = z.object({
	indentifiant: z.string().optional(),                         // 001
	nom_famille: z.string().optional(),                 // 002
	nom_usage: z.string().optional(),                   // 003
	prenoms: z.string().optional(),                     // 004
	sexe: z.string().optional(),                        // 005
	date_naissance: z.string().optional(),              // 006
	lieu_naissance: z.string().optional(),              // 007
	voie: z.string().optional(),                     // 008
	code_postal: z.string().optional(),                 // 009
	localite: z.string().optional(),                     // 010
	code_pays: z.string().optional(),                   // 011
	code_distribution: z.string().optional(),  // 012
	codification_ue: z.string().optional(),             // 013
	departement_naissance: z.string().optional(),       // 014
	pays_naissance: z.string().optional(),              // 015
	complement_construction: z.string().optional(),     // 016
	complement_voie: z.string().optional(),           // 017
	email: z.string().optional(),                       // 018
	matricule: z.string().optional(),                       // 019
	ntt: z.string().optional(),                       // 020
	status_etranger: z.string().optional(),                       // 022
	cumul_emploi_retraite: z.string().optional(),                       // 023
	niveau_formation_plus_eleve: z.string().optional(),                       // 024
	niveau_diplome_prepare: z.string().optional(),                       // 025
	libelle_pays_naiss: z.string().optional(),                       // 029

})

export type Individu = z.infer<typeof IndividuSchema>
