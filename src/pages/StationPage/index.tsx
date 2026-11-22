import { IconArrowRight, IconHeart, IconSparkles } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Button } from "../../componentes/atoms/Button"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { ChoiceList } from "../../componentes/molecules/ChoiceList"
import { WordOrderGame } from "../../componentes/molecules/WordOrderGame"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import { answer, chapters } from "../../content"
import { useJourney } from "../../hooks/useJourney"
import { STATION_OPTIONS, STATION_TOTAL } from "./constants"

const detailCopy = (chapterId: number) =>
	chapterId === 2 || chapterId === 4 ? "Un descubrimiento especial" : "Un pequeño detalle"

export const StationPage = () => {
	const navigate = useNavigate()
	const { stationId = "1" } = useParams()
	const [searchParams] = useSearchParams()
	const stationIndex = Number(stationId) - 1
	const chapter = chapters[stationIndex]
	const { progress, nextChapter, setScreen, completeChapter, solveChallenge, finishJourney } =
		useJourney()
	const [words, setWords] = useState<string[]>([])
	const [choice, setChoice] = useState("")
	const requestedScreen = Number(searchParams.get("screen"))
	const screen =
		requestedScreen >= 2
			? Math.max(requestedScreen, progress.currentScreen[stationIndex] ?? 0)
			: 0
	const isWordGame = stationIndex === 2
	const isChoiceGame = stationIndex === 4
	const isFinal = stationIndex === 5
	const wordGameCorrect = words.join(" ") === "Mi lugar favorito es contigo"
	const choiceCorrect = choice === answer

	useEffect(() => {
		if (!chapter || !progress.scanned.includes(stationIndex)) {
			navigate(`/pista/${nextChapter}`, { replace: true })
		}
	}, [chapter, navigate, nextChapter, progress.scanned, stationIndex])

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" })
	}, [screen])

	if (!chapter || !progress.scanned.includes(stationIndex)) return null

	const lastScreen = isFinal ? 5 : isWordGame || isChoiceGame ? 3 : 2
	const advance = () => {
		if (screen < lastScreen) {
			if (isWordGame && screen === 2) solveChallenge(stationIndex)
			if (isChoiceGame && screen === 2) solveChallenge(stationIndex)
			setScreen(stationIndex, screen + 1)
			return
		}
		completeChapter(stationIndex)
		if (isFinal) finishJourney()
		if (!isFinal) navigate(`/pista/${stationIndex + 2}`)
	}

	if (isFinal && screen >= 2) return <FinalChapter screen={screen} onNext={advance} />
	if (screen === 0) {
		return <DetailScreen chapter={chapter} onNext={() => navigate(`/historia/${stationId}`)} />
	}
	if (screen === 1) return <NarrativeScreen chapter={chapter} onNext={advance} />
	if (isWordGame && screen === 2) {
		return (
			<JourneyTemplate tone="challenge">
				<ProgressIndicator current={3} total={STATION_TOTAL} />
				<ScreenLabel>Un pequeño desafío</ScreenLabel>
				<h1 className="mt-5 font-display text-[clamp(38px,10vw,54px)] leading-[1.12]">
					Lo que construimos
				</h1>
				<p className="mt-5 text-base leading-8 text-[#f5dfec]">
					Ordena las palabras para formar la frase que quiero decirte.
				</p>
				<WordOrderGame value={words} onChange={setWords} />
				{wordGameCorrect && (
					<SuccessMessage>Eso quería decirte, preciosa. ♡</SuccessMessage>
				)}
				<ContinueButton disabled={!wordGameCorrect} onClick={advance} />
			</JourneyTemplate>
		)
	}
	if (isChoiceGame && screen === 2) {
		return (
			<JourneyTemplate tone="challenge">
				<ProgressIndicator current={5} total={STATION_TOTAL} />
				<ScreenLabel>Un pequeño desafío</ScreenLabel>
				<h1 className="mt-5 font-display text-[clamp(38px,10vw,54px)] leading-[1.12]">
					Nuestro lugar
				</h1>
				<p className="mt-5 text-base leading-8 text-[#f5dfec]">
					¿Qué es lo que más deseo para nuestros próximos años?
				</p>
				<ChoiceList value={choice} options={STATION_OPTIONS} onChange={setChoice} />
				{choiceCorrect && (
					<SuccessMessage>
						Exactamente. Quiero seguir viviendo todo contigo. ♡
					</SuccessMessage>
				)}
				<ContinueButton disabled={!choiceCorrect} onClick={advance} />
			</JourneyTemplate>
		)
	}
	return <ClueScreen chapter={chapter} onNext={advance} />
}

const ScreenLabel = ({ children }: { children: React.ReactNode }) => (
	<p className="text-[11px] font-bold uppercase tracking-[.2em] text-plum">{children}</p>
)

const ContinueButton = ({
	disabled,
	label = "Continuar",
	onClick,
}: {
	disabled?: boolean
	label?: string
	onClick: () => void
}) => (
	<Button fullWidth className="mt-8" disabled={disabled} onClick={onClick}>
		{label} <IconArrowRight size={18} stroke={1.8} aria-hidden="true" />
	</Button>
)

