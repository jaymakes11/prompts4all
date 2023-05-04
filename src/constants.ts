export const themeStorageKey = 'prompts4all_theme'
export const isUserStorageKey = 'prompts4all_isUser'
export const userSessionStorageKey = 'prompts4all_user'
export const darkThemeClass = 'dark'
export const kvKeyPrefix = {
	// The key here should be the binding name
	Users: 'user_',
	AuthCodesByUserId: 'authCodeUserId_',
	UserIdsByEmail: 'userIdByEmail_',
	AuthSessionsByUserId: 'authSessionByUserId_',
	Prompts: 'prompt_',
}
export const promptReactionTypes = {
	like: 'like',
}
export const categories = [
	{
		slug: 'meta',
		label: 'Meta',
		overview: `Use "Meta" prompts when you want to instruct the AI on how to structure or present its responses, or to modify its behavior during the conversation. These prompts are ideal for situations where you need the AI to organize information in a specific format, such as tables or lists, or to reset its memory for a fresh start. Utilize these prompts to enhance the utility and effectiveness of the AI's output, ensuring that the information provided aligns with your requirements and preferences.`,
	},
	{
		slug: 'os',
		label: 'OS',
		overview: `Use “OS” (i.e. “Operating System”) prompts when you want the AI to act as an interactive virtual operating system, guiding users through various tasks, apps, and commands. These prompts are ideal for situations where you need the AI to engage users in dynamic and adaptive conversations, providing assistance and resources tailored to their goals. Utilize these prompts to create an immersive, user-friendly experience that helps users optimize their virtual environment and achieve their objectives.`,
	},
	{
		slug: 'role-definition',
		label: 'Role Definition',
		overview:
			'Use “Role Definition” prompts when you need the AI to focus on a specific role or expertise, providing targeted advice or insights, rather than generating general or unrelated responses. These prompts are ideal for situations where you require tailored guidance from the AI based on its assigned role, ensuring a more efficient and relevant interaction that caters to your unique needs and expectations.',
	},
	{
		slug: 'superprompt',
		label: 'SuperPrompt',
		overview: `Use “SuperPrompt” prompts when you want the AI to generate advanced, creative, or high-level responses that push the limits of its capabilities. These prompts are ideal for situations where you require the AI to think beyond its typical boundaries, delivering unconventional or innovative ideas. Engage with these prompts to harness the AI's full potential, sparking new perspectives or exploring uncharted territory in your projects or problem-solving efforts.`,
	},
	{
		slug: 'voice-definition',
		label: 'Voice Definition',
		overview:
			'Use “Voice Definition” prompts when you want the AI to adopt a specific tone, style, or level of complexity in its responses. These prompts are ideal for situations where you need the AI to communicate with a particular audience or convey information in a certain manner, ensuring that the responses are tailored to match the desired voice and effectively convey the intended message.',
	},
]
