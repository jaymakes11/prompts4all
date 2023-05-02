import * as utils from '../_utils'
import { kvKeyPrefix } from '../../src/constants'

export async function onRequestGet({ request, env }) {
	try {
		const { userId } = utils.getAuthSessionCookieOr404(request)
		const userResp = await env.Users.get(kvKeyPrefix.Users + userId)

		if (!userResp) {
			return utils.returnError(400, { message: 'No user found' })
		}

		return new Response(userResp, {
			status: 200,
		})
	} catch (error) {
		utils.returnError(500, error)
	}
}
