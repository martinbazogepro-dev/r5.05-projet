import { z } from "zod"

export const flashcardIdSchema = z.object({
    id: z.uuid(),
})

export const createFlashcardsSchema = z.object({
    collection_id: z.bigint(),
    front_text: z.string().min(1, "Le champ front_text est requis").max(200, "Le texte ne doit pas dépasser 200 caractères"),
    back_text: z.string().min(1, "Le champ back_text est requis").max(200, "Le texte ne doit pas dépasser 200 caractères"),
    front_url: z.string().max(200, "Le texte ne doit pas dépasser 200 caractères"),
    back_url: z.string().max(200, "Le texte ne doit pas dépasser 200 caractères"),
})