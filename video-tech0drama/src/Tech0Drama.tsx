import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, interpolateColors, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS, PIXEL, POPPINS, popAt } from "./brand";
import { Base } from "./Layers";

// Split screen: arriba un panel aqua con textos y animaciones, abajo tu video con zoom.
// Todos los tiempos están en segundos del video ya cortado (27.7 s).
const PANEL_H = 1000;
const RED = "#EA4335"; // rojo de tráfico de Google Maps. Excepción de paleta: solo para la línea de tráfico
const clampX = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.inOut(Easing.cubic);

const useT = () => useCurrentFrame() / FPS;

// ───────── Zoom del video (mitad inferior) ─────────
const SEG = [0, 2.38, 5.47, 11.02, 15.28, 15.64, 16.93, 20.58, 22.4, 24.28, 27.7];
const PUNCH = [0.7, 1.7, 2.7, 3.8, 4.9, 6.8, 8.8, 10.7, 14.2, 14.8, 17.4, 19.1, 21.5, 23.5, 26.2];
const zoomAt = (t: number) => {
  let seg = 0;
  for (let i = 0; i < SEG.length - 1; i++) if (t >= SEG[i]) seg = i;
  const local = (t - SEG[seg]) / (SEG[seg + 1] - SEG[seg]);
  let z = (seg % 2 === 0 ? 1.0 : 1.14) + 0.05 * local;
  for (const k of PUNCH) {
    const d = t - k;
    if (d >= 0) z += 0.08 * Math.min(d / 0.08, 1) * Math.exp(-Math.max(d - 0.08, 0) * 4);
  }
  return z;
};

