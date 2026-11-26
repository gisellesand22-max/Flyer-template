import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, interpolateColors, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS, PIXEL, POPPINS, popAt } from "./brand";
import { Base, Person } from "./Layers";

// Casi todo el video eres tú a pantalla completa con las palabras alrededor.
// Split screen solo en la toma de carretera y mapa (segundos 6 a 11.1).
const RED = "#EA4335"; // rojo de tráfico de Google Maps. Excepción de paleta: solo la línea de tráfico
const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.inOut(Easing.cubic);
const useT = () => useCurrentFrame() / FPS;

// Se quitó el primer "¡Mira!": desde ahí todo el video se adelanta 0.34 s.
// Los tiempos de abajo están escritos en la línea de tiempo anterior y `sh` los corrige.
const DELTA = 0.34;
const sh = (t: number) => (t >= 15.5 ? t - DELTA : t);
const END = 27.3;

// ───────── Zoom del video ─────────
const SEG = [0, 2.38, 5.47, 11.02, 15.28, 16.57, 20.21, 22.04, 23.91, END];
const PUNCH = [0.7, 1.7, 2.7, 3.8, 4.9, 6.8, 8.8, 10.7, 14.2, 14.8, 17.4, 19.1, 21.5, 23.5, 26.2].map(sh);
const zoomAt = (t: number) => {
  let seg = 0;
  for (let i = 0; i < SEG.length - 1; i++) if (t >= SEG[i]) seg = i;
  const local = (t - SEG[seg]) / (SEG[seg + 1] - SEG[seg]);
  let z = (seg % 2 === 0 ? 1.0 : 1.14) + 0.05 * local;
  for (const k of PUNCH) {
    const d = t - k;
    if (d >= 0) z += 0.08 * Math.min(d / 0.08, 1) * Math.exp(-Math.max(d - 0.08, 0) * 4);
  }
  return z;
};

