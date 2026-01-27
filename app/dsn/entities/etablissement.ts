import { z } from "zod";

export const EtablissementSchema = z.object({
	nic: z.string().optional(),                         // 001
	apet: z.string().optional(),                        // 002
	voie: z.string().optional(),                     // 003
	code_postal: z.string().optional(),                 // 004
	localite: z.string().optional(),                     // 005
	complement_construction: z.string().optional(),     // 006
	complement_voie: z.string().optional(),           // 007
	effectif_fin_periode: z.string().optional(),                    // 008
	remuneration_expatries: z.string().optional(), // 009
	code_pays: z.string().optional(),                   // 015
	code_distribution: z.string().optional(),  // 016
	nature_juridique_employeur: z.string().optional(),            // 017
	date_effet: z.string().optional(),          // 019
	date_sortie: z.string().optional(),            // 020
	code_convention_collective: z.string().optional(),  // 022
	opco: z.string().optional(),                        // 023
	demande_sortie_dsn: z.string().optional(),          // 024
})

export type Etablissement = z.infer<typeof EtablissementSchema>
