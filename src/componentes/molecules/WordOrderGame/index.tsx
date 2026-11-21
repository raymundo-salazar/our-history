import { Button } from "../../atoms/Button"
import { WORDS, WORD_GAME_PROMPT, WORD_GAME_RESET } from "./constants"
import type { WordOrderGameProps } from "./types"

export const WordOrderGame = ({ value, onChange }: WordOrderGameProps) => {
	const isCorrect = value.join(" ") === "Mi lugar favorito es contigo"

	return (
		<div className="my-6 rounded-[28px] bg-lilac p-5">
			<p className="mb-4 text-xs font-semibold text-[#735584]">{WORD_GAME_PROMPT}</p>
			<div className="flex flex-wrap gap-2">
				{WORDS.map(word => (
					<Button
						key={word}
						variant="outline"
						className="min-h-11 rounded-2xl border-[#d9c2e5] bg-white px-3 text-sm text-[#513f5a]"
						disabled={value.includes(word)}
						onClick={() => onChange([...value, word])}
					>
						{word}
					</Button>
				))}
			</div>
			<p className="mt-4 min-h-12 rounded-2xl border-2 border-plum bg-white p-3 text-sm font-semibold text-[#513f5a]">
				{value.join(" ") || "…"}
			</p>
			{value.length === WORDS.length && !isCorrect && (
				<Button variant="ghost" className="text-xs" onClick={() => onChange([])}>
					{WORD_GAME_RESET}
				</Button>
			)}
		</div>
	)
}
