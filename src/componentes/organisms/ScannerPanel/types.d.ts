export type ScannerPanelProps = {
	stationId: string
	scanNotice?: string
	onBack: () => void
	onCode: (value: string) => void
}
