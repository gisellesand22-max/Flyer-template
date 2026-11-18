import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, OffthreadVideo, staticFile } from "remotion";
import { POPPINS } from "./theme";

// Paleta nueva del brandbook personal
const N = { tinta: "#0E2F3A", aqua: "#7FE3E8", aquaClaro: "#E4F4F5", blanco: "#FFFFFF" };
const MONO = "'JetBrains Mono', monospace";

// Un solo cuadro del momento "con inteligencia artificial" (6,83 s del video cortado)
export const FRAME = 205;

const CARD = { left: 80, top: 1140, width: 840, height: 280 };
const CAP_TOP = CARD.top + CARD.height + 26;

// Las mismas tres pistas del editor, ya llenas por la IA
const ROWS: [number, number][][] = [
  [[0, 150], [160, 120], [290, 210], [510, 90]],
  [[40, 220], [280, 170], [470, 130]],
  [[0, 90], [100, 260], [370, 230]],
];

const Bars: React.FC<{ x0: number; y0: number; rowH: number; colors: [string, string, string]; borders: [boolean, boolean, boolean]; radius: number }> = ({
  x0,
  y0,
  rowH,
  colors,
  borders,
  radius,
}) => (
  <>
    {ROWS.map((row, r) =>
      row.map(([x, w], i) => (
        <div
          key={`${r}-${i}`}
          style={{
            position: "absolute",
            left: x0 + x,
            top: y0 + r * rowH,
            width: w,
            height: rowH - 12,
            borderRadius: radius,
            background: colors[r],
            border: borders[r] ? `3px solid ${N.tinta}` : "none",
            boxSizing: "border-box",
          }}
        />
      )),
    )}
  </>
);

