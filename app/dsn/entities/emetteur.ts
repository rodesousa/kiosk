import { z } from "zod";

export const EmetteurSchema = z.object({
	siren: z.string().optional(),                    // 001
	nic: z.string().optional(),                      // 002
	raison_sociale: z.string().optional(),           // 003
	adresse: z.string().optional(),                  // 004
	code_postal: z.string().optional(),              // 005
	commune: z.string().optional(),                  // 006
	code_pays: z.string().optional(),                // 007
	code_distribution_etranger: z.string().optional(), // 008
	complement_localisation: z.string().optional(),  // 009
	code_distribution: z.string().optional(),        // 010
})

export type Emetteur = z.infer<typeof EmetteurSchema>
