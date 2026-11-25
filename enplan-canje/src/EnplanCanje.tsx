import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { APOYO, C, ramp, T, TITULAR, useBrandFonts, usePop } from "./brand";

// Video de 25 s a 30 fps
export const TOTAL = 750;
const CLIP_END = 346; // public/canje.mp4 dura 348 cuadros
const TAP = 226; // cuadro en que se toca "Activar beneficio"
const CTA_FROM = 624;

// ---------- Utilidades de movimiento ----------
const smooth = (x: number) => x * x * (3 - 2 * x);
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

// Valores que se mueven entre posiciones clave, con arranque y frenado suaves
const keys = (frame: number, ks: [number, number[]][]): number[] => {
  if (frame <= ks[0][0]) return ks[0][1];
  for (let i = 1; i < ks.length; i++) {
    if (frame <= ks[i][0]) {
      const [f0, a] = ks[i - 1];
      const [f1, b] = ks[i];
      const k = smooth((frame - f0) / (f1 - f0));
      return a.map((v, j) => v + (b[j] - v) * k);
    }
  }
  return ks[ks.length - 1][1];
};

// ---------- Texto dinámico ----------
type Dir = "left" | "right" | "up" | "down";
const OFFSET: Record<Dir, [number, number]> = { left: [-110, 0], right: [110, 0], up: [0, -70], down: [0, 70] };

// Una línea de texto que entra deslizando y sale con un fundido corto. Sin rebote.
const Txt: React.FC<{
  frame: number;
  from: number;
  to: number;
  y: number;
  x?: number;
  align?: "left" | "right" | "center";
  size: number;
  big?: boolean;
  dir?: Dir;
  color?: string;
  children: React.ReactNode;
}> = ({ frame, from, to, y, x = 80, align = "left", size, big, dir = "left", color, children }) => {
  if (frame < from || frame >= to) return null;
  const inn = easeOut(ramp(frame, from, from + 12));
  const out = ramp(frame, to - 7, to);
  const [dx, dy] = OFFSET[dir];
  const pos: React.CSSProperties =
    align === "left" ? { left: x } : align === "right" ? { right: 1080 - x } : { left: 0, width: 1080, textAlign: "center" };
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        ...pos,
        whiteSpace: "nowrap",
        fontFamily: big ? TITULAR : APOYO,
        fontWeight: big ? 800 : 600,
        fontSize: size,
        lineHeight: 1.05,
        letterSpacing: big ? "-0.02em" : 0,
        color: color ?? (big ? C.lima : C.blanco),
        textShadow: `0 4px 16px rgba(43,43,35,0.55), 0 2px 0 ${C.carbon}`,
        opacity: inn * (1 - out),
        transform: `translate(${dx * (1 - inn) - dx * 0.25 * out}px, ${dy * (1 - inn) - dy * 0.25 * out}px)`,
      }}
    >
      {children}
    </div>
  );
};

// ---------- Fondo ----------
const Rings: React.FC<{ frame: number }> = ({ frame }) => {
  const f = (p: number) => Math.sin(frame / 40 + p) * 14;
  const rings: [number, number, number, number][] = [
    [1000, 360, 230, 0],
    [40, 1330, 300, 1.8],
    [900, 1700, 120, 3.2],
  ];
  return (
    <>
      {rings.map(([x, y, r, p], i) => (
        <div key={i} style={{ position: "absolute", left: x - r, top: y - r + f(p), width: r * 2, height: r * 2, borderRadius: r, border: `4px solid ${C.lima}`, opacity: 0.28 }} />
      ))}
    </>
  );
};

