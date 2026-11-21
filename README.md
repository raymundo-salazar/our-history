# Nuestra historia, un tesoro a la vez

Webapp móvil React + Vite para la búsqueda del tesoro del octavo aniversario de R y G. El contenido narrativo está en `src/content.js`; la app no contiene fotografías de los regalos físicos. La única imagen del evento puede añadirse como `public/assets/evento.png` y debe mostrarse solo después del desbloqueo final.

## Arquitectura frontend

La aplicación usa TypeScript, Tailwind CSS v4 y rutas reales con React Router para la navegación web. La estructura sigue diseño atómico:

- `src/componentes/atoms`: piezas visuales básicas reutilizables.
- `src/componentes/molecules`: combinaciones pequeñas con interacción.
- `src/componentes/organisms`: bloques de experiencia, como el escáner.
- `src/templates`: composición de layout reutilizable.
- `src/pages`: páginas asociadas a rutas reales (`/historia`, `/instrucciones`, `/pista/:stationId`, `/escanear/:stationId` y `/estacion/:stationId`).
- `src/hooks` y `src/domain`: lógica y configuración separadas de la UI.

Cada componente mantiene sus tipos, constantes y hooks locales en su propia carpeta cuando son necesarios. Prettier, ESLint y Husky están configurados; el hook pre-commit valida formato y bloquea `console.log`.

## Ejecutar

```bash
npm install
npm run dev
npm run build
npm test
```

Para generar el kit imprimible, copia `.env.example` a `.env` y configura una URL HTTPS pública (o pásala por CLI):

```bash
PUBLIC_APP_URL=https://tu-dominio.example npm run qr:generate
# alternativa: npm run qr:generate -- --url=https://tu-dominio.example
```

Esto crea exactamente siete SVG, siete PNG de 1400×1400 y `print/qr/qr-imprimibles.pdf`, además de la guía de colocación. Imprime a escala 100% y prueba los siete códigos desde un móvil antes de comenzar. El QR 00 va sobre la cama; 01–06 se colocan en lavandería, cajuela, nuestra oficina y taller, horno frío, habitación y terraza.

La publicación debe usar HTTPS para que `getUserMedia` funcione. El escáner se inicia únicamente al tocar “Activar cámara”, prefiere la cámara trasera, detiene el lector al salir y ofrece entrada manual como respaldo. El progreso se guarda con versión en `localStorage` y no hay backend: un usuario técnico puede inspeccionar tokens o contenido. Para QA del organizador, abre explícitamente `?qa=organizer` (no hay enlace desde la experiencia pública): aparecen controles de reinicio, salto al final y simulación de escaneo; son utilidades de prueba, no un mecanismo de seguridad.

## Checklist manual móvil

- [ ] Probar en Safari iOS y Chrome Android con permisos aceptados y denegados.
- [ ] Confirmar que al cerrar/cambiar de pantalla la cámara deja de usar el indicador del sistema.
- [ ] Escanear un QR futuro, anterior y ajeno; ninguno debe saltar estaciones.
- [ ] Recargar tras cada estación y verificar recuperación del progreso.
- [ ] Completar el minijuego, la pregunta y la revelación final sin autoavances.
- [ ] Verificar que el póster solo se muestra tras los tres pasos finales.
