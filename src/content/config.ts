import { defineCollection, z } from 'astro:content'

const promptCollection = defineCollection({
	schema: z.object({
		source: z.string().optional(),
		// dateAdded: z.string().datetime(),
		dateAdded: z.string(),
		intendedFor: z.string(),
		title: z.string(),
		prompt: z.string(),
	}),
})

export const collections = {
	prompt: promptCollection,
}
