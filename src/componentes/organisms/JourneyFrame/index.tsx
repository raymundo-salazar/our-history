import { IconHeart } from "@tabler/icons-react"
import type { JourneyFrameProps } from "./types"

export const JourneyFrame = ({ children, dark = false, back = false }: JourneyFrameProps) => (
	<main
		className={`min-h-svh overflow-hidden bg-[#f6f0e8] text-[#3b2730] ${dark ? "bg-[#321d2a] text-[#f8eee3]" : ""}`}
	>
		<section
			className={`mx-auto w-[calc(100%-2.5rem)] max-w-[570px] py-[clamp(2.6rem,10vh,6.25rem)] ${back ? "animate-[slide-back_300ms_ease_both]" : "animate-[slide-forward_300ms_ease_both]"}`}
		>
			{children}
		</section>
		<footer className="flex items-center justify-center gap-1 pb-5 text-xs tracking-[0.13em] opacity-65">
			R <IconHeart size={14} stroke={1.7} aria-hidden="true" /> G · Te Yoyo
		</footer>
	</main>
)
