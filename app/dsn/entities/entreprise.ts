import { z } from "zod";

export const EntrepriseSchema = z.object({
	siren: z.string().optional(),
	nic: z.string().optional(),
	apen: z.string().optional(),
	voie: z.string().optional(),
	code_postal: z.string().optional(),
	localite: z.string().optional(),
	complement_construction: z.string().optional(),
	code_voie: z.string().optional(),
	effectif_moyen: z.string().optional(),
	code_pays: z.string().optional(),
	code_distribution: z.string().optional(),
	implantation_entreprise: z.string().optional(),
	code_convention_collective: z.string().optional(),
})

export type Entreprise = z.infer<typeof EntrepriseSchema>
