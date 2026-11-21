import type { JourneyProgress } from "../../domain/types"

export type UseJourneyResult = {
	progress: JourneyProgress
	markScanned: (station: number) => void
	setScreen: (station: number, screen: number) => void
	completeChapter: (station: number) => void
	solveChallenge: (station: number) => void
	finishJourney: () => void
	nextChapter: number
}
