<script>
	export let text, classes

	let isCopied
	let problemCopying

	function copyTextToClipboard(textToCopy) {
		return Promise.resolve(navigator.clipboard.writeText(JSON.parse(textToCopy)))
			.then(() => {
				isCopied = true
				window.setTimeout(() => {
					isCopied = false
				}, 700)
			})
			.catch(() => {
				problemCopying = true
				window.setTimeout(() => {
					problemCopying = false
				}, 700)
			})
	}
</script>

<button
	class={classes}
	on:click|stopPropagation|preventDefault={() => copyTextToClipboard(JSON.stringify(text))}
>
	{#if isCopied}
		Copied!
	{:else if problemCopying}
		Problem :(
	{:else}
		Copy
	{/if}
</button>
