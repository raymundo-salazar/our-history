import type { JourneyProgress } from "../../domain/types"

export type UseJourneyResult = {
	progress: JourneyProgress
	markScanned: (station: number) => void
	unlockHint: (station: number, hintCount: number) => void
	setScreen: (station: number, screen: number) => void
	completeChapter: (station: number) => void
	solveChallenge: (station: number) => void
	finishJourney: () => void
	resetJourney: () => void
	nextChapter: number
}
