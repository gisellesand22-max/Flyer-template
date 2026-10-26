import React from "react";
import { interpolate } from "remotion";
import { CHUNKS } from "./captions";
import { C, PIXEL, POPPINS, usePop, useRealSec, useSec } from "./theme";

// Zona de ilustraciones: debajo de la cara y encima de los subtítulos.
// Todo queda dentro del margen seguro de TikTok (x 80 a 920).
export const CARD = { left: 80, top: 1020, width: 840, height: 340 };

// Muestra a sus hijos entre `from` y `to` con rebote de entrada y salida suave
export const Appear: React.FC<{
  from: number;
  to: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ from, to, style, children }) => {
  const t = useSec();
  const pop = usePop(from);
  if (t < from || t >= to) return null;
  const out = interpolate(t, [to - 0.2, to], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        ...style,
        opacity: Math.min(pop * 1.5, 1) * out,
        transform: `scale(${(0.8 + 0.2 * pop) * (0.92 + 0.08 * out)})`,
      }}
    >
      {children}
    </div>
  );
};

// Tarjeta blanca con marco ciruela donde viven las ilustraciones
export const Card: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({
  from,
  to,
  children,
}) => (
  <Appear from={from} to={to} style={{ ...CARD }}>
    <div
      style={{
        width: CARD.width,
        height: CARD.height,
        background: C.white,
        border: `6px solid ${C.plum}`,
        borderRadius: 36,
        boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  </Appear>
);

// Título de apertura: 4 palabras, Poppins Bold en caja ciruela
export const Title: React.FC = () => (
  <Appear from={0.1} to={5.9} style={{ top: 200, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
    <div
      style={{
        background: C.plum,
        borderRadius: 28,
        padding: "18px 40px",
        fontFamily: POPPINS,
        fontWeight: 700,
        fontSize: 64,
        lineHeight: 1.1,
        color: C.white,
        textAlign: "center",
        boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
      }}
    >
      Trabajo remoto
      <br />
      <span style={{ color: C.aqua }}>bien pagado</span>
    </div>
  </Appear>
);

// Sello de paso: el único acento pixel de cada escena
export const StepStamp: React.FC<{ n: number; label: string; from: number; to: number }> = ({
  n,
  label,
  from,
  to,
}) => {
  const pop = usePop(from, 9);
  return (
    <Appear from={from} to={to} style={{ top: 210, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            background: C.plum,
            color: C.aqua,
            fontFamily: PIXEL,
            fontSize: 58,
            padding: "10px 26px 14px",
            borderRadius: 14,
            border: `5px solid ${C.aqua}`,
            transform: `rotate(-4deg) scale(${1.6 - 0.6 * pop})`,
          }}
        >
          PASO {n}
        </div>
        <div
          style={{
            background: C.plum,
            color: C.white,
            fontFamily: POPPINS,
            fontWeight: 700,
            fontSize: 44,
            padding: "12px 26px",
            borderRadius: 18,
          }}
        >
          {label}
        </div>
      </div>
    </Appear>
  );
};

// Subtítulos: las palabras aparecen al ritmo en que se dicen
export const Captions: React.FC = () => {
  const t = useRealSec();
  const chunk = CHUNKS.find((c) => t >= c.words[0][1] && t < c.end);
  if (!chunk) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: CARD.top + CARD.height + 26,
        left: CARD.left,
        width: CARD.width,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: C.plum,
          borderRadius: 22,
          padding: "10px 26px 14px",
          fontFamily: POPPINS,
          fontWeight: 700,
          fontSize: 52,
          lineHeight: 1.2,
          color: C.white,
          textAlign: "center",
        }}
      >
        {chunk.words.map(([w, s], i) => {
          const on = t >= s - 0.05;
          const k = interpolate(t, [s - 0.05, s + 0.1], [0.7, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: on ? 1 : 0,
                transform: `scale(${k})`,
                color: chunk.hl.includes(i) ? C.aqua : C.white,
                marginRight: i < chunk.words.length - 1 ? "0.28em" : 0,
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </div>
  );
};
