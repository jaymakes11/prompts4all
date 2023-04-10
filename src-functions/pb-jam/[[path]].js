const ScriptName = '/pb-jam/script.js'
const Endpoint = '/pb-jam/event'

const ScriptWithoutExtension = ScriptName.replace('.js', '')

export async function onRequest({ request, waitUntil }) {
	const pathname = new URL(request.url).pathname
	const [baseUri, ...extensions] = pathname.split('.')

	if (baseUri.endsWith(ScriptWithoutExtension)) {
		return getScript(request, waitUntil, extensions)
	} else if (pathname.endsWith(Endpoint)) {
		return postData(request)
	}
	return new Response(null, { status: 404 })
}

async function getScript(request, waitUntil, extensions) {
	let response = await caches.default.match(request)
	if (!response) {
		response = await fetch('https://plausible.io/js/plausible.' + extensions.join('.'))
		waitUntil(caches.default.put(request, response.clone()))
	}
	return response
}

async function postData(req) {
	const request = new Request(req)
	request.headers.delete('cookie')
	return await fetch('https://plausible.io/api/event', request)
}
