import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { APOYO, C, TITULAR, useBrandFonts } from "./brand";

// Un cuadro por estilo de subtítulo, en "que gasten un buen en Meta Ads" (21,45 s)
const FRAME = 643;
// [texto, resaltado]
const LINE: [string, boolean][] = [
  ["que gasten un buen en ", false],
  ["Meta Ads", true],
];

// 1: limpio. Work Sans blanco con sombra carbón suave; resaltado en Montserrat lima
const Limpio: React.FC = () => (
  <div style={{ position: "absolute", top: 1150, left: 80, right: 80, textAlign: "center", fontFamily: APOYO, fontWeight: 600, fontSize: 58, lineHeight: 1.2, color: C.blanco, textShadow: `0 4px 14px ${C.carbon}, 0 2px 0 ${C.carbon}` }}>
    {LINE.map(([t, h], i) => (
      <span key={i} style={h ? { fontFamily: TITULAR, fontWeight: 800, fontSize: 68, color: C.lima, whiteSpace: "nowrap" } : undefined}>
        {t}
      </span>
    ))}
  </div>
);

// 2: contorno. Montserrat blanco con contorno carbón fino; resaltado lima
const Contorno: React.FC = () => (
  <div style={{ position: "absolute", top: 1150, left: 80, right: 80, textAlign: "center", fontFamily: TITULAR, fontWeight: 800, fontSize: 60, lineHeight: 1.18, color: C.blanco, WebkitTextStroke: `8px ${C.carbon}`, paintOrder: "stroke fill" }}>
    {LINE.map(([t, h], i) => (
      <span key={i} style={h ? { fontSize: 72, color: C.lima, whiteSpace: "nowrap" } : undefined}>
        {t}
      </span>
    ))}
  </div>
);

// 3: barra. Texto blanco sobre una barra carbón semitransparente; resaltado lima
const Barra: React.FC = () => (
  <div style={{ position: "absolute", top: 1140, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
    <div style={{ position: "relative", padding: "16px 34px 20px", maxWidth: 900, textAlign: "center", fontFamily: APOYO, fontWeight: 600, fontSize: 54, lineHeight: 1.22, color: C.blanco }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 26, background: C.carbon, opacity: 0.72 }} />
      <span style={{ position: "relative" }}>
        {LINE.map(([t, h], i) => (
          <span key={i} style={h ? { fontFamily: TITULAR, fontWeight: 800, fontSize: 64, color: C.lima, whiteSpace: "nowrap" } : undefined}>
            {t}
          </span>
        ))}
      </span>
    </div>
  </div>
);

export const Subtitulo: React.FC<{ estilo: "1" | "2" | "3" }> = ({ estilo }) => {
  useBrandFonts();
  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile("toma.mp4")} startFrom={FRAME} />
      {estilo === "1" && <Limpio />}
      {estilo === "2" && <Contorno />}
      {estilo === "3" && <Barra />}
    </AbsoluteFill>
  );
};
