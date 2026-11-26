import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "@fontsource/pixelify-sans/700.css";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

// Rebote de entrada puro (sin hooks): arranca en el segundo `at`
export const popAt = (frame: number, fps: number, at: number, damping = 14) =>
  spring({ frame: frame - at * fps, fps, config: { damping, stiffness: 190, mass: 0.6 } });

// Paleta del brandbook: aqua (principal) y sus variaciones, más blanco
export const C = {
  aqua: "#7FE3E8",
  deep: "#0B5E66",
  mid: "#1A9AA3",
  light: "#E4F4F5",
  white: "#FFFFFF",
};
export const POPPINS = "Poppins, sans-serif";
// Pixelify Sans hace de fuente pixel mientras se define Pixel Baru (ver brandbook).
// Se eligió sobre Silkscreen porque su N y su 0 se leen bien.
export const PIXEL = "'Pixelify Sans', monospace";

export const FPS = 30;
export const FRAMES = 824;

// Rebote de entrada que arranca en el segundo `at` (tiempo del video cortado)
export const usePop = (at: number, damping = 13) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - at * fps,
    fps,
    config: { damping, stiffness: 190, mass: 0.6 },
  });
};
