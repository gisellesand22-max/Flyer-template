import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/silkscreen/400.css";
import { interpolate, spring, useCurrentFrame } from "remotion";

// Paleta del brandbook personal: solo ciruela, aqua y blanco
export const C = {
  ciruela: "#712254",
  aqua: "#bcfffd",
  blanco: "#FFFFFF",
  ciruelaTinte: "rgba(113, 34, 84, 0.12)",
};

export const POPPINS = "Poppins, sans-serif";
export const PIXEL = "Silkscreen, monospace";

export const FPS = 30;
// La toma empieza en el segundo 0,45 del original. Todos los tiempos de este
// proyecto están escritos en segundos del original.
export const OFFSET = 0.45;
export const TALK_FRAMES = 657;
export const END_FRAMES = 60;
export const TOTAL_FRAMES = TALK_FRAMES + END_FRAMES;
export const TALK_END = TALK_FRAMES / FPS + OFFSET;

// Segundo actual en el tiempo del original
export const useT = () => useCurrentFrame() / FPS + OFFSET;

// Rebote que arranca en el segundo `at`
export const usePop = (at: number, damping = 12) => {
  const t = useT();
  return spring({ frame: (t - at) * FPS, fps: FPS, config: { damping, stiffness: 200, mass: 0.6 } });
};

// 0 a 1 entre dos segundos
export const prog = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
