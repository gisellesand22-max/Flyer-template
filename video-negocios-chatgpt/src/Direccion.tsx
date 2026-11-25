import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { C, POPPINS, PIXEL, usePop } from "./brand";
import { Base, Person } from "./Layers";

// Tiempos de la serie en el video cortado: Another 0.0, day 0.28, another 0.9, update 1.04
const T = { another1: 0.0, day: 0.28, another2: 0.9, update: 1.04 };

const rise = (p: number, px = 40): React.CSSProperties => ({
  opacity: Math.min(1, p * 2),
  transform: `translateY(${interpolate(p, [0, 1], [px, 0])}px)`,
});

// Línea pequeña de la serie: Poppins con DAY y UPDATE en pixel
const Serie: React.FC<{ size: number; color: string; pixelColor?: string; gap?: number }> = ({ size, color, pixelColor, gap = 0.5 }) => {
  const a1 = usePop(T.another1), d = usePop(T.day), a2 = usePop(T.another2), u = usePop(T.update);
  const base: React.CSSProperties = { fontFamily: POPPINS, fontWeight: 600, fontSize: size, color, letterSpacing: size * 0.08 };
  const px: React.CSSProperties = { fontFamily: PIXEL, fontWeight: 700, fontSize: size * 1.25, color: pixelColor ?? color };
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: size * gap }}>
      <span style={{ ...base, ...rise(a1, 14) }}>ANOTHER</span>
      <span style={{ ...px, ...rise(d, 14) }}>DAY</span>
      <span style={{ ...base, ...rise(a2, 14) }}>ANOTHER</span>
      <span style={{ ...px, ...rise(u, 14) }}>UPDATE</span>
    </div>
  );
};

// ───────── Dirección 1: Solo tipografía ─────────
// Texto aqua profundo directo sobre el video. Un contraste: muy grande y muy chico.
export const Direccion1: React.FC = () => {
  const t1 = usePop(0.1), t2 = usePop(0.25);
  return (
    <AbsoluteFill style={{ background: C.white }}>
      <Base />
      <div style={{ position: "absolute", left: 80, top: 268 }}>
        <div style={{ opacity: 1 }}><Serie size={26} color={C.deep} /></div>
        <div style={{ marginTop: 34, fontFamily: POPPINS, fontWeight: 600, fontSize: 62, color: C.deep, lineHeight: 1, ...rise(t1) }}>Negocios en</div>
        <div style={{ marginTop: 6, fontFamily: POPPINS, fontWeight: 800, fontSize: 164, color: C.deep, letterSpacing: -5, lineHeight: 1, ...rise(t2, 60) }}>ChatGPT</div>
      </div>
    </AbsoluteFill>
  );
};

// ───────── Dirección 2: Una palabra detrás de ti ─────────
// UPDATE en aqua gigante detrás de tu figura. El resto, pequeño.
export const Direccion2: React.FC = () => {
  const u = usePop(T.update, 12), t1 = usePop(0.1);
  return (
    <AbsoluteFill style={{ background: C.white }}>
      <Base />
      <div style={{ position: "absolute", left: 0, right: 0, top: 362, textAlign: "center", opacity: Math.min(1, u * 2), transform: `scale(${interpolate(u, [0, 1], [0.85, 1])})` }}>
        <div style={{ fontFamily: POPPINS, fontWeight: 900, fontSize: 232, letterSpacing: -5, lineHeight: 1, color: C.aqua }}>UPDATE</div>
      </div>
      <Person />
      <div style={{ position: "absolute", left: 80, bottom: 380, ...rise(t1) }}>
        <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 54, color: C.white }}>Negocios en ChatGPT</div>
        <div style={{ marginTop: 18 }}><Serie size={24} color={C.aqua} /></div>
      </div>
    </AbsoluteFill>
  );
};

// ───────── Dirección 3: Split screen limpio ─────────
// Mitad video, mitad panel aqua liso. Sin bordes ni sombras.
export const Direccion3: React.FC = () => {
  const t1 = usePop(0.1), t2 = usePop(0.25);
  return (
    <AbsoluteFill style={{ background: C.aqua }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1180, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, transform: "scale(1.05)", transformOrigin: "50% 28%" }}>
          <Base />
        </div>
      </div>
      <div style={{ position: "absolute", left: 80, top: 1290 }}>
        <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 56, color: C.deep, ...rise(t1) }}>Negocios en</div>
        <div style={{ marginTop: 2, fontFamily: POPPINS, fontWeight: 800, fontSize: 176, color: C.deep, letterSpacing: -5, lineHeight: 1, ...rise(t2, 60) }}>ChatGPT</div>
        <div style={{ marginTop: 40 }}><Serie size={24} color={C.deep} /></div>
      </div>
    </AbsoluteFill>
  );
};
