import React from "react";
import { AbsoluteFill } from "remotion";
import { C, PIXEL, POPPINS } from "./brand";
import { Base } from "./Layers";

// Cuatro formas de escribir "TECH 0 DRAMA" para que se diferencie del título del video.
// El título del video (aqua, grande, a la izquierda) es el mismo en las cuatro.
const SH = "0 3px 20px rgba(0,0,0,0.5)";
const base: React.CSSProperties = { position: "absolute", whiteSpace: "nowrap", lineHeight: 1, textShadow: SH };

const TituloVideo: React.FC<{ y?: number; x?: number }> = ({ y = 232, x = 60 }) => (
  <>
    <div style={{ ...base, top: y, left: x, fontFamily: POPPINS, fontWeight: 700, fontSize: 68, letterSpacing: -2, color: C.aqua }}>No es que</div>
    <div style={{ ...base, top: y + 60, left: x, fontFamily: POPPINS, fontWeight: 900, fontSize: 208, letterSpacing: -6, color: C.aqua }}>ChatGPT</div>
    <div style={{ ...base, top: y + 296, left: x, fontFamily: POPPINS, fontWeight: 700, fontSize: 92, letterSpacing: -3, color: C.aqua }}>sepa</div>
    <div style={{ ...base, top: y + 268, left: x + 230, fontFamily: PIXEL, fontWeight: 700, fontSize: 180, letterSpacing: 4, color: C.aqua }}>TODO</div>
  </>
);

const Fondo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: C.white }}>
    <Base />
    {children}
  </AbsoluteFill>
);

// A. Sello chico arriba a la derecha, en blanco con el 0 en aqua
export const OpcionA: React.FC = () => (
  <Fondo>
    <TituloVideo y={170} />
    <div style={{ ...base, top: 92, right: 50, display: "flex", alignItems: "baseline", gap: 14 }}>
      <span style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 60, letterSpacing: -2, color: C.white }}>TECH</span>
      <span style={{ fontFamily: PIXEL, fontWeight: 700, fontSize: 104, color: C.aqua }}>0</span>
      <span style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 60, letterSpacing: -2, color: C.white }}>DRAMA</span>
    </div>
  </Fondo>
);

// B. Vertical sobre el borde izquierdo, en blanco con el 0 en aqua
export const OpcionB: React.FC = () => (
  <Fondo>
    <TituloVideo y={150} x={130} />
    <div style={{ ...base, left: 26, top: 760, transformOrigin: "0 0", transform: "rotate(-90deg)", display: "flex", alignItems: "baseline", gap: 16 }}>
      <span style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 70, letterSpacing: -2, color: C.white }}>TECH</span>
      <span style={{ fontFamily: PIXEL, fontWeight: 700, fontSize: 118, color: C.aqua }}>0</span>
      <span style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 70, letterSpacing: -2, color: C.white }}>DRAMA</span>
    </div>
  </Fondo>
);

// C. Encabezado centrado arriba, letras separadas y líneas a los lados
export const OpcionC: React.FC = () => (
  <Fondo>
    <TituloVideo y={190} />
    <div style={{ ...base, top: 84, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 22, textShadow: "none" }}>
      <div style={{ width: 110, height: 5, background: C.aqua, boxShadow: SH }} />
      <span style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 46, letterSpacing: 14, color: C.white, textShadow: SH }}>TECH</span>
      <span style={{ fontFamily: PIXEL, fontWeight: 700, fontSize: 84, color: C.aqua, textShadow: SH }}>0</span>
      <span style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 46, letterSpacing: 14, color: C.white, textShadow: SH }}>DRAMA</span>
      <div style={{ width: 110, height: 5, background: C.aqua, boxShadow: SH }} />
    </div>
  </Fondo>
);

// D. Toda en pixel, arriba a la derecha: la serie siempre en pixel y los títulos en Poppins
export const OpcionD: React.FC = () => (
  <Fondo>
    <TituloVideo y={170} />
    <div style={{ ...base, top: 96, right: 50, fontFamily: PIXEL, fontWeight: 700, fontSize: 76, letterSpacing: 5, color: C.white }}>
      TECH <span style={{ color: C.aqua, fontSize: 96 }}>0</span> DRAMA
    </div>
  </Fondo>
);
