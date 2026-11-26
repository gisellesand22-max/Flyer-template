# Plan de edición: Google Maps y el tráfico (serie Tech 0 Drama)

Video original: 33.9 s. Con silencios cortados: 27.7 s. Los tiempos de abajo son del video ya cortado.

## 1. Formato: split screen en todo el video

1. **Abajo (y 1000 a 1920):** tu video, con zoom que alterna acercamiento y alejamiento.
2. **Arriba (y 0 a 1000):** panel aqua liso, sin cajas ni bordes. Su contenido cambia según lo que dices: títulos, palabras grandes o capturas.
3. Estilo: aqua predominante, texto en aqua profundo, solo cambia el tamaño de las letras. Poppins y pixel mezclados.

## 2. Cortes

12 pausas de 0.3 s a 1.0 s se acortan a 0.12 s. Quedan 10 tramos con voz. Ya está hecho: `public/toma.mp4`.

## 3. Panel superior, segundo por segundo

| Segundo | Lo que dices | Panel superior |
|---|---|---|
| 0 a 4 | ¿Cómo sabe Google Maps que hay tráfico? | Título "Google Maps y el tráfico" y la serie "TECH 0 DRAMA". Es la portada. Opcional: mapa con tráfico teñido de aqua de fondo. Logo de Google Maps en el segundo 0.7 |
| 4 a 6 | Usa celulares, datos anónimos y el historial | El título sale. "TECH 0 DRAMA" crece hasta llenar el panel (2 segundos extras) |
| 6 a 10 | velocidad de los coches, muchos van lento en la misma calle | Palabras grandes una por una: "velocidad" (6.8), "lento" (8.8, pixel) |
| 10 a 11 | la marca en rojo | Captura del mapa con tráfico en rojo, con zoom a las calles rojas. "rojo" en pixel |
| 11 a 15.2 | lo mezcla con el historial de esa hora y con reportes de choques y obras | "historial" (11.9), "choques" (14.2), "obras" (14.8, pixel) |
| 15.5 a 17 | abre tu ruta | Captura de una ruta abierta |
| 17 a 18.4 | toque en los tres puntos | Captura del menú de tres puntos |
| 18.4 a 20.5 | opción de hora de salida o de llegada | Captura de esa opción |
| 20.7 a 24 | cuánto tardarías según el tráfico histórico | Captura del resultado con tráfico histórico |
| 24.4 a 27.6 | No predice un choque, pero sí va a predecir la hora del tráfico | "No predice" chico, "un choque" mediano, "la hora del" chico, "TRÁFICO" gigante en pixel |

Una de cada tres palabras clave va en pixel.

## 4. Zoom del video (mitad inferior)

1. En cada corte alterna acercamiento y alejamiento: segundos 2.4, 5.5, 11.0, 15.3, 15.6, 16.9, 20.6, 22.4 y 24.3.
2. Golpe de zoom en las palabras clave: Google Maps (0.7), tráfico (1.7), celulares (2.7), anónimos (3.8), historial (4.9), velocidad (6.8), lento (8.8), rojo (10.7), choques (14.2), obras (14.8), tres puntos (17.4), hora de salida (19.1), tardarías (21.5), histórico (23.5), predecir (26.2).

## 5. Capturas

| Captura | Estado |
|---|---|
| Mapa con tráfico en rojo | Recibida (`public/mapa_trafico.png`) |
| Ruta abierta en Google Maps | Falta |
| Menú de tres puntos | Falta |
| Opción de hora de salida o de llegada | Falta |
| Resultado con tráfico histórico | Falta |

## 6. Pendientes

1. Elegir la portada: panel aqua liso o panel con el mapa teñido.
2. Confirmar que "2 segundos extras" significa que la serie dura hasta el segundo 6.
3. Enviar las 4 capturas que faltan.
4. Revisar el cero pixel: en Silkscreen tiene un punto en el centro y puede leerse como una "I".

## 7. Estado (26 de noviembre)

1. Versión 1 renderizada: `output/tech0drama_googlemaps_trafico.mp4`. Portada: `output/portada.png`.
2. Hecho: split screen completo, título y serie, logo oficial de Google Maps, animación de carretera con carros, mapa con tráfico en rojo, reloj, choques y obras, celular como ilustración, cierre.
3. Pendiente: reemplazar el celular ilustrado (segundos 15.4 a 24.2) por las 4 capturas reales.
4. La fuente pixel cambió a Pixelify Sans.

## 8. Versión 2 (26 de noviembre)

Cambios pedidos: quitar el "Mira" repetido, split screen solo en algunas tomas, palabras alrededor de ti, portada sin split screen.

1. Se quitó el primer "¡Mira!" (original 18.53 a 18.89). El video queda en 27.3 s.
2. Split screen solo del segundo 6 al 11.1: carretera con carros y tu mapa con tráfico en rojo.
3. El resto: tú a pantalla completa con palabras arriba, a los lados, detrás y encima de ti, y tamaños muy distintos.
4. El celular ilustrado va al lado de ti, no en split screen. Cuando lleguen las capturas reales se pueden poner en split screen o dentro del celular.
5. Portada: tú sobre el mapa con degradado, palabras en aqua. Archivo: `output/portada.png`.
6. Video: `output/tech0drama_googlemaps_trafico_v2.mp4`.
