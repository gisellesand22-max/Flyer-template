import React from "react";
import { interpolate, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { C, T, usePop } from "./brand";
import { onCanvas } from "./Phone";

export type CalloutSpec = {
  crop: [number, number, number, number]; // x, y, ancho, alto en la grabación
  from: number; // cuadros
  to: number;
  scale: number;
  cx: number; // centro final en el lienzo
  cy: number;
  rotY: number;
  rotX?: number;
  burst?: boolean;
};

// Una parte de la pantalla sale del celular y flota en 3D con borde lima
export const Callout: React.FC<{ spec: CalloutSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const p = usePop(spec.from, 14);
  if (frame < spec.from || frame >= spec.to) return null;

  const [x, y, w, h] = spec.crop;
  const out = interpolate(frame, [spec.to - T, spec.to], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const start = onCanvas(x + w / 2, y + h / 2);
  const cw = w * spec.scale;
  const ch = h * spec.scale;
  const px = start.x + (spec.cx - start.x) * p;
  const py = start.y + (spec.cy - start.y) * p;
  const s0 = (w * 0.44) / cw; // tamaño que tiene dentro del celular
  const s = s0 + (1 - s0) * p;
  const float = Math.sin((frame - spec.from) / 14) * 2.5;
  const rotY = spec.rotY * p + float;
  const rotX = (spec.rotX ?? 6) * p;

  return (
    <div
      style={{
        position: "absolute",
        left: px - cw / 2,
        top: py - ch / 2,
        width: cw,
        height: ch,
        transform: `perspective(1600px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${s * (0.9 + 0.1 * out)})`,
        opacity: Math.min(p * 2, 1) * out,
      }}
    >
      {spec.burst && <Burst frame={frame - spec.from} w={cw} h={ch} />}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 36,
          border: `7px solid ${C.lima}`,
          background: C.blanco,
          overflow: "hidden",
          boxShadow: `20px 20px 0 ${C.carbon}`,
        }}
      >
        <OffthreadVideo
          src={staticFile("base.mp4")}
          muted
          style={{
            position: "absolute",
            left: -x * spec.scale - 7,
            top: -y * spec.scale - 7,
            width: 1080 * spec.scale,
            height: 1920 * spec.scale,
            maxWidth: "none",
          }}
        />
      </div>
    </div>
  );
};

// Círculos lima que salen disparados al completar el pago
const Burst: React.FC<{ frame: number; w: number; h: number }> = ({ frame, w, h }) => {
  const k = interpolate(frame, [4, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const r = 120 + 260 * k;
        const size = (i % 2 ? 26 : 40) * (1 - k * 0.6);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: w / 2 + Math.cos(a) * r * 1.4 - size / 2,
              top: h / 2 + Math.sin(a) * r - size / 2,
              width: size,
              height: size,
              borderRadius: size,
              background: i % 3 === 0 ? C.lila : C.lima,
              opacity: k > 0 ? 1 - k * 0.7 : 0,
            }}
          />
        );
      })}
    </>
  );
};
