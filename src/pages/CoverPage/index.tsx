import { IconArrowRight } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../componentes/atoms/Button"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import { welcomeCopy } from "../../content"
import { COVER_DATE, COVER_SUBTITLE } from "./constants"

export const CoverPage = () => {
	const navigate = useNavigate()

	return (
		<JourneyTemplate>
			<img
				className="relative left-1/2 block aspect-square w-screen max-w-[640px] -translate-x-1/2 object-contain"
				src="/assets/pareja-rg.webp"
				alt="Gina y Ray juntos, con un corazón"
				width="640"
				height="640"
				fetchPriority="high"
			/>
			<div className="mt-8 text-center text-[10px] font-bold uppercase tracking-[.22em] text-plum">
				{COVER_DATE}
			</div>
			<h1 className="mt-5 text-center font-display text-[clamp(42px,10vw,64px)] leading-[1.07] tracking-[-.045em]">
				{welcomeCopy.title}
			</h1>
			<p className="mx-auto mt-6 max-w-sm text-center text-base leading-8 text-muted">
				{welcomeCopy.dek}
			</p>
			<Button fullWidth className="mt-8" onClick={() => navigate("/historia")}>
				COMENZAR <IconArrowRight size={18} stroke={1.8} aria-hidden="true" />
			</Button>
			<small className="mt-5 block text-center text-muted">{COVER_SUBTITLE}</small>
		</JourneyTemplate>
	)
}
