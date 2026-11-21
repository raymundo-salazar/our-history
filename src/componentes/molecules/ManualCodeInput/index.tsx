import { Button } from "../../atoms/Button"
import { MANUAL_CODE_LABEL, MANUAL_CODE_PLACEHOLDER, MANUAL_CODE_SUBMIT } from "./constants"
import type { ManualCodeInputProps } from "./types"

export const ManualCodeInput = ({ value, onChange, onSubmit }: ManualCodeInputProps) => (
	<div className="mt-6 border-t border-white/15 pt-5 text-white/80">
		<label
			className="mb-2 block text-xs font-bold uppercase tracking-[.15em]"
			htmlFor="manual-code"
		>
			{MANUAL_CODE_LABEL}
		</label>
		<div className="flex items-center gap-2">
			<input
				className="min-h-12 min-w-0 flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 text-sm outline-none placeholder:text-white/45 focus:border-[#f3a2bb]"
				id="manual-code"
				value={value}
				onChange={event => onChange(event.target.value)}
				placeholder={MANUAL_CODE_PLACEHOLDER}
			/>
			<Button className="min-h-12 shrink-0 px-4" onClick={onSubmit}>
				{MANUAL_CODE_SUBMIT}
			</Button>
		</div>
	</div>
)
