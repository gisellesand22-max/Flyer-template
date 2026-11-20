import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { APOYO, C, TITULAR, useBrandFonts } from "./brand";

// Un cuadro por estilo, en "quién ha canjeado tus promos" (32,3 s)
const FRAME = 969;
const CANJE_FRAME = FRAME - 788; // el celular entra en 26,28 s

const Toma: React.FC<{ style?: React.CSSProperties }> = ({ style }) => <OffthreadVideo src={staticFile("toma.mp4")} startFrom={FRAME} style={style} />;
const Canje: React.FC<{ style?: React.CSSProperties }> = ({ style }) => <OffthreadVideo src={staticFile("canje.mp4")} startFrom={CANJE_FRAME} muted style={style} />;

// Celular genérico de cuerpo carbón
const Phone: React.FC<{ h: number; style?: React.CSSProperties }> = ({ h, style }) => {
  const bezel = Math.round(h * 0.022);
  const sw = Math.round((h - bezel * 2) * (1080 / 1920));
  return (
    <div style={{ position: "absolute", width: sw + bezel * 2, height: h, background: C.carbon, borderRadius: h * 0.075, ...style }}>
      <div style={{ position: "absolute", left: bezel, top: bezel, width: sw, height: h - bezel * 2, borderRadius: h * 0.06, overflow: "hidden" }}>
        <Canje style={{ width: sw, height: h - bezel * 2 }} />
      </div>
      <div style={{ position: "absolute", top: bezel + h * 0.012, left: (sw + bezel * 2) / 2 - h * 0.05, width: h * 0.1, height: h * 0.022, borderRadius: h, background: C.carbon }} />
    </div>
  );
};

const Underline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <span style={{ position: "absolute", left: -4, right: -4, bottom: "8%", height: "30%", background: C.lima }} />
    <span style={{ position: "relative" }}>{children}</span>
  </span>
);

// A: editorial dividido. Arriba tú, abajo un panel arena con el texto y la app
const EstiloA: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1010, overflow: "hidden" }}>
      <Toma style={{ position: "absolute", left: 0, top: -180, width: 1080, height: 1920 }} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1010, width: 1080, height: 910, background: C.arena, borderTop: `4px solid ${C.carbon}` }}>
      <div style={{ position: "absolute", left: 80, top: 70, fontFamily: APOYO, fontWeight: 600, fontSize: 28, letterSpacing: 6, color: C.carbon, display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ width: 16, height: 16, borderRadius: 8, background: C.lima, display: "inline-block" }} />
        02 · EL PROCESO
      </div>
      <div style={{ position: "absolute", left: 80, top: 140, width: 470, fontFamily: TITULAR, fontWeight: 800, fontSize: 62, lineHeight: 1.08, color: C.carbon }}>
        quién ha <Underline>canjeado</Underline> tus promos
      </div>
      <div style={{ position: "absolute", left: 80, top: 430, width: 430, fontFamily: APOYO, fontWeight: 600, fontSize: 34, lineHeight: 1.35, color: C.carbon, opacity: 0.75 }}>
        El cliente activa el beneficio y lo muestra en tu negocio.
      </div>
      <Phone h={820} style={{ left: 580, top: 50, transform: "rotate(3deg)", boxShadow: `18px 18px 0 ${C.arenaOscuro}` }} />
    </div>
  </>
);

// B: la app al frente. El celular grande al centro y tú en una burbuja
const EstiloB: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: C.arena }} />
    <div style={{ position: "absolute", left: 80, top: 250, fontFamily: APOYO, fontWeight: 600, fontSize: 28, letterSpacing: 6, color: C.carbon, display: "flex", alignItems: "center", gap: 14 }}>
      <span style={{ width: 16, height: 16, borderRadius: 8, background: C.lima, display: "inline-block" }} />
      ASÍ FUNCIONA
    </div>
    <Phone h={1180} style={{ left: 540 - 345, top: 330, boxShadow: `22px 22px 0 ${C.arenaOscuro}` }} />
    <div style={{ position: "absolute", left: 700, top: 200, width: 300, height: 300, borderRadius: 150, overflow: "hidden", border: `8px solid ${C.blanco}`, boxShadow: `0 0 0 6px ${C.lima}` }}>
      <Toma style={{ position: "absolute", left: -130, top: -300, width: 560, height: 996 }} />
    </div>
    <div style={{ position: "absolute", top: 1560, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
      <div style={{ background: C.carbon, borderRadius: 40, padding: "14px 36px 18px", fontFamily: APOYO, fontWeight: 600, fontSize: 44, color: C.blanco }}>
        quién ha <span style={{ fontFamily: TITULAR, fontWeight: 800, color: C.lima }}>canjeado</span> tus promos
      </div>
    </div>
  </>
);

// C: cinemático. Tú desenfocada al fondo y la app flotando en 3D
const EstiloC: React.FC = () => (
  <>
    <AbsoluteFill style={{ filter: "blur(18px)", transform: "scale(1.08)" }}>
      <Toma style={{ width: 1080, height: 1920 }} />
    </AbsoluteFill>
    <AbsoluteFill style={{ background: C.carbon, opacity: 0.62 }} />
    <div style={{ position: "absolute", left: 80, top: 250, fontFamily: TITULAR, fontWeight: 800, fontSize: 44, color: C.blanco, display: "flex", alignItems: "baseline", gap: 2 }}>
      enplan<span style={{ width: 16, height: 16, borderRadius: 8, background: C.lima, display: "inline-block" }} />
    </div>
    <div style={{ position: "absolute", left: 540 - 330, top: 360, transform: "perspective(1800px) rotateY(-14deg) rotateX(5deg)" }}>
      <Phone h={1130} style={{ position: "relative", boxShadow: `0 0 0 5px ${C.lima}` }} />
    </div>
    <div style={{ position: "absolute", top: 1560, left: 80, width: 920, textAlign: "center", fontFamily: TITULAR, fontWeight: 800, fontSize: 58, lineHeight: 1.1, color: C.blanco }}>
      quién ha <span style={{ color: C.lima }}>canjeado</span> tus promos
    </div>
  </>
);

export const Refinado: React.FC<{ estilo: "A" | "B" | "C" }> = ({ estilo }) => {
  useBrandFonts();
  return (
    <AbsoluteFill style={{ background: C.arena }}>
      {estilo === "A" && <EstiloA />}
      {estilo === "B" && <EstiloB />}
      {estilo === "C" && <EstiloC />}
    </AbsoluteFill>
  );
};
