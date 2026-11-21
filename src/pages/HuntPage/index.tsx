import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { HintCarousel } from "../../componentes/molecules/HintCarousel"
import { HintActions } from "../../componentes/molecules/HintActions"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import { stations } from "../../content"
import { HINT_COUNT } from "../../domain/constants"
import { useJourney } from "../../hooks/useJourney"
import { FIRST_HINT_LABEL, HUNT_TITLE, HUNT_TOTAL, NEXT_HINT_LABEL, NEXT_TITLE } from "./constants"

export const HuntPage = () => {
	const { stationId = "1" } = useParams()

	return <HuntPageContent key={stationId} stationId={stationId} />
}

type HuntPageContentProps = {
	stationId: string
}

const HuntPageContent = ({ stationId }: HuntPageContentProps) => {
	const navigate = useNavigate()
	const location = useLocation()
	const stationIndex = Math.max(0, Number(stationId) - 1)
	const station = stations[stationIndex]
	const { nextChapter, progress, unlockHint } = useJourney()
	const [hintLevel, setHintLevel] = useState(0)
	const [hintDirection, setHintDirection] = useState<"forward" | "back">("forward")
	const [previousHintLevel, setPreviousHintLevel] = useState<number | null>(null)
	const [revealedHintCount, setRevealedHintCount] = useState(() =>
		Math.min(HINT_COUNT, Math.max(1, progress.hintLevels[String(stationIndex)] ?? 1))
	)
	const isOutOfOrder = stationIndex + 1 !== nextChapter

	useEffect(() => {
		if (previousHintLevel === null) return
		const timeout = window.setTimeout(() => setPreviousHintLevel(null), 300)
		return () => window.clearTimeout(timeout)
	}, [previousHintLevel])

	useEffect(() => {
		if (!station || isOutOfOrder) navigate(`/pista/${nextChapter}`, { replace: true })
	}, [isOutOfOrder, navigate, nextChapter, station])

	if (!station) return null
	if (isOutOfOrder) return null

	const hasMoreHints = revealedHintCount < station.searchHints.length
	const hasRevealedExtraHints = revealedHintCount > 1
	const canGoForward = hintLevel < revealedHintCount - 1
	const changeHint = (nextLevel: number, direction: "forward" | "back") => {
		if (previousHintLevel !== null || nextLevel === hintLevel) return
		setHintDirection(direction)
		setPreviousHintLevel(hintLevel)
		setHintLevel(nextLevel)
	}
	const revealNextHint = () => {
		if (!hasMoreHints) return
		changeHint(revealedHintCount, "forward")
		setRevealedHintCount(count => count + 1)
		unlockHint(stationIndex, revealedHintCount + 1)
	}

	const renderHintCard = (level: number, animation: string, key: string) => (
		<div
			key={key}
			className={`rounded-[28px] border border-white/25 bg-white/10 p-6 ${animation}`}
		>
			<div className="space-y-4 text-base leading-8 text-[#f5dfec]">
				{station.searchHints[level].split("\n\n").map(paragraph => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>
			{stationIndex === 3 && (
				<p className="mt-5 border-t border-white/15 pt-5 text-sm font-bold leading-6 text-[#f5b7d1]">
					Antes de buscar, asegúrate de que el horno esté apagado y completamente frío
				</p>
			)}
		</div>
	)

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
					<div className="relative overflow-hidden rounded-[28px]">
						{renderHintCard(
							hintLevel,
							hintDirection === "back"
								? "animate-[slide-back-in_300ms_ease_both]"
								: "animate-[slide-forward-in_300ms_ease_both]",
							`current-${station.id}-${hintLevel}`
						)}
						{previousHintLevel !== null && (
							<div className="absolute inset-0 z-10">
								{renderHintCard(
									previousHintLevel,
									hintDirection === "back"
										? "animate-[slide-back-out_300ms_ease_both]"
										: "animate-[slide-forward-out_300ms_ease_both]",
									`previous-${station.id}-${previousHintLevel}`
								)}
							</div>
						)}
					</div>
					{hasRevealedExtraHints && (
						<HintCarousel
							canGoBack={hintLevel > 0}
							canGoForward={canGoForward}
							onBack={() => changeHint(Math.max(0, hintLevel - 1), "back")}
							onForward={() =>
								changeHint(
									Math.min(station.searchHints.length - 1, hintLevel + 1),
									"forward"
								)
							}
						/>
					)}
				</div>
				{hasRevealedExtraHints && (
					<div
						className="mt-5 flex min-h-2 items-center justify-center gap-2"
						aria-label={`Ayudas desbloqueadas: ${revealedHintCount}`}
					>
						{Array.from({ length: revealedHintCount }, (_, index) => (
							<span
								key={index}
								aria-hidden="true"
								className={
									index === hintLevel
										? "h-1.5 w-6 rounded-full bg-rose"
										: "size-1.5 rounded-full bg-white/45"
								}
							/>
						))}
					</div>
				)}
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