// ---------- Indicador de pasos ----------
const STEPS: [string, string, number, number][] = [
  ["1", "Perfil", 90, 214],
  ["2", "Descuento", 214, 345],
  ["3", "Panel", 345, CTA_FROM],
];
const Steps: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame < 88 || frame >= CTA_FROM + 4) return null;
  const inn = easeOut(ramp(frame, 88, 100));
  const out = ramp(frame, CTA_FROM - 6, CTA_FROM + 4);
  return (
    <div style={{ position: "absolute", top: 258, left: 0, width: 1080, display: "flex", justifyContent: "center", gap: 14, opacity: inn * (1 - out), transform: `translateY(${(1 - inn) * -30}px)` }}>
      {STEPS.map(([n, label, a, b]) => {
        const on = frame >= a && frame < b;
        return (
          <div
            key={n}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 24px",
              borderRadius: 40,
              background: on ? C.lima : "transparent",
              border: `3px solid ${on ? C.lima : "rgba(250,248,243,0.4)"}`,
              fontFamily: TITULAR,
              fontWeight: 800,
              fontSize: 30,
              color: on ? C.carbon : "rgba(250,248,243,0.65)",
            }}
          >
            {n}
            <span style={{ fontFamily: APOYO, fontWeight: 600 }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

// ---------- Celular ----------
const BEZEL = 20;
const PH = 1040;
const SCREEN_H = PH - BEZEL * 2;

const Phone: React.FC<{
  frame: number;
  k: number[]; // [cx, top, escala, rotY, rotZ, rotX]
  screenW: number;
  screen: React.ReactNode;
  over?: React.ReactNode;
}> = ({ frame, k, screenW, screen, over }) => {
  const PW = screenW + BEZEL * 2;
  const [cx, top, sc, rotY, rotZ, rotX] = k;
  return (
    <div
      style={{
        position: "absolute",
        left: cx - PW / 2,
        top,
        width: PW,
        height: PH,
        background: C.carbon,
        borderRadius: 70,
        boxShadow: `0 0 0 5px ${C.lima}, 0 50px 90px rgba(0,0,0,0.5)`,
        transformOrigin: "50% 0%",
        transformStyle: "preserve-3d",
        transform: `perspective(1800px) scale(${sc}) rotateY(${rotY + Math.sin(frame / 25) * 1.4}deg) rotateZ(${rotZ}deg) rotateX(${rotX}deg)`,
      }}
    >
      <div style={{ position: "absolute", left: BEZEL, top: BEZEL, width: screenW, height: SCREEN_H, borderRadius: 52, overflow: "hidden", background: C.arena }}>{screen}</div>
      <div style={{ position: "absolute", top: BEZEL + 10, left: PW / 2 - 40, width: 80, height: 18, borderRadius: 9, background: C.carbon }} />
      {over}
    </div>
  );
};

// ---------- Clip del canje ----------
const CLIP_W = 562;
const CLIP_K = CLIP_W / 1080;
const CLIP_KEYS: [number, number[]][] = [
  [0, [540, 1350, 0.72, 24, 0, 8]],
  [26, [560, 780, 0.72, -12, 0, 4]],
  [70, [560, 780, 0.72, -12, 0, 4]],
  [96, [800, 470, 0.9, -16, 2, 3]],
  [190, [790, 470, 0.9, -8, 0, 3]],
  [214, [540, 620, 0.88, -6, 0, 3]],
  [310, [540, 620, 0.88, 0, 0, 2]],
  [345, [-420, 620, 0.88, 22, -2, 3]],
];

// Círculo lima donde se toca la pantalla
const Tap: React.FC<{ frame: number; at: number; x: number; y: number }> = ({ frame, at, x, y }) => {
  if (frame < at - 8 || frame > at + 16) return null;
  const k = ramp(frame, at, at + 16);
  const pre = easeOut(ramp(frame, at - 8, at));
  const r = 20 + 48 * k;
  return (
    <>
      <div style={{ position: "absolute", left: x - 20, top: y - 20, width: 40, height: 40, borderRadius: 20, background: C.lima, border: `4px solid ${C.carbon}`, boxSizing: "border-box", opacity: frame < at ? pre : 1 - k, transform: `scale(${frame < at ? 1.6 - 0.6 * pre : 1})` }} />
      {frame >= at && <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, border: `5px solid ${C.lima}`, opacity: 1 - k }} />}
    </>
  );
};

// "Muestra al negocio" sale del celular hacia ti
const RedeemCallout: React.FC<{ frame: number }> = ({ frame }) => {
  const at = TAP + 22;
  const p = usePop(at, 15);
  if (frame < at || frame >= 312) return null;
  const out = 1 - ramp(frame, 300, 312);
  const [x, y, w, h] = [50, 830, 980, 395];
  const f = CLIP_K * 1.4;
  const cw = w * f;
  const ch = h * f;
  const cx = BEZEL + (x + w / 2) * CLIP_K;
  const cy = BEZEL + (y + h / 2) * CLIP_K;
  return (
    <div
      style={{
        position: "absolute",
        left: cx - cw / 2,
        top: cy - ch / 2,
        width: cw,
        height: ch,
        borderRadius: 30,
        overflow: "hidden",
        boxShadow: `0 0 0 ${7 * p}px ${C.lima}, 0 30px 60px rgba(0,0,0,0.45)`,
        opacity: out,
        transform: `translateZ(${190 * p}px) scale(${0.7 + 0.3 * p})`,
      }}
    >
      <OffthreadVideo src={staticFile("canje.mp4")} muted style={{ position: "absolute", left: -x * f, top: -y * f, width: 1080 * f, height: 1920 * f, maxWidth: "none" }} />
    </div>
  );
};

const ClipPhone: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame >= CLIP_END) return null;
  return (
    <Phone
      frame={frame}
      k={keys(frame, CLIP_KEYS)}
      screenW={CLIP_W}
      screen={<OffthreadVideo src={staticFile("canje.mp4")} muted style={{ width: CLIP_W, height: SCREEN_H }} />}
      over={
        <>
          <Tap frame={frame} at={TAP} x={BEZEL + 540 * CLIP_K} y={BEZEL + (1824 / 1920) * SCREEN_H} />
          <RedeemCallout frame={frame} />
        </>
      }
    />
  );
};

