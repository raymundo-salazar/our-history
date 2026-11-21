import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { ScannerPanel } from "../../componentes/organisms/ScannerPanel"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import { stations } from "../../content"
import { useJourney } from "../../hooks/useJourney"
import { SCAN_TOTAL } from "./constants"

export const ScanPage = () => {
	const navigate = useNavigate()
	const { stationId = "1" } = useParams()
	const stationIndex = Number(stationId) - 1
	const station = stations[stationIndex]
	const { markScanned } = useJourney()
	const [manualCode, setManualCode] = useState("")
	const [notice, setNotice] = useState("")

	if (!station) return null

	const validateCode = (value: string) => {
		if (value === station.token) {
			markScanned(stationIndex)
			navigate(`/estacion/${stationId}`)
			return
		}
		setNotice("Ese código no corresponde a la estación actual.")
	}

	return (
		<JourneyTemplate>
			<ProgressIndicator current={stationIndex} total={SCAN_TOTAL} />
			<ScannerPanel
				onBack={() => navigate(`/pista/${stationId}`, { state: { direction: "back" } })}
				onCode={validateCode}
				manualCode={manualCode}
				onManualCodeChange={setManualCode}
				notice={notice}
			/>
		</JourneyTemplate>
	)
}
