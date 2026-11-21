import type { ReactNode } from "react"

export type JourneyTemplateProps = {
	children: ReactNode
	dark?: boolean
	back?: boolean
	tone?: "editorial" | "challenge" | "discovery"
}
