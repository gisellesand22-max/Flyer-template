import tl from "./timeline.json";

// Convierte la línea de tiempo (segundos del original) a cuadros del video base.
// Debe coincidir con scripts/build_base.py.
export const FPS = tl.fps;

type Seg = { a: number; b: number; speed: number; o: number; n: number } | { hold: number; o: number; n: number };

const segs: Seg[] = [];
let o = 0;
for (const s of tl.segments as { play?: number[]; speed?: number; hold?: number; dur?: number }[]) {
  if (s.play) {
    const a = Math.round(s.play[0] * FPS);
    const b = Math.round(s.play[1] * FPS);
    const speed = s.speed ?? 1;
    const n = Math.round((b - a) / speed);
    segs.push({ a, b, speed, o, n });
    o += n;
  } else {
    const n = Math.round((s.dur ?? 0) * FPS);
    segs.push({ hold: s.hold ?? 0, o, n });
    o += n;
  }
}

export const VIDEO_FRAMES = o;
export const CLOSE_FRAMES = Math.round(tl.closeDur * FPS);
export const TOTAL_FRAMES = VIDEO_FRAMES + CLOSE_FRAMES;

// Cuadro de salida donde se ve el segundo `t` del original
export const out = (t: number) => {
  const f = t * FPS;
  for (const s of segs) {
    if ("a" in s && f >= s.a && f < s.b) return Math.round(s.o + (f - s.a) / s.speed);
  }
  throw new Error(`El segundo ${t} no cae en un tramo que se reproduce`);
};

// Pausa número i (0 = la primera)
export const hold = (i: number) => {
  const h = segs.filter((s) => "hold" in s)[i];
  return { from: h.o, to: h.o + h.n };
};
