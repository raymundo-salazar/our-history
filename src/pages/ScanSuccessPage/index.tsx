import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import { SUCCESS_DURATION } from "../../domain/constants"
import { chapters } from "../../content"
import { useJourney } from "../../hooks/useJourney"

export const ScanSuccessPage = () => {
	const navigate = useNavigate()
	const { stationId = "1" } = useParams()
	const chapter = chapters[Number(stationId) - 1]
	const { progress, nextChapter } = useJourney()

	useEffect(() => {
		if (!chapter || !progress.scanned.includes(Number(stationId) - 1)) {
			navigate(`/pista/${nextChapter}`, { replace: true })
			return
		}
		const timeout = window.setTimeout(
			() => navigate(`/transicion/${stationId}`),
			SUCCESS_DURATION
		)
		return () => window.clearTimeout(timeout)
	}, [chapter, navigate, nextChapter, progress.scanned, stationId])

	if (!chapter) return null

	return (
		<JourneyTemplate>
			<div className="flex flex-1 flex-col items-center justify-center text-center">
				<div className="grid size-28 animate-[pulse_1.7s_ease-in-out] place-items-center rounded-full bg-[#fce1ec] text-6xl text-plum shadow-[0_0_0_18px_#fce1ec66]">
					✓
				</div>
				<p className="mt-8 text-[11px] font-bold uppercase tracking-[.2em] text-plum">
					Pista encontrada
				</p>
				<h1 className="mt-5 font-display text-4xl">¡Lo lograste, cielo!</h1>
				<p className="mt-3 text-sm text-muted">Un capítulo más de nuestra historia ♡</p>
			</div>
		</JourneyTemplate>
	)
}
