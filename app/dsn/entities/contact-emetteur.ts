import { z } from "zod";

export const ContactEmetteurSchema = z.object({
	civilite: z.string().optional(),   // 001
	nom: z.string().optional(),      // 002
	email: z.string().optional(),           // 004
	tel: z.string().optional(),       // 005
	fax: z.string().optional(),             // 006
})

export type ContactEmetteur = z.infer<typeof ContactEmetteurSchema>
