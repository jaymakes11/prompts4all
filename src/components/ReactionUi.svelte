<script>
	export let promptId
	import { isUserStorageKey, promptReactionTypes, userSessionStorageKey } from '@src/constants'
	import { onMount } from 'svelte'
	import * as utils from '@src/utils'

	let isInitComplete
	let reactions = {}
	let handleClick
	let hasUserMadeReaction

	onMount(() => {
		function setHasUserMadeReaction(reactionType) {
			const userSrc = window && window.sessionStorage.getItem(userSessionStorageKey)
			if (!userSrc) return
			const user = JSON.parse(userSrc)
			hasUserMadeReaction = user?.reactions?.[reactionType]?.includes(promptId)
		}

		handleClick = function (reactionType) {
			const isUser = window && window.localStorage.getItem(isUserStorageKey)

			if (!isUser && window) {
				window.location.href = '/account/'
			} else {
				return fetch(`/api/handle-prompt-reaction?promptId=${promptId}&type=${reactionType}`, {
					method: 'POST',
				})
					.then(utils.respToJson)
					.then(({ user, prompt }) => {
						// Update the user's session store
						window.sessionStorage.setItem(userSessionStorageKey, JSON.stringify(user))

						// Update local state
						setHasUserMadeReaction(promptReactionTypes.like)
						reactions = prompt.metadata.reactions
					})
			}
		}

		async function init() {
			setHasUserMadeReaction(promptReactionTypes.like)
			await utils.getPromptWithMetadata(promptId).then((prompt) => {
				reactions = prompt?.metadata?.reactions
			})
			isInitComplete = true
		}

		init()
	})
</script>

<div>
	<button
		class={`mb-1.5 w-[40px] justify-center items-center rounded dark:focus:ring-0 dark:focus:outline-none flex flex-col ${
			hasUserMadeReaction ? 'dark:text-red-500 text-red-500' : 'dark:text-gray-300  text-gray-400'
		}`}
		title="Upvote this prompt"
		on:click={() => handleClick(promptReactionTypes.like)}
	>
		<!-- src: https://icones.js.org/collection/ph?s=heart -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 256 256"
			><g fill="currentColor"
				><path
					d="M217.36 133.36L128 224l-89.36-90.64a50 50 0 0 1 70.72-70.72L128 80l18.64-17.36a50 50 0 1 1 70.72 70.72Z"
					opacity=".2"
				/><path
					d="M223 57a58.07 58.07 0 0 0-81.92-.1L128 69.05l-13.09-12.19A58 58 0 0 0 33 139l89.35 90.66a8 8 0 0 0 11.4 0L223 139a58 58 0 0 0 0-82Zm-11.35 70.76L128 212.6l-83.7-84.92a42 42 0 0 1 59.4-59.4l.2.2l18.65 17.35a8 8 0 0 0 10.9 0l18.65-17.35l.2-.2a42 42 0 1 1 59.36 59.44Z"
				/></g
			></svg
		>
		<div class="text-center font-mono text-sm dark:text-gray-300 text-gray-500 mt-1.5">
			{#if promptReactionTypes && reactions?.[promptReactionTypes.like] >= 0}
				{reactions?.[promptReactionTypes.like]}
			{:else if isInitComplete}
				0
			{/if}
		</div>
	</button>
</div>
