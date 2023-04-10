import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'
import prefetch from '@astrojs/prefetch'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'

// For options and such, see https://astro.build/config

export default defineConfig({
	site: 'https://www.prompts4all.com',
	trailingSlash: 'always',
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		svelte(),
		prefetch(),
		sitemap(),
		compress({
			img: false,
			logger: 0,
		}),
	],
	vite: {
		server: {
			proxy: {
				'/api': {
					target: 'http://localhost:3001',
					changeOrigin: true,
					secure: false,
					ws: true,
				},
			},
		},
	},
})
