import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { IconArrowRight } from "@tabler/icons-react"
import { Button } from "../../componentes/atoms/Button"
import { chapters } from "../../content"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import { useJourney } from "../../hooks/useJourney"

export const ChapterTransitionPage = () => {
	const navigate = useNavigate()
	const { stationId = "1" } = useParams()
	const chapter = chapters[Number(stationId) - 1]
	const { progress, nextChapter } = useJourney()

	useEffect(() => {
		if (!chapter || !progress.scanned.includes(Number(stationId) - 1)) {
			navigate(`/pista/${nextChapter}`, { replace: true })
			return
		}
	}, [chapter, navigate, nextChapter, progress.scanned, stationId])

	if (!chapter) return null
	const chapterNumber = String(chapter.id).padStart(2, "0")

	return (
		<JourneyTemplate tone="discovery">
			<div className="relative isolate -mx-6 flex min-h-[calc(100dvh-8rem)] flex-1 flex-col overflow-hidden bg-[#fbf6f8] px-7 pb-[max(32px,env(safe-area-inset-bottom))] pt-7 text-ink antialiased sm:-mx-10 sm:px-10">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -right-32 top-24 -z-10 h-[360px] w-[360px] rounded-full bg-[#f7dce7]/55 blur-[85px]"
				/>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -left-40 bottom-24 -z-10 h-[330px] w-[330px] rounded-full bg-[#f4e5f2]/70 blur-[85px]"
				/>

				<section
					className="relative flex flex-1 flex-col justify-center py-12"
					aria-labelledby="chapter-title"
				>
					<div className="mb-10 flex items-center gap-3">
						<span className="h-px w-10 bg-[#9d496e]/50" />
						<span className="text-[10px] font-bold uppercase tracking-[.29em] text-[#9d496e]">
							Un nuevo capítulo
						</span>
					</div>

					<div className="relative mb-4">
						<span
							aria-hidden="true"
							className="pointer-events-none absolute -left-3 -top-20 select-none font-display text-[clamp(175px,55vw,270px)] font-semibold leading-none tracking-[-.13em] text-[#eec9d8]/45"
						>
							{chapterNumber}
						</span>
						<div className="relative pt-16">
							<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e8c8d6] bg-white/70 px-4 py-2 shadow-sm shadow-[#a65378]/5">
								<span className="h-1.5 w-1.5 rounded-full bg-[#ed6d8c]" />
								<span className="text-[10px] font-bold uppercase tracking-[.17em] text-[#9d496e]">
									Capítulo {chapterNumber}{" "}
									<span className="mx-1 text-[#c9a1b2]">/</span> 06
								</span>
							</div>
							<h1
								id="chapter-title"
								className="max-w-[390px] font-display text-[clamp(46px,11.8vw,67px)] font-semibold leading-[1.08] tracking-[-.045em]"
							>
								{chapter.id === 1 ? (
									<>
										Las vueltas
										<br />
										<span className="italic text-[#9d496e]">de la vida</span>
									</>
								) : (
									chapter.transitionTitle
								)}
							</h1>
						</div>
					</div>

					<div className="mt-7 flex items-start gap-4">
						<div aria-hidden="true" className="mt-2 h-px w-9 shrink-0 bg-[#ed6d8c]" />
						<p className="max-w-[310px] text-[15px] leading-[1.9] text-[#71606f]">
							{chapter.transitionPhrase}
						</p>
					</div>

					<div
						className="mt-10 flex items-center gap-2"
						aria-label={`Capítulo ${chapter.id} de seis`}
					>
						{Array.from({ length: 6 }, (_, index) => (
							<span
								key={index}
								className={`h-[5px] rounded-full ${
									index === chapter.id - 1
										? "w-11 bg-[#ed6d8c]"
										: "w-5 bg-[#ead7df]"
								}`}
							/>
						))}
					</div>
				</section>

				<footer className="relative space-y-4">
					<Button
						fullWidth
						className="rounded-2xl bg-[#e96d8d] font-semibold shadow-[0_12px_28px_rgba(218,95,135,0.18)] hover:bg-[#d85c80]"
						onClick={() => navigate(`/estacion/${stationId}`)}
					>
						Comenzar capítulo{" "}
						<IconArrowRight size={19} stroke={1.8} aria-hidden="true" />
					</Button>
					<p className="text-center text-[11px] tracking-[.04em] text-[#aa8d9d]">
						Una historia que seguimos escribiendo ♡
					</p>
				</footer>
			</div>
		</JourneyTemplate>
	)
}
