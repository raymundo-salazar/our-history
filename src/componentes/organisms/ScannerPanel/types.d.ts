export type ScannerPanelProps = {
	onBack: () => void
	onCode: (value: string) => void
	manualCode: string
	onManualCodeChange: (value: string) => void
	notice: string
}
