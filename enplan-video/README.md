# enplan. explainer (Remotion)

Video vertical 1080x1920, 30 fps, 17 s, sin audio. Para Instagram Reels y TikTok.

## Cómo renderizar

```bash
npm install
npm run render
```

El MP4 queda en `output/enplan-explainer.mp4`.

Para ver y ajustar en el navegador: `npm run studio`.

Si Remotion no puede descargar su navegador, agrega la ruta de un Chrome o Chromium local:
`npm run render -- --browser-executable=/ruta/a/chrome`

## Dónde editar

1. Textos: `src/texts.ts` (lista completa en `textos.md`).
2. Tiempos: `src/timing.ts`.
3. Iconos: `public/icons` y la lista `ICONS` en `src/texts.ts`.
4. Logo: `public/logo` (SVG sin modificar).

## Supuestos y pendientes

1. **Lima sobre arena (excepción autorizada por Giselle).** Lima como color de texto solo en palabras de 80 px o más en Montserrat 800 ("beneficios", "plan", "ti", "negocio?", "plan" del cierre). Todo texto menor a 80 px va en carbón. brand.md marca este contraste (1.46) como no apto para texto; se usa solo por esta excepción.
2. **Duración 17 s en lugar de 15 s.** Autorizado. El guion no cabe en 15 s respetando 1 s por cada 3 palabras.
3. **Frases partidas en 2 pantallas** (escenas 1, 2, 4 y 5) para no pasar de 6 palabras por pantalla. Los textos no cambiaron. En la escena 2, "plan" se queda en la segunda pantalla.
4. **Pasos de la escena 3 uno a la vez.** Cada paso sale y entra el siguiente, para no acumular más de 6 palabras.
5. **El logo no cuenta como palabra** en el límite de 6 palabras.
6. **Iconos de Tiendas y Servicios.** PENDIENTE: falta recibir los archivos (bolsa roja = Tiendas, mano con estrella = Servicios).
7. **Icono de Servicios con mano.** El prompt dice "no uses manos"; Giselle autorizó usar este icono porque es el oficial de la categoría.
8. **Estrella disco (categoría "top") fuera del video.** Su archivo trae el cuadriculado dibujado, sin transparencia real. Pendiente: versión con fondo transparente si se quiere usar.
9. **Logo.** Solo se recibió `enplan_logo_carbon_sobre_arena.svg`. Los otros 4 SVG de brand.md no se recibieron. brand.md dice que los SVG son una reconstrucción; si existe el original, ese manda.
10. **Pantalla del celular sin texto.** Muestra formas simples (campos, cuadros de categorías y una palomita) para no inventar el flujo real de la app ni el canje.
11. **Tipografías locales.** Montserrat 800 y Work Sans 400 y 600 (Google Fonts, subconjunto latino) incluidas en `public/fonts` para que el render no dependa de internet.
12. **Botón** con texto en Montserrat 800 (brand.md: negritas).
13. **Dos llamados a la acción.** La escena 5 invita a negocios a registrarse y la escena 6 cierra con "Checa tu siguiente plan". Ambos vienen del brief; el checklist de brand.md pide un solo llamado claro.

## Checklist de brand.md, sección 8

1. Solo colores de la paleta: sí (lima, carbón, arena, blanco, lila, lima oscuro sin usar como texto). Los iconos conservan sus colores originales.
2. Logo con punto lima y sin modificar: sí, SVG original.
3. Titulares en Montserrat y texto en Work Sans: sí. Máximo dos pesos por escena.
4. Contraste: carbón sobre arena y carbón sobre lima en todo texto menor a 80 px. Lima sobre arena solo por la excepción del punto 1.
5. Tono de tú, frases cortas, sin la palabra "fondas": sí.
6. Un solo llamado a la acción: ver punto 13.
7. Sin datos inventados: sí. Sin descuentos, precios, negocios, cifras ni membresías.
