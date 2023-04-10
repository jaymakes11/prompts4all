export function wrapLinesInPTags(text: String) {
	const lines = text.trim().split('\n')
	const wrappedLines = lines.map((line) => `<p>${line.trim()}</p>`)
	return wrappedLines.join('\n')
}
