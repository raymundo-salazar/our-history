import fs from "node:fs/promises"
import path from "node:path"
import QRCode from "qrcode"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { PNG } from "pngjs"
import jsQR from "jsqr"
import { stations } from "../src/content.js"

const arg = process.argv.find(x => x.startsWith("--url="))?.slice(6)
const base = arg || process.env.PUBLIC_APP_URL
if (!base || !/^https:\/\//i.test(base)) {
	console.error(
		"Falta PUBLIC_APP_URL: usa PUBLIC_APP_URL=https://tu-dominio o npm run qr:generate -- --url=https://tu-dominio"
	)
	process.exit(1)
}
const out = path.resolve("print/qr")
await fs.rm(out, { recursive: true, force: true })
await fs.mkdir(out, { recursive: true })
const entries = [
	{ id: "00", value: base, label: "Bienvenida" },
	...stations.map(s => ({ id: s.label, value: s.token, label: s.label })),
]
const pdf = await PDFDocument.create()
const font = await pdf.embedFont(StandardFonts.Helvetica)
const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
for (const item of entries) {
	const png = await QRCode.toBuffer(item.value, {
		type: "png",
		width: 1400,
		margin: 5,
		errorCorrectionLevel: "H",
	})
	const svg = await QRCode.toString(item.value, {
		type: "svg",
		margin: 5,
		errorCorrectionLevel: "H",
	})
	await fs.writeFile(path.join(out, `${item.id}.png`), png)
	await fs.writeFile(path.join(out, `${item.id}.svg`), svg)
	const page = pdf.addPage([595, 842])
	page.drawText(item.id, { x: 50, y: 790, size: 18, font: bold, color: rgb(0.2, 0.11, 0.16) })
	page.drawText(
		item.id === "00" ? "Escanear para abrir la búsqueda" : "Escanear dentro de la aplicación",
		{ x: 50, y: 760, size: 11, font, color: rgb(0.35, 0.25, 0.28) }
	)
	const image = await pdf.embedPng(png)
	page.drawImage(image, { x: 98, y: 275, width: 400, height: 400 })
	page.drawText("Kit de organizador · imprimir al 100%", {
		x: 50,
		y: 55,
		size: 9,
		font,
		color: rgb(0.45, 0.35, 0.38),
	})
}
for (const item of entries) {
	const data = PNG.sync.read(await fs.readFile(path.join(out, `${item.id}.png`)))
	const decoded = jsQR(new Uint8ClampedArray(data.data), data.width, data.height)
	if (!decoded || decoded.data !== item.value)
		throw new Error(`QR ${item.id} no decodifica el valor esperado`)
}
await fs.writeFile(path.resolve("print/qr/qr-imprimibles.pdf"), await pdf.save())
await fs.writeFile(
	path.resolve("print/qr/guia-colocacion.md"),
	`# Guía de colocación\n\n- 00 · Bienvenida: sobre la cama. Apunta a PUBLIC_APP_URL.\n- 01 · Lavandería: coloca en lavandería.\n- 02 · Cajuela: coloca en la cajuela de la camioneta.\n- 03 · Oficina y taller: coloca en nuestra oficina y taller.\n- 04 · Horno: coloca en el horno frío.\n- 05 · Habitación: coloca en la habitación.\n- 06 · Terraza: coloca en la terraza.\n\nImprime el PDF a escala 100%, conserva el margen blanco y prueba los siete códigos con un móvil antes de iniciar. Los nombres de ubicación no aparecen en las tarjetas.`
)
console.warn(`Generados ${entries.length} QR en print/qr/`)
