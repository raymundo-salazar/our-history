import { describe, expect, it } from "vitest"
import { stations } from "../src/content"

describe("station configuration", () => {
	it("contains six unique opaque station tokens", () => {
		const tokens = stations.map(station => station.token)

		expect(new Set(tokens).size).toBe(6)
		expect(tokens.every(token => !token.includes("/"))).toBe(true)
	})

	it("offers three progressive hints for every station", () => {
		expect(stations.every(station => station.searchHints.length === 3)).toBe(true)
	})

	it("does not accept a future station token for the current station", () => {
		expect(stations[0].token).not.toBe(stations[1].token)
	})
})
