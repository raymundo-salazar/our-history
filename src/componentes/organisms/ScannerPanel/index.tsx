import { IconArrowLeft } from "@tabler/icons-react"
import { useState } from "react"
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

	return (
		<div className="flex min-h-[calc(100dvh-8rem)] flex-col">
			<div className="flex items-center justify-between">
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
				<span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#f5b7d1]">
					Capítulo {stationId ?? ""} de 6
				</span>
			</div>
			<h2 className="mt-8 text-center font-display text-[clamp(36px,10vw,48px)] leading-tight text-white">
				{SCANNER_TITLE}
			</h2>
			<p className="mt-3 text-center text-sm leading-7 text-white/75">{SCANNER_COPY}</p>
			<div className="relative mx-6 my-7 grid h-[min(62vw,320px)] min-h-56 place-items-center overflow-hidden rounded-[30px] bg-[#19131d] text-xs text-white/70 shadow-[0_0_0_999px_#19131d]">
				<video
					ref={videoRef}
					className="absolute inset-0 h-full w-full object-cover"
					playsInline
					muted
				/>
				<div className="relative z-10 size-56 max-h-[70vw] max-w-[70vw] rounded-[30px] border-[3px] border-[#f3a2bb] bg-white/5 shadow-[0_0_0_999px_#0006]" />
				<span className="absolute bottom-4 z-10">{SCANNER_READY}</span>
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
				<div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm text-[#f5dfec]">
					{notice || cameraNotice}
				</div>
			)}
		</div>
	)
}
