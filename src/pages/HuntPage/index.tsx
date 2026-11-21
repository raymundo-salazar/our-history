import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { HintCarousel } from "../../componentes/molecules/HintCarousel"
import { HintActions } from "../../componentes/molecules/HintActions"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import { stations } from "../../content"
import { useJourney } from "../../hooks/useJourney"
import { FIRST_HINT_LABEL, HUNT_TITLE, HUNT_TOTAL, NEXT_HINT_LABEL, NEXT_TITLE } from "./constants"

export const HuntPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { stationId = "1" } = useParams()
	const stationIndex = Math.max(0, Number(stationId) - 1)
	const station = stations[stationIndex]
	const { nextChapter } = useJourney()
	const [hintLevel, setHintLevel] = useState(0)
	const [revealedHintCount, setRevealedHintCount] = useState(1)
	const isOutOfOrder = stationIndex + 1 !== nextChapter

	useEffect(() => {
		if (!station || isOutOfOrder) navigate(`/pista/${nextChapter}`, { replace: true })
	}, [isOutOfOrder, navigate, nextChapter, station])

	if (!station) return null
	if (isOutOfOrder) return null

	const hasMoreHints = revealedHintCount < station.searchHints.length
	const hasRevealedExtraHints = revealedHintCount > 1
	const canGoForward = hintLevel < revealedHintCount - 1
	const revealNextHint = () => {
		if (!hasMoreHints) return
		setHintLevel(revealedHintCount)
		setRevealedHintCount(count => count + 1)
	}

	return (
		<JourneyTemplate tone="challenge" back={location.state?.direction === "back"}>
			<ProgressIndicator current={stationIndex} total={HUNT_TOTAL} />
			<div className="flex flex-1 flex-col justify-center">
				<div className="text-center text-[10px] font-bold uppercase tracking-[.2em] text-[#f5b7d1]">
					{stationIndex === 0
						? FIRST_HINT_LABEL
						: `${NEXT_HINT_LABEL} ${stationIndex + 1}`}
				</div>
				<h1 className="text-center font-display text-[clamp(38px,10vw,54px)] leading-[1.12] tracking-[-.035em]">
					{stationIndex === 0 ? (
						<>
							{HUNT_TITLE} <em className="not-italic text-plum">para ti</em>
						</>
					) : (
						NEXT_TITLE
					)}
				</h1>
				<div className="relative mt-7">
					<div className="rounded-[28px] border border-white/25 bg-white/10 p-6">
						<div className="space-y-4 text-base leading-8 text-[#f5dfec]">
							{station.searchHints[hintLevel].split("\n\n").map(paragraph => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
					</div>
					{hasRevealedExtraHints && (
						<HintCarousel
							canGoBack={hintLevel > 0}
							canGoForward={canGoForward}
							onBack={() => setHintLevel(level => Math.max(0, level - 1))}
							onForward={() =>
								setHintLevel(level =>
									Math.min(station.searchHints.length - 1, level + 1)
								)
							}
						/>
					)}
				</div>
				<HintActions
					canRequestHint={hasMoreHints}
					continueLabel="Encontré el codigo QR"
					onContinue={() => navigate(`/escanear/${stationIndex + 1}`)}
					onRequestHint={revealNextHint}
				/>
			</div>
		</JourneyTemplate>
	)
}
