import * as utils from '../_utils'
import { kvKeyPrefix } from '../../src/constants'

export async function onRequestGet({ request, env }) {
	try {
		const { searchParams } = new URL(request.url)
		const promptId = searchParams.get('promptId')

		if (!promptId) {
			return utils.returnErrorIfMissingRequiredParams()
		}

		/* 

		Get Prompt with metadata

		*/

		const maybeExistingPromptResp = await env.Prompts.getWithMetadata(kvKeyPrefix.Prompts + promptId)

		if (!maybeExistingPromptResp) {
			return utils.returnError(404)
		}

		/* 
		
		Return successful response
		
		*/

		return new Response(JSON.stringify({ prompt: maybeExistingPromptResp }), {
			status: 200,
		})
	} catch (error) {
		utils.returnError(500, error)
	}
}
