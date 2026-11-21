import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../componentes/atoms/Button"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { ChoiceList } from "../../componentes/molecules/ChoiceList"
import { WordOrderGame } from "../../componentes/molecules/WordOrderGame"
import { FinalReveal } from "../../componentes/organisms/FinalReveal"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import { stations } from "../../content"
import { STATION_ANSWER, STATION_OPTIONS, STATION_TOTAL } from "./constants"

export const StationPage = () => {
	const navigate = useNavigate()
	const { stationId = "1" } = useParams()
	const stationIndex = Number(stationId) - 1
	const station = stations[stationIndex]
	const [words, setWords] = useState<string[]>([])
	const [answer, setAnswer] = useState("")
	const [revealStep, setRevealStep] = useState(1)

	if (!station) return null
	const isWordGameCorrect = words.join(" ") === "Mi lugar favorito es contigo"
	const isAnswerCorrect = answer === STATION_ANSWER
	const isFinal = stationIndex === 5
	const canContinue =
		stationIndex === 2 ? isWordGameCorrect : stationIndex === 4 ? isAnswerCorrect : true

	return (
		<JourneyTemplate dark={isFinal}>
			<ProgressIndicator current={stationIndex + 1} total={STATION_TOTAL} />
			<div className="text-xs font-semibold tracking-[0.18em] text-[#9d6674]">
				ESTACIÓN {station.label}
			</div>
			<h1 className="mt-4 font-display text-4xl leading-tight tracking-[-0.035em]">
				{station.intro}
			</h1>
			<p className="mt-5 text-base leading-7">{station.body}</p>
			{stationIndex === 2 && <WordOrderGame value={words} onChange={setWords} />}
			{stationIndex === 4 && (
				<ChoiceList value={answer} options={STATION_OPTIONS} onChange={setAnswer} />
			)}
			{isFinal ? (
				<FinalReveal step={revealStep} onNext={() => setRevealStep(step => step + 1)} />
			) : (
				<>
					<p className="mt-8 font-display text-2xl leading-relaxed">
						{canContinue ? station.clue : ""}
					</p>
					<Button
						className="mt-8"
						disabled={!canContinue}
						onClick={() => navigate(`/pista/${stationIndex + 2}`)}
					>
						{stationIndex === 2 || stationIndex === 4
							? "Continuar"
							: "Ya vi esta parte de mi regalo"}
					</Button>
				</>
			)}
		</JourneyTemplate>
	)
}
