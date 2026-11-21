import { Button } from "../../atoms/Button"
import { FINAL_STEP_ONE, FINAL_STEP_TWO } from "./constants"
import type { FinalRevealProps } from "./types"

export const FinalReveal = ({ step, onNext }: FinalRevealProps) => (
	<div>
		{step === 1 && (
			<>
				<p className="font-display text-2xl">¿Te acuerdas?</p>
				<Button className="mt-5" onClick={onNext}>
					{FINAL_STEP_ONE}
				</Button>
			</>
		)}
		{step === 2 && (
			<>
				<p>
					Te dije que ya casi no había lugares. Pero resulta que todavía quedaba una
					oportunidad…
				</p>
				<Button onClick={onNext}>{FINAL_STEP_TWO}</Button>
			</>
		)}
		{step === 3 && (
			<>
				<div className="my-8 -rotate-1 bg-[#d99aa1] p-7 text-[#321d2a] shadow-[10px_12px_0_#563342]">
					<span className="text-xs tracking-[0.15em]">UNA NOCHE PARA DOS</span>
					<strong className="mt-3 block font-display text-3xl leading-tight">
						Hablemos de lo que no existe
					</strong>
					<small className="mt-3 block">1 de diciembre · Río 70 · Monterrey</small>
				</div>
				<p>
					¡Sí conseguí los boletos, amor! Y no sabes cuánto me emociona que podamos vivir
					esta experiencia juntos.
				</p>
			</>
		)}
	</div>
)
