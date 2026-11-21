import { BrowserQRCodeReader } from "@zxing/browser"
import { useCallback, useEffect, useRef, useState } from "react"
import { CAMERA_ERROR, CAMERA_PERMISSION_ERROR, CAMERA_UNSUPPORTED_ERROR } from "./constants"
import type { UseQrScannerProps } from "./types"

export const useQrScanner = ({ onCode, onError }: UseQrScannerProps) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const controlsRef = useRef<{ stop: () => void } | null>(null)
	const activeRef = useRef(false)
	const onCodeRef = useRef(onCode)
	const onErrorRef = useRef(onError)
	const [started, setStarted] = useState(false)
	useEffect(() => {
		onCodeRef.current = onCode
		onErrorRef.current = onError
	}, [onCode, onError])

	const stop = useCallback(() => {
		activeRef.current = false
		controlsRef.current?.stop()
		controlsRef.current = null
		const stream = videoRef.current?.srcObject
		if (typeof MediaStream !== "undefined" && stream instanceof MediaStream) {
			stream.getTracks().forEach(track => track.stop())
		}
		if (videoRef.current) videoRef.current.srcObject = null
		setStarted(false)
	}, [])

	const start = useCallback(async () => {
		if (activeRef.current) return
		if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
			onErrorRef.current(CAMERA_UNSUPPORTED_ERROR)
			return
		}

		activeRef.current = true
		setStarted(true)
		let stream: MediaStream | null = null
		try {
			stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {
					facingMode: { ideal: "environment" },
					width: { ideal: 1280 },
					height: { ideal: 720 },
				},
			})
			const video = videoRef.current
			if (!video) throw new Error("Video preview is unavailable")

			video.srcObject = stream
			video.muted = true
			video.playsInline = true
			await video.play()

			const reader = new BrowserQRCodeReader()
			const controls = await reader.decodeFromStream(stream, video, result => {
				if (!result || !activeRef.current) return
				stop()
				onCodeRef.current(result.getText())
			})
			if (activeRef.current) controlsRef.current = controls
			else controls.stop()
		} catch (error) {
			stream?.getTracks().forEach(track => track.stop())
			if (activeRef.current) {
				setStarted(false)
				onErrorRef.current(
					error instanceof DOMException && error.name === "NotAllowedError"
						? CAMERA_PERMISSION_ERROR
						: CAMERA_ERROR
				)
			}
		}
	}, [stop])

	useEffect(() => stop, [stop])

	return { videoRef, started, start, stop }
}
