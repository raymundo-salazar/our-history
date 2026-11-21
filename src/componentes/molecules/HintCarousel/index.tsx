import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

type HintCarouselProps = {
	canGoBack: boolean
	canGoForward: boolean
	onBack: () => void
	onForward: () => void
}

export const HintCarousel = ({ canGoBack, canGoForward, onBack, onForward }: HintCarouselProps) => (
	<div className="pointer-events-none absolute inset-y-0 -left-4 -right-4 flex items-center justify-between sm:-left-5 sm:-right-5">
		{canGoBack ? (
			<button
				type="button"
				className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-white/25 bg-[#34243d]/90 text-white transition hover:bg-[#4a3152]"
				aria-label="Ver pista anterior"
				onClick={onBack}
			>
				<IconChevronLeft size={22} stroke={1.8} aria-hidden="true" />
			</button>
		) : (
			<span aria-hidden="true" className="size-10" />
		)}
		{canGoForward ? (
			<button
				type="button"
				className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-white/25 bg-[#34243d]/90 text-white transition hover:bg-[#4a3152]"
				aria-label="Ver pista siguiente"
				onClick={onForward}
			>
				<IconChevronRight size={22} stroke={1.8} aria-hidden="true" />
			</button>
		) : (
			<span aria-hidden="true" className="size-10" />
		)}
	</div>
)