// ---------- Panel de métricas ----------
const DASH_W = 460;
const DASH_K = DASH_W / 920; // las capturas miden 920 x 2000
const DASH_KEYS: [number, number[]][] = [
  [320, [1500, 600, 0.88, 24, 0, 3]],
  [352, [560, 600, 0.88, 10, 0, 3]],
  [420, [500, 600, 0.88, -10, 0, 3]],
  [470, [580, 600, 0.88, 8, 0, 3]],
  [525, [540, 600, 0.9, -6, 0, 3]],
  [600, [540, 600, 0.9, 0, 0, 3]],
  [CTA_FROM + 6, [540, 1500, 0.9, 0, 0, 3]],
];
const SHOTS = ["m_publico.png", "m_edad.png", "m_resumen.png"];
const SHOT_SWITCH = [465, 510]; // cuadros en que cambia la captura

// Aro lima que se dibuja sobre una captura (coordenadas de la captura de 920 x 2000)
const Ring: React.FC<{ frame: number; at: number; x: number; y: number; w: number; h: number; r?: number }> = ({ frame, at, x, y, w, h, r = 28 }) => {
  const p = usePop(at, 12);
  if (frame < at) return null;
  return (
    <div style={{ position: "absolute", left: x * DASH_K - 4, top: y * DASH_K - 4, width: w * DASH_K + 8, height: h * DASH_K + 8, borderRadius: r, border: `5px solid ${C.lima}`, boxShadow: `0 0 0 5px rgba(205,217,23,0.25)`, transform: `scale(${0.8 + 0.2 * p})`, opacity: Math.min(p * 2, 1) }} />
  );
};

