// Título de la serie "ANOTHER DAY ANOTHER UPDATE". Se escribe SIEMPRE así.
// Cómo usarlo: copia este archivo a src/ del video y dibuja <SerieAnotherDay /> sobre el video.
// Necesita brand.ts del proyecto (C, POPPINS, PIXEL, popAt) y Remotion.
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, PIXEL, POPPINS, popAt } from "./brand";

type Tiempos = { another1: number; day: number; another2: number; update: number };

// Tiempos por defecto: los de Giselle diciéndolo al inicio del video (segundos).
// Cambia estos valores a los segundos en que ella dice cada palabra en el video nuevo.
// Si no lo dice, usa estos mismos para que aparezca al inicio.
const POR_DEFECTO: Tiempos = { another1: 0.0, day: 0.24, another2: 0.82, update: 0.94 };

export const SerieAnotherDay: React.FC<{ tiempos?: Tiempos; color?: string }> = ({ tiempos = POR_DEFECTO, color = C.deep }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const palabra = (at: number, texto: string, pixel: boolean) => {
    const p = popAt(frame, fps, at);
    return (
      <span
        style={{
          fontFamily: pixel ? PIXEL : POPPINS,
          fontWeight: pixel ? 700 : 800,
          fontSize: pixel ? 110 : 74,
          letterSpacing: pixel ? 3 : -2,
          color,
          opacity: t >= at ? Math.min(1, p * 2) : 0,
          transform: `scale(${interpolate(p, [0, 1], [0.55, 1])})`,
          transformOrigin: "100% 60%",
        }}
      >
        {texto}
      </span>
    );
  };
  const fila = (a1: number, a2: number, palabra2: string, y: number) => (
    <div style={{ position: "absolute", right: 40, top: y, display: "flex", alignItems: "baseline", gap: 22 }}>
      {palabra(a1, "ANOTHER", false)}
      {palabra(a2, palabra2, true)}
    </div>
  );
  return (
    <>
      {fila(tiempos.another1, tiempos.day, "DAY", 80)}
      {fila(tiempos.another2, tiempos.update, "UPDATE", 200)}
    </>
  );
};
