import React from "react";
import { interpolate, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { C, T } from "./brand";

// Celular genérico: cuerpo carbón y esquinas muy redondeadas. No imita ningún modelo.
export const PHONE = { top: 650, height: 1000, bezel: 18 };
export const SCREEN_W = Math.round((PHONE.height - PHONE.bezel * 2) * (1080 / 1920));
export const SCREEN_H = PHONE.height - PHONE.bezel * 2;
export const PHONE_W = SCREEN_W + PHONE.bezel * 2;
export const PHONE_LEFT = Math.round((1080 - PHONE_W) / 2);
export const K = SCREEN_W / 1080;

// Centro en el lienzo de un punto de la grabación (sin contar el zoom)
export const onCanvas = (x: number, y: number) => ({
  x: PHONE_LEFT + PHONE.bezel + x * K,
  y: PHONE.top + PHONE.bezel + y * K,
});

export type ZoomStep = { start: number; origin: [number, number] };

// Zoom suave de 110% a 120% hacia el elemento importante de cada paso
const useZoom = (steps: ZoomStep[], end: number) => {
  const frame = useCurrentFrame();
  let i = steps.findIndex((s, k) => frame >= s.start && frame < (steps[k + 1]?.start ?? end));
  if (i < 0) i = steps.length - 1;
  const s = steps[i];
  const stepEnd = steps[i + 1]?.start ?? end;
  const z = interpolate(frame, [s.start, stepEnd], [1.1, 1.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (i === 0) return { z, ox: s.origin[0], oy: s.origin[1] };
  // Pasa del zoom anterior al nuevo en 9 cuadros
  const prev = steps[i - 1];
  const k = interpolate(frame, [s.start, s.start + T], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return {
    z: 1.2 + (z - 1.2) * k,
    ox: prev.origin[0] + (s.origin[0] - prev.origin[0]) * k,
    oy: prev.origin[1] + (s.origin[1] - prev.origin[1]) * k,
  };
};

export const Phone: React.FC<{ steps: ZoomStep[]; end: number; dim: number; exit: number }> = ({
  steps,
  end,
  dim,
  exit,
}) => {
  const { z, ox, oy } = useZoom(steps, end);
  return (
    <div
      style={{
        position: "absolute",
        left: PHONE_LEFT,
        top: PHONE.top,
        width: PHONE_W,
        height: PHONE.height,
        background: C.carbon,
        borderRadius: 72,
        boxShadow: `16px 16px 0 ${C.arenaOscuro}`,
        transform: `translateY(${exit * 500}px) scale(${1 - exit * 0.15})`,
        opacity: 1 - exit,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: PHONE.bezel,
          top: PHONE.bezel,
          width: SCREEN_W,
          height: SCREEN_H,
          borderRadius: 56,
          overflow: "hidden",
          background: C.arena,
        }}
      >
        <div
          style={{
            width: SCREEN_W,
            height: SCREEN_H,
            transform: `scale(${z})`,
            transformOrigin: `${ox * K}px ${oy * K}px`,
          }}
        >
          <OffthreadVideo src={staticFile("base.mp4")} muted style={{ width: SCREEN_W, height: SCREEN_H }} />
        </div>
        {/* Atenúa la pantalla mientras una pieza sale en 3D */}
        <div style={{ position: "absolute", inset: 0, background: C.arena, opacity: dim * 0.55 }} />
      </div>
      {/* Bocina: una ranura simple */}
      <div
        style={{
          position: "absolute",
          top: PHONE.bezel + 14,
          left: PHONE_W / 2 - 50,
          width: 100,
          height: 22,
          borderRadius: 11,
          background: C.carbon,
        }}
      />
    </div>
  );
};
