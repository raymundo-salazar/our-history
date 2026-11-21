import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { HintActions } from "../../componentes/molecules/HintActions"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import { stations } from "../../content"
import { FIRST_HINT_LABEL, HUNT_TITLE, HUNT_TOTAL, NEXT_HINT_LABEL, NEXT_TITLE } from "./constants"

export const HuntPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { stationId = "1" } = useParams()
	const stationIndex = Math.max(0, Number(stationId) - 1)
	const station = stations[stationIndex]
	const [hintLevel, setHintLevel] = useState(0)

	if (!station) return null

	const hasMoreHints = hintLevel < station.searchHints.length - 1

	return (
		<JourneyTemplate back={location.state?.direction === "back"}>
			<ProgressIndicator current={stationIndex} total={HUNT_TOTAL} />
			<div className="text-xs font-semibold tracking-[0.18em] text-[#9d6674]">
				{stationIndex === 0 ? FIRST_HINT_LABEL : `${NEXT_HINT_LABEL} ${stationIndex + 1}`}
			</div>
			<h1 className="mt-4 font-display text-4xl leading-tight tracking-[-0.035em]">
				{stationIndex === 0 ? HUNT_TITLE : NEXT_TITLE}
			</h1>
			<p className="mt-6 font-display text-2xl leading-relaxed">
				{station.searchHints[hintLevel]}
			</p>
			<HintActions
				canRequestHint={hasMoreHints}
				continueLabel={hasMoreHints ? "Ya sé dónde buscar" : "Abrir lector QR"}
				onContinue={() => navigate(`/escanear/${stationIndex + 1}`)}
				onRequestHint={() => setHintLevel(level => level + 1)}
			/>
		</JourneyTemplate>
	)
}
