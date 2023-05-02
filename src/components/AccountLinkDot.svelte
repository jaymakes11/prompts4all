<script>
	import { userSessionStorageKey } from '@src/constants'
	import { onMount } from 'svelte'

	let user

	onMount(() => {
		function init() {
			const userDataString = window && window.sessionStorage.getItem(userSessionStorageKey)
			user = JSON.parse(userDataString)
		}

		init()
	})
</script>

<div
	class={`absolute top-[-5px] right-[-5px] w-2 h-2 rounded-full ${user ? 'bg-lime-600' : 'bg-yellow-600'}`}
/>
