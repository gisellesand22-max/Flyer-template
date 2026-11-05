import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { APOYO, C, ramp, SAFE, T, TITULAR, usePop } from "./brand";

export type Step = {
  start: number;
  end: number;
  before: string; // texto antes de la palabra clave
  key: string; // palabra clave con subrayado lima
  after?: string;
  sub: string;
};

// Puntos de avance: lima el paso actual, arena oscuro los demás
const Progress: React.FC<{ steps: Step[]; frame: number }> = ({ steps, frame }) => (
  <div style={{ position: "absolute", top: SAFE.top + 6, left: 0, width: 1080, display: "flex", justifyContent: "center", gap: 12 }}>
    {steps.map((s, i) => {
      const on = frame >= s.start && frame < s.end;
      const done = frame >= s.end;
      return (
        <div
          key={i}
          style={{
            width: on ? 64 : 20,
            height: 16,
            borderRadius: 8,
            background: on || done ? C.lima : C.arenaOscuro,
          }}
        />
      );
    })}
  </div>
);

// Titular (Montserrat 800) y apoyo (Work Sans 600) de un paso
const StepText: React.FC<{ step: Step }> = ({ step }) => {
  const frame = useCurrentFrame();
  const inK = ramp(frame, step.start, step.start + T);
  const outK = ramp(frame, step.end - T, step.end);
  const line = ramp(frame, step.start + T, step.start + T + 14);
  const sub = usePop(step.start + 6);
  if (frame < step.start || frame >= step.end) return null;
  const k = inK * (1 - outK);
  return (
    <div
      style={{
        position: "absolute",
        top: SAFE.top + 44,
        left: SAFE.left,
        width: SAFE.right - SAFE.left,
        textAlign: "center",
        opacity: k,
        transform: `translateY(${(1 - inK) * 40 - outK * 40}px)`,
      }}
    >
      <div style={{ fontFamily: TITULAR, fontWeight: 800, fontSize: 84, lineHeight: 1.06, color: C.carbon }}>
        {step.before}
        <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
          <span
            style={{
              position: "absolute",
              left: -4,
              right: -4,
              bottom: 4,
              height: 20,
              borderRadius: 10,
              background: C.lima,
              transform: `scaleX(${line})`,
              transformOrigin: "left center",
            }}
          />
          <span style={{ position: "relative" }}>{step.key}</span>
        </span>
        {step.after}
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: APOYO,
          fontWeight: 600,
          fontSize: 44,
          lineHeight: 1.2,
          color: C.carbon,
          opacity: Math.min(sub * 1.5, 1),
          transform: `translateY(${(1 - sub) * 20}px)`,
        }}
      >
        {step.sub}
      </div>
    </div>
  );
};

export const StepTexts: React.FC<{ steps: Step[] }> = ({ steps }) => {
  const frame = useCurrentFrame();
  const last = steps[steps.length - 1].end;
  const fade = 1 - ramp(frame, last - T, last);
  return (
    <>
      <div style={{ opacity: fade }}>
        <Progress steps={steps} frame={frame} />
      </div>
      {steps.map((s, i) => (
        <StepText key={i} step={s} />
      ))}
    </>
  );
};

// Círculos lima en los bordes, fuera de la zona de texto
export const Circles: React.FC = () => {
  const frame = useCurrentFrame();
  const f = (p: number) => Math.sin(frame / 30 + p) * 10;
  const dots: [number, number, number, number][] = [
    [1040, 150, 120, 0],
    [-40, 1760, 170, 1.5],
    [985, 1660, 46, 3],
    [60, 140, 34, 4.2],
  ];
  return (
    <>
      {dots.map(([x, y, r, p], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x - r,
            top: y - r + f(p),
            width: r * 2,
            height: r * 2,
            borderRadius: r,
            background: C.lima,
          }}
        />
      ))}
    </>
  );
};

// Iconos de categoría flotando a los lados del celular en la landing
export const FloatingIcons: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  const icons: [string, number, number, number][] = [
    ["comida", 175, 820, 0],
    ["fitness", 905, 900, 4],
    ["belleza", 175, 1240, 8],
    ["ocio", 905, 1320, 12],
  ];
  return (
    <>
      {icons.map(([name, x, y, delay]) => (
        <Icon key={name} name={name} x={x} y={y} from={from + delay} to={to} frame={frame} />
      ))}
    </>
  );
};

const Icon: React.FC<{ name: string; x: number; y: number; from: number; to: number; frame: number }> = ({
  name,
  x,
  y,
  from,
  to,
  frame,
}) => {
  const p = usePop(from, 10);
  if (frame < from || frame >= to) return null;
  const out = 1 - ramp(frame, to - T, to);
  const size = 170;
  return (
    <Img
      src={staticFile(`brand/icons/${name}.webp`)}
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2 + Math.sin((frame - from) / 12) * 10,
        width: size,
        height: size,
        objectFit: "contain",
        transform: `scale(${p * out})`,
      }}
    />
  );
};

// Cierre de 2 s: logo, botón, sitio y cuenta
export const Close: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const bg = ramp(frame, from, from + T);
  const logo = usePop(from + 3, 12);
  const btn = usePop(from + 10, 10);
  const info = usePop(from + 16, 14);
  if (frame < from) return null;
  return (
    <div style={{ position: "absolute", inset: 0, background: C.arena, opacity: bg }}>
      <Circles />
      <div style={{ position: "absolute", top: 640, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
        <Img
          src={staticFile("brand/logo/enplan_logo_carbon_sobre_arena.svg")}
          style={{ width: 600, transform: `scale(${0.7 + 0.3 * logo})`, opacity: Math.min(logo * 1.5, 1) }}
        />
      </div>
      <div style={{ position: "absolute", top: 930, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            background: C.lima,
            color: C.carbon,
            borderRadius: 80,
            padding: "30px 60px",
            fontFamily: TITULAR,
            fontWeight: 800,
            fontSize: 56,
            transform: `scale(${btn * (1 + 0.025 * Math.sin((frame - from) / 5))})`,
          }}
        >
          Soy un negocio
          <svg width={52} height={40} viewBox="0 0 52 40">
            <path d="M4 20 H44 M28 4 L46 20 L28 36" fill="none" stroke={C.carbon} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1130,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontFamily: APOYO,
          fontWeight: 600,
          fontSize: 50,
          lineHeight: 1.4,
          color: C.carbon,
          opacity: info,
          transform: `translateY(${(1 - info) * 30}px)`,
        }}
      >
        enplan.app
        <br />
        @enplan.ags
      </div>
    </div>
  );
};

