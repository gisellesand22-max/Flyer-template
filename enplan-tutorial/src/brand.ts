import { useEffect, useState } from "react";
import { continueRender, delayRender, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

// Paleta del brandbook enplan. Ningún color fuera de esta lista.
export const C = {
  lima: "#CDD917",
  carbon: "#2B2B23",
  arena: "#FAF8F3",
  blanco: "#FFFFFF",
  lila: "#E3BCEE",
  limaOscuro: "#7A810D",
  arenaOscuro: "#D6D0C4",
};

export const TITULAR = "Montserrat, sans-serif";
export const APOYO = "'Work Sans', sans-serif";

// Margen seguro Reels y TikTok
export const SAFE = { left: 80, right: 1000, top: 250, bottom: 1520 };

// Transiciones de 9 cuadros (entre 8 y 10)
export const T = 9;

const FONTS: [string, string, string][] = [
  ["Montserrat", "fonts/montserrat-latin-800-normal.woff2", "800"],
  ["Work Sans", "fonts/work-sans-latin-400-normal.woff2", "400"],
  ["Work Sans", "fonts/work-sans-latin-600-normal.woff2", "600"],
];

// Carga las fuentes locales antes de dibujar
export const useBrandFonts = () => {
  const [handle] = useState(() => delayRender("fuentes"));
  useEffect(() => {
    Promise.all(
      FONTS.map(([family, file, weight]) =>
        new FontFace(family, `url(${staticFile(file)})`, { weight }).load().then((f) => document.fonts.add(f)),
      ),
    ).then(() => continueRender(handle));
  }, [handle]);
};

// Rebote de entrada que arranca en el cuadro `at`
export const usePop = (at: number, damping = 13) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at, fps, config: { damping, stiffness: 160, mass: 0.7 } });
};

// 0 a 1 entre dos cuadros
export const ramp = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
