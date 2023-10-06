import { parse } from 'cookie'

export const getAuthSessionCookieOr404 = (request) => {
	const cookies = parse(request.headers.get('cookie') || '')

	if (cookies.prompts4all_authSession) {
		return JSON.parse(cookies.prompts4all_authSession)
	}

	if (!cookies.prompts4all_authSession) {
		return returnError(400, { message: 'Not allowed.' })
	}
}

export const isLocal = (request) => {
	const { href } = new URL(request.url)
	return href.includes('http://127.0.0.1:4321')
}

export function returnError(code, errorMessage = '') {
	console.log(errorMessage)
	return new Response(JSON.stringify(errorMessage), {
		status: code,
	})
}

export function returnErrorIfMissingRequiredParams() {
	return returnError(422, 'missing required param(s)!')
}
