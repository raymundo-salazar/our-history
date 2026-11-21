import { Button } from "../../atoms/Button"
import { WORDS, WORD_GAME_PROMPT, WORD_GAME_RESET } from "./constants"
import type { WordOrderGameProps } from "./types"

export const WordOrderGame = ({ value, onChange }: WordOrderGameProps) => {
	const isCorrect = value.join(" ") === "Mi lugar favorito es contigo"

	return (
		<div className="my-6">
			<p>{WORD_GAME_PROMPT}</p>
			<div className="flex flex-wrap justify-center gap-2">
				{WORDS.map(word => (
					<Button
						key={word}
						variant="outline"
						className="min-h-10 px-3"
						disabled={value.includes(word)}
						onClick={() => onChange([...value, word])}
					>
						{word}
					</Button>
				))}
			</div>
			<p className="min-h-12 border-b border-[#c9aeb0] py-3 text-[#7b5360]">
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
