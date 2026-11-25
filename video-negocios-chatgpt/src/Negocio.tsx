import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, POPPINS, PIXEL, FPS, usePop } from "./brand";
import { Base, Person } from "./Layers";

// ───────── Zoom del video ─────────
// Los cortes del video (en segundos). En cada tramo alternamos acercamiento y alejamiento
// para disimular el corte, y hacemos un zoom rápido cuando dices una palabra clave.
const SEG = [0, 7.73, 10.63, 15.29, 18.52, 19.9, 22.83, 23.57];
const PUNCH = [1.04, 3.24, 4.36, 6.12, 7.0, 9.84, 11.16, 12.48, 14.1, 16.72, 18.98, 20.88, 22.9];

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
type Line = { text: string; size: number; weight?: number; pixel?: boolean; delay?: number };
type G = {
  t0: number; t1: number; y: number; lines: Line[];
  x?: number; align?: "left" | "right" | "center";
  color?: string; behind?: boolean; shadow?: boolean;
};

// Vida del texto: crece despacio mientras está en pantalla y se va con un zoom corto.
const life = (t: number, t0: number, t1: number) => {
  const grow = 1 + 0.07 * ((t - t0) / (t1 - t0));
  const out = interpolate(t, [t1 - 0.18, t1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return { scale: grow * (1 + 0.12 * out), opacity: 1 - out };
};

const LineEl: React.FC<{ l: Line; t0: number; color: string }> = ({ l, t0, color }) => {
  const p = usePop(t0 + (l.delay ?? 0), 14);
  return (
    <div
      style={{
        fontFamily: l.pixel ? PIXEL : POPPINS,
        fontWeight: l.weight ?? 800,
        fontSize: l.size,
        letterSpacing: l.pixel ? 2 : -l.size * 0.03,
        lineHeight: 1.02,
        color,
        whiteSpace: "nowrap",
        opacity: Math.min(1, p * 2),
        transform: `scale(${interpolate(p, [0, 1], [0.55, 1])})`,
        transformOrigin: "50% 60%",
      }}
    >
      {l.text}
    </div>
  );
};

const Group: React.FC<G> = ({ t0, t1, y, lines, x = 80, align = "left", color = C.deep, shadow }) => {
  const t = useCurrentFrame() / FPS;
  if (t < t0 || t > t1) return null;
  const { scale, opacity } = life(t, t0, t1);
  const pos: React.CSSProperties =
    align === "center" ? { left: 0, right: 0, textAlign: "center" } :
    align === "right" ? { right: 1080 - x, textAlign: "right" } : { left: x, textAlign: "left" };
  const origin = align === "center" ? "50% 50%" : align === "right" ? "100% 50%" : "0% 50%";
  return (
    <div
      style={{
        position: "absolute", top: y, ...pos, opacity, transform: `scale(${scale})`, transformOrigin: origin,
        display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        textShadow: shadow ? "0 4px 28px rgba(0,0,0,0.4)" : undefined,
      }}
    >
      {lines.map((l, i) => <LineEl key={i} l={l} t0={t0} color={color} />)}
    </div>
  );
};

// Título de la serie: más grande, legible, y se queda 2 segundos después de decirlo
const SERIE_END = 3.7;
const Serie: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const a1 = usePop(0.0), d = usePop(0.28), a2 = usePop(0.9);
  if (t > SERIE_END) return null;
  const { scale, opacity } = life(t, 0, SERIE_END);
  const word = (p: number): React.CSSProperties => ({
    opacity: Math.min(1, p * 2), transform: `scale(${interpolate(p, [0, 1], [0.55, 1])})`,
  });
  return (
    <div style={{ position: "absolute", right: 80, top: 272, display: "flex", alignItems: "baseline", gap: 28, opacity, transform: `scale(${scale})`, transformOrigin: "100% 50%" }}>
      <span style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 60, letterSpacing: 4, color: C.deep, ...word(a1) }}>ANOTHER</span>
      <span style={{ fontFamily: PIXEL, fontWeight: 700, fontSize: 76, color: C.deep, ...word(d) }}>DAY</span>
      <span style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 60, letterSpacing: 4, color: C.deep, ...word(a2) }}>ANOTHER</span>
    </div>
  );
};

