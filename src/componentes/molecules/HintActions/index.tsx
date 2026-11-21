import { IconArrowRight, IconHelpCircle } from "@tabler/icons-react"
import { Button } from "../../atoms/Button"
import { HINT_ACTION_LABEL } from "./constants"
import type { HintActionsProps } from "./types"

export const HintActions = ({
	canRequestHint,
	onContinue,
	onRequestHint,
	continueLabel,
}: HintActionsProps) => (
	<div className="mt-8 flex w-full flex-col gap-3">
		<Button fullWidth onClick={onContinue}>
			{continueLabel}
			<IconArrowRight size={18} stroke={1.8} aria-hidden="true" />
		</Button>
		{canRequestHint && (
			<Button variant="outline" fullWidth onClick={onRequestHint}>
				<IconHelpCircle size={18} stroke={1.8} aria-hidden="true" />
				{HINT_ACTION_LABEL}
			</Button>
		)}
	</div>
)
