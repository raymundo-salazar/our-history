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
	const headerSurface =
		dark || tone === "challenge"
			? "bg-night"
			: tone === "discovery"
				? "bg-[#fbf5f8]"
				: "bg-canvas"

	return (
		<main className={`min-h-dvh overflow-x-hidden ${surface}`}>
			<section
				className={`mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 pb-[calc(env(safe-area-inset-bottom)+26px)] sm:px-10 ${back ? "animate-[slide-back_300ms_ease_both]" : "animate-[slide-forward_300ms_ease_both]"}`}
			>
				<header
					className={`sticky top-0 z-20 -mx-6 flex items-center justify-between px-6 pb-3 pt-[calc(env(safe-area-inset-top)+24px)] text-[10px] font-bold uppercase tracking-[.16em] ${headerSurface} sm:-mx-10 sm:px-10`}
				>
					<img
						className="h-auto w-32 object-contain sm:w-36"
						src="/assets/gina-ray-logo.webp"
						alt="Logo de Gina y Ray"
						width="900"
						height="300"
					/>
					<span className={surface ? "text-[#f5b7d1]" : "text-muted"}>
						8 años · Nuestra historia
					</span>
				</header>
				<div className="flex flex-1 flex-col py-8">{children}</div>
			</section>
		</main>
	)
}
