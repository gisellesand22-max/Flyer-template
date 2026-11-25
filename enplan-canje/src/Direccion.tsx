import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { APOYO, C, TITULAR, useBrandFonts } from "./brand";

// Tres direcciones gráficas, en el mismo momento del video (cuadro 290 del clip: "Elige tu descuento")
const FRAME = 290;
const BEZEL = 20;
const PH = 1040;
const SCREEN_H = PH - BEZEL * 2;
const CLIP_W = 562;
const K = CLIP_W / 1080;

// El punto del logo: círculo lima, un poco más chico que la altura de la letra
export const Dot: React.FC<{ size: number; color?: string; style?: React.CSSProperties }> = ({ size, color = C.lima, style }) => (
  <span style={{ display: "inline-block", width: size, height: size, borderRadius: size, background: color, ...style }} />
);

// Celular con el clip y la tarjeta "Muestra al negocio" saliendo hacia ti
export const Shot: React.FC<{
  frame?: number;
  callout?: boolean;
  cx: number;
  top: number;
  sc: number;
  rotY: number;
  body?: string;
  ring?: string;
  shadow: string;
  calloutRing?: string;
  badge?: React.ReactNode;
}> = ({ frame = FRAME, callout = true, cx, top, sc, rotY, body = C.carbon, ring, shadow, calloutRing, badge }) => {
  const PW = CLIP_W + BEZEL * 2;
  const [x, y, w, h] = [50, 830, 980, 395];
  const f = K * 1.4;
  return (
    <div
      style={{
        position: "absolute",
        left: cx - PW / 2,
        top,
        width: PW,
        height: PH,
        background: body,
        borderRadius: 70,
        boxShadow: `${ring ? `0 0 0 6px ${ring}, ` : ""}${shadow}`,
        transformOrigin: "50% 0%",
        transformStyle: "preserve-3d",
        transform: `perspective(1800px) scale(${sc}) rotateY(${rotY}deg) rotateX(3deg)`,
      }}
    >
      <div style={{ position: "absolute", left: BEZEL, top: BEZEL, width: CLIP_W, height: SCREEN_H, borderRadius: 52, overflow: "hidden", background: C.arena }}>
        <OffthreadVideo src={staticFile("canje.mp4")} startFrom={frame} muted style={{ width: CLIP_W, height: SCREEN_H }} />
      </div>
      <div style={{ position: "absolute", top: BEZEL + 10, left: PW / 2 - 40, width: 80, height: 18, borderRadius: 9, background: C.carbon }} />
      {callout && (
      <div
        style={{
          position: "absolute",
          left: BEZEL + (x + w / 2) * K - (w * f) / 2,
          top: BEZEL + (y + h / 2) * K - (h * f) / 2,
          width: w * f,
          height: h * f,
          transform: "translateZ(190px)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, borderRadius: 30, overflow: "hidden", boxShadow: `${calloutRing ? `0 0 0 7px ${calloutRing}, ` : ""}0 30px 60px rgba(43,43,35,0.35)` }}>
          <OffthreadVideo src={staticFile("canje.mp4")} startFrom={frame} muted style={{ position: "absolute", left: -x * f, top: -y * f, width: 1080 * f, height: 1920 * f, maxWidth: "none" }} />
        </div>
        {badge}
      </div>
      )}
    </div>
  );
};

const labels = ["Perfil", "Descuento", "Panel"];

// ---------------------------------------------------------------
// 1. Punto final: solo tipografía y el punto del logo como remate
// Fondo blanco, texto carbón, cada frase termina en punto lima, como "enplan."
// ---------------------------------------------------------------
const PuntoFinal: React.FC = () => (
  <AbsoluteFill style={{ background: C.blanco }}>
    {/* Pasos: el punto lima marca dónde vas */}
    <div style={{ position: "absolute", top: 262, left: 80, display: "flex", gap: 40, fontFamily: APOYO, fontWeight: 600, fontSize: 36, color: C.carbon }}>
      {labels.map((l, i) => (
        <div key={l} style={{ display: "flex", alignItems: "center", gap: 12, opacity: i === 1 ? 1 : 0.35 }}>
          {i === 1 && <Dot size={22} />}
          {l}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", top: 340, left: 80, fontFamily: APOYO, fontWeight: 600, fontSize: 64, color: C.carbon }}>Elige tu</div>
    <div style={{ position: "absolute", top: 410, left: 80, fontFamily: TITULAR, fontWeight: 800, fontSize: 150, lineHeight: 1.05, letterSpacing: "-0.02em", color: C.carbon, whiteSpace: "nowrap" }}>
      descuento
      <Dot size={34} style={{ marginLeft: 10 }} />
    </div>
    <Shot cx={540} top={640} sc={0.88} rotY={-6} shadow="0 40px 80px rgba(43,43,35,0.28)" badge={<Dot size={54} style={{ position: "absolute", right: -18, top: -18, border: `7px solid ${C.blanco}`, boxSizing: "border-box" }} />} />
  </AbsoluteFill>
);

// ---------------------------------------------------------------
// 2. Etiquetas: las frases son botones de la app, sobre un escenario lima
// Fondo blanco, bloque lima plano detrás del celular, puntos de paginación
// ---------------------------------------------------------------
const Etiquetas: React.FC = () => (
  <AbsoluteFill style={{ background: C.blanco }}>
    <div style={{ position: "absolute", left: 60, top: 900, width: 960, height: 640, borderRadius: 90, background: C.lima }} />
    <div style={{ position: "absolute", top: 300, left: 80, display: "flex", alignItems: "center", gap: 16, background: C.carbon, color: C.blanco, borderRadius: 70, padding: "14px 40px 18px 30px", fontFamily: APOYO, fontWeight: 600, fontSize: 60 }}>
      <Dot size={26} />
      Elige tu
    </div>
    <div style={{ position: "absolute", top: 410, left: 80, background: C.lima, color: C.carbon, borderRadius: 90, padding: "0 50px 14px", fontFamily: TITULAR, fontWeight: 800, fontSize: 136, lineHeight: 1.2, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>descuento</div>
    <Shot cx={540} top={650} sc={0.86} rotY={-6} shadow="0 40px 80px rgba(43,43,35,0.35)" calloutRing={C.blanco} />
    {/* Paginación: el punto lima activo se estira */}
    <div style={{ position: "absolute", top: 1590, left: 0, width: 1080, display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
      <Dot size={22} color="rgba(43,43,35,0.2)" />
      <span style={{ display: "inline-block", width: 70, height: 22, borderRadius: 22, background: C.lima }} />
      <Dot size={22} color="rgba(43,43,35,0.2)" />
    </div>
  </AbsoluteFill>
);

// ---------------------------------------------------------------
// 3. Lima total: fondo lima, número gigante detrás del celular
// Texto carbón, el punto del logo en blanco como remate
// ---------------------------------------------------------------
const LimaTotal: React.FC = () => (
  <AbsoluteFill style={{ background: C.lima }}>
    {/* El número del paso es el protagonista; el punto del logo lo cierra */}
    <div style={{ position: "absolute", top: 250, left: 64, fontFamily: TITULAR, fontWeight: 800, fontSize: 360, lineHeight: 1, letterSpacing: "-0.05em", color: C.carbon, whiteSpace: "nowrap", display: "flex", alignItems: "baseline" }}>
      02
      <Dot size={64} color={C.blanco} style={{ marginLeft: 12 }} />
    </div>
    <div style={{ position: "absolute", top: 330, left: 660, fontFamily: APOYO, fontWeight: 600, fontSize: 54, color: C.carbon, whiteSpace: "nowrap" }}>Elige tu</div>
    <div style={{ position: "absolute", top: 396, left: 660, fontFamily: TITULAR, fontWeight: 800, fontSize: 58, letterSpacing: "-0.02em", color: C.carbon, whiteSpace: "nowrap" }}>descuento</div>
    <div style={{ position: "absolute", top: 480, left: 660, fontFamily: APOYO, fontWeight: 600, fontSize: 34, color: C.carbon, opacity: 0.7, whiteSpace: "nowrap" }}>paso 2 de 3</div>
    <Shot cx={540} top={650} sc={0.86} rotY={-6} body={C.carbon} ring={C.blanco} shadow="0 40px 80px rgba(43,43,35,0.35)" calloutRing={C.blanco} />
  </AbsoluteFill>
);

export const Direccion: React.FC<{ op: "1" | "2" | "3" }> = ({ op }) => {
  useBrandFonts();
  return op === "1" ? <PuntoFinal /> : op === "2" ? <Etiquetas /> : <LimaTotal />;
};
