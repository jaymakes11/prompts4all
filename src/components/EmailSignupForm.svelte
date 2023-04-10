<script>
	const storageKeyHideEmailWidget = 'prompts4all-hideEmailSignupWidget'

	let isLoading
	let emailInput = ''
	let showSuccessMessageOrAlreadyJoined = window.localStorage.getItem(storageKeyHideEmailWidget)
	let showErrorMessage

	function handleSubmit() {
		const email = emailInput && emailInput.trim()

		if (!email) return

		isLoading = true

		return fetch(`/api/subscribe?email=${email}`, {
			method: 'POST',
		}).then((resp) => {
			isLoading = false

			if (!resp.ok) {
				showErrorMessage = true
			} else {
				showSuccessMessageOrAlreadyJoined = true
				window && window.localStorage.setItem(storageKeyHideEmailWidget, true)
			}
		})
	}
</script>

<div
	class="relative max-w-[700px] mx-auto prose sm:prose-lg dark:prose-invert text-center prose-headings:font-bold prose-p:text-gray-500 dark:prose-p:text-gray-100"
>
	{#if showErrorMessage}
		<h3>That didn't work 😟</h3>
		<p>
			<button
				class="defaultTextLink"
				on:click={() => (showErrorMessage = false)}>Click here</button
			> to try again
		</p>
	{:else if showSuccessMessageOrAlreadyJoined}
		<h3>You're subscribed to our email list</h3>
		<p>We don't send many emails, but when we do you should get them.</p>
	{:else}
		<h3 class="block">
			<span class="block text-2xl mb-3">Want to know when we add new prompts?</span>
			<span class="block text-xl text-gray-500 dark:text-gray-300 font-sans font-normal mb-12">
				( join our email list, it's free )
			</span>
		</h3>
		<form
			class="flex justify-center"
			on:submit|preventDefault={handleSubmit}
		>
			<input
				type="email"
				bind:value={emailInput}
				class="max-w-[500px] w-full rounded px-4 py-2 placeholder:text-gray-400 border mr-3 dark:bg-gray-800 dark:border-none focus:outline-none focus:ring-1 dark:focus:ring-blue-500"
				placeholder="your-email@domain.com"
				required
			/>
			<button
				type="submit"
				class="bg-blue-200 hover:bg-blue-300 focus:bg-blue-300 dark:bg-blue-700 px-10 py-3 rounded dark:focus:ring-0 focus:outline-none dark:hover:bg-blue-600 dark:focus:bg-blue-600"
				>Send</button
			>
		</form>
	{/if}
	{#if isLoading}
		<div class="absolute flex inset-0 bg-white/80 dark:bg-gray-800/80 flex-col justify-center">
			<!-- src: https://icons.getbootstrap.com/icons/gear/ -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="33"
				height="33"
				fill="currentColor"
				class="animate-spin self-center"
				viewBox="0 0 16 16"
			>
				<path
					d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
				/>
				<path
					d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
				/>
			</svg>
		</div>
	{/if}
</div>
