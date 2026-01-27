import { z } from "zod";

export const RemunerationSchema = z.object({
	date_debut: z.string().optional(),                  // 001
	date_fin: z.string().optional(),                    // 002
	numero_contrat: z.string().optional(),              // 010
	type: z.string().optional(),                        // 011
	nombre_heures: z.string().optional(),               // 012
	montant: z.string().optional(),                     // 013
	fp_taux_remunerationdelapositionstatutaire: z.string().optional(), // 014
	taux_conduite_centrale_nucleaire: z.string().optional(),     // 015
	taux_majoration: z.string().optional(),             // 016
	taux_remuneration_cotisee: z.string().optional(),             // 019
	taux_majoration_exapprenti: z.string().optional(),             // 020
})

export type Remuneration = z.infer<typeof RemunerationSchema>
