import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { CoverPage } from "./pages/CoverPage"

import { ChapterTransitionPage } from "./pages/ChapterTransitionPage"
import { HuntPage } from "./pages/HuntPage"
import { InstructionsPage } from "./pages/InstructionsPage"
import { ScanPage } from "./pages/ScanPage"
import { ScanSuccessPage } from "./pages/ScanSuccessPage"
import { StationPage } from "./pages/StationPage"
import { StoryPage } from "./pages/StoryPage"

export const App = () => {
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
	)
}
