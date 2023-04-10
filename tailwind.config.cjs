/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts,svg,yaml,astro}'],
	plugins: [require('@tailwindcss/typography'), require('tailwindcss-font-inter')],
}