// ───────── Texto ─────────
type TxP = {
  text: string; at: number; to: number; y: number; size: number;
  x?: number; align?: "left" | "center" | "right"; pixel?: boolean; weight?: number; color?: string; grow?: boolean;
};
// Palabra que entra con zoom cuando la dices, crece despacio y sale con un zoom corto.
const Tx: React.FC<TxP> = ({ text, at, to, y, size, x = 40, align = "center", pixel, weight = 900, color = C.aqua, grow = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at || t > to) return null;
  const p = popAt(frame, fps, at);
  const out = interpolate(t, [to - 0.14, to], [0, 1], clampX);
  const g = grow ? 1 + 0.06 * ((t - at) / Math.max(to - at, 0.2)) : 1;
  const sc = interpolate(p, [0, 1], [0.55, 1]) * g * (1 + 0.1 * out);
  const pos: React.CSSProperties =
    align === "center" ? { left: 0, right: 0, textAlign: "center" } :
    align === "right" ? { right: 1080 - x, textAlign: "right" } : { left: x, textAlign: "left" };
  const origin = align === "center" ? "50% 60%" : align === "right" ? "100% 60%" : "0% 60%";
  return (
    <div
      style={{
        position: "absolute", top: y, ...pos, opacity: Math.min(1, p * 2) * (1 - out), transform: `scale(${sc})`, transformOrigin: origin,
        fontFamily: pixel ? PIXEL : POPPINS, fontWeight: pixel ? 700 : weight, fontSize: size, lineHeight: 1,
        letterSpacing: pixel ? 4 : -size * 0.03, color, whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

// Escena: aparece entre a y b con un fundido corto.
const Scene: React.FC<{ a: number; b: number; children: React.ReactNode }> = ({ a, b, children }) => {
  const t = useT();
  if (t < a || t > b) return null;
  const op = interpolate(t, [a, a + 0.15, b - 0.15, b], [0, 1, 1, 0], clampX);
  return <AbsoluteFill style={{ opacity: op }}>{children}</AbsoluteFill>;
};

// Aparece con rebote en el segundo `at`, y se va en `to`
const Pop: React.FC<{ at: number; to?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, to = 999, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at || t > to) return null;
  const p = popAt(frame, fps, at, 12);
  const out = interpolate(t, [to - 0.14, to], [0, 1], clampX);
  return (
    <div style={{ ...style, opacity: Math.min(1, p * 2) * (1 - out), transform: `${style?.transform ?? ""} scale(${interpolate(p, [0, 1], [0.4, 1]) * (1 + 0.1 * out)})`, transformOrigin: style?.transformOrigin ?? "50% 50%" }}>
      {children}
    </div>
  );
};

// ───────── Ilustraciones ─────────
const Car: React.FC<{ x: number; y: number; color: string; wheel: number; s?: number }> = ({ x, y, color, wheel, s = 1 }) => (
  <svg width={200 * s} height={90 * s} viewBox="0 0 200 90" style={{ position: "absolute", left: x, top: y }}>
    <path d="M8 66 L8 52 Q8 44 18 42 L48 38 L66 14 Q70 10 76 10 L128 10 Q134 10 138 14 L156 38 L184 44 Q194 46 194 56 L194 66 Z" fill={color} />
    <path d="M72 18 L124 18 L141 38 L58 38 Z" fill={C.light} />
    <line x1="98" y1="18" x2="98" y2="38" stroke={color} strokeWidth="5" />
    {[50, 150].map((cx) => (
      <g key={cx} transform={`translate(${cx} 68) rotate(${wheel})`}>
        <circle r="17" fill={C.deep} />
        <circle r="8" fill={C.aqua} />
        <line x1="-8" y1="0" x2="8" y2="0" stroke={C.deep} strokeWidth="3" />
      </g>
    ))}
  </svg>
);

// Los íconos van en aqua sobre el fondo oscuro del video
const Clock: React.FC<{ minute: number }> = ({ minute }) => (
  <svg width="300" height="300" viewBox="-180 -180 360 360">
    <circle r="160" fill="rgba(11,94,102,0.6)" stroke={C.aqua} strokeWidth="14" />
    {Array.from({ length: 12 }).map((_, i) => (
      <line key={i} x1="0" y1="-140" x2="0" y2="-124" stroke={C.aqua} strokeWidth="8" strokeLinecap="round" transform={`rotate(${i * 30})`} />
    ))}
    <line x1="0" y1="0" x2="0" y2="-92" stroke={C.white} strokeWidth="14" strokeLinecap="round" transform={`rotate(${minute / 12})`} />
    <line x1="0" y1="0" x2="0" y2="-124" stroke={C.aqua} strokeWidth="9" strokeLinecap="round" transform={`rotate(${minute})`} />
    <circle r="12" fill={C.aqua} />
  </svg>
);

const Warning: React.FC = () => (
  <svg width="260" height="234" viewBox="0 0 300 270">
    <path d="M150 14 L286 252 L14 252 Z" fill="rgba(11,94,102,0.6)" stroke={C.aqua} strokeWidth="16" strokeLinejoin="round" />
    <rect x="138" y="86" width="24" height="96" rx="12" fill={C.aqua} />
    <circle cx="150" cy="214" r="14" fill={C.aqua} />
  </svg>
);

const Cone: React.FC = () => (
  <svg width="260" height="234" viewBox="0 0 300 270">
    <rect x="30" y="226" width="240" height="30" rx="10" fill={C.mid} />
    <path d="M110 24 L190 24 L246 226 L54 226 Z" fill={C.aqua} />
    <path d="M100 66 L200 66 L212 110 L88 110 Z" fill={C.white} />
    <path d="M78 150 L222 150 L234 194 L66 194 Z" fill={C.white} />
    <rect x="104" y="12" width="92" height="22" rx="10" fill={C.mid} />
  </svg>
);

// Celular ilustrado al lado de ti (aquí irán tus capturas reales)
const Celular: React.FC = () => {
  const t = useT();
  const draw = interpolate(t, [sh(16.1), sh(17.0)], [1, 0], { ...clampX, easing: ease });
  const dots = t > sh(17.04) && t < sh(18.5) ? 1 + 0.25 * Math.sin((t - sh(17.04)) * 14) : 1;
  const menu = interpolate(t, [sh(17.6), sh(17.9), sh(20.5), sh(20.7)], [0, 1, 1, 0], clampX);
  const item = interpolate(t, [sh(18.76), sh(19.0)], [0, 1], clampX);
  const chart = interpolate(t, [sh(20.7), sh(21.0)], [0, 1], clampX);
  return (
    <div style={{ width: 420, height: 760, borderRadius: 60, background: C.light, border: `14px solid ${C.aqua}`, boxSizing: "border-box", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", left: 140, top: 14, width: 100, height: 22, borderRadius: 11, background: C.deep }} />
      <svg width="392" height="740" viewBox="0 0 392 740" style={{ position: "absolute", left: 0, top: 0 }}>
        {[[0, 190, 392, 170], [0, 330, 392, 350], [90, 60, 130, 740], [250, 60, 220, 740]].map((l, i) => (
          <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={C.white} strokeWidth="18" />
        ))}
        <path d="M60 330 L120 330 L150 190 L270 180 L320 120" fill="none" stroke={C.deep} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={draw} />
        <circle cx="60" cy="330" r="14" fill={C.mid} />
        <circle cx="320" cy="120" r="14" fill={C.deep} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx="350" cy={62 + i * 16} r="5.5" fill={C.deep} transform={`translate(350 76) scale(${dots}) translate(-350 -76)`} />
        ))}
      </svg>
      <div style={{ position: "absolute", left: 80, top: 100, width: 260, height: 210, borderRadius: 24, background: C.white, opacity: menu, transform: `translateY(${(1 - menu) * -20}px)` }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 24, top: 28 + i * 62, width: 212, height: 40, borderRadius: 12, background: i === 1 ? C.aqua : C.light, transform: i === 1 ? `scale(${1 + 0.06 * item})` : undefined }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 24, right: 24, top: 330, height: 250, padding: "22px 22px 18px", boxSizing: "border-box", borderRadius: 24, background: C.white, display: "flex", alignItems: "flex-end", gap: 12, opacity: chart }}>
        {[0.35, 0.55, 0.9, 0.7, 0.45, 0.8, 0.5].map((h, i) => (
          <div key={i} style={{ flex: 1, height: 200 * h * interpolate(t, [sh(20.9) + i * 0.12, sh(21.3) + i * 0.12], [0, 1], { ...clampX, easing: ease }), borderRadius: 8, background: i === 2 ? C.deep : C.aqua }} />
        ))}
      </div>
    </div>
  );
};

