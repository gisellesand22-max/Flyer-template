import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { APOYO, C, TITULAR, useBrandFonts } from "./brand";
import { Dot, Shot } from "./Direccion";

// Dirección "Lima total" con capas: palabras gigantes detrás del celular,
// texto chico y marcas al frente. Tres escenas del video.
const BEZEL = 20;
const PH = 1040;
const SCREEN_H = PH - BEZEL * 2;

// Palabra gigante que queda detrás del celular
const Giant: React.FC<{ top: number; size: number; color?: string; rotate?: number; children: React.ReactNode }> = ({ top, size, color = C.blanco, rotate = 0, children }) => (
  <div style={{ position: "absolute", top, left: 0, width: 1080, textAlign: "center", fontFamily: TITULAR, fontWeight: 800, fontSize: size, lineHeight: 0.9, letterSpacing: "-0.04em", color, whiteSpace: "nowrap", transform: `rotate(${rotate}deg)` }}>
    {children}
  </div>
);

const Small: React.FC<{ top: number; left?: number; right?: number; size?: number; children: React.ReactNode }> = ({ top, left, right, size = 52, children }) => (
  <div style={{ position: "absolute", top, left, right, fontFamily: APOYO, fontWeight: 600, fontSize: size, color: C.carbon, whiteSpace: "nowrap" }}>{children}</div>
);

// Marca blanca al frente, con el punto lima del logo al final
const Tag: React.FC<{ top: number; left?: number; right?: number; size: number; rotate?: number; children: React.ReactNode }> = ({ top, left, right, size, rotate = 0, children }) => (
  <div style={{ position: "absolute", top, left, right, display: "flex", alignItems: "baseline", background: C.blanco, borderRadius: 30, padding: "0 28px 12px 26px", fontFamily: TITULAR, fontWeight: 800, fontSize: size, lineHeight: 1.15, letterSpacing: "-0.02em", color: C.carbon, whiteSpace: "nowrap", boxShadow: "0 18px 40px rgba(43,43,35,0.25)", transform: `rotate(${rotate}deg)` }}>
    {children}
    <Dot size={Math.round(size * 0.24)} style={{ marginLeft: 8 }} />
  </div>
);

const DASH_W = 460;
const K = DASH_W / 920;
const DashShot: React.FC<{ cx: number; top: number; sc: number; rotY: number }> = ({ cx, top, sc, rotY }) => {
  const PW = DASH_W + BEZEL * 2;
  const [x, y, w, h] = [46, 1262, 828, 345];
  const z = 0.92;
  return (
    <div style={{ position: "absolute", left: cx - PW / 2, top, width: PW, height: PH, background: C.carbon, borderRadius: 70, boxShadow: `0 0 0 6px ${C.blanco}, 0 40px 80px rgba(43,43,35,0.35)`, transformOrigin: "50% 0%", transformStyle: "preserve-3d", transform: `perspective(1800px) scale(${sc}) rotateY(${rotY}deg) rotateX(3deg)` }}>
      <div style={{ position: "absolute", left: BEZEL, top: BEZEL, width: DASH_W, height: SCREEN_H, borderRadius: 52, overflow: "hidden", background: C.arena }}>
        <Img src={staticFile("m_resumen.png")} style={{ width: DASH_W, height: SCREEN_H }} />
      </div>
      <div style={{ position: "absolute", top: BEZEL + 10, left: PW / 2 - 40, width: 80, height: 18, borderRadius: 9, background: C.carbon }} />
      <div style={{ position: "absolute", left: BEZEL + (x + w / 2) * K - (w * z) / 2, top: BEZEL + (y + h / 2) * K - (h * z) / 2, width: w * z, height: h * z, borderRadius: 30, overflow: "hidden", background: C.blanco, boxShadow: `0 0 0 7px ${C.blanco}, 0 30px 60px rgba(43,43,35,0.4)`, transform: "translateZ(150px)" }}>
        <Img src={staticFile("m_resumen.png")} style={{ position: "absolute", left: -x * z, top: -y * z, width: 920 * z, height: 2000 * z, maxWidth: "none" }} />
      </div>
    </div>
  );
};

// A. Perfil: "LOGO" gigante detrás, "fotos" al frente
const Perfil: React.FC = () => (
  <AbsoluteFill style={{ background: C.lima }}>
    <Small top={262} left={80}>Llena tu perfil con tu</Small>
    <Giant top={330} size={320}>LOGO</Giant>
    <Shot frame={150} callout={false} cx={540} top={540} sc={0.9} rotY={-8} ring={C.blanco} shadow="0 40px 80px rgba(43,43,35,0.35)" />
    <Small top={1262} left={80} size={48}>y tus</Small>
    <Tag top={1318} left={60} size={128} rotate={-3}>fotos</Tag>
  </AbsoluteFill>
);

// B. Descuento: "ELIGE" gigante en carbón, inclinado, detrás
const Descuento: React.FC = () => (
  <AbsoluteFill style={{ background: C.lima }}>
    <Small top={262} left={80}>Paso 2 de 3</Small>
    <Giant top={330} size={310} color={C.carbon} rotate={-5}>ELIGE</Giant>
    <Shot frame={290} cx={600} top={580} sc={0.88} rotY={-8} ring={C.blanco} shadow="0 40px 80px rgba(43,43,35,0.35)" calloutRing={C.blanco} />
    <Small top={1330} left={80} size={48}>tu</Small>
    <Tag top={1384} left={60} size={116} rotate={-3}>descuento</Tag>
  </AbsoluteFill>
);

// C. Panel: "CANJEADO" detrás, tarjeta de Giselle al frente
const Panel: React.FC = () => (
  <AbsoluteFill style={{ background: C.lima }}>
    <Small top={262} left={80}>Quién ha</Small>
    <Giant top={350} size={168}>CANJEADO</Giant>
    <DashShot cx={540} top={485} sc={0.9} rotY={8} />
    <Small top={1300} right={80} size={48}>en tu</Small>
    <Tag top={1354} right={60} size={120} rotate={3}>panel</Tag>
  </AbsoluteFill>
);

export const Capas: React.FC<{ op: "A" | "B" | "C" }> = ({ op }) => {
  useBrandFonts();
  return op === "A" ? <Perfil /> : op === "B" ? <Descuento /> : <Panel />;
};
