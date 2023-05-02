<script>
	import { userSessionStorageKey, promptReactionTypes } from '@src/constants'
	import { onMount } from 'svelte'
	import * as utils from '@src/utils'

	let user
	let usersLikedPrompts = []

	onMount(() => {
		function loadPrompts() {
			return fetch('/prompts-mnml.json').then(utils.respToJson)
		}

		async function init() {
			const userDataString = window && window.sessionStorage.getItem(userSessionStorageKey)
			user = JSON.parse(userDataString)

			if (user?.reactions[promptReactionTypes.like]?.length) {
				const prompts = await loadPrompts()
				usersLikedPrompts = user.reactions[promptReactionTypes.like].map((promptId) => {
					return prompts.find((prompt) => prompt.data.id === promptId)
				})
				console.log(usersLikedPrompts)
			}
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
		<div class="mb-12">
			<div class="text-lg font-bold">Liked Prompts</div>
		</div>
		<div class="space-y-3">
			{#if usersLikedPrompts.length}
				{#each usersLikedPrompts as prompt}
					<a
						href={`/prompt/${prompt.slug}/`}
						class="block bg-gray-100/70 dark:bg-gray-800 p-6 hover:ring-1 hover:ring-blue-500 dark:hover:ring-blue-300"
						rel="prefetch"
					>
						<div class="prose dark:prose-invert max-w-full prose-sm">
							<h3 class="leading-tight">{prompt.data.title}</h3>
							<div>{prompt.data.truncated}</div>
						</div>
					</a>
				{/each}
			{:else}
				<div class="prose prose-sm max-w-[700px] dark:prose-invert bg-gray-100/70 dark:bg-gray-800 p-4 mb-12">
					<p>You haven't liked any prompts yet!</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