// ───────── Apertura (0 a 6 s): tú sobre el mapa con degradado. Es la portada ─────────
const HER = 0.7; // tamaño de tu figura en la apertura
const Apertura: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pin = t >= 0.66 && t <= 2.0;
  const pp = popAt(frame, fps, 0.66, 11);
  const po = interpolate(t, [1.86, 2.0], [0, 1], clampX);
  // Al final tu figura crece hasta el tamaño completo y el mapa se desvanece: coincide con la toma de abajo
  const her = interpolate(t, [5.4, 5.95], [HER, 1], { ...clampX, easing: ease });
  const bgOp = interpolate(t, [5.5, 5.9], [1, 0], clampX);
  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Fondo: tu mapa con degradado de aqua profundo */}
      <AbsoluteFill style={{ opacity: bgOp, background: C.deep }}>
        <Img src={staticFile("mapa_trafico.png")} style={{ position: "absolute", left: -260, top: 0, height: 1920 }} />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(11,94,102,0.9) 0%, rgba(11,94,102,0.94) 55%, rgba(11,94,102,0.99) 100%)" }} />
        <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 38% at 50% 62%, rgba(127,227,232,0.38) 0%, rgba(127,227,232,0) 100%)" }} />
      </AbsoluteFill>
      {/* Tú, un poco más chica, con el mapa alrededor */}
      {/* La serie crece y llena el espacio: 2 segundos extras (segundos 4 a 6). Va detrás de ti */}
      <Scene a={3.95} b={6.0}>
        <Tx text="TECH" at={4.0} to={6.0} y={80} size={220} />
        <Tx text="0" at={4.2} to={6.0} y={300} size={230} pixel />
        <Tx text="DRAMA" at={4.4} to={6.0} y={520} size={200} />
      </Scene>
      {/* Los costados se difuminan para que no se vean los bordes rectos del cuadro original */}
      <AbsoluteFill
        style={{
          transform: `scale(${her})`, transformOrigin: "50% 100%",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 16%, #000 84%, transparent 100%)",
          maskImage: "linear-gradient(90deg, transparent 0%, #000 16%, #000 84%, transparent 100%)",
        }}
      >
        <Person />
      </AbsoluteFill>
      {/* Título del video y serie */}
      <Scene a={0} b={4.1}>
        <Tx text="TECH" at={0.05} to={4.1} y={128} x={80} align="left" size={96} weight={800} grow={false} />
        <Tx text="0" at={0.2} to={4.1} y={100} x={338} align="left" size={176} pixel grow={false} />
        <Tx text="DRAMA" at={0.35} to={4.1} y={128} x={500} align="left" size={96} weight={800} grow={false} />
        <Tx text="Google" at={0.66} to={4.1} y={265} x={80} align="left" size={190} grow={false} />
        <Tx text="Maps" at={0.98} to={4.1} y={440} x={80} align="left" size={190} grow={false} />
        <Tx text="y el" at={1.5} to={4.1} y={650} x={80} align="left" size={64} weight={600} grow={false} />
        <Tx text="TRÁFICO" at={1.66} to={4.1} y={632} x={190} align="left" size={118} pixel grow={false} />
      </Scene>
      {/* Logo oficial de Google Maps: entra cuando dices "Google Maps" y sale antes de la portada */}
      {pin && (
        <Img
          src={staticFile("logos/google_maps_pin.png")}
          style={{ position: "absolute", left: 770, top: 470, height: 240, opacity: Math.min(1, pp * 2) * (1 - po), transform: `scale(${interpolate(pp, [0, 1], [0.3, 1]) * (1 + 0.15 * po)}) rotate(${interpolate(pp, [0, 1], [-25, 0])}deg)` }}
        />
      )}
    </AbsoluteFill>
  );
};

