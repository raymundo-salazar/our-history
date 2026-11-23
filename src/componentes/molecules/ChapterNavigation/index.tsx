import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { IconButton } from "../../atoms/IconButton"
import type { ChapterNavigationProps } from "./types"

export const ChapterNavigation = ({ onBack, onForward }: ChapterNavigationProps) => {
	if (!onBack && !onForward) return null

	return (
		<nav
			className="mt-4 flex items-center justify-between"
			aria-label="Navegar por la historia"
		>
			{onBack ? (
				<IconButton
					className="size-11 rounded-full border border-[#d7b4ce] bg-white/60 text-plum"
					onClick={onBack}
					aria-label="Ver pantalla anterior"
				>
					<IconChevronLeft size={22} stroke={1.8} aria-hidden="true" />
				</IconButton>
			) : (
				<span className="size-11" aria-hidden="true" />
			)}
			{onForward ? (
				<IconButton
					className="size-11 rounded-full border border-[#d7b4ce] bg-white/60 text-plum"
					onClick={onForward}
					aria-label="Ver pantalla siguiente"
				>
					<IconChevronRight size={22} stroke={1.8} aria-hidden="true" />
				</IconButton>
			) : (
				<span className="size-11" aria-hidden="true" />
			)}
		</nav>
	)
}
