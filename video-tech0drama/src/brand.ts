import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "@fontsource/silkscreen/400.css";
import "@fontsource/silkscreen/700.css";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

// Paleta del brandbook: aqua (principal) y sus variaciones, más blanco
export const C = {
  aqua: "#7FE3E8",
  deep: "#0B5E66",
  mid: "#1A9AA3",
  light: "#E4F4F5",
  white: "#FFFFFF",
};
export const POPPINS = "Poppins, sans-serif";
// Silkscreen hace de fuente pixel mientras se define Pixel Baru (ver brandbook)
export const PIXEL = "Silkscreen, monospace";

export const FPS = 30;
export const FRAMES = 831;

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
