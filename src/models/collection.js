import z from 'zod';

export const collectionSchema = z.object({
    title: z.string().min(2, 'title is required').max(30),
    description: z.string().min(2).max(30),
    is_public: z.boolean(),
    owner_id: z.number(),
})
