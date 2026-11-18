import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, interpolate, OffthreadVideo, staticFile } from "remotion";
import { CHUNKS } from "./captions";
import { CompareScene, CurpScene, HookScene, KeyScene, MatchScene, PixelScene, PollScene, ScanScene } from "./Scenes";
import { C, POPPINS, prog, TALK_END, usePop, useT } from "./theme";

// Zona de tarjetas: debajo de la cara y encima de los subtítulos
const CARD = { left: 80, top: 1030, width: 840, height: 340 };
const TRANS = 0.2; // salida de 6 cuadros

const Card: React.FC<{ from: number; to: number; bg?: string; children: React.ReactNode }> = ({ from, to, bg = C.blanco, children }) => {
  const t = useT();
  const pop = usePop(from);
  if (t < from || t >= to) return null;
  const out = interpolate(t, [to - TRANS, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        ...CARD,
        background: bg,
        border: `6px solid ${C.ciruela}`,
        borderRadius: 36,
        boxShadow: `12px 12px 0 ${C.aqua}`,
        overflow: "hidden",
        boxSizing: "border-box",
        opacity: Math.min(pop * 1.5, 1) * out,
        transform: `scale(${(0.8 + 0.2 * pop) * (0.92 + 0.08 * out)})`,
      }}
    >
      {children}
    </div>
  );
};

// Subtítulos: Poppins Bold blanco en caja ciruela, palabra clave en aqua
const Captions: React.FC = () => {
  const t = useT();
  const c = CHUNKS.find((x) => t >= x.words[0][1] && t < x.end);
  if (!c) return null;
  return (
    <div style={{ position: "absolute", top: CARD.top + CARD.height + 24, left: CARD.left, width: CARD.width, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          background: C.ciruela,
          border: `4px solid ${C.aqua}`,
          borderRadius: 24,
          padding: "8px 26px 12px",
          fontFamily: POPPINS,
          fontWeight: 700,
          fontSize: 52,
          lineHeight: 1.2,
          color: C.blanco,
          textAlign: "center",
        }}
      >
        {c.words.map(([w, at], i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              marginRight: i < c.words.length - 1 ? "0.26em" : 0,
              opacity: t >= at - 0.05 ? 1 : 0,
              transform: `scale(${interpolate(t, [at - 0.05, at + 0.1], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
              color: c.hl.includes(i) ? C.aqua : C.blanco,
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

// Acercamientos cortos en las frases clave
const ZOOMS: [number, number][] = [
  [1.72, 2.2],
  [12.58, 13.3],
  [14.48, 15.88],
  [17.46, 18.9],
];
const useZoom = () => {
  const t = useT();
  let k = 0;
  for (const [a, b] of ZOOMS) k = Math.max(k, prog(t, a, a + 0.17) * (1 - prog(t, b, b + 0.17)));
  return 1 + 0.08 * k;
};

// Cierre: llamado a la acción sobre ciruela
const EndScreen: React.FC = () => {
  const t = useT();
  const bg = prog(t, TALK_END - 0.3, TALK_END);
  const a = usePop(TALK_END - 0.1);
  const b = usePop(TALK_END + 0.25, 10);
  if (t < TALK_END - 0.3) return null;
  return (
    <AbsoluteFill style={{ background: C.ciruela, opacity: bg, alignItems: "center", justifyContent: "center", gap: 30 }}>
      <svg width={170} height={150} viewBox="0 0 170 150" style={{ transform: `scale(${a})` }}>
        <path d="M14 14 H156 V104 H72 L38 136 V104 H14 Z" fill={C.aqua} strokeLinejoin="round" />
        {[52, 85, 118].map((x) => (
          <circle key={x} cx={x} cy={59} r={11} fill={C.ciruela} />
        ))}
      </svg>
      <div style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 70, color: C.blanco, transform: `scale(${a})`, opacity: Math.min(a * 2, 1) }}>
        Dime en comentarios:
      </div>
      <div style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 92, color: C.aqua, transform: `scale(${b})`, opacity: Math.min(b * 2, 1) }}>
        ¿lo aceptarías?
      </div>
    </AbsoluteFill>
  );
};

export const CaraContrasena: React.FC = () => {
  // Espera a Poppins y Silkscreen antes de dibujar
  const [handle] = useState(() => delayRender("fuentes"));
  useEffect(() => {
    Promise.all(["600 40px Poppins", "700 40px Poppins", "400 40px Silkscreen"].map((f) => document.fonts.load(f))).then(() => continueRender(handle));
  }, [handle]);
  const zoom = useZoom();

  return (
    <AbsoluteFill style={{ background: C.ciruela }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "540px 660px" }}>
        <OffthreadVideo src={staticFile("toma.mp4")} />
      </AbsoluteFill>

      <Card from={0.5} to={2.2} bg={C.ciruela}>
        <HookScene />
      </Card>
      <Card from={2.24} to={7.6}>
        <ScanScene />
      </Card>
      <Card from={7.64} to={9.4}>
        <CompareScene />
      </Card>
      <Card from={9.4} to={11.4}>
        <MatchScene />
      </Card>
      <Card from={11.4} to={14.45}>
        <PixelScene />
      </Card>
      <Card from={14.48} to={15.88}>
        <PollScene />
      </Card>
      <Card from={15.88} to={16.98}>
        <KeyScene />
      </Card>
      <Card from={16.98} to={TALK_END - 0.05}>
        <CurpScene />
      </Card>

      <Captions />
      <EndScreen />
    </AbsoluteFill>
  );
};
