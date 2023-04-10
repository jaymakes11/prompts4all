const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts,svg,yaml,astro}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			mono: defaultTheme.fontFamily.mono,
			serif: defaultTheme.fontFamily.serif,
			display: defaultTheme.fontFamily.display,
			sans: [
				`Inter var, ${defaultTheme.fontFamily.sans}`,
				{
					fontFeatureSettings: '"cv11", "ss01"',
					// fontVariationSettings: '"opsz" 32',
				},
			],
		},
		colors: { ...colors, gray: colors.zinc },
	},
	plugins: [require('@tailwindcss/typography')],
}
