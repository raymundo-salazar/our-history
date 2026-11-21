import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import { chapters } from "../../content"
import { TRANSITION_DURATION } from "../../domain/constants"
import { useJourney } from "../../hooks/useJourney"

export const ChapterTransitionPage = () => {
	const navigate = useNavigate()
	const { stationId = "1" } = useParams()
	const chapter = chapters[Number(stationId) - 1]
	const { progress, nextChapter } = useJourney()

	useEffect(() => {
		if (!chapter || !progress.scanned.includes(Number(stationId) - 1)) {
			navigate(`/pista/${nextChapter}`, { replace: true })
			return
		}
		const duration = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
			? 0
			: TRANSITION_DURATION
		const timeout = window.setTimeout(() => navigate(`/estacion/${stationId}`), duration)
		return () => window.clearTimeout(timeout)
	}, [chapter, navigate, nextChapter, progress.scanned, stationId])

	if (!chapter) return null

	return (
		<JourneyTemplate>
			<ProgressIndicator current={chapter.id} total={6} />
			<div
				className="flex flex-1 cursor-pointer flex-col items-center justify-center text-center"
				tabIndex={0}
				role="button"
				aria-label="Continuar al capítulo"
				onClick={() => navigate(`/estacion/${stationId}`)}
				onKeyDown={event => {
					if (event.key === "Enter" || event.key === " ") {
						event.preventDefault()
						navigate(`/estacion/${stationId}`)
					}
				}}
			>
				<div className="grid size-28 place-items-center rounded-full border border-[#e6b8d0] bg-white/70 font-display text-6xl text-plum shadow-soft">
					{String(chapter.id).padStart(2, "0")}
				</div>
				<p className="mt-8 text-[11px] font-bold uppercase tracking-[.2em] text-plum">
					CAPÍTULO {String(chapter.id).padStart(2, "0")} DE 06
				</p>
				<h1 className="mt-5 max-w-md font-display text-[clamp(38px,10vw,56px)] leading-[1.12] tracking-[-.035em]">
					{chapter.transitionTitle}
				</h1>
				<p className="mt-5 max-w-md text-sm leading-7 text-muted">
					{chapter.transitionPhrase}
				</p>
			</div>
		</JourneyTemplate>
	)
}
