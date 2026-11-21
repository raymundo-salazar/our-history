import { useCallback, useState } from "react"
import { JOURNEY_STORAGE_KEY, JOURNEY_STORAGE_VERSION } from "../../domain/constants"
import type { JourneyProgress } from "../../domain/types"
import type { UseJourneyResult } from "./types"

const EMPTY_PROGRESS: JourneyProgress = { version: JOURNEY_STORAGE_VERSION, scanned: [] }

const readProgress = (): JourneyProgress => {
	try {
		const value = JSON.parse(localStorage.getItem(JOURNEY_STORAGE_KEY) ?? "null")
		if (value?.version === JOURNEY_STORAGE_VERSION && Array.isArray(value.scanned)) return value
	} catch {
		return EMPTY_PROGRESS
	}
	return EMPTY_PROGRESS
}

export const useJourney = (): UseJourneyResult => {
	const [progress, setProgress] = useState<JourneyProgress>(readProgress)

	const markScanned = useCallback((station: number) => {
		setProgress(current => {
			const next = { ...current, scanned: [...new Set([...current.scanned, station])] }
			localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(next))
			return next
		})
	}, [])

	return { progress, markScanned }
}