// ───────── Split screen (6 a 11.1 s): carretera con carros y tu mapa con tráfico en rojo ─────────
const SPLIT = { a: 6.0, b: 11.1 };
const splitAmt = (t: number) =>
  interpolate(t, [SPLIT.a, SPLIT.a + 0.3, SPLIT.b - 0.3, SPLIT.b], [0, 1, 1, 0], { ...clampX, easing: ease });

const roadHead = (t: number) => {
  let x = 0;
  for (let f = 6 * FPS; f < Math.round(t * FPS); f++) {
    x += interpolate(f / FPS, [6, 7.8, 9.0, 10.2], [760, 900, 150, 60], clampX) / FPS;
  }
  return x;
};
const Carretera: React.FC = () => {
  const t = useT();
  const head = roadHead(t);
  const gap = interpolate(t, [6, 10], [420, 310], clampX);
  const trafico = interpolateColors(t, [8.6, 9.7], [C.mid, RED]);
  const colors = [C.white, C.light, C.mid, C.white];
  return (
    <AbsoluteFill>
      <Tx text="velocidad" at={6.82} to={8.7} y={230} size={200} color={C.deep} />
      <Tx text="lento" at={8.82} to={10.1} y={215} size={270} weight={900} color={C.deep} />
      <div style={{ position: "absolute", left: 0, top: 698, width: 1080, height: 180, background: C.deep }} />
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", top: 780, left: ((i * 140 - (head % 140)) + 1400) % 1400 - 160, width: 70, height: 10, background: C.aqua }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 664, width: 1080, height: 18, background: trafico }} />
      {colors.map((col, i) => {
        const x = ((((head - i * gap) % 1700) + 1700) % 1700) - 300;
        return <Car key={i} x={x} y={585} color={col} wheel={head * 0.9} s={1.35} />;
      })}
    </AbsoluteFill>
  );
};

