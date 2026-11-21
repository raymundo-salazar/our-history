import { IconArrowRight } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../componentes/atoms/Button"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import { welcomeCopy } from "../../content"
import { INSTRUCTIONS_ACTION, INSTRUCTIONS_NOTE, INSTRUCTIONS_TITLE } from "./constants"

export const InstructionsPage = () => {
	const navigate = useNavigate()

	return (
		<JourneyTemplate>
			<ProgressIndicator current={0} total={6} />
			<h1 className="font-display text-[clamp(36px,10vw,54px)] leading-[1.15] tracking-[-.035em]">
				{INSTRUCTIONS_TITLE}
			</h1>
			<div className="mt-6 rounded-[30px] bg-white/80 p-6 shadow-soft">
				<p className="text-base leading-[1.85] text-muted">{welcomeCopy.instructions}</p>
				<div className="mt-6 rounded-[24px] bg-blush p-5 text-sm leading-7 text-plum">
					{INSTRUCTIONS_NOTE}
				</div>
			</div>
			<Button fullWidth className="mt-8" onClick={() => navigate("/pista/1")}>
				{INSTRUCTIONS_ACTION} <IconArrowRight size={18} stroke={1.8} aria-hidden="true" />
			</Button>
		</JourneyTemplate>
	)
}
