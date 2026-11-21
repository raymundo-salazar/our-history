import { PROGRESS_LABEL, PROGRESS_WIDTHS } from "./constants"
import type { ProgressIndicatorProps } from "./types"

export const ProgressIndicator = ({ current, total }: ProgressIndicatorProps) => (
	<div className="mb-8 text-[10px] font-bold uppercase tracking-[.2em] text-plum">
		<div className="flex justify-between">
			<span>{PROGRESS_LABEL}</span>
			<strong className="font-medium tracking-normal">
				{current}/{total}
			</strong>
		</div>
		<div className="mt-3 flex h-1.5 gap-1.5">
			<div
				className={`h-full rounded-full bg-rose ${PROGRESS_WIDTHS[current] ?? PROGRESS_WIDTHS[0]}`}
			/>
			<div className="h-full flex-1 rounded-full bg-line" />
		</div>
	</div>
)
