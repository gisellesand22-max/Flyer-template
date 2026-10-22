import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// Paleta de brand.md, sección 3.
export const color = {
  lima: '#CDD917',
  carbon: '#2B2B23',
  arena: '#FAF8F3',
  blanco: '#FFFFFF',
  lila: '#E3BCEE',
  limaOscuro: '#7A810D',
  arenaOscuro: '#D6D0C4',
};

export const fuente = {
  titular: "'Montserrat', sans-serif",
  apoyo: "'Work Sans', sans-serif",
};

// Zona segura para Reels y TikTok: 80 a los lados, 250 arriba, 400 abajo.
export const seguro = {lados: 80, arriba: 250, abajo: 400};

export const FPS = 30;

// Formas decorativas que flotan detrás del contenido para que nunca haya un cuadro quieto.
const Formas: React.FC<{acento: string}> = ({acento}) => {
  const frame = useCurrentFrame();
  const formas = [
    {x: -170, y: 10, d: 300, c: acento, fase: 0},
    {x: 870, y: 1600, d: 360, c: acento, fase: 1.7},
    {x: 930, y: 100, d: 120, c: acento, fase: 3.1},
  ];
  return (
    <>
      {formas.map((f, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: f.x + Math.sin(frame / 40 + f.fase) * 30,
            top: f.y + Math.cos(frame / 47 + f.fase) * 30,
            width: f.d,
            height: f.d,
            borderRadius: 999,
            backgroundColor: f.c,
            transform: `scale(${1 + Math.sin(frame / 33 + f.fase) * 0.06})`,
          }}
        />
      ))}
    </>
  );
};

// Contenedor de escena: respeta la zona segura, tiene un zoom lento continuo
// y sale hacia arriba con fundido corto.
export const Escena: React.FC<{
  duracion: number;
  children: React.ReactNode;
  justify?: React.CSSProperties['justifyContent'];
  fondo?: string;
  acento?: string;
  sinSalida?: boolean;
}> = ({duracion, children, justify = 'center', fondo = color.arena, acento = color.lima, sinSalida}) => {
  const frame = useCurrentFrame();
  const p = sinSalida
    ? 0
    : interpolate(frame, [duracion - 10, duracion], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.in(Easing.cubic),
      });
  const zoom = interpolate(frame, [0, duracion], [1, 1.025]);
  return (
    <AbsoluteFill style={{backgroundColor: fondo, overflow: 'hidden'}}>
      <Formas acento={acento} />
      <div
        style={{
          position: 'absolute',
          left: seguro.lados + 16,
          right: seguro.lados + 16,
          top: seguro.arriba + 16,
          bottom: seguro.abajo + 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: justify,
          opacity: 1 - p,
          transform: `translateY(${-60 * p}px) scale(${zoom})`,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// Flotación suave y continua.
export const useFlotar = (fase = 0, amplitud = 8) => {
  const frame = useCurrentFrame();
  return `translateY(${Math.sin(frame / 18 + fase) * amplitud}px)`;
};

// Entrada suave de abajo hacia arriba con fundido.
export const useEntrada = (inicio: number, distancia = 40, dur = 14) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [inicio, inicio + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return {opacity: p, transform: `translateY(${(1 - p) * distancia}px)`};
};

// Entrada con rebote suave (escena 3).
export const useRebote = (inicio: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({
    frame: frame - inicio,
    fps,
    config: {damping: 11, stiffness: 120, mass: 0.8},
  });
  const op = interpolate(frame, [inicio, inicio + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return {opacity: op, transform: `translateY(${(1 - s) * 50}px) scale(${0.9 + s * 0.1})`};
};

export const Titular: React.FC<{
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}> = ({children, size = 88, style}) => (
  <div
    style={{
      fontFamily: fuente.titular,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      color: color.carbon,
      textAlign: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

// Flecha del botón principal.
export const Flecha: React.FC<{size?: number}> = ({size = 52}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 12h15M13 6l6 6-6 6"
      stroke={color.carbon}
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Pin de la etiqueta de ubicación (brand.md, sección 5.4).
export const Pin: React.FC<{size?: number}> = ({size = 40}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z"
      stroke={color.carbon}
      strokeWidth={2.2}
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9.8" r="2.4" stroke={color.carbon} strokeWidth={2.2} />
  </svg>
);
