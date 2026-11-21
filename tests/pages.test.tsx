import { fireEvent, render, screen } from "@testing-library/react"
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

		expect(screen.getByRole("heading", { name: "Una aventura para ti." })).toBeInTheDocument()
	})

	it("renders the first hunt page with optional help", () => {
		render(
			<MemoryRouter initialEntries={["/pista/1"]}>
				<App />
			</MemoryRouter>
		)

		expect(screen.getByRole("button", { name: /Encontré el codigo QR/ })).toBeInTheDocument()
		expect(screen.getByRole("button", { name: /Necesito otra pista/ })).toBeInTheDocument()
	})

	it("only navigates between hints that have already been revealed", () => {
		render(
			<MemoryRouter initialEntries={["/pista/1"]}>
				<App />
			</MemoryRouter>
		)

		const requestHint = screen.getByRole("button", { name: /Necesito otra pista/ })
		expect(screen.queryByRole("button", { name: "Ver pista anterior" })).not.toBeInTheDocument()

		fireEvent.click(requestHint)
		expect(screen.getByRole("button", { name: "Ver pista anterior" })).toBeEnabled()
		expect(screen.getByRole("button", { name: "Ver pista siguiente" })).toBeDisabled()

		fireEvent.click(screen.getByRole("button", { name: "Ver pista anterior" }))
		expect(screen.getByText(/Cielo, dicen que la vida da muchas vueltas/)).toBeInTheDocument()

		fireEvent.click(requestHint)
		fireEvent.click(screen.getByRole("button", { name: "Ver pista anterior" }))
		fireEvent.click(screen.getByRole("button", { name: "Ver pista siguiente" }))
		expect(screen.getByText(/Piensa en ese lugar donde la ropa sucia/)).toBeInTheDocument()
	})

	it("keeps the scanned chapter when routing to its success screen", () => {
		localStorage.clear()
		render(
			<MemoryRouter initialEntries={["/escanear/1"]}>
				<App />
			</MemoryRouter>
		)

		fireEvent.change(screen.getByLabelText("¿La cámara no funciona?"), {
			target: { value: "nh-01-luna-azul" },
		})
		fireEvent.click(screen.getByRole("button", { name: "Validar" }))

		expect(screen.getByRole("heading", { name: "¡Lo lograste, cielo!" })).toBeInTheDocument()
		expect(JSON.parse(localStorage.getItem("nuestra-historia:v2") ?? "{}").scanned).toEqual([0])
	})
})
