import { useCallback, useState } from "react"
import { JOURNEY_STORAGE_KEY, JOURNEY_STORAGE_VERSION } from "../../domain/constants"
import { HINT_COUNT } from "../../domain/constants"
import type { JourneyProgress } from "../../domain/types"
import type { UseJourneyResult } from "./types"

const EMPTY_PROGRESS: JourneyProgress = {
	version: JOURNEY_STORAGE_VERSION,
	scanned: [],
	completed: [],
	hintLevels: {},
	currentScreen: {},
	challenges: {},
	finished: false,
}

const readProgress = (): JourneyProgress => {
	try {
		const value = JSON.parse(localStorage.getItem(JOURNEY_STORAGE_KEY) ?? "null")
		if (value?.version === JOURNEY_STORAGE_VERSION && Array.isArray(value.scanned)) {
			return { ...EMPTY_PROGRESS, ...value }
		}
	} catch {
		return EMPTY_PROGRESS
	}
	return EMPTY_PROGRESS
}

export const useJourney = (): UseJourneyResult => {
	const [progress, setProgress] = useState<JourneyProgress>(readProgress)

	const markScanned = useCallback((station: number) => {
		const current = readProgress()
		const next = { ...current, scanned: [...new Set([...current.scanned, station])] }
		localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(next))
		setProgress(next)
	}, [])

	const unlockHint = useCallback((station: number, hintCount: number) => {
		setProgress(current => {
			const nextCount = Math.min(
				HINT_COUNT,
				Math.max(current.hintLevels[String(station)] ?? 1, hintCount)
			)
			const next = {
				...current,
				hintLevels: { ...current.hintLevels, [station]: nextCount },
			}
			localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(next))
			return next
		})
	}, [])

	const setScreen = useCallback((station: number, screen: number) => {
		setProgress(current => {
			const next = {
				...current,
				currentScreen: { ...current.currentScreen, [station]: screen },
			}
			localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(next))
			return next
		})
	}, [])

	const completeChapter = useCallback((station: number) => {
		setProgress(current => {
			const next = { ...current, completed: [...new Set([...current.completed, station])] }
			localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(next))
			return next
		})
	}, [])

	const solveChallenge = useCallback((station: number) => {
		setProgress(current => {
			const next = { ...current, challenges: { ...current.challenges, [station]: true } }
			localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(next))
			return next
		})
	}, [])

	const finishJourney = useCallback(() => {
		setProgress(current => {
			const next = { ...current, finished: true }
			localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(next))
			return next
		})
	}, [])

	const nextChapter = progress.scanned.length + 1

	return {
		progress,
		markScanned,
		unlockHint,
		setScreen,
		completeChapter,
		solveChallenge,
		finishJourney,
		nextChapter,
	}
}
