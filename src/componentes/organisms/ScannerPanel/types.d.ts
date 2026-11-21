export type ScannerPanelProps = {
	stationId: string
	onBack: () => void
	onCode: (value: string) => void
	manualCode: string
	onManualCodeChange: (value: string) => void
	notice: string
}
