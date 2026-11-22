import { IconArrowRight } from "@tabler/icons-react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../componentes/atoms/Button"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { chapters } from "../../content"
import { useJourney } from "../../hooks/useJourney"
import { JourneyTemplate } from "../../templates/JourneyTemplate"

const renderParagraph = (paragraph: string) =>
	paragraph.split("**").map((part, index) =>
		index % 2 === 1 ? (
			<strong key={`${paragraph}-${index}`} className="font-bold text-ink">
				{part}
			</strong>
		) : (
			<span key={`${paragraph}-${index}`}>{part}</span>
		)
	)

export const ChapterHistoryPage = () => {
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

	const nextPath = stationIndex === 5 ? "/pista/6" : `/pista/${stationIndex + 2}`

	return (
		<JourneyTemplate>
			<ProgressIndicator current={chapter.id} total={6} />
			<p className="text-[11px] font-bold uppercase tracking-[.2em] text-plum">
				Una carta para ti
			</p>
			<h1 className="mt-5 font-display text-[clamp(38px,10vw,54px)] leading-[1.12]">
				{chapter.narrativeTitle}
			</h1>
			<div className="mt-6 rounded-[30px] bg-white/80 p-6 shadow-soft">
				<div className="space-y-4 text-base leading-[1.85] text-muted">
					{chapter.narrativeBody.split("\n\n").map(paragraph => (
						<p key={paragraph}>{renderParagraph(paragraph)}</p>
					))}
				</div>
			</div>
			<Button fullWidth className="mt-8" onClick={() => navigate(nextPath)}>
				{chapter.id === 6 ? "Una última cosa..." : "Siguiente pista"}{" "}
				<IconArrowRight size={18} stroke={1.8} aria-hidden="true" />
			</Button>
		</JourneyTemplate>
	)
}
