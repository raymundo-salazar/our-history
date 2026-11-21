import { JourneyFrame } from "../../componentes/organisms/JourneyFrame"
import type { JourneyTemplateProps } from "./types"

export const JourneyTemplate = ({ children, dark, back, tone }: JourneyTemplateProps) => (
	<JourneyFrame dark={dark} back={back} tone={tone}>
		{children}
	</JourneyFrame>
)
