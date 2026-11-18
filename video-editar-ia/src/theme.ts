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

// Tramos del original que se conservan (sin pausas ni el segundo "entonces")
export const SEGS: [number, number][] = [
  [0.95, 5.38],
  [5.9, 9.55],
  [11.09, 13.95],
];
export const TALK_FRAMES = 329;
export const END_FRAMES = 60;
export const TOTAL_FRAMES = TALK_FRAMES + END_FRAMES;
export const TALK_END = SEGS[SEGS.length - 1][1];

// Segundo del video cortado donde empieza cada tramo
export const SEG_STARTS = SEGS.reduce<number[]>((acc, [a, b], i) => [...acc, i === 0 ? 0 : acc[i - 1] + (SEGS[i - 1][1] - SEGS[i - 1][0])], []);

// Todos los tiempos del proyecto están en segundos del original
export const outToSrc = (o: number) => {
  for (let i = SEGS.length - 1; i >= 0; i--) {
    if (o >= SEG_STARTS[i]) return SEGS[i][0] + (o - SEG_STARTS[i]);
  }
  return SEGS[0][0] + o;
};

export const useT = () => outToSrc(useCurrentFrame() / FPS);

export const usePop = (at: number, damping = 12) => {
  const t = useT();
  return spring({ frame: (t - at) * FPS, fps: FPS, config: { damping, stiffness: 200, mass: 0.6 } });
};

export const prog = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

export const typed = (text: string, t: number, a: number, b: number) => text.slice(0, Math.round(text.length * prog(t, a, b)));
