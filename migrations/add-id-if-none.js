import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 13)

const markdownDir = './../src/content/prompt/'

function readDirectoryFiles(dir) {
	return fs
		.readdirSync(dir, { withFileTypes: true })
		.map((dirent) => {
			const res = path.resolve(dir, dirent.name)
			return dirent.isDirectory() ? readDirectoryFiles(res) : res
		})
		.flat()
}

function isMarkdownFile(filename) {
	return path.extname(filename).toLowerCase() === '.md'
}

function addIdToFrontMatter(file) {
	const fileContent = fs.readFileSync(file, 'utf8')
	const parsedContent = matter(fileContent)

	if (parsedContent.data.hasOwnProperty('id')) {
		return
	}

	const id = nanoid()
	const updatedFrontMatter = { id, ...parsedContent.data }
	const updatedYaml = yaml.dump(updatedFrontMatter, { lineWidth: -1, noCompatMode: true })
	const updatedFileContent = `---\n${updatedYaml}---\n${parsedContent.content}`

	fs.writeFileSync(file, updatedFileContent, 'utf8')
}

function main() {
	const files = readDirectoryFiles(markdownDir)
	const markdownFiles = files.filter(isMarkdownFile)

	markdownFiles.forEach(addIdToFrontMatter)
}

main()
