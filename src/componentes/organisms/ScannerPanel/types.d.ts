export type ScannerPanelProps = {
	stationId: string
	scanNotice?: string
	onDismissNotice: () => void
	onBack: () => void
	onCode: (value: string) => void
}
