import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, interpolateColors, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS, PIXEL, POPPINS, popAt } from "./brand";
import { Base, Person } from "./Layers";

// Tú a pantalla completa con palabras alrededor y animaciones encima de ti. Sin split screen.
// Todos los tiempos están en segundos del video ya cortado (27.5 s).
const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.inOut(Easing.cubic);
const useT = () => useCurrentFrame() / FPS;

// ───────── Zoom del video ─────────
const SEG = [0, 4.38, 8.38, 17.53, 22.32, 24.0, 27.5];
const PUNCH = [1.86, 3.28, 4.58, 5.4, 7.06, 7.88, 10.94, 12.68, 13.6, 14.62, 17.16, 18.08, 20.38, 21.86, 22.92, 25.58, 26.76];
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

const Scene: React.FC<{ a: number; b: number; children: React.ReactNode }> = ({ a, b, children }) => {
  const t = useT();
  if (t < a || t > b) return null;
  const op = interpolate(t, [a, a + 0.15, b - 0.15, b], [0, 1, 1, 0], clampX);
  return <AbsoluteFill style={{ opacity: op }}>{children}</AbsoluteFill>;
};

// Ilustración centrada sobre tu camiseta: entra con rebote en `at` y sale con zoom en `to`
const Ov: React.FC<{ at: number; to: number; size?: number; cy?: number; children: React.ReactNode }> = ({ at, to, size = 400, cy = 1260, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at || t > to) return null;
  const p = popAt(frame, fps, at, 12);
  const out = interpolate(t, [to - 0.16, to], [0, 1], clampX);
  return (
    <div style={{ position: "absolute", left: 540 - size / 2, top: cy - size / 2, width: size, height: size, opacity: Math.min(1, p * 2) * (1 - out), transform: `scale(${interpolate(p, [0, 1], [0.4, 1]) * (1 + 0.12 * out)})` }}>
      {children}
    </div>
  );
};

// ───────── Ilustraciones (línea aqua, 400 x 400) ─────────
const A = C.aqua;
const DARK = "rgba(11,94,102,0.6)";
const sv = { width: "100%", height: "100%", viewBox: "0 0 400 400" } as const;

const Fingerprint: React.FC<{ scan: number; mini?: boolean }> = ({ scan }) => (
  <svg {...sv}>
    <defs><clipPath id="fpc"><rect x="50" y="20" width="300" height="360" rx="60" /></clipPath></defs>
    <rect x="50" y="20" width="300" height="360" rx="60" fill={DARK} stroke={A} strokeWidth="10" />
    <g clipPath="url(#fpc)">
      <g fill="none" stroke={A} strokeWidth="12" strokeLinecap="round">
        {[26, 54, 82, 110, 138, 166].map((r, i) => (
          <circle key={r} cx="200" cy="215" r={r} strokeDasharray={`${50 + i * 24} ${24 + i * 8}`} transform={`rotate(${i * 53} 200 215)`} />
        ))}
      </g>
      <rect x="40" y={10 + scan * 350} width="320" height="14" fill={C.white} opacity="0.9" />
    </g>
  </svg>
);

const Eye: React.FC<{ pulse: number }> = ({ pulse }) => (
  <svg {...sv}>
    <path d="M24 200 Q200 30 376 200 Q200 370 24 200 Z" fill={DARK} stroke={A} strokeWidth="12" strokeLinejoin="round" />
    <circle cx="200" cy="200" r="84" fill="none" stroke={A} strokeWidth="10" />
    {Array.from({ length: 24 }).map((_, i) => (
      <line key={i} x1="200" y1="132" x2="200" y2="150" stroke={A} strokeWidth="6" strokeLinecap="round" transform={`rotate(${i * 15} 200 200)`} />
    ))}
    <circle cx="200" cy="200" r={30 + 8 * pulse} fill={A} />
    <circle cx="226" cy="174" r="11" fill={C.white} />
  </svg>
);

const FaceScan: React.FC<{ t: number }> = ({ t }) => {
  const pts = [[160, 175], [240, 175], [200, 220], [168, 268], [232, 268]];
  const scan = (Math.sin(t * 6) + 1) / 2;
  return (
    <svg {...sv}>
      {[[40, 40, 1, 1], [360, 40, -1, 1], [40, 360, 1, -1], [360, 360, -1, -1]].map(([x, y, dx, dy], i) => (
        <path key={i} d={`M${x} ${y + 70 * dy} V${y} H${x + 70 * dx}`} fill="none" stroke={A} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <ellipse cx="200" cy="205" rx="92" ry="122" fill={DARK} stroke={A} strokeWidth="8" strokeDasharray="22 14" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={interpolate(t, [0.1 + i * 0.12, 0.3 + i * 0.12], [0, 11], clampX)} fill={A} />
      ))}
      <line x1="80" x2="320" y1={80 + scan * 250} y2={80 + scan * 250} stroke={C.white} strokeWidth="8" opacity="0.85" />
    </svg>
  );
};

