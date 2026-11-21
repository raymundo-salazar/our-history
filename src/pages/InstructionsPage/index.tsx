import { IconArrowRight } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../componentes/atoms/Button"
import { ProgressIndicator } from "../../componentes/atoms/ProgressIndicator"
import { JourneyTemplate } from "../../templates/JourneyTemplate"
import {
	INSTRUCTIONS_ACTION,
	INSTRUCTIONS_CONDITION,
	INSTRUCTIONS_EYEBROW,
	INSTRUCTIONS_INTRO,
	INSTRUCTIONS_OUTRO,
	INSTRUCTIONS_STEPS,
	INSTRUCTIONS_TITLE,
} from "./constants"

export const InstructionsPage = () => {
	const navigate = useNavigate()

	return (
		<JourneyTemplate>
			<ProgressIndicator current={0} total={6} />
			<p className="text-[10px] font-bold uppercase tracking-[.2em] text-plum">
				{INSTRUCTIONS_EYEBROW}
			</p>
			<h1 className="mt-5 font-display text-[clamp(38px,10vw,54px)] leading-[1.12] tracking-[-.035em]">
				Una aventura <em className="not-italic text-rose">para ti.</em>
			</h1>
			<div className="mt-6 rounded-[30px] bg-white/80 p-6 shadow-soft">
				<div className="space-y-5 text-base leading-[1.85] text-muted">
					<p>{INSTRUCTIONS_INTRO}</p>
					<p>{INSTRUCTIONS_CONDITION}</p>
				</div>
				<div className="mt-7 border-t border-line pt-7">
					<h2 className="font-display text-2xl text-ink">¿Cómo funciona?</h2>
					<div className="mt-5 space-y-5">
						{INSTRUCTIONS_STEPS.map(step => (
							<div className="flex items-start gap-4" key={step.number}>
								<div className="grid size-12 shrink-0 place-items-center rounded-[16px] border border-line bg-blush text-sm font-bold text-plum">
									{step.number}
								</div>
								<div>
									<h3 className="font-semibold text-ink">{step.title}</h3>
									<p className="mt-1 text-sm leading-7 text-muted">{step.body}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="mt-7 space-y-5 border-t border-line pt-7 text-base leading-[1.85] text-muted">
					{INSTRUCTIONS_OUTRO.map((paragraph, index) => (
						<p className="text-muted" key={paragraph}>
							{index === INSTRUCTIONS_OUTRO.length - 1 ? (
								<>
									{paragraph.split("no intentes")[0]}
									<strong className="font-bold text-ink">
										no intentes{paragraph.split("no intentes")[1]}
									</strong>
								</>
							) : (
								paragraph
							)}
						</p>
					))}
				</div>
			</div>
			<Button fullWidth className="mt-8" onClick={() => navigate("/pista/1")}>
				{INSTRUCTIONS_ACTION} <IconArrowRight size={18} stroke={1.8} aria-hidden="true" />
			</Button>
		</JourneyTemplate>
	)
}
