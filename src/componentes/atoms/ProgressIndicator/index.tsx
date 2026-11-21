import { PROGRESS_LABEL, PROGRESS_WIDTHS } from "./constants"
import type { ProgressIndicatorProps } from "./types"

export const ProgressIndicator = ({ current, total }: ProgressIndicatorProps) => (
	<div className="mb-11 text-xs tracking-[0.18em] text-[#9b7b82]">
		<div className="flex justify-between">
			<span>{PROGRESS_LABEL}</span>
			<strong className="font-medium tracking-normal">
				{current}/{total}
			</strong>
		</div>
		<div className="mt-2 h-0.5 bg-[#eadbd4]">
			<div
				className={`h-full bg-[#a96a7a] ${PROGRESS_WIDTHS[current] ?? PROGRESS_WIDTHS[0]}`}
			/>
		</div>
	</div>
)
