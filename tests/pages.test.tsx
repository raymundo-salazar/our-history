import { act, fireEvent, render, screen } from "@testing-library/react"
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
		expect(screen.queryByText(/Pista 1 de 3/)).not.toBeInTheDocument()
	})

	it("only navigates between hints that have already been revealed", async () => {
		render(
			<MemoryRouter initialEntries={["/pista/1"]}>
				<App />
			</MemoryRouter>
		)

		const requestHint = screen.getByRole("button", { name: /Necesito otra pista/ })
		expect(screen.queryByRole("button", { name: "Ver pista anterior" })).not.toBeInTheDocument()

		fireEvent.click(requestHint)
		await act(async () => await new Promise(resolve => setTimeout(resolve, 350)))
		expect(screen.getByRole("button", { name: "Ver pista anterior" })).toBeEnabled()
		expect(
			screen.queryByRole("button", { name: "Ver pista siguiente" })
		).not.toBeInTheDocument()

		fireEvent.click(screen.getByRole("button", { name: "Ver pista anterior" }))
		await act(async () => await new Promise(resolve => setTimeout(resolve, 350)))
		expect(screen.getByText(/Cielo, dicen que la vida da muchas vueltas/)).toBeInTheDocument()

		fireEvent.click(requestHint)
		await act(async () => await new Promise(resolve => setTimeout(resolve, 350)))
		fireEvent.click(screen.getByRole("button", { name: "Ver pista anterior" }))
		await act(async () => await new Promise(resolve => setTimeout(resolve, 350)))
		fireEvent.click(screen.getByRole("button", { name: "Ver pista siguiente" }))
		await act(async () => await new Promise(resolve => setTimeout(resolve, 350)))
		expect(screen.getByText(/Piensa en ese lugar donde la ropa sucia/)).toBeInTheDocument()
	})
})
