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

// Contenedor de escena: respeta la zona segura y hace fundido de salida corto.
export const Escena: React.FC<{
  duracion: number;
  children: React.ReactNode;
  justify?: React.CSSProperties['justifyContent'];
}> = ({duracion, children, justify = 'center'}) => {
  const frame = useCurrentFrame();
  const salida = interpolate(frame, [duracion - 9, duracion], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{backgroundColor: color.arena}}>
      <div
        style={{
          position: 'absolute',
          left: seguro.lados,
          right: seguro.lados,
          top: seguro.arriba,
          bottom: seguro.abajo,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: justify,
          opacity: salida,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
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