// ───────── Guion en pantalla (tiempos del video cortado) ─────────
const BEHIND: G[] = [
  { t0: 1.04, t1: SERIE_END, y: 362, align: "center", lines: [{ text: "UPDATE", size: 232, weight: 900 }] },
  { t0: 4.36, t1: 5.5, y: 345, align: "center", lines: [{ text: "OpenAI", size: 230, weight: 900 }] },
  { t0: 16.72, t1: 17.95, y: 390, align: "center", lines: [{ text: "ChatGPT", size: 200, weight: 900 }] },
];

const FRONT: G[] = [
  // Título del video, los primeros segundos
  { t0: 0.12, t1: 4.9, y: 1230, x: 1000, align: "right", color: C.white, shadow: true,
    lines: [{ text: "Negocios en", size: 52, weight: 600 }, { text: "ChatGPT", size: 128 }] },
  { t0: 5.16, t1: 5.9, y: 300, lines: [{ text: "acaba de lanzar", size: 64, weight: 600 }] },
  { t0: 5.9, t1: 6.3, y: 300, align: "center", lines: [{ text: "BETA", size: 200, pixel: true, weight: 700 }] },
  { t0: 6.3, t1: 7.95, y: 290, align: "center", lines: [{ text: "negocios en", size: 70, weight: 600 }, { text: "ChatGPT", size: 190, delay: 0.5 }] },
  { t0: 7.76, t1: 8.8, y: 300, lines: [{ text: "Funciona", size: 120 }] },
  { t0: 8.74, t1: 10.7, y: 272, align: "center", lines: [{ text: "como un perfil de", size: 56, weight: 600 }, { text: "Google Maps", size: 130, delay: 0.7 }] },
  { t0: 10.66, t1: 11.75, y: 300, lines: [{ text: "Reclamas", size: 150 }, { text: "tu negocio", size: 64, weight: 600, delay: 0.3 }] },
  { t0: 11.72, t1: 12.5, y: 300, x: 1000, align: "right", lines: [{ text: "verificas", size: 180 }] },
  { t0: 12.48, t1: 13.75, y: 300, lines: [{ text: "actualizas", size: 150 }, { text: "tus datos", size: 64, weight: 600, delay: 0.64 }] },
  { t0: 13.74, t1: 15.3, y: 300, x: 1000, align: "right", lines: [{ text: "productos", size: 140 }, { text: "con precio", size: 64, weight: 600, delay: 1.0 }] },
  { t0: 16.22, t1: 16.75, y: 300, lines: [{ text: "cuántas veces", size: 80, weight: 600 }] },
  { t0: 17.72, t1: 18.55, y: 300, x: 1000, align: "right", lines: [{ text: "te menciona", size: 90 }] },
  { t0: 18.66, t1: 19.9, y: 280, align: "center", lines: [{ text: "cuántos", size: 64, weight: 600 }, { text: "clics", size: 220, weight: 900, delay: 0.3 }] },
  { t0: 20.24, t1: 20.9, y: 300, lines: [{ text: "busca tu negocio", size: 84 }] },
  { t0: 20.88, t1: 21.9, y: 300, align: "center", lines: [{ text: "ChatGPT", size: 190 }] },
  { t0: 21.84, t1: 22.9, y: 300, lines: [{ text: "checa", size: 64, weight: 600 }, { text: "qué dice de ti", size: 100, delay: 0.3 }] },
  { t0: 22.9, t1: 23.57, y: 280, align: "center", lines: [{ text: "¿Lo habías", size: 110, weight: 600 }, { text: "hecho?", size: 200, delay: 0.2 }] },
];

export const Negocio: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const z = zoomAt(t);
  return (
    <AbsoluteFill style={{ background: C.white }}>
      {/* Video, texto detrás de ti y tu figura: comparten el zoom */}
      <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: "45% 38%" }}>
        <Base />
        {BEHIND.map((g, i) => <Group key={i} {...g} color={C.aqua} />)}
        <Person />
      </AbsoluteFill>
      {FRONT.map((g, i) => <Group key={i} {...g} />)}
      <Serie />
    </AbsoluteFill>
  );
};
