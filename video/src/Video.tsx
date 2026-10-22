import React from 'react';
import {AbsoluteFill, Sequence, continueRender, delayRender, staticFile} from 'remotion';
import {color, FPS} from './marca';
import {Escena1, Escena2, Escena3, Escena4, Escena5, Escena6} from './scenes/Escenas';

// Tiempos en segundos, según el guion.
const escenas = [
  {C: Escena1, desde: 0, hasta: 5},
  {C: Escena2, desde: 5, hasta: 12},
  {C: Escena3, desde: 12, hasta: 21},
  {C: Escena4, desde: 21, hasta: 28},
  {C: Escena5, desde: 28, hasta: 36},
  {C: Escena6, desde: 36, hasta: 40},
];

export const DURACION_TOTAL = 40 * FPS;

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
      const duracion = (hasta - desde) * FPS;
      return (
        <Sequence key={i} from={desde * FPS} durationInFrames={duracion}>
          <C duracion={duracion} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
