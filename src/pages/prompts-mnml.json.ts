export const prerender = true
import type { APIRoute } from 'astro'
import { safeTruncate } from '@src/utils.ts'
import { getCollection } from 'astro:content'

const prompts = await getCollection('prompt')

export const get: APIRoute = () => {
	return {
		body: JSON.stringify(
			prompts.map((prompt) => {
				return {
					slug: prompt.slug,
					data: {
						category: prompt.data.category,
						dateAdded: prompt.data.dateAdded,
						id: prompt.data.id,
						title: prompt.data.title,
						truncated: safeTruncate(prompt.data.prompt, 160),
					},
				}
			}),
		),
	}
}
