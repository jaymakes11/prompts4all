<script>
	import { isUserStorageKey } from '@src/constants'
	const isUser = window && window.localStorage.getItem(isUserStorageKey)

	let emailInput
	let codeInput
	let isLoading
	let showErrorMessage
	let showStep2
	let email

	function handleSubmitForStep1() {
		email = emailInput && emailInput.trim()

		if (!email) return

		isLoading = true

		return fetch(`/api/auth-alpha?email=${email}`, {
			method: 'POST',
		}).then((resp) => {
			isLoading = false

			if (!resp.ok) {
				showErrorMessage = true
			} else {
				showStep2 = true
			}
		})
	}

	function handleSubmitForStep2() {
		const code = codeInput && codeInput.trim()

		if (!code) return

		isLoading = true

		return fetch(`/api/auth-omega?code=${code}&email=${email}`, {
			method: 'POST',
		}).then((resp) => {
			isLoading = false

			if (!resp.ok) {
				showErrorMessage = true
			} else {
				window && window.localStorage.setItem(isUserStorageKey, 'true')

				if (window.location.pathname === '/account/') {
					window.location.replace('/account/')
				} else {
					window.location.href = '/account/'
				}
			}
		})
	}
</script>

{#if !isUser}
	<div class="mx-auto max-w-[500px]">
		<div class="mb-24 prose prose-lg dark:prose-invert">
			<h1 class="text-center mb-2">Account Portal</h1>
			<p class="text-center">Create or sign in to your account</p>
		</div>
		<section class="mb-24 relative">
			{#if showErrorMessage}
				<div class="prose dark:prose-invert text-center">
					<h3>That didn't work 😟</h3>
					<p>
						<button
							class="defaultTextLink"
							on:click={() => (showErrorMessage = false)}>Click here</button
						> to try again
					</p>
				</div>
			{:else if showStep2}
				<div class="prose dark:prose-invert text-center mb-5">
					<h3>One last step!</h3>
					<p>We've emailed you an auth code. Enter it below.</p>
				</div>
				<form
					class="text-center"
					on:submit|preventDefault={handleSubmitForStep2}
				>
					<input
						type="text"
						bind:value={codeInput}
						class="max-w-[200px] w-full rounded px-4 py-4 placeholder:text-gray-400 border mr-3 dark:bg-gray-800 dark:border-none focus:outline-none focus:ring-1 dark:focus:ring-blue-500 mb-6 text-gray-900 dark:text-gray-100"
						placeholder="Auth code"
						required
					/>
					<button
						type="submit"
						class="px-10 py-4 rounded bg-blue-200 hover:bg-blue-300 dark:text-gray-300 dark:bg-blue-700 dark:focus:ring-0 dark:focus:outline-none dark:hover:bg-blue-600 dark:focus:bg-blue-600 whitespace-nowrap"
					>
						Submit
					</button>
				</form>
			{:else}
				<form
					class="text-center"
					on:submit|preventDefault={handleSubmitForStep1}
				>
					<input
						type="email"
						bind:value={emailInput}
						class="max-w-[500px] w-full rounded px-4 py-4 placeholder:text-gray-400 border mr-3 dark:bg-gray-800 dark:border-none focus:outline-none focus:ring-1 dark:focus:ring-blue-500 mb-6 text-gray-900 dark:text-gray-100"
						placeholder="your-email@domain.com"
						required
					/>
					<button
						type="submit"
						class="px-10 py-4 rounded bg-blue-200 hover:bg-blue-300 dark:text-gray-300 dark:bg-blue-700 dark:focus:ring-0 dark:focus:outline-none dark:hover:bg-blue-600 dark:focus:bg-blue-600 whitespace-nowrap"
					>
						Create or Sign In
					</button>
				</form>
			{/if}
			{#if isLoading}
				<div
					class="absolute flex inset-0 bg-white/80 dark:bg-gray-900/80 dark:text-gray-300 flex-col justify-center"
				>
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
		</section>
		<section class="prose dark:prose-invert">
			<h2>FAQ</h2>
			<div>
				<h3>Are accounts free?</h3>
				<p>Yes, accounts are (and will always be) free.</p>
			</div>
			<div>
				<h3>Why create an account?</h3>
				<p>
					Create an account to access all of the site's current and upcoming features, such as liking prompts
					and being notified of new prompts.
				</p>
			</div>
			<div>
				<h3>Do you sell my email?</h3>
				<p>
					No. Never. Absolutely not. We abhor this type of stuff and genuinly want the internet to be a better
					place so would never even consider doing something like this.
				</p>
			</div>
			<div>
				<h3>What data do you collect?</h3>
				<p>
					When you create an account the only personal data we store on you is your email address. For features
					that require accounts (such as upvoting or bookmarking a prompt) we only store data needed for the
					feature to work.
				</p>
			</div>
			<div>
				<h3>Is my password safe?</h3>
				<p>
					Yes. Actually, this is a trick question. The signin method does not use a password (it uses a code
					sent to your email address) so there are no passwords to worry about.
				</p>
			</div>
		</section>
	</div>
{/if}
