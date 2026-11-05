import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, ramp, T, useBrandFonts } from "./brand";
import { Callout, CalloutSpec } from "./Callout";
import { Phone, ZoomStep } from "./Phone";
import { Circles, Close, FloatingIcons, Step, StepTexts } from "./Texts";
import { hold, out, VIDEO_FRAMES } from "./timeline";

// Inicio de cada pantalla (segundos del original) y su texto.
// Solo se nombra lo que se ve en la grabación.
const RAW: (Omit<Step, "start" | "end"> & { src: number; zoom: [number, number] })[] = [
  { src: 0, before: "Entra a ", key: "enplan.app", sub: "Desde tu navegador", zoom: [465, 1220] },
  { src: 0.85, before: "Tu negocio, en ", key: "enplan.", sub: "Toca “Soy un negocio”", zoom: [540, 1625] },
  { src: 2.97, before: "Solo ", key: "50 cupos", after: " fundadores", sub: "Toca “Crear mi cuenta gratis”", zoom: [540, 1420] },
  { src: 4.33, before: "Crea tu cuenta ", key: "en minutos", sub: "Nombre, categoría, correo y contraseña", zoom: [540, 460] },
  { src: 9.03, before: "Elige ", key: "tu plan", sub: "Básico, Pro o Premium", zoom: [540, 700] },
  { src: 10.37, before: "Primer mes ", key: "gratis", sub: "Tu prueba de 30 días", zoom: [540, 760] },
  { src: 11.03, before: "Listo. Ya estás ", key: "dentro.", sub: "Te lleva a tu dashboard", zoom: [540, 1000] },
];

const starts = RAW.map((r) => (r.src === 0 ? 0 : out(r.src)));
const STEPS: Step[] = RAW.map((r, i) => ({ ...r, start: starts[i], end: starts[i + 1] ?? VIDEO_FRAMES }));
const ZOOM: ZoomStep[] = RAW.map((r, i) => ({ start: starts[i], origin: r.zoom }));

const h = [0, 1, 2, 3, 4, 5, 6].map(hold);
const CALLOUTS: CalloutSpec[] = [
  // Barra de direcciones con enplan.app
  { crop: [20, 1150, 890, 140], from: h[0].from, to: h[0].to, scale: 0.95, cx: 540, cy: 1190, rotY: -12 },
  // Botón "Soy un negocio"
  { crop: [30, 1530, 1020, 195], from: h[1].from, to: h[1].to, scale: 0.86, cx: 540, cy: 1250, rotY: 12 },
  // "Solo 50 cupos de socio fundador" y el botón para crear la cuenta
  { crop: [140, 195, 800, 125], from: h[2].from, to: h[2].to, scale: 1.05, cx: 540, cy: 840, rotY: -12 },
  { crop: [140, 1330, 800, 185], from: h[2].from + 22, to: h[2].to, scale: 1.0, cx: 540, cy: 1290, rotY: 12 },
  // Campo "Nombre del negocio" mientras se escribe
  { crop: [110, 320, 860, 220], from: out(5.3), to: h[3].to, scale: 0.98, cx: 540, cy: 1200, rotY: -10 },
  // Planes Básico y Pro
  { crop: [60, 395, 960, 880], from: h[4].from, to: h[4].to, scale: 0.58, cx: 380, cy: 1010, rotY: 16 },
  { crop: [60, 1290, 960, 630], from: h[4].from + 14, to: h[4].to, scale: 0.58, cx: 700, cy: 1290, rotY: -16 },
  // Prueba de 30 días en el checkout
  { crop: [60, 530, 960, 450], from: h[5].from, to: h[5].to, scale: 0.86, cx: 540, cy: 1150, rotY: -12 },
  // Pago completado
  { crop: [10, 840, 1060, 450], from: h[6].from, to: h[6].to, scale: 0.8, cx: 540, cy: 1110, rotY: 10, burst: true },
];

export const EnplanRegistro: React.FC = () => {
  useBrandFonts();
  const frame = useCurrentFrame();
  const active = CALLOUTS.some((c) => frame >= c.from && frame < c.to);
  const dimFrom = CALLOUTS.filter((c) => frame >= c.from && frame < c.to).map((c) => c.from);
  const dim = active ? ramp(frame, Math.min(...dimFrom), Math.min(...dimFrom) + T) : 0;
  const exit = ramp(frame, VIDEO_FRAMES - T, VIDEO_FRAMES);

  return (
    <AbsoluteFill style={{ background: C.arena }}>
      <Circles />
      <StepTexts steps={STEPS} />
      <FloatingIcons from={STEPS[1].start} to={STEPS[1].end} />
      <Phone steps={ZOOM} end={VIDEO_FRAMES} dim={dim} exit={exit} />
      {CALLOUTS.map((c, i) => (
        <Callout key={i} spec={c} />
      ))}
      <Close from={VIDEO_FRAMES - T} />
    </AbsoluteFill>
  );
};

export { STEPS };
