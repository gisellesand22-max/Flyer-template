import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, POPPINS, PIXEL } from "./brand";
import { Base } from "./Layers";

// Portada en split screen: arriba el panel aqua con el título, abajo tu video.
// Cuadro del segundo 2.2 del video cortado (cuadro 66). Sin cajas ni bordes: solo cambia el tamaño.
// Margen seguro de la cuadrícula del perfil (3:4): de y 240 a y 1680.
const PANEL_H = 1000;

const P = (size: number, weight = 900): React.CSSProperties => ({
  fontFamily: POPPINS, fontWeight: weight, fontSize: size, color: C.deep, letterSpacing: -size * 0.03, lineHeight: 0.95, whiteSpace: "nowrap",
});

export const Portada: React.FC<{ conMapa?: boolean }> = ({ conMapa }) => (
  <AbsoluteFill style={{ background: C.aqua }}>
    {/* Panel superior */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: PANEL_H, background: C.aqua, overflow: "hidden" }}>
      {conMapa && (
        <>
          <Img src={staticFile("mapa_trafico.png")} style={{ position: "absolute", left: 0, top: -120, width: 1080 }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(127,227,232,0.9)" }} />
        </>
      )}
      <div style={{ position: "absolute", left: 80, top: 232 }}>
        {/* Serie: Poppins y pixel */}
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <span style={P(96, 800)}>TECH</span>
          <span style={{ fontFamily: PIXEL, fontWeight: 700, fontSize: 176, color: C.deep, lineHeight: 0.9 }}>0</span>
          <span style={P(96, 800)}>DRAMA</span>
        </div>
        {/* Título del video */}
        <div style={{ ...P(200), marginTop: 22 }}>Google</div>
        <div style={{ ...P(200), marginTop: -2 }}>Maps</div>
        <div style={{ marginTop: 52, display: "flex", alignItems: "baseline", gap: 24 }}>
          <span style={P(74, 600)}>y el</span>
          <span style={{ fontFamily: PIXEL, fontWeight: 700, fontSize: 128, color: C.deep, letterSpacing: 2, lineHeight: 1 }}>TRÁFICO</span>
        </div>
      </div>
    </div>
    {/* Tu video, mitad inferior */}
    <div style={{ position: "absolute", left: 0, top: PANEL_H, width: 1080, height: 1920 - PANEL_H, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transform: "translateY(-270px)" }}>
        <Base />
      </div>
    </div>
  </AbsoluteFill>
);
