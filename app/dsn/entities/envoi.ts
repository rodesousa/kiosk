import { z } from "zod";

export const EnvoiSchema = z.object({
	nom_logiciel: z.string().optional(),        // 001
	nom_editeur: z.string().optional(),         // 002
	logiciel_version: z.string().optional(),    // 003
	code_conformite: z.string().optional(),     // 004
	code_envoi: z.string().optional(),          // 005
	norme_version: z.string().optional(),       // 006
	point_depot: z.string().optional(),         // 007
	type_envoi: z.string().optional(),          // 008
})

export type Envoi = z.infer<typeof EnvoiSchema>
