import z from 'zod';

export const collectionSchema = z.object({
    title: z.string().min(2, 'title is required').max(30).nullish(),
    description: z.string().min(2).max(30).nullish(),
    is_public: z.boolean().nullish()
})
