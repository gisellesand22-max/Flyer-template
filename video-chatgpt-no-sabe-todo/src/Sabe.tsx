import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { C, FPS, PIXEL, POPPINS } from "./brand";
import { Base, Person } from "./Layers";

// Sin rebotes: el texto entra con aparición suave y sube un poco con frenado; el zoom es continuo y suave.
// Tiempos en segundos del video ya cortado (26.9 s).
const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeOut = Easing.out(Easing.cubic);
const easeIO = Easing.inOut(Easing.sin);
const useT = () => useCurrentFrame() / FPS;
const END = 26.9;

// ───────── Zoom suave ─────────
// Un solo encuadre. Acercamiento lento en cada bloque y alejamiento suave de 0.6 s al empezar el siguiente.
// Nunca cambia de tamaño en los cortes.
const zoomAt = (t: number) =>
  interpolate(t, [0, 8.0, 8.6, 19.2, 19.8, END], [1.0, 1.07, 1.0, 1.07, 1.0, 1.07], { ...clampX, easing: easeIO });

// ───────── Texto ─────────
type TxP = {
  text: string; at: number; to: number; y: number; size: number;
  x?: number; align?: "left" | "center" | "right"; pixel?: boolean; weight?: number; color?: string; shadow?: boolean;
};
const SHADOW = "0 3px 20px rgba(0,0,0,0.5)";
// Aparece en 0.25 s y sube 24 px con frenado, sin rebote. Sale con desvanecido de 0.2 s.
const Tx: React.FC<TxP> = ({ text, at, to, y, size, x = 40, align = "center", pixel, weight = 900, color = C.aqua, shadow = true }) => {
  const t = useT();
  if (t < at || t > to) return null;
  const a = easeOut(interpolate(t, [at, at + 0.25], [0, 1], clampX));
  const out = interpolate(t, [to - 0.2, to], [1, 0], clampX);
  const pos: React.CSSProperties =
    align === "center" ? { left: 0, right: 0, textAlign: "center" } :
    align === "right" ? { right: 1080 - x, textAlign: "right" } : { left: x, textAlign: "left" };
  return (
    <div
      style={{
        position: "absolute", top: y, ...pos, opacity: Math.min(a, out), transform: `translateY(${(1 - a) * 24}px)`,
        fontFamily: pixel ? PIXEL : POPPINS, fontWeight: pixel ? 700 : weight, fontSize: size, lineHeight: 1,
        letterSpacing: pixel ? 4 : -size * 0.03, color, whiteSpace: "nowrap", textShadow: shadow ? SHADOW : undefined,
      }}
    >
      {text}
    </div>
  );
};

// Ilustración sobre tu pantalón (derecha y abajo): aparece y se va con desvanecido suave
const Ov: React.FC<{ at: number; to: number; w?: number; h?: number; cx?: number; cy?: number; children: React.ReactNode }> = ({ at, to, w = 420, h = 320, cx = 700, cy = 1500, children }) => {
  const t = useT();
  if (t < at || t > to) return null;
  const a = easeOut(interpolate(t, [at, at + 0.3], [0, 1], clampX));
  const out = interpolate(t, [to - 0.25, to], [1, 0], clampX);
  return (
    <div style={{ position: "absolute", left: cx - w / 2, top: cy - h / 2, width: w, height: h, opacity: Math.min(a, out), transform: `translateY(${(1 - a) * 24}px)` }}>
      {children}
    </div>
  );
};

// ───────── Ilustraciones (aqua profundo sobre el pantalón claro) ─────────
const D = C.deep, A = C.aqua, L = C.light;
const sv = (w: number, h: number) => ({ width: "100%", height: "100%", viewBox: `0 0 ${w} ${h}` });
const prog = (t: number, a: number, b: number) => easeIO(interpolate(t, [a, b], [0, 1], clampX));

// Teclado con barra de sugerencias que se completa sola (segundos 5 a 8)
const Keyboard: React.FC<{ t: number }> = ({ t }) => {
  const chip = (i: number) => prog(t, 5.7 + i * 0.55, 6.1 + i * 0.55);
  const typed = prog(t, 6.6, 7.7);
  return (
    <svg {...sv(420, 320)}>
      <rect x="8" y="8" width="404" height="304" rx="34" fill={L} stroke={D} strokeWidth="8" />
      <rect x="28" y="26" width="364" height="44" rx="14" fill={C.white} stroke={D} strokeWidth="5" />
      <rect x="40" y="40" width={20 + 250 * typed} height="16" rx="8" fill={D} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={28 + i * 124} y="84" width="112" height="40" rx="14" fill={A} fillOpacity={0.35 + 0.65 * chip(i)} stroke={D} strokeWidth="4" />
      ))}
      {[10, 9, 7].map((n, r) =>
        Array.from({ length: n }).map((_, k) => (
          <rect key={`${r}-${k}`} x={28 + k * (364 / n) + (r === 2 ? 30 : r === 1 ? 14 : 0)} y={146 + r * 52} width={364 / n - 8} height="40" rx="9" fill={C.white} stroke={D} strokeWidth="3" />
        ))
      )}
    </svg>
  );
};

