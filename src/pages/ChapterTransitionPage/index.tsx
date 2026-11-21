import { IconArrowRight } from "@tabler/icons-react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../componentes/atoms/Button"
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
		const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
			? 0
			: TRANSITION_DURATION
		const timeout = window.setTimeout(() => navigate(`/estacion/${stationId}`), duration)
		return () => window.clearTimeout(timeout)
	}, [chapter, navigate, nextChapter, progress.scanned, stationId])

	if (!chapter) return null

	return (
		<JourneyTemplate>
			<ProgressIndicator current={chapter.id} total={6} />
			<div className="flex flex-1 flex-col items-center justify-center text-center">
				<div className="grid size-28 place-items-center rounded-full border border-[#e6b8d0] bg-white/70 font-display text-6xl text-plum shadow-soft">
					{chapter.id}
				</div>
				<p className="mt-8 text-[11px] font-bold uppercase tracking-[.2em] text-plum">
					Capítulo {chapter.id} de 6
				</p>
				<h1 className="mt-5 max-w-md font-display text-[clamp(38px,10vw,56px)] leading-[1.12] tracking-[-.035em]">
					{chapter.title}
				</h1>
				<p className="mt-5 text-sm text-muted">Un pedacito más de nuestra historia ♡</p>
				<Button
					fullWidth
					className="mt-10"
					onClick={() => navigate(`/estacion/${stationId}`)}
				>
					Continuar ahora <IconArrowRight size={18} stroke={1.8} aria-hidden="true" />
				</Button>
			</div>
		</JourneyTemplate>
	)
}
