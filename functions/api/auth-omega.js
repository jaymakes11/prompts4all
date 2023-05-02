import * as utils from '../_utils'
import { kvKeyPrefix } from '../../src/constants'

export async function onRequestPost({ request, env }) {
	try {
		const { searchParams } = new URL(request.url)

		const authCode = searchParams.get('code')
		const email = searchParams.get('email')

		if (!authCode || !email) {
			return utils.returnErrorIfMissingRequiredParams()
		}

		const timestamp = Date.now()

		/*
      1. Check for existence of auth code stored by the user's ID.
      */

		const userId = await env.UserIdsByEmail.get(kvKeyPrefix.UserIdsByEmail + email)

		const maybeAuthCodeFromUserId = await env.AuthCodesByUserId.get(kvKeyPrefix.AuthCodesByUserId + userId)

		if (!maybeAuthCodeFromUserId) {
			return utils.returnError(405, { message: 'Code not found.' })
		}

		/*
      2. Ensure that the auth code is correct.
      */

		if (authCode !== maybeAuthCodeFromUserId) {
			return utils.returnError(405, { message: 'No match.' })
		}

		/*
      3. Delete the code to ensure it cannot be used again.
      - This happens async in the background, since we don't need this to block the response.
      */

		env.AuthCodesByUserId.delete(kvKeyPrefix.AuthCodesByUserId + userId)

		/*
      4. Get the user's KV entry and update as needed
      */

		const userJson = await env.Users.get(kvKeyPrefix.Users + userId)
		const user = JSON.parse(userJson)

		// update user
		env.Users.put(
			kvKeyPrefix.Users + userId,
			JSON.stringify({
				lastAuthenticatedAt: timestamp,
				...user,
			}),
		)

		/*
      5. Create an entry in the Session store (async, no need to await this)
      */

		const authSessionString = JSON.stringify({
			userId: userId,
			createdAt: timestamp,
		})

		env.AuthSessionsByUserId.put(kvKeyPrefix.AuthSessionsByUserId + userId, authSessionString)

		/*
      6. Create cookies and return the response
      */

		const date10YearsFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 10))

		// Note: For CF Workers to set/delete multiple cookies, they have to be appended manually
		const headers = new Headers()

		headers.append(
			'Set-Cookie',
			`prompts4all_authSession=${authSessionString}; Expires=${date10YearsFromNow}; SameSite=None; Secure; Path=/; HttpOnly;`,
		)

		return new Response(
			JSON.stringify({
				message: 'Success.',
			}),
			{
				headers,
				status: 200,
			},
		)
	} catch (error) {
		utils.returnError(500, error)
	}
}