// Barras de opciones: la más larga se elige (segundos 9 a 13.7). Sin números.
const Bars: React.FC<{ t: number }> = ({ t }) => {
  const rows = [{ w: 150, y: 40 }, { w: 270, y: 120 }, { w: 200, y: 200 }];
  const pick = prog(t, 12.4, 12.9);
  return (
    <svg {...sv(420, 320)}>
      <rect x="8" y="8" width="404" height="304" rx="34" fill={L} stroke={D} strokeWidth="8" />
      {rows.map((r, i) => {
        const g = prog(t, 11.0 + i * 0.35, 11.7 + i * 0.35);
        const chosen = i === 1;
        return (
          <g key={i}>
            <rect x="34" y={r.y + 20} width="352" height="40" rx="14" fill={C.white} stroke={D} strokeWidth="3" />
            <rect x="34" y={r.y + 20} width={Math.max(8, (r.w + 70) * g)} height="40" rx="14" fill={chosen && pick > 0 ? D : A} />
          </g>
        );
      })}
    </svg>
  );
};

const Check: React.FC<{ d: number }> = ({ d }) => (
  <svg {...sv(320, 320)}>
    <circle cx="160" cy="160" r="140" fill={L} stroke={D} strokeWidth="12" />
    <path d="M90 168 L142 218 L236 108" fill="none" stroke={D} strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - d} />
  </svg>
);

const Lupa: React.FC<{ d: number }> = ({ d }) => (
  <svg {...sv(320, 320)}>
    <circle cx="136" cy="136" r="96" fill={L} stroke={D} strokeWidth="18" />
    <line x1="206" y1="206" x2="288" y2="288" stroke={D} strokeWidth="28" strokeLinecap="round" />
    <path d="M92 138 L125 170 L184 100" fill="none" stroke={D} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - d} />
  </svg>
);

const Lapiz: React.FC = () => (
  <svg {...sv(320, 320)}>
    <path d="M60 260 L76 200 L230 46 L274 90 L120 244 Z" fill={L} stroke={D} strokeWidth="14" strokeLinejoin="round" />
    <path d="M60 260 L76 200 L120 244 Z" fill={D} />
    <line x1="206" y1="70" x2="250" y2="114" stroke={D} strokeWidth="12" />
  </svg>
);
const Foco: React.FC = () => (
  <svg {...sv(320, 320)}>
    <path d="M160 36 C100 36 60 82 60 134 C60 170 80 190 96 212 C104 224 106 232 106 244 H214 C214 232 216 224 224 212 C240 190 260 170 260 134 C260 82 220 36 160 36 Z" fill={L} stroke={D} strokeWidth="14" strokeLinejoin="round" />
    <line x1="116" y1="268" x2="204" y2="268" stroke={D} strokeWidth="14" strokeLinecap="round" />
    <line x1="132" y1="296" x2="188" y2="296" stroke={D} strokeWidth="14" strokeLinecap="round" />
  </svg>
);
const Lista: React.FC<{ t: number }> = ({ t }) => (
  <svg {...sv(320, 320)}>
    <rect x="40" y="24" width="240" height="272" rx="28" fill={L} stroke={D} strokeWidth="12" />
    {[0, 1, 2].map((i) => (
      <g key={i} opacity={prog(t, 20.92 + i * 0.2, 21.2 + i * 0.2)}>
        <circle cx="88" cy={92 + i * 64} r="14" fill={A} stroke={D} strokeWidth="6" />
        <rect x="120" y={82 + i * 64} width="130" height="20" rx="10" fill={D} />
      </g>
    ))}
  </svg>
);

// ───────── Textos ─────────
// Títulos: se quedan los dos juntos al inicio, para la portada (segundos 0 a 5)
const T_END = 5.0;
const Titulos: React.FC = () => (
  <>
    <Tx text="TECH" at={0.0} to={T_END} y={88} x={60} align="left" size={100} weight={800} />
    <Tx text="0" at={0.0} to={T_END} y={55} x={366} align="left" size={180} pixel />
    <Tx text="DRAMA" at={0.0} to={T_END} y={88} x={500} align="left" size={100} weight={800} />
    <Tx text="No es que" at={0.1} to={T_END} y={232} x={60} align="left" size={68} weight={700} />
    <Tx text="ChatGPT" at={0.1} to={T_END} y={292} x={60} align="left" size={208} />
    <Tx text="sepa" at={0.1} to={T_END} y={528} x={60} align="left" size={92} weight={700} />
    <Tx text="TODO" at={0.1} to={T_END} y={500} x={290} align="left" size={180} pixel />
  </>
);

