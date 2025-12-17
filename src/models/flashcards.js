import { z } from "zod"

export const flashcardIdSchema = z.object({
    id: z.uuid(),
})

export const createFlashcardsSchema = z.object({
    collectionId: z.number().nullish(),
    frontText: z.string().min(1, "Le champ front_text est requis").max(200, "Le texte ne doit pas dépasser 200 caractères").nullish(),
    backText: z.string().min(1, "Le champ back_text est requis").max(200, "Le texte ne doit pas dépasser 200 caractères").nullish(),
    frontUrl: z.string().max(200, "Le texte ne doit pas dépasser 200 caractères").nullish(),
    backUrl: z.string().max(200, "Le texte ne doit pas dépasser 200 caractères").nullish(),
})