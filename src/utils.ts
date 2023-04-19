import { marked } from 'marked'

export function wrapLinesInPTags(text: String) {
	const lines = text.trim().split('\n')
	const wrappedLines = lines.map((line) => `<p>${line.trim()}</p>`)
	return wrappedLines.join('\n')
}

export function mdToHtml(md: String) {
	return marked.parse(md)
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
