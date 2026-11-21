import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { App } from "../src/App"

describe("journey pages", () => {
	it("renders the instructions page at its real route", () => {
		render(
			<MemoryRouter initialEntries={["/instrucciones"]}>
				<App />
			</MemoryRouter>
		)

		expect(screen.getByRole("heading", { name: "Unas reglas sencillas" })).toBeInTheDocument()
	})

	it("renders the first hunt page with optional help", () => {
		render(
			<MemoryRouter initialEntries={["/pista/1"]}>
				<App />
			</MemoryRouter>
		)

		expect(screen.getByRole("button", { name: /Escanear código QR/ })).toBeInTheDocument()
		expect(screen.getByRole("button", { name: /Necesito otra pista/ })).toBeInTheDocument()
	})
})
