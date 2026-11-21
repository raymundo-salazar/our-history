import { CHOICE_NAME } from "./constants"
import type { ChoiceListProps } from "./types"

export const ChoiceList = ({ value, options, onChange }: ChoiceListProps) => (
	<div className="my-6 grid gap-3">
		{options.map(option => (
			<label
				className="flex min-h-14 items-center rounded-2xl border border-line bg-white px-4 text-sm leading-snug text-muted has-[:checked]:border-2 has-[:checked]:border-plum has-[:checked]:font-bold has-[:checked]:text-plum"
				key={option}
			>
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
