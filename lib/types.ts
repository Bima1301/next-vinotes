import { z } from 'zod'

export const noteSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long').max(255),
    content: z.string().min(3, 'Content must be at least 3 characters long').max(255),
    imageSrc: z.string().optional(),
})

export const categorySchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long').max(255),
    color: z.string().min(3, 'Color must be at least 3 characters long').max(255),
})

export type TCategorySchema = z.infer<typeof categorySchema>;

export type TNoteSchema = z.infer<typeof noteSchema>;

export type categoryType = {
    name: string,
    color: string,
}