const Check: React.FC<{ size: number; fill: string; stroke: string }> = ({ size, fill, stroke }) => (
  <svg width={size} height={size} viewBox="-26 -26 52 52">
    <circle r={23} fill={fill} stroke={stroke} strokeWidth={4} />
    <path d="M-10 0 L-2 8 L11 -8" fill="none" stroke={stroke} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Opción A: interfaz tipo HUD, esquinas finas y etiquetas en monoespaciada
const OpcionA: React.FC = () => (
  <>
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      {[N.tinta, N.aqua].map((c, i) => (
        <path
          key={c}
          d="M50 170 V50 H170 M910 50 H1030 V170 M1030 1750 V1870 H910 M170 1870 H50 V1750"
          fill="none"
          stroke={c}
          strokeWidth={i === 0 ? 14 : 6}
          strokeLinecap="square"
        />
      ))}
    </svg>
    <div style={{ position: "absolute", left: 80, top: 260, padding: "8px 18px", background: N.blanco, border: `3px solid ${N.tinta}`, borderRadius: 8, fontFamily: MONO, fontWeight: 700, fontSize: 30, color: N.tinta, display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 16, height: 16, borderRadius: 8, background: N.tinta }} /> REC 00:06
    </div>
    <div style={{ position: "absolute", right: 80, top: 260, padding: "8px 18px", background: N.aqua, border: `3px solid ${N.tinta}`, borderRadius: 8, fontFamily: MONO, fontWeight: 700, fontSize: 30, color: N.tinta }}>
      IA · ON
    </div>
    <div
      style={{
        position: "absolute",
        ...CARD,
        background: N.blanco,
        border: `4px solid ${N.tinta}`,
        borderRadius: 14,
        boxShadow: `10px 10px 0 ${N.aqua}`,
        overflow: "hidden",
        boxSizing: "border-box",
        backgroundImage: `radial-gradient(${N.aquaClaro} 3px, transparent 3px)`,
        backgroundSize: "22px 22px",
      }}
    >
      <div style={{ height: 52, borderBottom: `3px solid ${N.tinta}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", background: N.blanco, fontFamily: MONO, fontWeight: 700, fontSize: 26, color: N.tinta }}>
        <span>// editando_con_ia</span>
        <span style={{ padding: "2px 12px", background: N.aqua, border: `2px solid ${N.tinta}`, borderRadius: 6 }}>LISTO</span>
      </div>
      <Bars x0={24} y0={76} rowH={56} colors={[N.tinta, N.aquaClaro, N.aqua]} borders={[false, true, true]} radius={4} />
      <div style={{ position: "absolute", right: 24, bottom: 22 }}>
        <Check size={56} fill={N.aqua} stroke={N.tinta} />
      </div>
    </div>
    <div style={{ position: "absolute", top: CAP_TOP, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
      <div style={{ background: N.blanco, border: `4px solid ${N.tinta}`, borderRadius: 12, boxShadow: `8px 8px 0 ${N.aqua}`, padding: "8px 24px 12px", fontFamily: POPPINS, fontWeight: 700, fontSize: 50, color: N.tinta }}>
        con <span style={{ background: N.aqua, padding: "0 10px", borderRadius: 6 }}>inteligencia artificial</span>,
      </div>
    </div>
  </>
);

// Opción B: terminal oscura, todo como si fuera código
const OpcionB: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        ...CARD,
        background: N.tinta,
        borderRadius: 20,
        boxShadow: `12px 12px 0 ${N.aqua}`,
        overflow: "hidden",
        fontFamily: MONO,
      }}
    >
      <div style={{ height: 50, background: N.aquaClaro, display: "flex", alignItems: "center", gap: 12, padding: "0 20px" }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 16, height: 16, borderRadius: 8, background: N.tinta }} />
        ))}
        <span style={{ marginLeft: 10, fontWeight: 700, fontSize: 24, color: N.tinta }}>terminal — editar.mp4</span>
      </div>
      <div style={{ padding: "18px 26px", fontSize: 30, lineHeight: 1.45, color: N.blanco }}>
        <div>
          <span style={{ color: N.aqua }}>›</span> edita este video con mi marca
        </div>
        {["cortes", "subtítulos", "animaciones"].map((w) => (
          <div key={w}>
            <span style={{ color: N.aqua }}>✓</span> {w}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", right: 26, bottom: 24, display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 700, color: N.aqua }}>
        <div style={{ width: 200, height: 22, borderRadius: 4, background: N.aqua }} />
        100%
      </div>
    </div>
    <div style={{ position: "absolute", top: CAP_TOP, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
      <div style={{ background: N.tinta, border: `3px solid ${N.aqua}`, borderRadius: 12, padding: "8px 24px 12px", fontFamily: POPPINS, fontWeight: 700, fontSize: 50, color: N.blanco }}>
        <span style={{ color: N.aqua, fontFamily: MONO }}>› </span>con <span style={{ color: N.aqua }}>inteligencia artificial</span>,
      </div>
    </div>
  </>
);

// Opción C: interfaz limpia de app, igual que la tarjeta "Editando" del brandbook
const OpcionC: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 80, top: 260, padding: "10px 26px", background: N.blanco, border: `4px solid ${N.tinta}`, borderRadius: 40, boxShadow: `6px 6px 0 ${N.aqua}`, fontFamily: POPPINS, fontWeight: 700, fontSize: 32, color: N.tinta }}>
      Editar con IA
    </div>
    <div
      style={{
        position: "absolute",
        ...CARD,
        background: N.blanco,
        border: `5px solid ${N.tinta}`,
        borderRadius: 32,
        boxShadow: `12px 12px 0 ${N.aqua}`,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div style={{ position: "absolute", left: 28, top: 20, fontFamily: POPPINS, fontWeight: 700, fontSize: 44, color: N.tinta }}>Editando</div>
      <div style={{ position: "absolute", right: 26, top: 22, padding: "4px 20px", border: `4px solid ${N.tinta}`, borderRadius: 30, fontFamily: POPPINS, fontWeight: 700, fontSize: 30, color: N.tinta, background: N.aqua }}>IA</div>
      <Bars x0={28} y0={96} rowH={52} colors={[N.tinta, N.aquaClaro, N.aqua]} borders={[false, true, true]} radius={14} />
      <div style={{ position: "absolute", right: 24, bottom: 20 }}>
        <Check size={56} fill={N.aqua} stroke={N.tinta} />
      </div>
    </div>
    <div style={{ position: "absolute", top: CAP_TOP, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
      <div style={{ background: N.blanco, border: `4px solid ${N.tinta}`, borderRadius: 40, boxShadow: `8px 8px 0 ${N.aqua}`, padding: "8px 30px 12px", fontFamily: POPPINS, fontWeight: 700, fontSize: 50, color: N.tinta }}>
        con <span style={{ background: N.aqua, padding: "0 12px", borderRadius: 20 }}>inteligencia artificial</span>,
      </div>
    </div>
  </>
);

export const Estilo: React.FC<{ opcion: "A" | "B" | "C" }> = ({ opcion }) => {
  const [handle] = useState(() => delayRender("fuentes"));
  useEffect(() => {
    Promise.all(["700 40px Poppins", "400 40px 'JetBrains Mono'", "700 40px 'JetBrains Mono'"].map((f) => document.fonts.load(f))).then(() => continueRender(handle));
  }, [handle]);
  return (
    <AbsoluteFill style={{ background: N.tinta }}>
      <OffthreadVideo src={staticFile("toma.mp4")} startFrom={FRAME} />
      {opcion === "A" && <OpcionA />}
      {opcion === "B" && <OpcionB />}
      {opcion === "C" && <OpcionC />}
    </AbsoluteFill>
  );
};
