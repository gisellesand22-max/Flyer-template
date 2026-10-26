import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/silkscreen/400.css";
import "@fontsource/silkscreen/700.css";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Paleta del brandbook: solo ciruela, aqua y blanco
export const C = {
  plum: "#712254",
  aqua: "#bcfffd",
  white: "#FFFFFF",
  plumTint: "rgba(113, 34, 84, 0.10)",
  plumLine: "rgba(113, 34, 84, 0.25)",
};

export const POPPINS = "Poppins, sans-serif";
export const PIXEL = "Silkscreen, monospace";

// Tiempo actual en segundos
export const useSec = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

// Rebote de entrada que arranca en el segundo `at`
export const usePop = (at: number, damping = 12) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - Math.round(at * fps),
    fps,
    config: { damping, stiffness: 200, mass: 0.6 },
  });
};

// Avance lineal 0 a 1 entre dos segundos
export const progress = (t: number, from: number, to: number) =>
  interpolate(t, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// Texto que se va escribiendo entre `from` y `to`
export const typed = (text: string, t: number, from: number, to: number) =>
  text.slice(0, Math.round(text.length * progress(t, from, to)));
