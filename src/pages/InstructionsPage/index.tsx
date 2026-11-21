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
			<h1 className="font-display text-4xl leading-tight tracking-[-0.035em]">
				{INSTRUCTIONS_TITLE}
			</h1>
			<p className="mt-5 text-base leading-7">{welcomeCopy.instructions}</p>
			<div className="mt-6 border-l-4 border-[#a96a7a] bg-[#eadbd4] p-4 text-sm leading-6">
				{INSTRUCTIONS_NOTE}
			</div>
			<Button className="mt-8" onClick={() => navigate("/pista/1")}>
				{INSTRUCTIONS_ACTION} <IconArrowRight size={18} stroke={1.8} aria-hidden="true" />
			</Button>
		</JourneyTemplate>
	)
}
