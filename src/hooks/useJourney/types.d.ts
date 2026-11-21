import type { JourneyProgress } from "../../domain/types"

export type UseJourneyResult = {
	progress: JourneyProgress
	markScanned: (station: number) => void
}