// Recorte de una captura que sale del celular hacia ti
const Pop: React.FC<{ frame: number; at: number; until: number; shot: string; region: [number, number, number, number]; zoom?: number }> = ({ frame, at, until, shot, region, zoom = 0.92 }) => {
  const p = usePop(at, 15);
  if (frame < at || frame >= until) return null;
  const out = 1 - ramp(frame, until - 8, until);
  const [x, y, w, h] = region;
  const cw = w * zoom;
  const ch = h * zoom;
  const cx = BEZEL + (x + w / 2) * DASH_K;
  const cy = BEZEL + (y + h / 2) * DASH_K;
  return (
    <div
      style={{
        position: "absolute",
        left: cx - cw / 2,
        top: cy - ch / 2,
        width: cw,
        height: ch,
        borderRadius: 30,
        overflow: "hidden",
        boxShadow: `0 0 0 ${7 * p}px ${C.lima}, 0 30px 60px rgba(0,0,0,0.45)`,
        background: C.blanco,
        opacity: out,
        transform: `translateZ(${150 * p}px) scale(${0.7 + 0.3 * p})`,
      }}
    >
      <Img src={staticFile(shot)} style={{ position: "absolute", left: -x * zoom, top: -y * zoom, width: 920 * zoom, height: 2000 * zoom, maxWidth: "none" }} />
    </div>
  );
};

const DashPhone: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame < 318 || frame >= CTA_FROM + 8) return null;
  const idx = smooth(ramp(frame, SHOT_SWITCH[0], SHOT_SWITCH[0] + 12)) + smooth(ramp(frame, SHOT_SWITCH[1], SHOT_SWITCH[1] + 12));
  return (
    <Phone
      frame={frame}
      k={keys(frame, DASH_KEYS)}
      screenW={DASH_W}
      screen={
        <>
          {SHOTS.map((src, i) => (
            <div key={src} style={{ position: "absolute", left: (i - idx) * DASH_W, top: 0, width: DASH_W, height: SCREEN_H }}>
              <Img src={staticFile(src)} style={{ width: DASH_W, height: SCREEN_H }} />
              {i === 1 && <Ring frame={frame} at={482} x={405} y={1236} w={112} h={340} r={26} />}
            </div>
          ))}
        </>
      }
      over={
        <>
          {/* Vistas a tu negocio */}
          <Pop frame={frame} at={524} until={566} shot="m_resumen.png" region={[46, 383, 828, 255]} />
          {/* Actividad reciente: Giselle, canjeada */}
          <Pop frame={frame} at={570} until={CTA_FROM + 4} shot="m_resumen.png" region={[46, 1262, 828, 345]} />
        </>
      }
    />
  );
};

// ---------- Cierre ----------
const Close: React.FC<{ frame: number }> = ({ frame }) => {
  const from = CTA_FROM - T;
  const bg = ramp(frame, from, from + T);
  const logo = usePop(from + 3, 12);
  const line = usePop(from + 12, 14);
  const btn = usePop(from + 24, 10);
  const info = usePop(from + 32, 14);
  if (frame < from) return null;
  const f = (p: number) => Math.sin(frame / 30 + p) * 10;
  const dots: [number, number, number, number][] = [
    [1040, 150, 120, 0],
    [-40, 1760, 170, 1.5],
    [985, 1660, 46, 3],
    [60, 140, 34, 4.2],
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: C.arena, opacity: bg }}>
      {dots.map(([x, y, r, p], i) => (
        <div key={i} style={{ position: "absolute", left: x - r, top: y - r + f(p), width: r * 2, height: r * 2, borderRadius: r, background: C.lima }} />
      ))}
      <div style={{ position: "absolute", top: 420, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
        <Img src={staticFile("brand/logo/enplan_logo_carbon_sobre_arena.svg")} style={{ width: 560, transform: `scale(${0.7 + 0.3 * logo})`, opacity: Math.min(logo * 1.5, 1) }} />
      </div>
      <div style={{ position: "absolute", top: 690, left: 0, width: 1080, textAlign: "center", fontFamily: APOYO, fontWeight: 600, fontSize: 52, lineHeight: 1.25, color: C.carbon, opacity: line, transform: `translateY(${(1 - line) * 40}px)` }}>
        Aparece ante quienes buscan
        <br />
        <span style={{ fontFamily: TITULAR, fontWeight: 800, fontSize: 76, background: `linear-gradient(transparent 62%, ${C.lima} 62%, ${C.lima} 92%, transparent 92%)`, padding: "0 10px" }}>su siguiente plan</span>
      </div>
      <div style={{ position: "absolute", top: 1010, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, background: C.lima, color: C.carbon, borderRadius: 80, padding: "28px 54px", fontFamily: TITULAR, fontWeight: 800, fontSize: 54, transform: `scale(${btn * (1 + 0.025 * Math.sin((frame - from) / 5))})` }}>
          Registra tu negocio
          <svg width={50} height={40} viewBox="0 0 52 40">
            <path d="M4 20 H44 M28 4 L46 20 L28 36" fill="none" stroke={C.carbon} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div style={{ position: "absolute", top: 1190, left: 0, width: 1080, textAlign: "center", fontFamily: APOYO, fontWeight: 600, fontSize: 50, lineHeight: 1.4, color: C.carbon, opacity: info, transform: `translateY(${(1 - info) * 30}px)` }}>
        enplan.app
        <br />
        @enplan.ags
      </div>
    </div>
  );
};