const MapaRojo: React.FC = () => {
  const t = useT();
  const sc = interpolate(t, [10.0, 11.1], [1.0, 1.6], { ...clampX, easing: ease });
  const pop = popAt(Math.round(t * FPS), FPS, 10.0, 16);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 100, top: 60, width: 880, height: 880, borderRadius: 36, overflow: "hidden", transform: `scale(${interpolate(pop, [0, 1], [0.9, 1])})` }}>
        <Img src={staticFile("mapa_trafico.png")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${sc})`, transformOrigin: "44% 52%" }} />
      </div>
      <Tx text="ROJO" at={10.66} to={11.1} y={745} size={190} pixel color={C.deep} />
    </AbsoluteFill>
  );
};

// ───────── Palabras alrededor de ti ─────────
// DETRÁS de ti (aqua, gigantes; tu cabeza las tapa un poco)
const BEHIND: TxP[] = [
  { text: "historial", at: 12.02, to: 12.86, y: 105, size: 200 },
  { text: "choques", at: 14.16, to: 14.74, y: 105, size: 195 },
  { text: "PUNTOS", at: 17.4, to: 18.38, y: 95, size: 230, pixel: true },
  { text: "tráfico", at: 22.94, to: 23.5, y: 95, size: 230 },
  { text: "histórico", at: 23.5, to: 24.2, y: 135, size: 170 },
  { text: "un choque", at: 25.0, to: 25.7, y: 95, size: 200 },
  { text: "TRÁFICO", at: 27.16, to: 27.7, y: 95, size: 230, pixel: true },
];
// DELANTE: arriba, a los lados y encima de ti (en aqua profundo sobre tu camiseta)
const FRONT: TxP[] = [
  // arriba
  { text: "mezcla", at: 11.22, to: 12.0, y: 100, size: 100 },
  { text: "OBRAS", at: 14.76, to: 15.4, y: 90, size: 170, pixel: true },
  { text: "tu ruta", at: 16.3, to: 17.0, y: 90, size: 170 },
  { text: "salida", at: 19.44, to: 20.0, y: 90, size: 170 },
  { text: "LLEGADA", at: 20.0, to: 20.6, y: 100, size: 160, pixel: true },
  { text: "cuánto", at: 21.18, to: 21.6, y: 100, size: 90 },
  { text: "No predice", at: 24.4, to: 25.0, y: 100, size: 90 },
  { text: "predecir", at: 26.22, to: 26.86, y: 90, size: 170 },
  // a la izquierda, chico
  { text: "abre", at: 16.12, to: 16.9, y: 400, size: 80, x: 40, align: "left", weight: 700 },
  { text: "tres", at: 17.04, to: 18.35, y: 400, size: 80, x: 40, align: "left", weight: 700 },
  { text: "hora de", at: 18.76, to: 19.9, y: 400, size: 80, x: 40, align: "left", weight: 700 },
  { text: "pero sí", at: 25.72, to: 26.2, y: 400, size: 80, x: 40, align: "left", weight: 700 },
  { text: "la hora del", at: 26.86, to: 27.7, y: 400, size: 70, x: 40, align: "left", weight: 700 },
  // a la derecha
  { text: "HORA", at: 12.88, to: 13.5, y: 400, size: 140, x: 1040, align: "right", pixel: true },
  // encima de ti, sobre la camiseta
  { text: "reportes", at: 13.54, to: 14.14, y: 1150, size: 110, x: 50, align: "left", color: C.deep },
  { text: "tardarías", at: 21.18, to: 22.9, y: 1150, size: 120, x: 50, align: "left", color: C.deep },
];
const shifted = (L: TxP[]) => L.map((w) => ({ ...w, at: sh(w.at), to: sh(w.to) }));
const BEHIND_S = shifted(BEHIND);
const FRONT_S = shifted(FRONT);

// ───────── Composición ─────────
export const Video: React.FC = () => {
  const t = useT();
  const z = zoomAt(t);
  const s = splitAmt(t);
  const inSplit = t >= SPLIT.a && t <= SPLIT.b;
  const open = t < 6.0 ? 1 : 0;
  const minute = interpolate(t, [11.1, 13.5], [0, 1080], { ...clampX, easing: ease });
  return (
    <AbsoluteFill style={{ background: C.deep }}>
      {/* Capa principal: tú a pantalla completa. En el split baja a la mitad inferior */}
      <AbsoluteFill style={{ transform: `translateY(${730 * s}px)`, clipPath: `inset(${270 * s}px 0 0 0)` }}>
        <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: "486px 600px" }}>
          <Base />
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(11,94,102,0.62) 0%, rgba(11,94,102,0.5) 100%)" }} />
          {!inSplit && BEHIND_S.map((w, i) => <Tx key={i} {...w} />)}
          <Person />
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Palabras e ilustraciones alrededor de ti */}
      {!inSplit && FRONT_S.map((w, i) => <Tx key={i} {...w} />)}
      {!inSplit && (
        <>
          <Pop at={11.1} to={13.55} style={{ position: "absolute", left: 30, top: 440 }}><Clock minute={minute} /></Pop>
          <Pop at={14.16} to={15.4} style={{ position: "absolute", left: 30, top: 470 }}><Warning /></Pop>
          <Pop at={14.76} to={15.4} style={{ position: "absolute", left: 790, top: 470 }}><Cone /></Pop>
          <Pop at={sh(15.46)} to={sh(24.15)} style={{ position: "absolute", left: 690, top: 300, transform: "scale(0.72)", transformOrigin: "0% 0%" }}><Celular /></Pop>
        </>
      )}

      {/* Panel del split screen */}
      {s > 0 && (
        <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1000, background: C.aqua, overflow: "hidden", transform: `translateY(${-(1 - s) * 1000}px)` }}>
          <Scene a={SPLIT.a} b={10.1}><Carretera /></Scene>
          <Scene a={9.95} b={SPLIT.b}><MapaRojo /></Scene>
        </div>
      )}

      {/* Apertura: portada con tu figura sobre el mapa */}
      {open > 0 && <Apertura opacity={open} />}
    </AbsoluteFill>
  );
};
