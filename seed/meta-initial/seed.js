import fs from 'fs'
import yaml from 'js-yaml'

function createMarkdownFiles(yamlFilePath) {
	fs.readFile(yamlFilePath, 'utf8', (err, data) => {
		if (err) {
			console.error(err)
			return
		}

		const prompts = yaml.load(data)

		prompts.forEach((prompt) => {
			const frontmatter = `---
dateAdded: "2023-04-20"
category: "meta"
title: ${prompt.title}
prompt: |
  ${prompt.prompt.trim()}
---`
			const markdownContent = frontmatter

			fs.writeFile(`./../../src/content/prompt/${prompt.slug}.md`, markdownContent, (err) => {
				if (err) {
					console.error(err)
				} else {
					console.log(`Markdown file created: ./../../src/content/prompt/${prompt.slug}.md`)
				}
			})
		})
	})
}

// Example usage:
createMarkdownFiles('./prompts.yaml')
