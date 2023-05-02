<script>
	import { userSessionStorageKey } from '@src/constants'
	import * as utils from '@src/utils'
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

{#if user}
	<div class="text-gray-700 dark:text-gray-300">
		<div class="text-center mb-12">
			<h1 class="text-3xl mb-1">Account</h1>
			<a
				href="/account/settings/"
				class="defaultTextLink"
			>
				{user.email}
			</a>
		</div>
		<div
			class="prose prose-sm max-w-[700px] text-center dark:prose-invert bg-gray-100/70 dark:bg-gray-800 p-4 mx-auto mb-12"
		>
			<p>Note: As we continue to roll out more user account features you'll see more settings here.</p>
		</div>
		<div class="mb-8">
			<div class="text-lg font-bold">User Settings</div>
		</div>
		<div>
			Created: {utils.formatTimestamp(user.createdAt)}
		</div>
	</div>
{/if}
