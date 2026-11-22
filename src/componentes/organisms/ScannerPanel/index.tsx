import { IconArrowLeft } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useQrScanner } from "./hooks/useQrScanner"
import { Button } from "../../atoms/Button"
import { IconButton } from "../../atoms/IconButton"
import { ManualCodeInput } from "../../molecules/ManualCodeInput"
import { SCANNER_COPY, SCANNER_READY, SCANNER_START, SCANNER_TITLE } from "./constants"
import type { ScannerPanelProps } from "./types"

export const ScannerPanel = ({
	stationId,
	onBack,
	onCode,
	manualCode,
	onManualCodeChange,
	notice,
}: ScannerPanelProps) => {
	const [cameraNotice, setCameraNotice] = useState("")
	const { videoRef, started, start, stop } = useQrScanner({ onCode, onError: setCameraNotice })

	useEffect(() => {
		void start()
	}, [start])

	return (
		<div className="relative z-10 flex min-h-[calc(100dvh-8rem)] flex-col">
			<div className="relative z-20 flex items-center justify-between">
				<IconButton
					className="min-h-11 rounded-full bg-black/30 px-3 text-white/80"
					onClick={() => {
						stop()
						onBack()
					}}
					aria-label="Volver a la pista"
				>
					<IconArrowLeft size={18} stroke={1.8} aria-hidden="true" />
				</IconButton>
			</div>
			<p className="relative z-20 mt-8 text-center text-[10px] font-bold uppercase tracking-[.2em] text-[#f5b7d1]">
				CAPÍTULO {String(stationId ?? "").padStart(2, "0")} DE 06
			</p>
			<h2 className="relative z-20 mt-2 text-center font-display text-[clamp(36px,10vw,48px)] leading-tight text-white">
				{SCANNER_TITLE}
			</h2>
			<p className="relative z-20 mt-3 text-center text-sm leading-7 text-white/75">
				{SCANNER_COPY}
			</p>
			<div className="scanner-viewport fixed inset-0 z-0 grid min-h-dvh place-items-center overflow-hidden bg-[#19131d] text-xs text-white/70">
				<video
					ref={videoRef}
					className="absolute inset-0 z-0 h-full w-full object-cover"
					autoPlay
					playsInline
					muted
				/>
				<div className="scanner-mask-panel scanner-mask-top" />
				<div className="scanner-mask-panel scanner-mask-bottom" />
				<div className="scanner-mask-panel scanner-mask-left" />
				<div className="scanner-mask-panel scanner-mask-right" />
				<div className="relative z-20 size-56 max-h-[70vw] max-w-[70vw] rounded-[30px] border-[3px] border-[#f3a2bb] bg-transparent" />
				<span className="absolute inset-x-0 bottom-4 z-20 text-center">
					{SCANNER_READY}
				</span>
			</div>
			<Button fullWidth className="mt-auto" onClick={start} disabled={started}>
				{SCANNER_START}
			</Button>
			<ManualCodeInput
				value={manualCode}
				onChange={onManualCodeChange}
				onSubmit={() => onCode(manualCode)}
			/>
			{(notice || cameraNotice) && (
				<div className="mt-5 rounded-2xl bg-white/10 p-4 text-center text-sm text-[#f5dfec]">
					{notice || cameraNotice}
				</div>
			)}
		</div>
	)
}
