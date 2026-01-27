import { z } from "zod";

export const DeclarationSchema = z.object({
	nature: z.string().optional(),                      // 001
	type: z.string().optional(),                        // 002
	fraction: z.string().optional(),             // 003
	ordre: z.string().optional(),                // 004
	mois: z.string().optional(),         // 005
	identifiant_annulation: z.string().optional(),         // 006
	date_fichier: z.string().optional(),           // 007
	champ: z.string().optional(),                       // 008
	identifiant_metier: z.string().optional(),          // 009
	devise_declaration: z.string().optional(),                      // 010
	nature_evenement: z.string().optional(),            // 011
	dernier_siret: z.string().optional(),               // 012
	nature_dsn_substitution: z.string().optional(),           // 013
})

export type Declaration = z.infer<typeof DeclarationSchema>
