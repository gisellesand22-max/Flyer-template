// Título de la serie "TECH 0 DRAMA". Se escribe SIEMPRE así.
// Cómo usarlo: copia este archivo a src/ del video y dibuja <SerieTech0Drama /> sobre el video.
// Necesita brand.ts del proyecto (C, POPPINS, PIXEL) y Remotion.
import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { C, PIXEL, POPPINS } from "./brand";

const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Aparece y sale con desvanecido suave, sin rebote. `hasta` = segundo en que sale (por defecto 5).
export const SerieTech0Drama: React.FC<{ desde?: number; hasta?: number; color?: string; sombra?: boolean }> = ({ desde = 0, hasta = 5, color = C.aqua, sombra = true }) => {
  const t = useCurrentFrame() / 30;
  if (t < desde || t > hasta) return null;
  const a = Easing.out(Easing.cubic)(interpolate(t, [desde, desde + 0.25], [0, 1], clampX));
  const out = interpolate(t, [hasta - 0.2, hasta], [1, 0], clampX);
  const base: React.CSSProperties = { position: "absolute", opacity: Math.min(a, out), transform: `translateY(${(1 - a) * 24}px)`, color, whiteSpace: "nowrap", lineHeight: 1, textShadow: sombra ? "0 3px 20px rgba(0,0,0,0.5)" : undefined };
  // Arriba a la izquierda: TECH y DRAMA en Poppins ExtraBold 100 px, el 0 en pixel 180 px
  return (
    <>
      <div style={{ ...base, top: 88, left: 60, fontFamily: POPPINS, fontWeight: 800, fontSize: 100, letterSpacing: -3 }}>TECH</div>
      <div style={{ ...base, top: 55, left: 366, fontFamily: PIXEL, fontWeight: 700, fontSize: 180, letterSpacing: 4 }}>0</div>
      <div style={{ ...base, top: 88, left: 500, fontFamily: POPPINS, fontWeight: 800, fontSize: 100, letterSpacing: -3 }}>DRAMA</div>
    </>
  );
};