const Signature: React.FC<{ draw: number }> = ({ draw }) => (
  <svg {...sv}>
    <rect x="20" y="90" width="360" height="220" rx="36" fill={DARK} stroke={A} strokeWidth="8" />
    <path d="M50 240 C 80 120, 110 120, 120 210 S 160 300, 180 190 S 220 110, 250 205 S 310 290, 350 150" fill="none" stroke={A} strokeWidth="12" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
    <line x1="50" y1="275" x2="350" y2="275" stroke={A} strokeWidth="5" strokeDasharray="12 10" opacity="0.7" />
  </svg>
);

const Digits: React.FC<{ t: number }> = ({ t }) => (
  <svg {...sv}>
    <rect x="20" y="20" width="360" height="360" rx="40" fill={DARK} stroke={A} strokeWidth="8" />
    {Array.from({ length: 5 }).map((_, col) =>
      Array.from({ length: 8 }).map((__, row) => {
        const n = Math.abs(Math.floor((row * 37 + col * 91 + Math.floor(t * 9) * (col + 3)) * 7919)) % 10;
        const y = 70 + row * 42;
        return <text key={`${col}-${row}`} x={64 + col * 68} y={y} fontFamily={PIXEL} fontWeight={700} fontSize="40" fill={(row + col) % 4 === 0 ? C.white : A}>{n}</text>;
      })
    )}
  </svg>
);

const Compare: React.FC<{ check: number }> = ({ check }) => (
  <svg {...sv}>
    {[110, 290].map((cx) => (
      <g key={cx}>
        <circle cx={cx} cy="170" r="84" fill={DARK} stroke={A} strokeWidth="10" />
        {[20, 42, 64].map((r, i) => (
          <circle key={r} cx={cx} cy="170" r={r} fill="none" stroke={A} strokeWidth="10" strokeDasharray={`${34 + i * 14} ${20 + i * 6}`} transform={`rotate(${i * 61} ${cx} 170)`} />
        ))}
      </g>
    ))}
    <path d="M165 175 H235" stroke={A} strokeWidth="10" strokeLinecap="round" />
    <path d="M110 320 L180 380 L300 270" fill="none" stroke={C.white} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - check} />
  </svg>
);

const Camera: React.FC = () => (
  <svg {...sv}>
    <path d="M140 90 L160 60 H240 L260 90" fill="none" stroke={A} strokeWidth="10" strokeLinejoin="round" />
    <rect x="30" y="90" width="340" height="240" rx="36" fill={DARK} stroke={A} strokeWidth="10" />
    <circle cx="200" cy="215" r="82" fill="none" stroke={A} strokeWidth="12" />
    <circle cx="200" cy="215" r="44" fill={A} />
    <circle cx="178" cy="195" r="10" fill={C.white} />
    <rect x="300" y="116" width="40" height="22" rx="8" fill={A} />
  </svg>
);

const Shield: React.FC<{ check: number }> = ({ check }) => (
  <svg {...sv}>
    <path d="M200 24 L340 78 V192 C340 280 282 340 200 378 C118 340 60 280 60 192 V78 Z" fill={DARK} stroke={A} strokeWidth="12" strokeLinejoin="round" />
    <path d="M125 205 L180 258 L282 150" fill="none" stroke={C.white} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - check} />
  </svg>
);

const hash = (i: number, j: number) => Math.abs(Math.sin(i * 12.9898 + j * 78.233) * 43758.5453) % 1;
const QR: React.FC<{ reveal: number }> = ({ reveal }) => {
  const N = 21, m = 16, o = 32;
  const finder = (i: number, j: number) => [[0, 0], [0, N - 7], [N - 7, 0]].some(([a, b]) => i >= a && i < a + 7 && j >= b && j < b + 7);
  return (
    <svg {...sv}>
      <rect x="10" y="10" width="380" height="380" rx="28" fill={C.white} />
      {Array.from({ length: N }).flatMap((_, i) =>
        Array.from({ length: N }).map((__, j) => {
          const inF = finder(i, j);
          let on = hash(i, j) > 0.5;
          if (inF) {
            const [a, b] = [[0, 0], [0, N - 7], [N - 7, 0]].find(([a2, b2]) => i >= a2 && i < a2 + 7 && j >= b2 && j < b2 + 7)!;
            const di = i - a, dj = j - b;
            on = di === 0 || di === 6 || dj === 0 || dj === 6 || (di >= 2 && di <= 4 && dj >= 2 && dj <= 4);
          }
          const shown = i / N < reveal;
          return on && shown ? <rect key={`${i}-${j}`} x={o - 6 + j * m} y={o - 6 + i * m} width={m} height={m} fill={C.deep} /> : null;
        })
      )}
    </svg>
  );
};

