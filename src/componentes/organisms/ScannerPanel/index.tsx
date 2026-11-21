import { IconArrowLeft } from "@tabler/icons-react"
import { useState } from "react"
import { useQrScanner } from "./hooks/useQrScanner"
import { Button } from "../../atoms/Button"
import { IconButton } from "../../atoms/IconButton"
import { ManualCodeInput } from "../../molecules/ManualCodeInput"
import { SCANNER_COPY, SCANNER_READY, SCANNER_START, SCANNER_TITLE } from "./constants"
import type { ScannerPanelProps } from "./types"

export const ScannerPanel = ({
	onBack,
	onCode,
	manualCode,
	onManualCodeChange,
	notice,
}: ScannerPanelProps) => {
	const [cameraNotice, setCameraNotice] = useState("")
	const { videoRef, started, start, stop } = useQrScanner({ onCode, onError: setCameraNotice })

	return (
		<div>
			<div className="mb-7 flex items-center justify-center">
				<IconButton
					onClick={() => {
						stop()
						onBack()
					}}
					aria-label="Volver a la pista"
				>
					<IconArrowLeft size={18} stroke={1.8} aria-hidden="true" /> Volver
				</IconButton>
				<span className="text-xs font-semibold tracking-[0.18em] text-[#9d6674]">
					ESCANEAR
				</span>
			</div>
			<h2 className="font-display text-4xl leading-tight tracking-[-0.035em]">
				{SCANNER_TITLE}
			</h2>
			<p className="mt-5 text-base leading-7">{SCANNER_COPY}</p>
			<div className="relative my-6 grid h-[310px] place-items-center overflow-hidden rounded-sm bg-[#1f1820] text-xs text-[#e8d9d1]">
				<video
					ref={videoRef}
					className="absolute inset-0 h-full w-full object-cover"
					playsInline
					muted
				/>
				<div className="relative z-10 h-48 w-48 border border-[#f8eee3] shadow-[0_0_0_999px_#0006]" />
				<span className="absolute bottom-4 z-10">{SCANNER_READY}</span>
			</div>
			<Button fullWidth onClick={start} disabled={started}>
				{SCANNER_START}
			</Button>
			<ManualCodeInput
				value={manualCode}
				onChange={onManualCodeChange}
				onSubmit={() => onCode(manualCode)}
			/>
			{(notice || cameraNotice) && (
				<div className="mt-5 border-l-4 border-[#a96a7a] bg-[#eadbd4] p-4 text-sm">
					{notice || cameraNotice}
				</div>
			)}
		</div>
	)
}
