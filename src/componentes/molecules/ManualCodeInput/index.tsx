import { Button } from "../../atoms/Button"
import { MANUAL_CODE_LABEL, MANUAL_CODE_PLACEHOLDER, MANUAL_CODE_SUBMIT } from "./constants"
import type { ManualCodeInputProps } from "./types"

export const ManualCodeInput = ({ value, onChange, onSubmit }: ManualCodeInputProps) => (
	<div className="mt-8 border-t border-[#dbc9c4] pt-5">
		<label className="mb-2 block text-sm" htmlFor="manual-code">
			{MANUAL_CODE_LABEL}
		</label>
		<div className="flex items-center gap-2">
			<input
				className="min-w-0 flex-1 border border-[#cbb6b1] bg-transparent px-3 py-2 outline-none focus:border-[#8b5367]"
				id="manual-code"
				value={value}
				onChange={event => onChange(event.target.value)}
				placeholder={MANUAL_CODE_PLACEHOLDER}
			/>
			<Button className="shrink-0 px-4" onClick={onSubmit}>
				{MANUAL_CODE_SUBMIT}
			</Button>
		</div>
	</div>
)
