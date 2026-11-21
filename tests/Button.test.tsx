import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Button } from "../src/componentes/atoms/Button"

describe("Button atom", () => {
	it("renders its label and keeps the action enabled by default", () => {
		render(<Button>Continuar</Button>)

		expect(screen.getByRole("button", { name: "Continuar" })).toBeEnabled()
	})

	it("supports a disabled state for gated station challenges", () => {
		render(<Button disabled>Continuar</Button>)

		expect(screen.getByRole("button", { name: "Continuar" })).toBeDisabled()
	})
})