const Lock: React.FC = () => (
  <svg {...sv}>
    <path d="M110 180 V120 C110 70 150 36 200 36 S290 70 290 120 V180" fill="none" stroke={A} strokeWidth="26" strokeLinecap="round" />
    <rect x="60" y="170" width="280" height="210" rx="40" fill={DARK} stroke={A} strokeWidth="12" />
    <circle cx="200" cy="262" r="26" fill={A} />
    <rect x="190" y="270" width="20" height="60" rx="10" fill={A} />
  </svg>
);

// ───────── Apertura (0 a 4.9 s): los dos títulos, grandes. De aquí sale la portada ─────────
const HER = 0.66; // tamaño de tu figura en la apertura
const T_TITLES = 4.4; // los títulos se quedan hasta aquí
const Apertura: React.FC = () => {
  const t = useT();
  const her = interpolate(t, [4.2, 4.7], [HER, 1], { ...clampX, easing: ease });
  const bgOp = interpolate(t, [4.7, 4.95], [1, 0], clampX);
  return (
    <AbsoluteFill>
      {/* Fondo: degradado de aqua profundo con anillos tipo huella */}
      <AbsoluteFill style={{ opacity: bgOp, background: "linear-gradient(180deg, #0B5E66 0%, #0A5159 60%, #08444B 100%)" }}>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx="760" cy="1000" r={110 + i * 78} fill="none" stroke={C.aqua} strokeOpacity="0.1" strokeWidth="14" strokeDasharray={`${180 + i * 30} ${60 + i * 12}`} transform={`rotate(${i * 37} 760 1000)`} />
          ))}
        </svg>
        <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 38% at 50% 64%, rgba(127,227,232,0.34) 0%, rgba(127,227,232,0) 100%)" }} />
      </AbsoluteFill>
      {/* Títulos, detrás de ti */}
      <Scene a={0} b={T_TITLES}>
        {/* Serie: ANOTHER DAY / ANOTHER UPDATE */}
        <Tx text="ANOTHER" at={0.0} to={T_TITLES} y={118} x={60} align="left" size={88} weight={800} grow={false} />
        <Tx text="DAY" at={0.24} to={T_TITLES} y={96} x={560} align="left" size={132} pixel grow={false} />
        <Tx text="ANOTHER" at={0.82} to={T_TITLES} y={248} x={60} align="left" size={88} weight={800} grow={false} />
        <Tx text="UPDATE" at={0.94} to={T_TITLES} y={226} x={540} align="left" size={132} pixel grow={false} />
        {/* Título del video */}
        <Tx text="CURP" at={0.3} to={T_TITLES} y={390} x={60} align="left" size={290} grow={false} />
        <Tx text="biométrica," at={0.5} to={T_TITLES} y={655} x={60} align="left" size={138} pixel grow={false} />
        <Tx text="la tecnología detrás" at={0.7} to={T_TITLES} y={800} x={60} align="left" size={90} weight={700} grow={false} />
      </Scene>
      {/* Tú, un poco más chica; al final creces hasta el tamaño completo. Los costados se difuminan */}
      <AbsoluteFill
        style={{
          transform: `scale(${her})`, transformOrigin: "50% 100%",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 16%, #000 84%, transparent 100%)",
          maskImage: "linear-gradient(90deg, transparent 0%, #000 16%, #000 84%, transparent 100%)",
        }}
      >
        <Person />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ───────── Palabras alrededor de ti ─────────