const TOP = 110;
// DETRÁS de tu cabeza (aqua, gigantes; tu cabeza tapa un poco la parte baja)
const BEHIND: TxP[] = [
  { text: "IA", at: 8.74, to: 9.2, y: 560, size: 400, pixel: true },
  { text: "seguro", at: 14.8, to: 15.9, y: 540, size: 255 },
  { text: "PALABRA", at: 26.32, to: 26.9, y: 560, size: 230, pixel: true },
];
// DELANTE: arriba (aqua), a los lados y abajo sobre tu ropa (aqua profundo)
const DEEP = { color: C.deep, shadow: false } as const;
const FRONT: TxP[] = [
  { text: "autocompletar", at: 5.54, to: 6.9, y: TOP + 30, size: 125 },
  { text: "teclado", at: 6.44, to: 7.3, y: 960, x: 1040, align: "right", size: 90, weight: 700, ...DEEP },
  { text: "GIGANTE", at: 7.32, to: 8.5, y: TOP, size: 190, pixel: true },
  { text: "calcula", at: 9.26, to: 10.2, y: 1020, x: 1040, align: "right", size: 90, weight: 700, ...DEEP },
  { text: "probable", at: 11.18, to: 12.3, y: TOP, size: 200 },
  { text: "uno en uno", at: 13.16, to: 13.7, y: TOP + 20, size: 130, pixel: true },
  { text: "se equivoca", at: 16.0, to: 16.5, y: TOP + 20, size: 140 },
  { text: "probable", at: 17.28, to: 18.2, y: 1000, x: 1040, align: "right", size: 80, weight: 700, ...DEEP },
  { text: "VERIFICADO", at: 18.54, to: 19.2, y: TOP + 10, size: 150, pixel: true },
  { text: "borradores", at: 19.7, to: 20.5, y: TOP + 20, size: 150 },
  { text: "ideas", at: 20.54, to: 20.9, y: TOP, size: 190 },
  { text: "resúmenes", at: 20.92, to: 21.7, y: TOP + 20, size: 150 },
  { text: "REVISA", at: 21.7, to: 22.45, y: TOP, size: 200, pixel: true },
  { text: "datos importantes", at: 22.45, to: 23.7, y: TOP + 20, size: 95 },
  { text: "no lo sabe todo", at: 23.72, to: 24.8, y: TOP + 20, size: 110 },
  { text: "solo predice", at: 25.28, to: 26.3, y: TOP + 30, size: 130 },
];

// Texto que se escribe solo, con cursor que parpadea (segundos 25.6 a 26.9)
const Escribe: React.FC = () => {
  const t = useT();
  if (t < 25.6 || t > END) return null;
  const txt = "la siguiente palabra";
  const n = Math.round(txt.length * prog(t, 25.7, 26.5));
  const a = easeOut(interpolate(t, [25.6, 25.9], [0, 1], clampX));
  const blink = Math.floor(t * 3) % 2 === 0;
  return (
    <div style={{ position: "absolute", left: 330, top: 1440, opacity: a, fontFamily: POPPINS, fontWeight: 800, fontSize: 64, color: C.deep, whiteSpace: "nowrap", letterSpacing: -1 }}>
      {txt.slice(0, n)}
      <span style={{ display: "inline-block", width: 8, height: 64, marginLeft: 6, background: blink ? C.deep : "transparent", verticalAlign: "-8px" }} />
    </div>
  );
};

// ───────── Composición ─────────
export const Video: React.FC = () => {
  const t = useT();
  const z = zoomAt(t);
  return (
    <AbsoluteFill style={{ background: C.white }}>
      {/* Tú, con tu fondo natural. Zoom continuo y suave */}
      <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: "420px 850px" }}>
        <Base />
        {BEHIND.map((w, i) => <Tx key={i} {...w} />)}
        <Person />
      </AbsoluteFill>

      {FRONT.map((w, i) => <Tx key={i} {...w} />)}

      {/* Animaciones encima de ti, sobre el pantalón */}
      <Ov at={5.3} to={8.3}><Keyboard t={t} /></Ov>
      <Ov at={10.9} to={13.7}><Bars t={t} /></Ov>
      <Ov at={14.7} to={16.6} w={320} h={320}><Check d={prog(t, 14.8, 15.4)} /></Ov>
      <Ov at={18.0} to={19.3} w={320} h={320}><Lupa d={prog(t, 18.5, 19.0)} /></Ov>
      <Ov at={19.7} to={20.5} w={320} h={320} cx={640}><Lapiz /></Ov>
      <Ov at={20.54} to={20.95} w={320} h={320} cx={640}><Foco /></Ov>
      <Ov at={20.92} to={21.75} w={320} h={320} cx={640}><Lista t={t} /></Ov>
      <Ov at={22.0} to={24.4} w={320} h={320}><Lupa d={prog(t, 22.2, 22.9)} /></Ov>
      <Escribe />

      <Titulos />
    </AbsoluteFill>
  );
};
