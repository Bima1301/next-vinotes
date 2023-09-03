import { z } from 'zod'

export const noteSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long').max(255),
    content: z.string().min(3, 'Content must be at least 3 characters long').max(255),
})

export type TNoteSchema = z.infer<typeof noteSchema>;