<script>
	export let promptId
	import { promptReactionTypes } from '@src/constants'
	import { onMount } from 'svelte'
	import * as utils from '@src/utils'

	let isInitComplete
	let reactions = {}

	onMount(() => {
		async function init() {
			await utils.getPromptWithMetadata(promptId).then((prompt) => {
				reactions = prompt?.metadata?.reactions
			})
			isInitComplete = true
		}

		init()
	})
</script>

<div>
	<div class="flex space-x-2 dark:text-gray-300 text-gray-400">
		<!-- src: https://icones.js.org/collection/ph?s=heart -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="15"
			height="15"
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
		<div class="font-mono text-xs dark:text-gray-300 text-gray-500">
			{#if promptReactionTypes && reactions?.[promptReactionTypes.like] >= 0}
				{reactions?.[promptReactionTypes.like]}
			{:else if isInitComplete}
				0
			{/if}
		</div>
	</div>
</div>
