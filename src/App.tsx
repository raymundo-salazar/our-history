import { Navigate, Route, Routes } from "react-router-dom"
import { CoverPage } from "./pages/CoverPage"

import { ChapterTransitionPage } from "./pages/ChapterTransitionPage"
import { HuntPage } from "./pages/HuntPage"
import { InstructionsPage } from "./pages/InstructionsPage"
import { ScanPage } from "./pages/ScanPage"
import { ScanSuccessPage } from "./pages/ScanSuccessPage"
import { StationPage } from "./pages/StationPage"
import { StoryPage } from "./pages/StoryPage"

export const App = () => (
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
