const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts,svg,yaml,astro}'],
	theme: {
		fontFamily: {
			mono: defaultTheme.fontFamily.mono,
			serif: defaultTheme.fontFamily.serif,
			display: defaultTheme.fontFamily.display,
			sans: [
				`Inter var, ${defaultTheme.fontFamily.sans}`,
				{
					fontFeatureSettings: '"cv11", "ss01"',
					fontVariationSettings: '"opsz" 32',
				},
			],
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
