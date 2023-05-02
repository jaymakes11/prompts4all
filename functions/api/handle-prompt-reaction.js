import * as utils from '../_utils'
import { kvKeyPrefix } from '../../src/constants'

export async function onRequestPost({ request, env }) {
	try {
		const { searchParams } = new URL(request.url)
		const promptId = searchParams.get('promptId')
		const reactionType = searchParams.get('type')

		if (!promptId || !reactionType) {
			return utils.returnErrorIfMissingRequiredParams()
		}

		const { userId } = utils.getAuthSessionCookieOr404(request)
		const userResp = await env.Users.get(kvKeyPrefix.Users + userId)

		if (!userResp) {
			return utils.returnError(405, { message: 'No user found.' })
		}

		const user = JSON.parse(userResp)

		/* 

		Prepare Update for User 

		*/

		if (!user.reactions) {
			user.reactions = {}
		}

		if (!user.reactions[reactionType]) {
			user.reactions[reactionType] = []
		}

		const userAlreadyMadeThisReactionToThisPrompt = user.reactions[reactionType].includes(promptId)

		if (userAlreadyMadeThisReactionToThisPrompt) {
			user.reactions[reactionType] = user.reactions[reactionType].filter((item) => item !== promptId)
		} else {
			user.reactions[reactionType].push(promptId)
		}

		/* 

		Prepare Update for Prompt 

		*/

		let promptMetadataForUpdate

		const maybeExistingPrompt = await env.Prompts.getWithMetadata(kvKeyPrefix.Prompts + promptId)

		if (maybeExistingPrompt && maybeExistingPrompt.metadata) {
			if (!maybeExistingPrompt.metadata.reactions) {
				maybeExistingPrompt.metadata.reactions = {}
			}

			maybeExistingPrompt.metadata.reactions[reactionType] = userAlreadyMadeThisReactionToThisPrompt
				? maybeExistingPrompt.metadata.reactions[reactionType] - 1
				: maybeExistingPrompt.metadata.reactions[reactionType] + 1

			promptMetadataForUpdate = maybeExistingPrompt.metadata
		} else {
			const reactions = {}
			reactions[reactionType] = 1
			promptMetadataForUpdate = { reactions }
		}

		/* 
		
		Perform updates 
		&
		Return successful response
		
		*/

		return Promise.all([
			env.Users.put(kvKeyPrefix.Users + userId, JSON.stringify(user)),
			env.Prompts.put(kvKeyPrefix.Prompts + promptId, '', {
				metadata: promptMetadataForUpdate,
			}),
		]).then(() => {
			return new Response(
				JSON.stringify({ status: 'success', user, prompt: { value: '', metadata: promptMetadataForUpdate } }),
				{
					status: 200,
				},
			)
		})
	} catch (error) {
		utils.returnError(500, error)
	}
}
