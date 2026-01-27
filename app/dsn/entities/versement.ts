import { z } from "zod";

export const VersementSchema = z.object({
	date: z.string().optional(),                         // 001
	net_fiscal: z.string().optional(),                 // 002
	numero: z.string().optional(),                   // 003
	net_verse: z.string().optional(),                     // 004
	taux_pas: z.string().optional(),              // 006
	type_taux_pas: z.string().optional(),              // 007
	id_taux_pas: z.string().optional(),                     // 008
	montant_pas: z.string().optional(),                 // 009
	part_non_imposable_revenu: z.string().optional(),                     // 011
	montant_abattement_base_fiscale_non_deduit_rnf: z.string().optional(),  // 012
	montant_soumis_pas: z.string().optional(),             // 013
	mois_dsn_rattchmt_fctu: z.string().optional(),       // 020

})

export type Versement = z.infer<typeof VersementSchema>
