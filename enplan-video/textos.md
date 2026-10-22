# Textos en pantalla por escena

Para editarlos, cambia `src/textos.ts` y vuelve a renderizar con `npm run render`.

| Escena | Tiempo | Texto | Estilo |
|---|---|---|---|
| 1 | 0 a 3.5 s | No hay nada (se tacha) | Montserrat 800, 112 px, carbón |
| 1 | | Sí hay todo | Montserrat 800, 112 px, lima |
| 1 | | que hacer / en Ags... | Montserrat 800, 112 px, carbón |
| 2 | 3.5 a 6 s | Hay planes nuevos. | Montserrat 800, 124 px, lima |
| 2 | | Y ahorrando. | Work Sans 600, 64 px, carbón |
| 2 | | Aguascalientes (etiqueta con pin) | Work Sans 600, 40 px, carbón |
| 2 | | Logo enplan. | SVG sin cambios |
| 3 | 6 a 8.5 s | 1 (círculo lima) | Montserrat 800, carbón |
| 3 | | Regístrate | Montserrat 800, 120 px, lima |
| 3 | | Pantalla: logo, 3 campos y botón con flecha, sin texto | |
| 4 | 8.5 a 11.83 s | 2 (círculo lima) | Montserrat 800, carbón |
| 4 | | Busca | Montserrat 800, 120 px, lima |
| 4 | | por categoría | Work Sans 600, 48 px, carbón |
| 4 | | Belleza, Top, Fitness, Comida, Ocio (bajo cada icono) | Work Sans 600, 36 px, carbón |
| 5 | 11.83 a 14.83 s | 3 (círculo lima) | Montserrat 800, carbón |
| 5 | | Escoge | Montserrat 800, 120 px, lima |
| 5 | | tu próximo plan | Work Sans 600, 48 px, carbón |
| 5 | | Tarjeta 1: Ejemplo / 2x1 / Nombre del negocio (icono Comida) | Dentro del celular |
| 5 | | Tarjeta 2: Ejemplo / 20% off / Nombre del negocio (icono Belleza) | Dentro del celular |
| 6A | 14.83 a 16.23 s | 4 (círculo lima) | Montserrat 800, carbón |
| 6A | | Ahorra | Montserrat 800, 120 px, lima |
| 6A | | Ve al negocio. | Work Sans 600, 48 px, carbón |
| 6B | 16.23 a 18.57 s | Ahorra (se queda) | Montserrat 800, 120 px, lima |
| 6B | | Activa, muestra tu código y ahorra. | Work Sans 600, 44 px, carbón |
| 6 | | Pantalla: pin lima y código de formas, sin cifras | |
| 7 | 18.57 a 20 s | Logo enplan. | SVG sin cambios |
| 7 | | Empieza gratis → (botón píldora lima) | Montserrat 800, 60 px, carbón |
| 7 | | @enplan.ags | Work Sans 600, 48 px, carbón |

Los tiempos de cada escena están en `src/marca.ts` (objeto `escenas`, en frames a 30 fps).
