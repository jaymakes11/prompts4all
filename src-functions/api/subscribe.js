const saveEmailToAirtable = async (emailToSave, requestFromUrl) => {
	// Note: The airtable JS client doesn't yet work in the context of workers. Using their API directly for now.

	return fetch('https://api.airtable.com/v0/app7TfK3zvx0U6D3V/emails', {
		headers: {
			Authorization: `Bearer ${AIRTABLE_API_KEY}`,
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			records: [
				{
					fields: {
						email: emailToSave,
						url: requestFromUrl,
					},
				},
			],
		}),
	})
}

export async function onRequestPost({ request }) {
	try {
		const { searchParams } = new URL(request.url)
		const email = searchParams.get('email')

		if (!email) {
			return new Response('no email passed!', {
				status: 422,
			})
		}

		const refererHeader = request.headers.get('Referer')
		let requestFromUrl
		if (refererHeader) {
			const refererUrl = new URL(refererHeader)
			requestFromUrl = refererUrl.toString()
		}

		await saveEmailToAirtable(email, requestFromUrl)

		return new Response(
			JSON.stringify({ status: 'success', message: `Successfully added the email ${email}` }),
			{
				status: 200,
			},
		)
	} catch (error) {
		console.log(error)
		return new Response(JSON.stringify(error), {
			status: 500,
		})
	}
}
