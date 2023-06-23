<script>
	import { themeStorageKey, darkThemeClass } from '@src/constants.ts'

	function toggleTheme() {
		const themeValue = (() => {
			if (localStorage && localStorage.getItem(themeStorageKey)) {
				return localStorage.getItem(themeStorageKey)
			} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				return 'dark'
			} else {
				return 'light'
			}
		})()

		const themeValueToSet = themeValue === 'light' ? 'dark' : 'light'

		if (themeValueToSet === 'light') {
			document.documentElement.classList.remove(darkThemeClass)
		} else {
			document.documentElement.classList.add(darkThemeClass)
		}
		window.localStorage.setItem(themeStorageKey, themeValueToSet)
	}
</script>

<button
	class="dark:text-gray-200 w-[40px] h-[40px] -mt-0.5 ml-3"
	on:click|preventDefault|stopPropagation={() => toggleTheme()}
>
	<!-- src: https://icones.js.org/collection/ph -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 256 256"
		><path
			fill="currentColor"
			d="M240 152h-40.45a73.54 73.54 0 0 0 .45-8a72 72 0 0 0-144 0a73.54 73.54 0 0 0 .45 8H16a8 8 0 0 0 0 16h224a8 8 0 0 0 0-16Zm-168-8a56 56 0 1 1 111.41 8H72.59a56.13 56.13 0 0 1-.59-8Zm144 56a8 8 0 0 1-8 8H48a8 8 0 0 1 0-16h160a8 8 0 0 1 8 8ZM72.84 43.58a8 8 0 0 1 14.32-7.16l8 16a8 8 0 0 1-14.32 7.16Zm-56 48.84a8 8 0 0 1 10.74-3.57l16 8a8 8 0 0 1-7.16 14.31l-16-8a8 8 0 0 1-3.58-10.74Zm192 15.16a8 8 0 0 1 3.58-10.73l16-8a8 8 0 1 1 7.16 14.31l-16 8a8 8 0 0 1-10.74-3.58Zm-48-55.16l8-16a8 8 0 0 1 14.32 7.16l-8 16a8 8 0 1 1-14.32-7.16Z"
		/></svg
	>
</button>
