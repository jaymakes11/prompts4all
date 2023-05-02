import { getRandomInt } from '../../src/utils'
import * as utils from '../_utils'
import { kvKeyPrefix } from '../../src/constants'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 13)

export async function onRequestPost({ request, env }) {
	try {
		const { searchParams } = new URL(request.url)
		const email = searchParams.get('email')

		if (!email) {
			return utils.returnErrorIfMissingRequiredParams()
		}

		/*
      Step 1. Check for existing user
         - If user exists, do not create a new one.
         - If user does NOT exist, create a new one.
      */

		let userId

		const maybeExistingUserId = await env.UserIdsByEmail.get(kvKeyPrefix.UserIdsByEmail + email)

		if (maybeExistingUserId) {
			userId = maybeExistingUserId
		} else {
			userId = nanoid()

			await env.Users.put(
				kvKeyPrefix.Users + userId,
				JSON.stringify({
					id: userId,
					email: email,
					createdAt: Date.now(),
				}),
			)

			await env.UserIdsByEmail.put(kvKeyPrefix.UserIdsByEmail + email, userId)
		}

		/* 
      2. Create auth code and save it to KV store

      Note: If an existing auth code exists for this user, this will update its TTL value (it will not recreate it).
            The thinking here is that it's a preferrable UX, since this ensures that even old auth codes that are still 
            valid and have not yet been used will still work.
   	*/

		let maybeExistingUserAuthCode
		if (maybeExistingUserId) {
			maybeExistingUserAuthCode = await env.AuthCodesByUserId.get(
				kvKeyPrefix.AuthCodesByUserId + maybeExistingUserId,
			)
		}

		const authCode = maybeExistingUserAuthCode || getRandomInt(10000, 99999).toString()
		const authCodeValidInMinutes = 15

		await env.AuthCodesByUserId.put(
			kvKeyPrefix.AuthCodesByUserId + userId,
			// Note: If we need to store any info about this, maybe the meta feature is the best for it?
			authCode,
			// Note: `expirationTtl` is in seconds.
			{ expirationTtl: authCodeValidInMinutes * 60 },
		)

		/*
      3. Send email with auth code
   	*/

		// Mailchannels (this will only work directly from a deployed worker, not locally)... supposedly free when coming from cloudflare workers...?
		try {
			if (!utils.isLocal(request)) {
				await fetch('https://api.mailchannels.net/tx/v1/send', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify({
						personalizations: [{ to: [{ email }] }],
						from: {
							email: 'hello@prompts4all.com',
							name: 'Prompts4All',
						},
						subject: `🔑 Prompts4All - Your secure access code is ${authCode}`,
						content: [
							{
								type: 'text/plain',
								value: `\n\nYour secure access code is:\n\n${authCode}\n\nFor security reasons, this will only work for the next ${authCodeValidInMinutes} minutes. \n\n---\n\nHave questions or comments? Need help? Simply reply to this email.\n\n---\n\nDidn't make this request? You can safely delete this email.\n\nSent to ${email}`,
							},
						],
					}),
				})
			}
		} catch (error) {
			return utils.returnError(500, error)
		}

		/*
      Return successful response
      */

		return new Response(JSON.stringify({ status: 'success', message: `Sent auth email` }), {
			status: 200,
		})
	} catch (error) {
		utils.returnError(500, error)
	}
}