// ---------- Video completo ----------
export const EnplanCanje: React.FC = () => {
  useBrandFonts();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.carbon }}>
      <Rings frame={frame} />
      <Steps frame={frame} />

      <DashPhone frame={frame} />
      <ClipPhone frame={frame} />

      {/* 1. Gancho */}
      <Txt frame={frame} from={4} to={74} y={270} size={64} dir="left">Así se vería</Txt>
      <Txt frame={frame} from={10} to={74} y={340} size={128} big dir="left">tu negocio</Txt>
      <Txt frame={frame} from={18} to={74} y={492} size={64} dir="left">en enplan</Txt>

      {/* 2. Perfil: logo, fotos, datos */}
      <Txt frame={frame} from={96} to={206} y={540} size={52} dir="left">Pones tu</Txt>
      <Txt frame={frame} from={98} to={206} y={585} size={150} big dir="left">logo</Txt>
      <Txt frame={frame} from={134} to={206} y={770} size={52} dir="left">tus</Txt>
      <Txt frame={frame} from={136} to={206} y={815} size={128} big dir="left">fotos</Txt>
      <Txt frame={frame} from={168} to={206} y={970} size={52} dir="left">y llenas tu</Txt>
      <Txt frame={frame} from={170} to={206} y={1015} size={112} big dir="left">perfil</Txt>

      {/* 3. Descuento */}
      <Txt frame={frame} from={214} to={298} y={348} size={60} dir="down">Pones tu</Txt>
      <Txt frame={frame} from={218} to={298} y={416} size={140} big dir="down">descuento</Txt>
      <Txt frame={frame} from={304} to={344} y={348} x={1000} align="right" size={56} dir="right">y tus clientes</Txt>
      <Txt frame={frame} from={308} to={344} y={412} x={1000} align="right" size={124} big dir="right">lo canjean</Txt>

      {/* 4. Panel de métricas */}
      <Txt frame={frame} from={352} to={418} y={348} size={56} dir="left">Y tienes un panel</Txt>
      <Txt frame={frame} from={356} to={418} y={410} size={120} big dir="left">de métricas</Txt>
      <Txt frame={frame} from={424} to={508} y={348} x={1000} align="right" size={56} dir="right">para conocer a fondo</Txt>
      <Txt frame={frame} from={428} to={508} y={410} x={1000} align="right" size={136} big dir="right">tu público</Txt>
      <Txt frame={frame} from={514} to={563} y={348} align="center" size={60} dir="up">Quién ve</Txt>
      <Txt frame={frame} from={518} to={563} y={416} align="center" size={150} big dir="up">tu perfil</Txt>
      <Txt frame={frame} from={568} to={CTA_FROM - 2} y={348} size={60} dir="left">y quién ha</Txt>
      <Txt frame={frame} from={572} to={CTA_FROM - 2} y={416} size={150} big dir="left">canjeado</Txt>

      <Close frame={frame} />
    </AbsoluteFill>
  );
};
