# Instrucciones para este repositorio

Repositorio de videos de Giselle (contenido de IA, tecnología y wearables para TikTok). La guía completa de marca está en `marca-personal/brandbook.md`. Léela antes de editar un video nuevo.

## Título de la serie: ANOTHER DAY ANOTHER UPDATE

Se escribe siempre exactamente así, en todos los videos de esta serie. Código listo para copiar: `marca-personal/componentes/SerieAnotherDay.tsx`.

1. Texto en mayúsculas, en dos filas, alineado a la derecha, arriba a la derecha del video (1080 x 1920):
   1. Fila 1: `ANOTHER` + `DAY`
   2. Fila 2: `ANOTHER` + `UPDATE`
2. `ANOTHER`: Poppins ExtraBold (800), 74 px, interletrado -2 px.
3. `DAY` y `UPDATE`: fuente pixel (Pixelify Sans Bold 700), 110 px, interletrado 3 px.
4. Las filas van a 80 px y 200 px del borde superior, a 40 px del borde derecho. Las palabras de cada fila van alineadas por la línea base, con 22 px entre ellas.
5. Color: aqua profundo `#0B5E66` sobre fondos claros (pared). Aqua `#7FE3E8` solo si el fondo es oscuro.
6. Animación: cada palabra entra con zoom (de 55% a 100% con rebote suave y aparición) en el segundo exacto en que Giselle la dice. Orden: ANOTHER, DAY, ANOTHER, UPDATE.
7. Se queda en pantalla al inicio junto con el título del video (hasta unos 4 segundos), para poder tomar la captura de portada.
8. Si Giselle no dice la frase en el audio, aparece igual al inicio con los tiempos por defecto del componente.
9. No se cambia el fondo del video: nada de fondo azul, tinte o degradado.

## Reglas generales de estilo (resumen)

1. Aqua `#7FE3E8` es el color principal. Variaciones: aqua profundo `#0B5E66`, aqua medio `#1A9AA3`, aqua claro `#E4F4F5`. Nunca el antiguo Tinta `#0E2F3A`.
2. Fuentes: Poppins y pixel (Pixelify Sans). En títulos grandes, la C en pixel se lee como O: usa Poppins para "CURP" y similares.
3. Giselle a pantalla completa con su fondo natural. Palabras alrededor (arriba, a los lados, detrás de su cabeza), con tamaños muy distintos y animaciones encima de ella.
4. Split screen solo en algunas tomas, nunca en todo el video.
5. Se cortan los silencios y se quitan las palabras repetidas.
6. Escribe en español, sin guiones largos ni jerga, y no inventes datos: si algo del audio no está claro (un año, un nombre), pregúntale en vez de ponerlo en pantalla.
