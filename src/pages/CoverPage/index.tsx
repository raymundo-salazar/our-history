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
			<div className="text-xs font-semibold tracking-[0.18em] text-[#9d6674]">
				{COVER_DATE}
			</div>
			<h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.08] tracking-[-0.035em] sm:text-7xl">
				{welcomeCopy.title}
			</h1>
			<p className="mt-6 max-w-sm font-display text-2xl leading-snug text-[#855365]">
				{welcomeCopy.dek}
			</p>
			<Button className="mt-8" onClick={() => navigate("/historia")}>
				Comenzar <IconArrowRight size={18} stroke={1.8} aria-hidden="true" />
			</Button>
			<small className="mt-5 block text-[#987a80]">{COVER_SUBTITLE}</small>
		</JourneyTemplate>
	)
}
