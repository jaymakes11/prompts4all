import fs from 'fs'
import csv from 'csv-parser'
import path from 'path'
import slugify from 'slugify'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('123456789abcdefg', 8)

function aOrAn(noun) {
	const firstLetter = noun.charAt(0).toLowerCase()
	if (['a', 'e', 'i', 'o', 'u'].includes(firstLetter)) {
		return 'an'
	} else {
		return 'a'
	}
}

async function csvToMarkdown(csvFilePath, markdownDir) {
	try {
		const results = []
		fs.createReadStream(csvFilePath)
			.pipe(csv())
			.on('data', (data) => results.push(data))
			.on('end', async () => {
				for (const result of results) {
					const uid = nanoid()
					const now = new Date().toISOString().substring(0, 10)
					const fileName = `${slugify(result.act).toLowerCase()}-${uid}.md`
					const filePath = path.join(markdownDir, fileName)
					console.log(filePath)
					const frontMatter = `---
source: "https://github.com/f/awesome-chatgpt-prompts"
dateAdded: "${now}"
category: "role-definition"
title: "Act as ${aOrAn(result.act)} ${result.act.toLowerCase()}"
prompt: |
  ${result.prompt}
---
`
					const content = `${frontMatter}`
					fs.writeFileSync(filePath, content, 'utf-8')
				}
				console.log('All Markdown files created successfully')
			})
	} catch (error) {
		console.error('Error creating Markdown files:', error)
	}
}

csvToMarkdown('./seed.csv', './../../src/content/prompt/')
	.then(() => console.log('CSV to Markdown conversion complete'))
	.catch((error) => console.error('Error:', error))
