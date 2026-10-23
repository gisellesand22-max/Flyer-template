import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BODY, C, HEAD, LIMA_MIN_PX, SAFE, W, H} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Entrada con rebote suave de abajo hacia arriba y salida con fundido hacia arriba.
export const Pop: React.FC<{
  start: number;
  end?: number;
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({start, end, delay = 0, children, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = start + delay;
  const sp = spring({frame: frame - s, fps, config: {damping: 11, stiffness: 170, mass: 0.7}});
  let opacity = interpolate(frame, [s, s + 6], [0, 1], clamp);
  let y = interpolate(sp, [0, 1], [70, 0]);
  const scale = interpolate(sp, [0, 1], [0.9, 1]);
  if (end !== undefined) {
    const e = interpolate(frame, [end, end + 5], [0, 1], clamp);
    opacity *= 1 - e;
    y -= 40 * e;
  }
  if (frame < s || opacity <= 0) return null;
  return <div style={{opacity, transform: `translateY(${y}px) scale(${scale})`, ...style}}>{children}</div>;
};

// Área segura: todo texto e icono vive aquí dentro.
export const Safe: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div
    style={{
      position: 'absolute',
      left: SAFE.left,
      right: SAFE.right,
      top: SAFE.top,
      bottom: SAFE.bottom,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

// Titular en Montserrat 800. Lima solo si el tamaño es de 80 px o más.
export const Big: React.FC<{size: number; color?: string; children: React.ReactNode; style?: React.CSSProperties}> = ({
  size,
  color = C.carbon,
  children,
  style,
}) => {
  const safeColor = color === C.lima && size < LIMA_MIN_PX ? C.carbon : color;
  return (
    <div
      style={{
        fontFamily: HEAD,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: '-0.03em',
        whiteSpace: 'nowrap',
        color: safeColor,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Texto de apoyo en Work Sans, siempre carbón.
export const Small: React.FC<{size?: number; weight?: 400 | 600; children: React.ReactNode; style?: React.CSSProperties}> = ({
  size = 64,
  weight = 400,
  children,
  style,
}) => (
  <div style={{fontFamily: BODY, fontWeight: weight, fontSize: size, lineHeight: 1.15, color: C.carbon, whiteSpace: 'nowrap', ...style}}>
    {children}
  </div>
);

// Subrayado dibujado a mano en lima, se traza de izquierda a derecha.
export const Underlined: React.FC<{start: number; children: React.ReactNode; thickness?: number}> = ({
  start,
  children,
  thickness = 16,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + 12], [0, 1], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)});
  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      {/* El trazo se revela de izquierda a derecha recortando su contenedor */}
      <div
        style={{
          position: 'absolute',
          left: '-4%',
          width: `${108 * p}%`,
          bottom: -thickness * 2,
          height: thickness * 3,
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          style={{position: 'absolute', left: 0, top: 0, width: `${100 / Math.max(p, 0.001)}%`, height: '100%', overflow: 'visible'}}
        >
          <path
            d="M3,12 C18,6 34,15 52,9 S84,7 97,11"
            fill="none"
            stroke={C.lima}
            strokeWidth={thickness}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div style={{position: 'relative'}}>{children}</div>
    </div>
  );
};

// Puntos lila como detalle pequeño.
export const Dots: React.FC<{start: number; end?: number; dots: {x: number; y: number; r: number}[]}> = ({start, end, dots}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {dots.map((d, i) => {
        const s = start + 4 + i * 3;
        const sc = interpolate(frame, [s, s + 8], [0, 1], clamp);
        const out = end === undefined ? 1 : interpolate(frame, [end, end + 5], [1, 0], clamp);
        const bob = Math.sin((frame + i * 17) / 9) * 6;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: d.x - d.r,
              top: d.y - d.r + bob,
              width: d.r * 2,
              height: d.r * 2,
              borderRadius: '50%',
              background: C.lila,
              transform: `scale(${sc * out})`,
            }}
          />
        );
      })}
    </>
  );
};

export const Logo: React.FC<{width: number}> = ({width}) => (
  <Img src={staticFile('logo/enplan_logo_carbon_sobre_arena.svg')} style={{width, height: (width * 131.52) / 436.29, display: 'block'}} />
);

// Celular genérico dibujado en código.
export const PHONE = {w: 420, h: 840, cx: W / 2, cy: 940};

const Check: React.FC = () => (
  <svg viewBox="0 0 100 100" style={{width: 70, height: 70}}>
    <path d="M24 52 L43 70 L77 32" fill="none" stroke={C.carbon} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Phone: React.FC<{inAt: number; outAt: number; steps: [number, number, number]}> = ({inAt, outAt, steps}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = spring({frame: frame - inAt, fps, config: {damping: 13, stiffness: 120, mass: 0.8}});
  const out = interpolate(frame, [outAt, outAt + 10], [0, 1], clamp);
  if (frame < inAt || out >= 1) return null;
  const y = interpolate(sp, [0, 1], [700, 0]) + out * 200;
  const opacity = interpolate(frame, [inAt, inAt + 6], [0, 1], clamp) * (1 - out);
  const show = (a: number, b: number) =>
    interpolate(frame, [a, a + 5], [0, 1], clamp) * (b === Infinity ? 1 : interpolate(frame, [b, b + 5], [1, 0], clamp));

  const bar = (top: number, w = 290, color = C.blanco, h = 60): React.CSSProperties => ({
    position: 'absolute',
    top,
    left: (388 - w) / 2,
    width: w,
    height: h,
    borderRadius: h / 2,
    background: color,
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: PHONE.cx - PHONE.w / 2,
        top: PHONE.cy - PHONE.h / 2,
        width: PHONE.w,
        height: PHONE.h,
        background: C.carbon,
        borderRadius: 78,
        padding: 16,
        opacity,
        transform: `translateY(${y}px) scale(${1 - out * 0.15})`,
      }}
    >
      <div style={{position: 'relative', width: '100%', height: '100%', background: C.arena, borderRadius: 64, overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: 22, left: 194 - 11, width: 22, height: 22, borderRadius: '50%', background: C.carbon}} />
        <div style={{position: 'absolute', top: 76, left: (388 - 170) / 2}}>
          <Logo width={170} />
        </div>
        {/* Paso 1: registro */}
        <div style={{position: 'absolute', inset: 0, opacity: show(inAt, steps[1])}}>
          <div style={{...bar(210, 96, C.lila, 96), left: 146}} />
          <div style={bar(350)} />
          <div style={bar(430)} />
          <div style={bar(540, 290, C.lima, 70)} />
        </div>
        {/* Paso 2: categorías */}
        <div style={{position: 'absolute', inset: 0, opacity: show(steps[1], steps[2])}}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 44 + (i % 2) * 160,
                top: 200 + Math.floor(i / 2) * 170,
                width: 140,
                height: 140,
                borderRadius: 30,
                background: C.blanco,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{width: 44, height: 44, borderRadius: '50%', background: C.lila}} />
            </div>
          ))}
        </div>
        {/* Paso 3: activar */}
        <div style={{position: 'absolute', inset: 0, opacity: show(steps[2], Infinity)}}>
          <div style={{position: 'absolute', top: 210, left: 44, width: 300, height: 400, borderRadius: 34, background: C.blanco}}>
            <div
              style={{
                position: 'absolute',
                top: 60,
                left: 75,
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: C.lima,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${spring({frame: frame - steps[2] - 4, fps, config: {damping: 9}})})`,
              }}
            >
              <Check />
            </div>
            <div style={{...bar(260, 200, C.lila, 26), left: 50}} />
            <div style={{...bar(306, 140, C.lila, 26), left: 80}} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Iconos: salen de la pantalla del celular en el paso 2, flotan alrededor
// y en la escena 4 se agrupan alrededor del texto.
const ICON = 200;
const aroundPhone = [
  {x: 190, y: 650},
  {x: 890, y: 650},
  {x: 190, y: 940},
  {x: 890, y: 940},
  {x: 190, y: 1230},
  {x: 890, y: 1230},
];
const aroundText = [
  {x: 230, y: 480},
  {x: 540, y: 470},
  {x: 850, y: 480},
  {x: 230, y: 1370},
  {x: 540, y: 1380},
  {x: 850, y: 1370},
];

export const Icons: React.FC<{files: string[]; emergeAt: number; regroupAt: number; outAt: number}> = ({
  files,
  emergeAt,
  regroupAt,
  outAt,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <>
      {files.map((file, i) => {
        const s = emergeAt + i * 2;
        if (frame < s) return null;
        const e = spring({frame: frame - s, fps, config: {damping: 12, stiffness: 140, mass: 0.7}});
        const g = spring({frame: frame - regroupAt - i, fps, config: {damping: 14, stiffness: 120, mass: 0.8}});
        const out = interpolate(frame, [outAt + i, outAt + i + 6], [0, 1], clamp);
        if (out >= 1) return null;
        const a = aroundPhone[i % 6];
        const b = aroundText[i % 6];
        const tx = interpolate(g, [0, 1], [a.x, b.x]);
        const ty = interpolate(g, [0, 1], [a.y, b.y]);
        const x = interpolate(e, [0, 1], [PHONE.cx, tx]);
        const y = interpolate(e, [0, 1], [PHONE.cy, ty]);
        const scale = interpolate(e, [0, 1], [0.15, 1]) * (1 - out * 0.4);
        const float = Math.sin((frame + i * 23) / 12) * 8;
        const rot = Math.sin((frame + i * 31) / 18) * 3;
        const opacity = interpolate(frame, [s, s + 4], [0, 1], clamp) * (1 - out);
        return (
          <Img
            key={file}
            src={staticFile(file)}
            style={{
              position: 'absolute',
              width: ICON,
              height: ICON,
              left: x - ICON / 2,
              top: y - ICON / 2 + float - out * 40,
              opacity,
              transform: `scale(${scale}) rotate(${rot}deg)`,
            }}
          />
        );
      })}
    </>
  );
};

export const FULL: React.CSSProperties = {position: 'absolute', left: 0, top: 0, width: W, height: H};
