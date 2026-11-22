import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { CoverPage } from "./pages/CoverPage"

import { ChapterTransitionPage } from "./pages/ChapterTransitionPage"
import { HuntPage } from "./pages/HuntPage"
import { InstructionsPage } from "./pages/InstructionsPage"
import { ScanPage } from "./pages/ScanPage"
import { ScanSuccessPage } from "./pages/ScanSuccessPage"
import { StationPage } from "./pages/StationPage"
import { StoryPage } from "./pages/StoryPage"

const ScrollToTop = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" })
	}, [pathname])

	return null
}

export const App = () => {
	useEffect(() => {
		const enterFullscreen = () => {
			if (document.fullscreenElement || !document.documentElement.requestFullscreen) return

			document.documentElement
				.requestFullscreen({ navigationUI: "hide" })
				.catch(() => undefined)
		}

		window.addEventListener("pointerdown", enterFullscreen, { once: true, passive: true })
		return () => window.removeEventListener("pointerdown", enterFullscreen)
	}, [])

	useEffect(() => {
		if (!import.meta.env.DEV) return
		const demo = new URLSearchParams(window.location.search).get("demo")
		const chapter = demo === "final" ? 6 : Number(demo?.replace("chapter-", ""))
		if (!Number.isInteger(chapter) || chapter < 1 || chapter > 6) return
		localStorage.setItem(
			"nuestra-historia:v2",
			JSON.stringify({
				version: 2,
				scanned: Array.from({ length: chapter }, (_, index) => index),
				completed: Array.from({ length: Math.max(0, chapter - 1) }, (_, index) => index),
				currentScreen: {},
				challenges: {},
				finished: false,
			})
		)
	}, [])

	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<CoverPage />} />
				<Route path="/historia" element={<StoryPage />} />
				<Route path="/instrucciones" element={<InstructionsPage />} />
				<Route path="/pista/:stationId" element={<HuntPage />} />
				<Route path="/escanear/:stationId" element={<ScanPage />} />
				<Route path="/exito/:stationId" element={<ScanSuccessPage />} />
				<Route path="/transicion/:stationId" element={<ChapterTransitionPage />} />
				<Route path="/estacion/:stationId" element={<StationPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</>
	)
}
