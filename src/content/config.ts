import { defineCollection, z } from 'astro:content'

const promptCollection = defineCollection({
	schema: z.object({
		id: z.string(),
		// dateAdded: z.string().datetime(),
		dateAdded: z.string(),
		source: z.string().optional(),
		category: z.string(),
		title: z.string(),
		prompt: z.string(),
	}),
})

export const collections = {
	prompt: promptCollection,
}
