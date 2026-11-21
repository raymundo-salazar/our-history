import { IconArrowRight } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../componentes/atoms/Button"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import { welcomeCopy } from "../../content"
import { STORY_ACTION, STORY_TITLE } from "./constants"

export const StoryPage = () => {
	const navigate = useNavigate()

	return (
		<JourneyTemplate>
			<ProgressIndicator current={0} total={6} />
			<h1 className="font-display text-4xl leading-tight tracking-[-0.035em]">
				{STORY_TITLE}
			</h1>
			<p className="mt-5 text-base leading-7">{welcomeCopy.story}</p>
			<Button className="mt-8" onClick={() => navigate("/instrucciones")}>
				{STORY_ACTION} <IconArrowRight size={18} stroke={1.8} aria-hidden="true" />
			</Button>
		</JourneyTemplate>
	)
}
