export type Station = {
	id: number
	token: string
	label: string
	intro: string
	searchHints: string[]
	body: string
	clue: string
}

export type JourneyProgress = {
	version: number
	scanned: number[]
	completed: number[]
	currentScreen: Record<string, number>
	challenges: Record<string, boolean>
	finished: boolean
}
