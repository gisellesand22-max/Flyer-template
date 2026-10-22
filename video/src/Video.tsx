import React from 'react';
import {AbsoluteFill, Sequence, continueRender, delayRender, staticFile} from 'remotion';
import {color, FPS} from './marca';
import {Escena1, Escena2, Escena3, Escena4, Escena5, Escena6} from './scenes/Escenas';

// Tiempos en segundos. Total: 30 s.
const escenas = [
  {C: Escena1, desde: 0, hasta: 4},
  {C: Escena2, desde: 4, hasta: 10},
  {C: Escena3, desde: 10, hasta: 16},
  {C: Escena4, desde: 16, hasta: 20},
  {C: Escena5, desde: 20, hasta: 26.5},
  {C: Escena6, desde: 26.5, hasta: 30},
];

export const DURACION_TOTAL = 30 * FPS;

const fuentes = [
  {familia: 'Montserrat', archivo: 'fonts/montserrat-latin-800-normal.woff2', peso: '800'},
  {familia: 'Work Sans', archivo: 'fonts/work-sans-latin-400-normal.woff2', peso: '400'},
  {familia: 'Work Sans', archivo: 'fonts/work-sans-latin-600-normal.woff2', peso: '600'},
];

const espera = delayRender('Cargando fuentes');
Promise.all(
  fuentes.map((f) =>
    new FontFace(f.familia, `url(${staticFile(f.archivo)}) format('woff2')`, {weight: f.peso})
      .load()
      .then((ff) => document.fonts.add(ff)),
  ),
).then(() => continueRender(espera));

export const EnplanNegocios: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: color.arena}}>
    {escenas.map(({C, desde, hasta}, i) => {
      const inicio = Math.round(desde * FPS);
      const duracion = Math.round(hasta * FPS) - inicio;
      return (
        <Sequence key={i} from={inicio} durationInFrames={duracion}>
          <C duracion={duracion} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
