import { CHOICE_NAME } from "./constants"
import type { ChoiceListProps } from "./types"

export const ChoiceList = ({ value, options, onChange }: ChoiceListProps) => (
	<div className="my-6">
		{options.map(option => (
			<label className="block border-b border-[#ddceca] px-3 py-3 leading-snug" key={option}>
				<input
					className="mr-2 accent-[#8b5367]"
					type="radio"
					name={CHOICE_NAME}
					value={option}
					checked={value === option}
					onChange={event => onChange(event.target.value)}
				/>
				{option}
			</label>
		))}
	</div>
)
