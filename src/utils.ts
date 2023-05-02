import { marked } from 'marked'

export function wrapLinesInPTags(text: String) {
	const lines = text.trim().split('\n')
	const wrappedLines = lines.map((line) => `<p>${line.trim()}</p>`)
	return wrappedLines.join('\n')
}

export function mdToHtml(md: String) {
	return marked.parse(md)
}

export function getRandomInt(min: number, max: number): number {
	// src: https://stackoverflow.com/a/1527820
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Safely truncates a string to a specified length, ensuring that it ends at full words.
 * @param inputText - The input string to be truncated.
 * @param maxLength - The maximum length of the truncated string.
 * @return The safely truncated string.
 */
export function safeTruncate(inputText: string, maxLength: number): string {
	if (typeof inputText !== 'string' || typeof maxLength !== 'number') {
		throw new Error('Invalid input types. Expected a string and a number.')
	}

	if (inputText.length <= maxLength) {
		return inputText
	}

	const truncatedText = inputText.slice(0, maxLength)
	const lastSpaceIndex = truncatedText.lastIndexOf(' ')

	if (lastSpaceIndex === -1) {
		return truncatedText + '...'
	}

	return truncatedText.slice(0, lastSpaceIndex) + '...'
}

export function getPromptWithMetadata(promptId: String) {
	return fetch(`/api/prompt?promptId=${promptId}`, {
		method: 'GET',
	})
		.then(respToJson)
		.then((data) => {
			return data?.prompt
		})
}

export function respToJson(resp: any) {
	if (resp.ok) {
		return resp.json()
	}
}

export function formatTimestamp(dSrc: number): string {
	if (!dSrc) return ''

	const d = new Date(dSrc)

	const args = { dateStyle: 'long' }

	// Update to hardcode the date to Pacific time (see https://github.com/angular-ui/bootstrap/issues/2628#issuecomment-286082783)
	// const pacificTimezoneOffset = 480
	// d.setMinutes(d.getMinutes() + pacificTimezoneOffset)
	const usersTimezoneOffset = new Date().getTimezoneOffset()
	d.setMinutes(d.getMinutes() + usersTimezoneOffset)

	return new Intl.DateTimeFormat('en-US', args).format(d)
}
