import {continueRender, delayRender, staticFile} from 'remotion';

export const C = {
  lima: '#CDD917',
  carbon: '#2B2B23',
  arena: '#FAF8F3',
  blanco: '#FFFFFF',
  lila: '#E3BCEE',
  limaOscuro: '#7A810D',
};

export const W = 1080;
export const H = 1920;
// Margen seguro para Reels y TikTok
export const SAFE = {left: 80, right: 80, top: 250, bottom: 400};

export const HEAD = "'Montserrat', sans-serif"; // solo 800
export const BODY = "'Work Sans', sans-serif"; // 400 y 600

// Lima como texto solo en 80 px o más (excepción autorizada para este video)
export const LIMA_MIN_PX = 80;

const fonts = [
  {family: 'Montserrat', weight: '800', file: 'fonts/montserrat-latin-800-normal.woff2'},
  {family: 'Work Sans', weight: '400', file: 'fonts/work-sans-latin-400-normal.woff2'},
  {family: 'Work Sans', weight: '600', file: 'fonts/work-sans-latin-600-normal.woff2'},
];

const handle = delayRender('Cargando tipografías');
Promise.all(
  fonts.map((f) =>
    new FontFace(f.family, `url(${staticFile(f.file)}) format('woff2')`, {weight: f.weight})
      .load()
      .then((face) => document.fonts.add(face)),
  ),
).then(() => continueRender(handle));
