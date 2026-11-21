import { IconHeart } from "@tabler/icons-react"
import type { JourneyFrameProps } from "./types"

export const JourneyFrame = ({
	children,
	dark = false,
	back = false,
	tone = "editorial",
}: JourneyFrameProps) => {
	const surface =
		dark || tone === "challenge"
			? "bg-night text-white"
			: tone === "discovery"
				? "bg-[radial-gradient(ellipse_at_90%_0%,#f6d8e9_0,transparent_50%),#fbf5f8] text-ink"
				: "bg-canvas text-ink"

	return (
		<main className={`min-h-dvh overflow-x-hidden ${surface}`}>
			<section
				className={`mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 pt-[calc(env(safe-area-inset-top)+24px)] pb-[calc(env(safe-area-inset-bottom)+26px)] sm:px-10 ${back ? "animate-[slide-back_300ms_ease_both]" : "animate-[slide-forward_300ms_ease_both]"}`}
			>
				<div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[.16em] text-plum">
					<span className="font-display text-xl normal-case tracking-normal">
						R{" "}
						<IconHeart
							className="inline text-rose"
							size={15}
							fill="currentColor"
							aria-hidden="true"
						/>{" "}
						G
					</span>
					<span className={surface ? "text-[#f5b7d1]" : "text-muted"}>
						8 años · Nuestra historia
					</span>
				</div>
				<div className="flex flex-1 flex-col py-8">{children}</div>
			</section>
		</main>
	)
}
