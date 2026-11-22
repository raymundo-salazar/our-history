import { IconArrowRight, IconHeart } from "@tabler/icons-react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../componentes/atoms/Button"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { chapters } from "../../content"
import { useJourney } from "../../hooks/useJourney"
import { JourneyTemplate } from "../../templates/JourneyTemplate"

const detailCopy = (chapterId: number) =>
	chapterId === 2 || chapterId === 4 ? "Un descubrimiento especial" : "Un pequeño detalle"

export const StationPage = () => {
	const navigate = useNavigate()
	const { stationId = "1" } = useParams()
	const stationIndex = Number(stationId) - 1
	const chapter = chapters[stationIndex]
	const { progress, nextChapter } = useJourney()

	useEffect(() => {
		if (!chapter || !progress.scanned.includes(stationIndex)) {
			navigate(`/pista/${nextChapter}`, { replace: true })
		}
	}, [chapter, navigate, nextChapter, progress.scanned, stationIndex])

	if (!chapter || !progress.scanned.includes(stationIndex)) return null

	return (
		<JourneyTemplate tone="discovery">
			<ProgressIndicator current={chapter.id} total={6} />
			<div className="flex flex-1 flex-col justify-center">
				<div className="grid size-16 place-items-center rounded-full bg-[#f9e0ea] text-3xl text-plum">
					<IconHeart size={30} fill="currentColor" aria-hidden="true" />
				</div>
				<p className="text-[11px] font-bold uppercase tracking-[.2em] text-plum">
					{detailCopy(chapter.id)}
				</p>
				<h1 className="mt-5 font-display text-[clamp(38px,10vw,54px)] leading-[1.12]">
					{chapter.detailTitle}
				</h1>
				<div className="mt-6 rounded-[28px] border border-[#f5d9e2] bg-blush p-6">
					<div className="space-y-4 text-base leading-8 text-muted">
						{chapter.detailBody.split("\n\n").map(paragraph => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</div>
				</div>
			</div>
			<Button fullWidth className="mt-8" onClick={() => navigate(`/historia/${stationId}`)}>
				{chapter.detailAction} <IconArrowRight size={18} stroke={1.8} aria-hidden="true" />
			</Button>
		</JourneyTemplate>
	)
}
