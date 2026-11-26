import React from "react";
import { AbsoluteFill } from "remotion";
import { C, POPPINS, PIXEL } from "./brand";
import { Base } from "./Layers";

// Portada: cuadro del segundo 2.2 del video cortado (cuadro 66), con panel aqua abajo.
// El panel deja libre tu cara y garantiza que el texto se lea. Todo cabe en el margen seguro
// de la cuadrícula del perfil (3:4, de y 240 a y 1680).
const PANEL_TOP = 1100;

export const Portada: React.FC = () => (
  <AbsoluteFill style={{ background: C.white }}>
    <Base />
    <div style={{ position: "absolute", left: 0, right: 0, top: PANEL_TOP, bottom: 0, background: C.aqua }} />
    <div style={{ position: "absolute", left: 80, top: PANEL_TOP + 50, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      {/* Serie: Poppins y pixel */}
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <span style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 82, letterSpacing: -2, color: C.deep }}>TECH</span>
        <span style={{ fontFamily: PIXEL, fontWeight: 700, fontSize: 150, color: C.deep, lineHeight: 1 }}>0</span>
        <span style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 82, letterSpacing: -2, color: C.deep }}>DRAMA</span>
      </div>
      {/* Título del video */}
      <div style={{ marginTop: 34, fontFamily: POPPINS, fontWeight: 900, fontSize: 138, letterSpacing: -4, lineHeight: 1, color: C.deep, whiteSpace: "nowrap" }}>Google Maps</div>
      <div style={{ marginTop: 18, display: "flex", alignItems: "baseline", gap: 26 }}>
        <span style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 70, color: C.deep }}>y el</span>
        <span style={{ fontFamily: PIXEL, fontWeight: 700, fontSize: 112, color: C.deep, letterSpacing: 2 }}>TRÁFICO</span>
      </div>
    </div>
  </AbsoluteFill>
);
