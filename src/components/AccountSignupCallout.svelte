<script>
	import { isUserStorageKey } from '@src/constants'
	import { onMount } from 'svelte'

	let isUser

	onMount(() => {
		function init() {
			isUser = window && window.localStorage.getItem(isUserStorageKey)
		}

		init()
	})
</script>

{#if !isUser}
	<section class="dashedTopBg py-32">
		<div
			class="relative max-w-[700px] mx-auto prose sm:prose-lg dark:prose-invert text-center prose-headings:font-bold prose-p:text-gray-500 dark:prose-p:text-gray-100"
		>
			<h3 class="block">
				<span class="block text-2xl mb-3">Want to know when we add new prompts?</span>
				<span class="block text-xl text-gray-500 dark:text-gray-300 font-sans font-normal mb-12">
					(create an account, it's free)
				</span>
			</h3>
			<a
				href="/account/"
				class="!border-b-0 bg-blue-200 hover:bg-blue-300 focus:bg-blue-300 dark:bg-blue-700 px-10 py-3 rounded dark:focus:ring-0 focus:outline-none dark:hover:bg-blue-600 dark:focus:bg-blue-600"
			>
				Create a free account
			</a>
		</div>
	</section>
{/if}