// ───────── Texto ─────────
type TxP = {
  text: string; at: number; to: number; y: number; size: number;
  x?: number; align?: "left" | "center"; pixel?: boolean; weight?: number; color?: string; grow?: boolean;
};
// Palabra que entra con zoom cuando la dices, crece despacio y sale con un zoom corto.
const Tx: React.FC<TxP> = ({ text, at, to, y, size, x = 80, align = "center", pixel, weight = 900, color = C.deep, grow = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < at || t > to) return null;
  const p = popAt(frame, fps, at);
  const out = interpolate(t, [to - 0.14, to], [0, 1], clampX);
  const g = grow ? 1 + 0.06 * ((t - at) / Math.max(to - at, 0.2)) : 1;
  const sc = interpolate(p, [0, 1], [0.55, 1]) * g * (1 + 0.1 * out);
  const pos: React.CSSProperties = align === "center" ? { left: 0, right: 0, textAlign: "center" } : { left: x, textAlign: "left" };
  return (
    <div
      style={{
        position: "absolute", top: y, ...pos, opacity: Math.min(1, p * 2) * (1 - out), transform: `scale(${sc})`,
        transformOrigin: align === "center" ? "50% 60%" : "0% 60%",
        fontFamily: pixel ? PIXEL : POPPINS, fontWeight: pixel ? 700 : weight, fontSize: size, lineHeight: 1,
        letterSpacing: pixel ? 4 : -size * 0.03, color, whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

// Escena: aparece entre a y b con un fundido corto.
const Scene: React.FC<{ a: number; b: number; children: React.ReactNode }> = ({ a, b, children }) => {
  const t = useT();
  if (t < a || t > b) return null;
  const op = interpolate(t, [a, a + 0.15, b - 0.15, b], [0, 1, 1, 0], clampX);
  return <AbsoluteFill style={{ opacity: op }}>{children}</AbsoluteFill>;
};

// Aparece con rebote en el segundo `at` y se queda
const Pop: React.FC<{ at: number; origin?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, origin = "50% 50%", children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = popAt(frame, fps, at, 12);
  if (frame / fps < at) return null;
  return <div style={{ ...style, opacity: Math.min(1, p * 2), transform: `scale(${interpolate(p, [0, 1], [0.4, 1])})`, transformOrigin: origin }}>{children}</div>;
};

// ───────── Ilustraciones ─────────
const Car: React.FC<{ x: number; y: number; color: string; wheel: number; s?: number }> = ({ x, y, color, wheel, s = 1 }) => (
  <svg width={200 * s} height={90 * s} viewBox="0 0 200 90" style={{ position: "absolute", left: x, top: y }}>
    <path d="M8 66 L8 52 Q8 44 18 42 L48 38 L66 14 Q70 10 76 10 L128 10 Q134 10 138 14 L156 38 L184 44 Q194 46 194 56 L194 66 Z" fill={color} />
    <path d="M72 18 L124 18 L141 38 L58 38 Z" fill={C.light} />
    <line x1="98" y1="18" x2="98" y2="38" stroke={color} strokeWidth="5" />
    {[50, 150].map((cx) => (
      <g key={cx} transform={`translate(${cx} 68) rotate(${wheel})`}>
        <circle r="17" fill={C.deep} />
        <circle r="8" fill={C.aqua} />
        <line x1="-8" y1="0" x2="8" y2="0" stroke={C.deep} strokeWidth="3" />
      </g>
    ))}
  </svg>
);

const Clock: React.FC<{ minute: number }> = ({ minute }) => (
  <svg width="520" height="520" viewBox="-180 -180 360 360" style={{ position: "absolute", left: 280, top: 420 }}>
    <circle r="160" fill={C.light} stroke={C.deep} strokeWidth="14" />
    {Array.from({ length: 12 }).map((_, i) => (
      <line key={i} x1="0" y1="-140" x2="0" y2="-124" stroke={C.deep} strokeWidth="8" strokeLinecap="round" transform={`rotate(${i * 30})`} />
    ))}
    <line x1="0" y1="0" x2="0" y2="-92" stroke={C.deep} strokeWidth="14" strokeLinecap="round" transform={`rotate(${minute / 12})`} />
    <line x1="0" y1="0" x2="0" y2="-124" stroke={C.mid} strokeWidth="9" strokeLinecap="round" transform={`rotate(${minute})`} />
    <circle r="12" fill={C.deep} />
  </svg>
);

const Warning: React.FC = () => (
  <svg width="400" height="360" viewBox="0 0 300 270">
    <path d="M150 14 L286 252 L14 252 Z" fill={C.light} stroke={C.deep} strokeWidth="16" strokeLinejoin="round" />
    <rect x="138" y="86" width="24" height="96" rx="12" fill={C.deep} />
    <circle cx="150" cy="214" r="14" fill={C.deep} />
  </svg>
);

const Cone: React.FC = () => (
  <svg width="400" height="360" viewBox="0 0 300 270">
    <rect x="30" y="226" width="240" height="30" rx="10" fill={C.deep} />
    <path d="M110 24 L190 24 L246 226 L54 226 Z" fill={C.mid} />
    <path d="M100 66 L200 66 L212 110 L88 110 Z" fill={C.white} />
    <path d="M78 150 L222 150 L234 194 L66 194 Z" fill={C.white} />
    <rect x="104" y="12" width="92" height="22" rx="10" fill={C.deep} />
  </svg>
);

// ───────── Escenas del panel superior ─────────

// 0 a 4 s: título del video y serie (es la portada). Fondo con tu mapa teñido de aqua.
const Titulo: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", left: 80, top: 232, width: 920, height: 700 }}>
      <div style={{ position: "relative", height: 150 }}>
        <Tx text="TECH" at={0.05} to={4.1} y={14} x={0} align="left" size={96} weight={800} grow={false} />
        <Tx text="0" at={0.2} to={4.1} y={-14} x={338} align="left" size={176} pixel grow={false} />
        <Tx text="DRAMA" at={0.35} to={4.1} y={14} x={500} align="left" size={96} weight={800} grow={false} />
      </div>
      <Tx text="Google" at={0.66} to={4.1} y={172} x={0} align="left" size={200} grow={false} />
      <Tx text="Maps" at={0.98} to={4.1} y={370} x={0} align="left" size={200} grow={false} />
      <Tx text="y el" at={1.5} to={4.1} y={596} x={0} align="left" size={74} weight={600} grow={false} />
      <Tx text="TRÁFICO" at={1.66} to={4.1} y={566} x={150} align="left" size={150} pixel grow={false} />
    </div>
    {/* Logo oficial de Google Maps: entra cuando dices "Google Maps" y sale antes de la portada */}
    <LogoPin />
  </AbsoluteFill>
);

const LogoPin: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t < 0.66 || t > 2.0) return null;
  const p = popAt(frame, fps, 0.66, 11);
  const out = interpolate(t, [1.86, 2.0], [0, 1], clampX);
  return (
    <Img
      src={staticFile("logos/google_maps_pin.png")}
      style={{ position: "absolute", left: 770, top: 580, height: 230, opacity: Math.min(1, p * 2) * (1 - out), transform: `scale(${interpolate(p, [0, 1], [0.3, 1]) * (1 + 0.15 * out)}) rotate(${interpolate(p, [0, 1], [-25, 0])}deg)` }}
    />
  );
};

// 4 a 6 s: la serie crece y llena el panel (2 segundos extras)
const SerieGrande: React.FC = () => (
  <AbsoluteFill>
    <Tx text="TECH" at={4.0} to={6.2} y={130} size={270} />
    <Tx text="0" at={4.2} to={6.2} y={420} size={300} pixel />
    <Tx text="DRAMA" at={4.4} to={6.2} y={720} size={230} />
  </AbsoluteFill>
);

// 6 a 10.1 s: carretera con carros. Van rápido, luego se juntan y van lento, y la línea de tráfico se pone roja.
const roadHead = (t: number) => {
  let x = 0;
  for (let f = 6 * FPS; f < Math.round(t * FPS); f++) {
    x += interpolate(f / FPS, [6, 7.8, 9.0, 10.2], [760, 900, 150, 60], clampX) / FPS;
  }
  return x;
};
const Carretera: React.FC = () => {
  const t = useT();
  const head = roadHead(t);
  const gap = interpolate(t, [6, 10], [420, 310], clampX);
  const trafico = interpolateColors(t, [8.6, 9.7], [C.mid, RED]);
  const colors = [C.white, C.light, C.mid, C.white];
  return (
    <AbsoluteFill>
      <Tx text="velocidad" at={6.82} to={8.7} y={230} size={200} />
      <Tx text="LENTO" at={8.82} to={10.1} y={215} size={260} pixel />
      <div style={{ position: "absolute", left: 0, top: 698, width: 1080, height: 180, background: C.deep }} />
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", top: 780, left: ((i * 140 - (head % 140)) + 1400) % 1400 - 160, width: 70, height: 10, background: C.aqua }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 664, width: 1080, height: 18, background: trafico }} />
      {colors.map((col, i) => {
        const x = ((((head - i * gap) % 1700) + 1700) % 1700) - 300;
        return <Car key={i} x={x} y={585} color={col} wheel={head * 0.9} s={1.35} />;
      })}
    </AbsoluteFill>
  );
};

// 10 a 11.1 s: tu captura del mapa con tráfico en rojo, con zoom a las calles rojas
const MapaRojo: React.FC = () => {
  const t = useT();
  const sc = interpolate(t, [10.0, 11.1], [1.0, 1.6], { ...clampX, easing: ease });
  const pop = popAt(Math.round(t * FPS), FPS, 10.0, 16);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 100, top: 60, width: 880, height: 880, borderRadius: 36, overflow: "hidden", transform: `scale(${interpolate(pop, [0, 1], [0.9, 1])})` }}>
        <Img src={staticFile("mapa_trafico.png")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${sc})`, transformOrigin: "44% 52%" }} />
      </div>
      <Tx text="ROJO" at={10.66} to={11.1} y={745} size={190} pixel />
    </AbsoluteFill>
  );
};

// 11.1 a 13.5 s: historial de esa hora
const Historial: React.FC = () => {
  const t = useT();
  const minute = interpolate(t, [11.1, 13.5], [0, 1080], { ...clampX, easing: ease });
  return (
    <AbsoluteFill>
      <Tx text="mezcla" at={11.22} to={12.0} y={250} size={110} weight={700} />
      <Tx text="historial" at={12.02} to={12.86} y={200} size={190} />
      <Tx text="HORA" at={12.88} to={13.5} y={185} size={270} pixel />
      <Pop at={11.1} style={{ position: "absolute", inset: 0 }}>
        <Clock minute={minute} />
      </Pop>
    </AbsoluteFill>
  );
};

// 13.4 a 15.4 s: reportes de choques y obras
const Reportes: React.FC = () => (
  <AbsoluteFill>
    <Tx text="reportes" at={13.54} to={14.14} y={240} size={100} weight={700} />
    <Tx text="choques" at={14.16} to={14.74} y={200} size={180} />
    <Tx text="OBRAS" at={14.76} to={15.4} y={185} size={260} pixel />
    <Pop at={14.16} style={{ position: "absolute", left: 90, top: 520 }}><Warning /></Pop>
    <Pop at={14.76} style={{ position: "absolute", left: 590, top: 520 }}><Cone /></Pop>
  </AbsoluteFill>
);

// 15.4 a 24.2 s: pasos en el celular (ilustración; aquí irán tus capturas reales)
const Celular: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = popAt(frame, fps, 15.46, 16);
  const draw = interpolate(t, [16.1, 17.0], [1, 0], { ...clampX, easing: ease });
  const dots = t > 17.04 && t < 18.5 ? 1 + 0.25 * Math.sin((t - 17.04) * 14) : 1;
  const menu = interpolate(t, [17.6, 17.9, 20.5, 20.7], [0, 1, 1, 0], clampX);
  const item = interpolate(t, [18.76, 19.0], [0, 1], clampX);
  const chart = interpolate(t, [20.7, 21.0], [0, 1], clampX);
  return (
    <AbsoluteFill>
      <Tx text="abre" at={16.12} to={16.9} y={200} size={70} weight={700} />
      <Tx text="tu ruta" at={16.3} to={17.0} y={260} size={170} />
      <Tx text="tres" at={17.04} to={18.35} y={200} size={70} weight={700} />
      <Tx text="PUNTOS" at={17.4} to={18.38} y={255} size={170} pixel />
      <Tx text="hora de" at={18.76} to={19.9} y={200} size={70} weight={700} />
      <Tx text="salida" at={19.44} to={20.0} y={260} size={170} />
      <Tx text="LLEGADA" at={20.0} to={20.6} y={255} size={170} pixel />
      <Tx text="cuánto tardarías" at={21.18} to={22.9} y={190} size={90} weight={700} />
      <Tx text="tráfico" at={22.94} to={23.5} y={290} size={150} />
      <Tx text="histórico" at={23.5} to={24.2} y={290} size={190} />
      {/* Celular */}
      <div style={{ position: "absolute", left: 330, top: interpolate(rise, [0, 1], [900, 470]), width: 420, height: 760, borderRadius: 60, background: C.light, border: `14px solid ${C.deep}`, boxSizing: "border-box", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 140, top: 14, width: 100, height: 22, borderRadius: 11, background: C.deep }} />
        <svg width="392" height="740" viewBox="0 0 392 740" style={{ position: "absolute", left: 0, top: 0 }}>
          {[[0, 190, 392, 170], [0, 330, 392, 350], [90, 60, 130, 740], [250, 60, 220, 740]].map((l, i) => (
            <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={C.white} strokeWidth="18" />
          ))}
          <path d="M60 330 L120 330 L150 190 L270 180 L320 120" fill="none" stroke={C.deep} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={draw} />
          <circle cx="60" cy="330" r="14" fill={C.mid} />
          <circle cx="320" cy="120" r="14" fill={C.deep} />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="350" cy={62 + i * 16} r="5.5" fill={C.deep} transform={`translate(350 76) scale(${dots}) translate(-350 -76)`} />
          ))}
        </svg>
        <div style={{ position: "absolute", left: 80, top: 100, width: 260, height: 210, borderRadius: 24, background: C.white, opacity: menu, transform: `translateY(${(1 - menu) * -20}px)` }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 24, top: 28 + i * 62, width: 212, height: 40, borderRadius: 12, background: i === 1 ? C.aqua : C.light, transform: i === 1 ? `scale(${1 + 0.06 * item})` : undefined }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 24, right: 24, top: 250, height: 250, padding: "22px 22px 18px", boxSizing: "border-box", borderRadius: 24, background: C.white, display: "flex", alignItems: "flex-end", gap: 12, opacity: chart }}>
          {[0.35, 0.55, 0.9, 0.7, 0.45, 0.8, 0.5].map((h, i) => (
            <div key={i} style={{ flex: 1, height: 200 * h * interpolate(t, [20.9 + i * 0.12, 21.3 + i * 0.12], [0, 1], { ...clampX, easing: ease }), borderRadius: 8, background: i === 2 ? C.deep : C.aqua }} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 24.4 a 27.7 s: cierre
const Cierre: React.FC = () => (
  <AbsoluteFill>
    <Tx text="No predice" at={24.4} to={27.7} y={170} size={80} weight={700} grow={false} />
    <Tx text="un choque" at={24.9} to={27.7} y={250} size={170} grow={false} />
    <Tx text="pero sí va a" at={25.72} to={27.7} y={470} size={64} weight={700} grow={false} />
    <Tx text="predecir" at={26.22} to={27.7} y={530} size={210} grow={false} />
    <Tx text="la hora del" at={26.86} to={27.7} y={775} size={64} weight={700} grow={false} />
    <Tx text="TRÁFICO" at={27.16} to={27.7} y={850} size={150} pixel grow={false} />
  </AbsoluteFill>
);

// ───────── Composición ─────────
export const Video: React.FC = () => {
  const t = useT();
  const z = zoomAt(t);
  const mapa = interpolate(t, [5.7, 6.2], [1, 0], clampX);
  return (
    <AbsoluteFill style={{ background: C.aqua }}>
      {/* Panel superior */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: PANEL_H, background: C.aqua, overflow: "hidden" }}>
        {mapa > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: mapa }}>
            <Img src={staticFile("mapa_trafico.png")} style={{ position: "absolute", left: 0, top: -120, width: 1080 }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(127,227,232,0.9)" }} />
          </div>
        )}
        <Scene a={0} b={4.1}><Titulo /></Scene>
        <Scene a={3.95} b={6.2}><SerieGrande /></Scene>
        <Scene a={5.95} b={10.1}><Carretera /></Scene>
        <Scene a={9.95} b={11.15}><MapaRojo /></Scene>
        <Scene a={11.05} b={13.55}><Historial /></Scene>
        <Scene a={13.4} b={15.45}><Reportes /></Scene>
        <Scene a={15.4} b={24.25}><Celular /></Scene>
        <Scene a={24.3} b={27.7}><Cierre /></Scene>
      </div>
      {/* Tu video, mitad inferior, con zoom */}
      <div style={{ position: "absolute", left: 0, top: PANEL_H, width: 1080, height: 1920 - PANEL_H, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transform: "translateY(-270px)" }}>
          <div style={{ position: "absolute", inset: 0, transform: `scale(${z})`, transformOrigin: "486px 600px" }}>
            <Base />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
