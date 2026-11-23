import { IconAlertTriangle, IconHeart } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../componentes/atoms/Button"
import { ChapterNavigation } from "../../componentes/molecules/ChapterNavigation"
import { useJourney } from "../../hooks/useJourney"
import {
	FINAL_ANNIVERSARY,
	FINAL_EYEBROW,
	FINAL_LETTER,
	FINAL_SIGNATURE,
	FINAL_SUBTITLE,
	FINAL_TITLE,
} from "./constants"

const renderParagraph = (paragraph: string) =>
	paragraph.split("**").map((part, index) =>
		index % 2 === 1 ? (
			<strong key={`${paragraph}-${index}`} className="font-bold text-ink">
				{part}
			</strong>
		) : (
			<span key={`${paragraph}-${index}`}>{part}</span>
		)
	)

export const FinalPage = () => {
	const navigate = useNavigate()
	const { progress, resetJourney } = useJourney()
	const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
	const isResettingRef = useRef(false)
	const isComplete = progress.finished && progress.completed.length === 6

	useEffect(() => {
		if (isComplete || isResettingRef.current) return
		const firstUnscanned = Array.from({ length: 6 }, (_, index) => index).find(
			index => !progress.scanned.includes(index)
		)
		navigate(firstUnscanned === undefined ? "/historia/6" : `/pista/${firstUnscanned + 1}`, {
			replace: true,
		})
	}, [isComplete, navigate, progress.scanned])

	if (!isComplete) return null

	return (
		<main className="min-h-dvh bg-[#fff7fa] text-ink">
			<div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 pb-[calc(env(safe-area-inset-bottom)+32px)] sm:px-10">
				<header className="sticky top-0 z-20 -mx-6 flex items-center justify-between bg-[#fff7fa]/95 px-6 pb-3 pt-[calc(env(safe-area-inset-top)+24px)] backdrop-blur-sm sm:-mx-10 sm:px-10">
					<img
						className="h-auto w-32 object-contain sm:w-36"
						src="/assets/gina-ray-logo.webp"
						alt="Logo de Gina y Ray"
						width="900"
						height="300"
					/>
					<span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a45177]">
						8 años · Nuestra historia
					</span>
				</header>
				<ChapterNavigation onBack={() => navigate("/historia/6")} />
				<article className="flex flex-1 flex-col py-12 text-center sm:py-16">
					<div className="mx-auto grid size-16 place-items-center rounded-full bg-[#f5b7d1] text-[#a45177] motion-safe:animate-[pulse_2.4s_ease-in-out_infinite] motion-reduce:animate-none">
						<IconHeart size={30} fill="currentColor" aria-hidden="true" />
					</div>
					<p className="mt-8 text-[10px] font-bold uppercase tracking-[.24em] text-[#a45177]">
						{FINAL_EYEBROW}
					</p>
					<h1 className="mt-4 font-display text-[clamp(42px,11vw,64px)] leading-[1.08] tracking-[-.04em] motion-safe:animate-[final-fade-up_700ms_ease-out_both] motion-reduce:animate-none">
						{FINAL_TITLE}
					</h1>
					<p className="mt-5 text-base leading-8 text-muted">{FINAL_SUBTITLE}</p>

					<div className="mx-auto mt-12 max-w-xl space-y-6 text-left text-base leading-[1.9] text-muted">
						{FINAL_LETTER.map(paragraph => (
							<p key={paragraph}>{renderParagraph(paragraph)}</p>
						))}
					</div>

					<div className="mt-14 text-center">
						<p className="whitespace-pre-line font-display text-3xl text-plum motion-safe:animate-[final-fade-up_700ms_ease-out_300ms_both] motion-reduce:animate-none">
							{FINAL_SIGNATURE}
							<IconHeart
								className="ml-2 inline-block align-[-.12em] text-rose"
								size={24}
								fill="currentColor"
								aria-label="Corazón"
							/>
						</p>
						<p className="mt-3 text-sm font-semibold tracking-[.04em] text-muted">
							{FINAL_ANNIVERSARY}
						</p>
						<Button
							variant="outline"
							className="mx-auto mt-10 border-[#d7b4ce] bg-white/70 text-plum"
							onClick={() => setIsResetDialogOpen(true)}
						>
							Reiniciar el juego
						</Button>
					</div>
				</article>
			</div>
			{isResetDialogOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#342537b8] px-6 backdrop-blur-sm">
					<div
						className="w-full max-w-sm rounded-[28px] border border-[#e7a8bf] bg-[#fce1ec] p-6 text-center text-plum shadow-[0_18px_60px_rgba(25,19,29,0.35)]"
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="reset-title"
						aria-describedby="reset-copy"
					>
						<div className="mx-auto grid size-14 place-items-center rounded-full bg-[#f5b7d1] text-plum">
							<IconAlertTriangle size={26} stroke={1.8} aria-hidden="true" />
						</div>
						<h2 id="reset-title" className="mt-5 font-display text-3xl leading-tight">
							¿Reiniciar la aventura?
						</h2>
						<p id="reset-copy" className="mt-4 text-sm leading-7 text-[#6f5369]">
							Se perderá el progreso actual, pero siempre podrás volver a jugar.
						</p>
						<div className="mt-6 flex gap-3">
							<Button
								variant="outline"
								className="flex-1 border-[#d7b4ce] bg-white/70 text-plum"
								onClick={() => setIsResetDialogOpen(false)}
							>
								Cancelar
							</Button>
							<Button
								className="flex-1"
								onClick={() => {
									isResettingRef.current = true
									resetJourney()
									navigate("/", { replace: true })
								}}
							>
								Reiniciar
							</Button>
						</div>
					</div>
				</div>
			)}
		</main>
	)
}