const SuccessMessage = ({ children }: { children: React.ReactNode }) => (
	<div className="rounded-2xl bg-[#fce1ec] p-4 text-sm font-semibold text-plum">{children}</div>
)

const DetailScreen = ({
	chapter,
	onNext,
}: {
	chapter: (typeof chapters)[number]
	onNext: () => void
}) => (
	<JourneyTemplate tone="discovery">
		<ProgressIndicator current={chapter.id} total={STATION_TOTAL} />
		<div className="flex flex-1 flex-col justify-center">
			<div className="grid size-16 place-items-center rounded-full bg-[#f9e0ea] text-3xl text-plum">
				<IconHeart size={30} fill="currentColor" aria-hidden="true" />
			</div>
			<ScreenLabel>{detailCopy(chapter.id)}</ScreenLabel>
			<h1 className="mt-5 font-display text-[clamp(38px,10vw,54px)] leading-[1.12]">
				{chapter.detailTitle}
			</h1>
			<div className="mt-6 rounded-[28px] border border-[#f5d9e2] bg-blush p-6">
				<div className="space-y-4 text-base leading-8 text-muted">
					{chapter.detailBody.split("\n\n").map(paragraph => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</div>
			</div>
		</div>
		<ContinueButton label={chapter.detailAction} onClick={onNext} />
	</JourneyTemplate>
)

const NarrativeScreen = ({
	chapter,
	onNext,
}: {
	chapter: (typeof chapters)[number]
	onNext: () => void
}) => (
	<JourneyTemplate>
		<ProgressIndicator current={chapter.id} total={STATION_TOTAL} />
		<ScreenLabel>Una carta para ti</ScreenLabel>
		<h1 className="mt-5 font-display text-[clamp(38px,10vw,54px)] leading-[1.12]">
			{chapter.narrativeTitle}
		</h1>
		<div className="mt-6 rounded-[30px] bg-white/80 p-6 shadow-soft">
			<div className="space-y-4 text-base leading-[1.85] text-muted">
				{chapter.narrativeBody.split("\n\n").map(paragraph => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>
		</div>
		<ContinueButton onClick={onNext} />
	</JourneyTemplate>
)

const ClueScreen = ({
	chapter,
	onNext,
}: {
	chapter: (typeof chapters)[number]
	onNext: () => void
}) => (
	<JourneyTemplate tone="challenge">
		<ProgressIndicator current={chapter.id} total={STATION_TOTAL} />
		<div className="flex flex-1 flex-col justify-center">
			<p className="text-center text-5xl text-[#f4bfd8]">✧</p>
			<ScreenLabel>Tu siguiente pista</ScreenLabel>
			<h1 className="mt-5 text-center font-display text-[clamp(38px,10vw,54px)] leading-[1.12]">
				Sigue las palabras, cielo.
			</h1>
			<div className="mt-7 rounded-[28px] border border-white/25 bg-white/10 p-6">
				<div className="space-y-4 text-base leading-8 text-[#f5dfec]">
					{chapter.clue.split("\n\n").map(paragraph => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</div>
			</div>
		</div>
		<ContinueButton onClick={onNext} />
	</JourneyTemplate>
)

const FinalChapter = ({ screen, onNext }: { screen: number; onNext: () => void }) => (
	<JourneyTemplate tone={screen === 3 ? "discovery" : undefined}>
		<ProgressIndicator current={6} total={STATION_TOTAL} />
		<div className="flex flex-1 flex-col justify-center">
			<div className="grid size-16 place-items-center rounded-full bg-[#f9e0ea] text-3xl text-plum">
				<IconSparkles aria-hidden="true" />
			</div>
			<ScreenLabel>
				{screen === 2
					? "Una última sorpresa"
					: screen === 3 || screen === 4
						? "La gran sorpresa"
						: "Nuestra historia continúa"}
			</ScreenLabel>
			<h1 className="mt-5 font-display text-[clamp(38px,10vw,54px)] leading-[1.12]">
				{screen === 2
					? "¿Todavía puede pasar?"
					: screen === 3 || screen === 4
						? "Hablemos de lo que no existe"
						: "Te sigo eligiendo"}
			</h1>
			<div className="mt-6 rounded-[30px] bg-white/80 p-6 shadow-soft">
				<p className="text-base leading-[1.85] text-muted">
					{screen === 2
						? "Tal vez esta vez sí encontremos una manera de vivir esa aventura que parecía imposible."
						: screen === 3
							? "Conseguí los boletos, amor. Para una noche que quiero vivir contigo: Hablemos de lo que no existe."
							: screen === 4
								? "1 de diciembre de 2026 · Río 70 · Monterrey"
								: "Ocho años de matrimonio, una familia, días buenos, días difíciles y tantos caminos recorridos. Gracias por seguir construyendo conmigo. Quiero seguir eligiéndote cada día, en cada aventura y en todo lo que todavía nos espera. Te Yoyo, mi esponjosita. ♡"}
				</p>
			</div>
		</div>
		<Button fullWidth className="mt-8" onClick={onNext}>
			{screen === 5 ? "Terminar nuestra historia" : "Continuar"}{" "}
			<IconArrowRight size={18} stroke={1.8} aria-hidden="true" />
		</Button>
	</JourneyTemplate>
)