// DETRÁS de ti (aqua, gigantes, arriba de tu cabeza)
const BEHIND: TxP[] = [
  { text: "iris", at: 5.4, to: 6.45, y: 105, size: 260 },
  { text: "cara", at: 7.06, to: 7.52, y: 105, size: 260 },
  { text: "DIGITAL", at: 7.88, to: 8.45, y: 105, size: 200, pixel: true },
  { text: "CÓDIGO", at: 12.42, to: 12.7, y: 105, size: 210, pixel: true },
  { text: "guardado", at: 14.62, to: 15.2, y: 105, size: 190 },
  { text: "foto", at: 17.16, to: 17.95, y: 105, size: 270 },
  { text: "POR TI", at: 18.82, to: 19.3, y: 105, size: 210, pixel: true },
  { text: "QR", at: 20.38, to: 21.0, y: 100, size: 320, pixel: true },
  { text: "llave", at: 21.86, to: 22.45, y: 105, size: 260 },
  { text: "falsificar", at: 23.2, to: 24.05, y: 120, size: 170 },
  { text: "GRATIS", at: 25.58, to: 26.5, y: 105, size: 250, pixel: true },
];
// DELANTE: arriba y a los lados
const FRONT: TxP[] = [
  { text: "10", at: 4.46, to: 5.3, y: 90, x: 50, align: "left", size: 220, pixel: true },
  { text: "huellas", at: 4.58, to: 5.3, y: 105, x: 1040, align: "right", size: 170 },
  { text: "ojos", at: 5.82, to: 6.45, y: 400, x: 1040, align: "right", size: 90, weight: 700 },
  { text: "foto", at: 6.58, to: 7.06, y: 100, size: 190 },
  { text: "firma", at: 7.62, to: 8.1, y: 100, size: 160 },
  { text: "estos sistemas", at: 8.82, to: 10.4, y: 100, size: 100, weight: 700 },
  { text: "en general", at: 8.5, to: 8.82, y: 400, x: 40, align: "left", size: 70, weight: 700 },
  { text: "convierten", at: 10.94, to: 11.8, y: 100, size: 140 },
  { text: "cada rasgo", at: 11.46, to: 12.42, y: 400, x: 40, align: "left", size: 66, weight: 700 },
  { text: "numérico", at: 12.68, to: 13.3, y: 100, size: 160 },
  { text: "comparan", at: 13.6, to: 14.55, y: 100, size: 160 },
  { text: "identificas", at: 15.52, to: 16.5, y: 100, size: 130 },
  { text: "te toman", at: 16.68, to: 17.16, y: 400, x: 40, align: "left", size: 70, weight: 700 },
  { text: "nadie", at: 18.08, to: 18.54, y: 100, size: 200 },
  { text: "se haga", at: 18.22, to: 18.82, y: 400, x: 40, align: "left", size: 70, weight: 700 },
  { text: "además", at: 19.52, to: 20.12, y: 400, x: 40, align: "left", size: 70, weight: 700 },
  { text: "código", at: 20.12, to: 20.38, y: 100, size: 160 },
  { text: "valida", at: 21.34, to: 21.86, y: 100, size: 200 },
  { text: "muy", at: 22.76, to: 22.92, y: 400, x: 40, align: "left", size: 80, weight: 700 },
  { text: "difícil", at: 22.92, to: 23.2, y: 100, size: 190 },
  { text: "sigue siendo", at: 24.86, to: 25.58, y: 400, x: 40, align: "left", size: 66, weight: 700 },
  { text: "voluntaria", at: 26.76, to: 27.5, y: 105, size: 160 },
];

// ───────── Composición ─────────
export const Video: React.FC = () => {
  const t = useT();
  const z = zoomAt(t);
  const flash = interpolate(t, [17.14, 17.2, 17.5], [0, 0.85, 0], clampX);
  return (
    <AbsoluteFill style={{ background: C.deep }}>
      {/* Capa principal: tú a pantalla completa, con el fondo teñido de aqua profundo */}
      <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: "540px 600px" }}>
        <Base />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(11,94,102,0.66) 0%, rgba(11,94,102,0.52) 100%)" }} />
        {BEHIND.map((w, i) => <Tx key={i} {...w} />)}
        <Person />
      </AbsoluteFill>

      {/* Palabras */}
      {t > 4.4 && FRONT.map((w, i) => <Tx key={i} {...w} />)}

      {/* Animaciones encima de ti */}
      <Ov at={4.46} to={5.3}><Fingerprint scan={((t - 4.46) * 1.6) % 1} /></Ov>
      <Ov at={5.4} to={6.5}><Eye pulse={(Math.sin(t * 9) + 1) / 2} /></Ov>
      <Ov at={6.58} to={7.55}><FaceScan t={t - 6.58} /></Ov>
      <Ov at={7.62} to={8.5}><Signature draw={interpolate(t, [7.7, 8.3], [0, 1], { ...clampX, easing: ease })} /></Ov>
      <Ov at={12.2} to={13.35}><Digits t={t} /></Ov>
      <Ov at={13.6} to={15.2}><Compare check={interpolate(t, [14.3, 14.8], [0, 1], { ...clampX, easing: ease })} /></Ov>
      <Ov at={16.68} to={17.95}><Camera /></Ov>
      <Ov at={18.3} to={19.45}><Shield check={interpolate(t, [18.6, 19.05], [0, 1], { ...clampX, easing: ease })} /></Ov>
      <Ov at={20.2} to={22.4}><QR reveal={interpolate(t, [20.3, 21.4], [0, 1], clampX)} /></Ov>
      <Ov at={22.92} to={24.05}><Lock /></Ov>
      <AbsoluteFill style={{ background: C.white, opacity: flash }} />

      {/* Apertura: títulos grandes y tu figura sobre el degradado */}
      {t < 5.0 && <Apertura />}
    </AbsoluteFill>
  );
};
