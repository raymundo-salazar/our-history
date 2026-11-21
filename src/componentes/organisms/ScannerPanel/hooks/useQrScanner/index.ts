import { BrowserMultiFormatReader } from "@zxing/browser"
import { useEffect, useRef, useState } from "react"
import { CAMERA_ERROR } from "./constants"
import type { UseQrScannerProps } from "./types"

export const useQrScanner = ({ onCode, onError }: UseQrScannerProps) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const controlsRef = useRef<{ stop: () => void } | null>(null)
	const activeRef = useRef(false)
	const [started, setStarted] = useState(false)

	const stop = () => {
		activeRef.current = false
		controlsRef.current?.stop()
		controlsRef.current = null
		const stream = videoRef.current?.srcObject
		if (stream instanceof MediaStream) stream.getTracks().forEach(track => track.stop())
		if (videoRef.current) videoRef.current.srcObject = null
		setStarted(false)
	}

	const start = async () => {
		activeRef.current = true
		setStarted(true)
		try {
			const reader = new BrowserMultiFormatReader()
			const controls = await reader.decodeFromConstraints(
				{ video: { facingMode: { ideal: "environment" } } },
				videoRef.current ?? undefined,
				result => {
					if (!result || !activeRef.current) return
					stop()
					onCode(result.getText())
				}
			)
			if (activeRef.current) controlsRef.current = controls
			else controls.stop()
		} catch {
			if (activeRef.current) {
				setStarted(false)
				onError(CAMERA_ERROR)
			}
		}
	}

	useEffect(() => stop, [])

	return { videoRef, started, start, stop }
}
