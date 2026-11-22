export type HintActionsProps = {
	showContinue?: boolean
	canRequestHint: boolean
	onContinue: () => void
	onRequestHint: () => void
	continueLabel: string
}
