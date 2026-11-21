import { JourneyFrame } from "../../componentes/organisms/JourneyFrame"
import type { JourneyTemplateProps } from "./types"

export const JourneyTemplate = ({ children, dark, back }: JourneyTemplateProps) => (
	<JourneyFrame dark={dark} back={back}>
		{children}
	</JourneyFrame>
)
