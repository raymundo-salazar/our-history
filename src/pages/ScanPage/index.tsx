import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { ScannerPanel } from "../../componentes/organisms/ScannerPanel"
import { stations } from "../../content"
import { useJourney } from "../../hooks/useJourney"
import { SCAN_TOTAL } from "./constants"

export const ScanPage = () => {
	const navigate = useNavigate()
	const { stationId = "1" } = useParams()
	const stationIndex = Number(stationId) - 1
	const station = stations[stationIndex]
	const { markScanned, progress, nextChapter } = useJourney()
	const validScanRef = useRef(false)
	const [scanNotice, setScanNotice] = useState("")
	const isOutOfOrder = stationIndex + 1 !== nextChapter

	useEffect(() => {
		if (validScanRef.current) return
		if (station && isOutOfOrder) navigate(`/pista/${nextChapter}`, { replace: true })
	}, [isOutOfOrder, navigate, nextChapter, station])

	if (!station) return null
	if (isOutOfOrder) return null

	const validateCode = (value: string) => {
		if (value === station.token) {
			validScanRef.current = true
			markScanned(stationIndex)
			navigate(`/exito/${stationId}`)
			return
		}
		if (stations.some(item => item.token === value)) {
			setScanNotice(
				"Este no es el código correcto. Escanea el QR de este capítulo para continuar."
			)
			return
		}
		if (progress.scanned.includes(stationIndex)) {
			setScanNotice("Este código ya fue escaneado. Busca el QR correcto para continuar.")
			return
		}
		setScanNotice("No reconocimos este código. Escanea el QR correcto para continuar.")
	}

	return (
		<main className="min-h-dvh bg-[#19131d] text-white">
			<div className="relative z-20 min-h-dvh px-6 pt-[calc(env(safe-area-inset-top)+24px)] pb-[calc(env(safe-area-inset-bottom)+24px)] sm:px-10">
				<ProgressIndicator current={stationIndex} total={SCAN_TOTAL} />
				<ScannerPanel
					stationId={stationId}
					scanNotice={scanNotice}
					onDismissNotice={() => setScanNotice("")}
					onBack={() => navigate(`/pista/${stationId}`, { state: { direction: "back" } })}
					onCode={validateCode}
				/>
			</div>
		</main>
	)
}
