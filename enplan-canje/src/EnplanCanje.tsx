import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { APOYO, C, ramp, TITULAR, useBrandFonts } from "./brand";

// Dirección "Lima total con capas": fondo lima, palabras gigantes detrás del celular,
// texto chico arriba y etiquetas blancas al frente. Movimiento suave, sin rebotes.
export const TOTAL = 750; // 25 s a 30 fps
const CLIP_END = 346; // public/canje.mp4 dura 348 cuadros
const TAP = 226; // cuadro en que se toca "Activar beneficio"
const CTA_FROM = 624;

// ---------- Movimiento suave ----------
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

// Aparece con un fundido y una subida corta; sale con un fundido. Sin rebote.
const Fade: React.FC<{ frame: number; from: number; to: number; dy?: number; dur?: number; style: React.CSSProperties; children: React.ReactNode }> = ({ frame, from, to, dy = 24, dur = 16, style, children }) => {
  if (frame < from || frame >= to) return null;
  const inn = easeOut(ramp(frame, from, from + dur));
  const out = ramp(frame, to - 9, to);
  return (
    <div style={{ ...style, opacity: inn * (1 - out), transform: `${style.transform ?? ""} translateY(${(1 - inn) * dy}px)` }}>{children}</div>
  );
};

// ---------- Texto en capas ----------
// Palabra gigante, detrás del celular
const Giant: React.FC<{ frame: number; from: number; to: number; size: number; color?: string; rotate?: number; top?: number; children: React.ReactNode }> = ({ frame, from, to, size, color = C.blanco, rotate = 0, top = 335, children }) => (
  <Fade frame={frame} from={from} to={to} dy={36} dur={20} style={{ position: "absolute", top, left: 0, width: 1080, textAlign: "center", fontFamily: TITULAR, fontWeight: 800, fontSize: size, lineHeight: 0.9, letterSpacing: "-0.04em", color, whiteSpace: "nowrap", transform: `rotate(${rotate}deg)` }}>
    {children}
  </Fade>
);

// Texto chico de apoyo, arriba a la izquierda
const Small: React.FC<{ frame: number; from: number; to: number; top?: number; left?: number; right?: number; size?: number; children: React.ReactNode }> = ({ frame, from, to, top = 262, left, right, size = 52, children }) => (
  <Fade frame={frame} from={from} to={to} dy={16} style={{ position: "absolute", top, left: left ?? (right === undefined ? 80 : undefined), right, fontFamily: APOYO, fontWeight: 600, fontSize: size, lineHeight: 1.1, color: C.carbon, whiteSpace: "nowrap" }}>
    {children}
  </Fade>
);

// El punto del logo
const Dot: React.FC<{ size: number }> = ({ size }) => <span style={{ display: "inline-block", width: size, height: size, borderRadius: size, background: C.lima, marginLeft: 8 }} />;

// Etiqueta blanca al frente, con el punto lima del logo al final
const Tag: React.FC<{ frame: number; from: number; to: number; top: number; left?: number; right?: number; size: number; rotate?: number; children: React.ReactNode }> = ({ frame, from, to, top, left, right, size, rotate = -3, children }) => (
  <Fade frame={frame} from={from} to={to} dy={28} dur={18} style={{ position: "absolute", top, left, right, display: "flex", alignItems: "baseline", background: C.blanco, borderRadius: 30, padding: "0 28px 12px 26px", fontFamily: TITULAR, fontWeight: 800, fontSize: size, lineHeight: 1.15, letterSpacing: "-0.02em", color: C.carbon, whiteSpace: "nowrap", boxShadow: "0 18px 40px rgba(43,43,35,0.25)", transform: `rotate(${rotate}deg)` }}>
    {children}
    <Dot size={Math.round(size * 0.24)} />
  </Fade>
);

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
        boxShadow: `0 0 0 6px ${C.blanco}, 0 40px 80px rgba(43,43,35,0.35)`,
        transformOrigin: "50% 0%",
        transformStyle: "preserve-3d",
        transform: `perspective(1800px) scale(${sc}) rotateY(${rotY + Math.sin(frame / 40) * 1}deg) rotateZ(${rotZ}deg) rotateX(${rotX}deg)`,
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
  [0, [540, 1500, 0.9, 10, 0, 6]],
  [32, [540, 520, 0.9, -8, 0, 3]],
  [200, [540, 520, 0.9, -8, 0, 3]],
  [226, [600, 580, 0.88, -8, 0, 3]],
  [318, [600, 580, 0.88, -6, 0, 2]],
  [352, [-300, 580, 0.88, 14, 0, 3]],
];

// Toque en la pantalla: un punto lima con borde carbón y un aro que se abre
const Tap: React.FC<{ frame: number; at: number; x: number; y: number }> = ({ frame, at, x, y }) => {
  if (frame < at - 8 || frame > at + 16) return null;
  const k = ramp(frame, at, at + 16);
  const pre = easeOut(ramp(frame, at - 8, at));
  const r = 20 + 44 * k;
  return (
    <>
      <div style={{ position: "absolute", left: x - 20, top: y - 20, width: 40, height: 40, borderRadius: 20, background: C.lima, border: `4px solid ${C.carbon}`, boxSizing: "border-box", opacity: frame < at ? pre : 1 - k }} />
      {frame >= at && <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, border: `5px solid ${C.carbon}`, opacity: 0.7 * (1 - k) }} />}
    </>
  );
};

// "Muestra al negocio" sale del celular hacia ti, suave
const RedeemCallout: React.FC<{ frame: number }> = ({ frame }) => {
  const at = TAP + 22;
  if (frame < at || frame >= 318) return null;
  const p = easeOut(ramp(frame, at, at + 22));
  const out = 1 - ramp(frame, 306, 318);
  const [x, y, w, h] = [50, 830, 980, 395];
  const f = CLIP_K * 1.4;
  const cw = w * f;
  const ch = h * f;
  const cx = BEZEL + (x + w / 2) * CLIP_K;
  const cy = BEZEL + (y + h / 2) * CLIP_K;
  return (
    <div style={{ position: "absolute", left: cx - cw / 2, top: cy - ch / 2, width: cw, height: ch, borderRadius: 30, overflow: "hidden", boxShadow: `0 0 0 7px ${C.blanco}, 0 30px 60px rgba(43,43,35,0.35)`, opacity: out * Math.min(p * 2, 1), transform: `translateZ(${190 * p}px)` }}>
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
  [322, [1450, 485, 0.9, 16, 0, 3]],
  [356, [540, 485, 0.9, 8, 0, 3]],
  [520, [540, 485, 0.9, 8, 0, 3]],
  [560, [540, 485, 0.9, 6, 0, 3]],
  [610, [540, 485, 0.9, 6, 0, 3]],
  [CTA_FROM + 6, [540, 1500, 0.9, 6, 0, 3]],
];
const SHOTS = ["m_publico.png", "m_edad.png", "m_resumen.png"];
const SHOT_SWITCH = [465, 510]; // cuadros en que cambia la captura

// Aro carbón que se dibuja sobre una captura (coordenadas de la captura de 920 x 2000)
const Ring: React.FC<{ frame: number; at: number; x: number; y: number; w: number; h: number; r?: number }> = ({ frame, at, x, y, w, h, r = 28 }) => {
  if (frame < at) return null;
  const p = easeOut(ramp(frame, at, at + 14));
  return <div style={{ position: "absolute", left: x * DASH_K - 4, top: y * DASH_K - 4, width: w * DASH_K + 8, height: h * DASH_K + 8, borderRadius: r, border: `5px solid ${C.carbon}`, opacity: p }} />;
};

// Recorte de una captura que sale del celular hacia ti
const Pop: React.FC<{ frame: number; at: number; until: number; region: [number, number, number, number]; zoom?: number }> = ({ frame, at, until, region, zoom = 0.92 }) => {
  if (frame < at || frame >= until) return null;
  const p = easeOut(ramp(frame, at, at + 20));
  const out = 1 - ramp(frame, until - 9, until);
  const [x, y, w, h] = region;
  const cw = w * zoom;
  const ch = h * zoom;
  const cx = BEZEL + (x + w / 2) * DASH_K;
  const cy = BEZEL + (y + h / 2) * DASH_K;
  return (
    <div style={{ position: "absolute", left: cx - cw / 2, top: cy - ch / 2, width: cw, height: ch, borderRadius: 30, overflow: "hidden", background: C.blanco, boxShadow: `0 0 0 7px ${C.blanco}, 0 30px 60px rgba(43,43,35,0.35)`, opacity: out * Math.min(p * 2, 1), transform: `translateZ(${150 * p}px)` }}>
      <Img src={staticFile("m_resumen.png")} style={{ position: "absolute", left: -x * zoom, top: -y * zoom, width: 920 * zoom, height: 2000 * zoom, maxWidth: "none" }} />
    </div>
  );
};

const DashPhone: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame < 320 || frame >= CTA_FROM + 8) return null;
  const idx = smooth(ramp(frame, SHOT_SWITCH[0], SHOT_SWITCH[0] + 14)) + smooth(ramp(frame, SHOT_SWITCH[1], SHOT_SWITCH[1] + 14));
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
              {i === 1 && <Ring frame={frame} at={484} x={405} y={1236} w={112} h={340} r={26} />}
            </div>
          ))}
        </>
      }
      over={
        <>
          {/* Vistas a tu negocio */}
          <Pop frame={frame} at={524} until={566} region={[46, 383, 828, 255]} />
          {/* Actividad reciente: Giselle, canjeada */}
          <Pop frame={frame} at={570} until={CTA_FROM + 4} region={[46, 1262, 828, 345]} />
        </>
      }
    />
  );
};

// ---------- Cierre (fondo blanco, el punto lima se ve) ----------
const Close: React.FC<{ frame: number }> = ({ frame }) => {
  const from = CTA_FROM - 12;
  const bg = ramp(frame, from, from + 14);
  if (frame < from) return null;
  const rise = (at: number) => easeOut(ramp(frame, at, at + 18));
  const logo = rise(from + 6);
  const line = rise(from + 16);
  const btn = rise(from + 28);
  const info = rise(from + 38);
  return (
    <div style={{ position: "absolute", inset: 0, background: C.blanco, opacity: bg }}>
      <div style={{ position: "absolute", top: 440, left: 0, width: 1080, display: "flex", justifyContent: "center", opacity: logo, transform: `translateY(${(1 - logo) * 24}px)` }}>
        <Img src={staticFile("logo_enplan.svg")} style={{ width: 560 }} />
      </div>
      <div style={{ position: "absolute", top: 700, left: 0, width: 1080, textAlign: "center", fontFamily: APOYO, fontWeight: 600, fontSize: 52, lineHeight: 1.25, color: C.carbon, opacity: line, transform: `translateY(${(1 - line) * 24}px)` }}>
        Aparece ante quienes buscan
        <br />
        <span style={{ fontFamily: TITULAR, fontWeight: 800, fontSize: 76, background: `linear-gradient(transparent 62%, ${C.lima} 62%, ${C.lima} 92%, transparent 92%)`, padding: "0 10px" }}>su siguiente plan</span>
      </div>
      <div style={{ position: "absolute", top: 1020, left: 0, width: 1080, display: "flex", justifyContent: "center", opacity: btn, transform: `translateY(${(1 - btn) * 24}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, background: C.lima, color: C.carbon, borderRadius: 80, padding: "28px 54px", fontFamily: TITULAR, fontWeight: 800, fontSize: 54 }}>
          Registra tu negocio
          <svg width={50} height={40} viewBox="0 0 52 40">
            <path d="M4 20 H44 M28 4 L46 20 L28 36" fill="none" stroke={C.carbon} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div style={{ position: "absolute", top: 1200, left: 0, width: 1080, textAlign: "center", fontFamily: APOYO, fontWeight: 600, fontSize: 50, lineHeight: 1.4, color: C.carbon, opacity: info, transform: `translateY(${(1 - info) * 24}px)` }}>
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
  const step = (n: number, from: number, to: number) => (
    <Small frame={frame} from={from} to={to} top={270} right={80} size={32}>
      <span style={{ opacity: 0.7 }}>Paso {n} de 3</span>
    </Small>
  );
  return (
    <AbsoluteFill style={{ background: C.lima }}>
      {/* Capa 1: palabras gigantes, detrás del celular */}
      <Giant frame={frame} from={10} to={76} size={180}>NEGOCIO</Giant>
      <Giant frame={frame} from={100} to={206} size={320}>LOGO</Giant>
      <Giant frame={frame} from={222} to={298} size={310} color={C.carbon} rotate={-5}>ELIGE</Giant>
      <Giant frame={frame} from={306} to={340} size={200} color={C.carbon} rotate={-5}>CANJEAN</Giant>
      <Giant frame={frame} from={356} to={418} size={168}>MÉTRICAS</Giant>
      <Giant frame={frame} from={428} to={508} size={190} color={C.carbon}>PÚBLICO</Giant>
      <Giant frame={frame} from={518} to={563} size={200}>PERFIL</Giant>
      <Giant frame={frame} from={572} to={CTA_FROM - 6} size={168}>CANJEADO</Giant>

      {/* Capa 2: celulares */}
      <DashPhone frame={frame} />
      <ClipPhone frame={frame} />

      {/* Capa 3: texto chico y etiquetas al frente */}
      <Small frame={frame} from={6} to={76}>Así se vería tu</Small>
      <Tag frame={frame} from={24} to={76} top={1318} left={60} size={120}>en enplan</Tag>

      {step(1, 92, 212)}
      <Small frame={frame} from={96} to={206}>Llena tu perfil con tu</Small>
      <Small frame={frame} from={148} to={206} top={1262} left={80} size={48}>y tus</Small>
      <Tag frame={frame} from={152} to={206} top={1318} left={60} size={128}>fotos</Tag>

      {step(2, 216, 340)}
      <Small frame={frame} from={234} to={298} top={1330} left={80} size={48}>tu</Small>
      <Tag frame={frame} from={238} to={298} top={1384} left={60} size={116}>descuento</Tag>
      <Small frame={frame} from={308} to={338}>y tus clientes lo</Small>

      {step(3, 352, CTA_FROM - 6)}
      <Small frame={frame} from={358} to={418}>Y tienes un panel de</Small>
      <Small frame={frame} from={430} to={508}>para conocer a fondo tu</Small>
      <Small frame={frame} from={520} to={563}>Quién ve tu</Small>
      <Small frame={frame} from={574} to={CTA_FROM - 6}>y quién ha</Small>
      <Small frame={frame} from={360} to={CTA_FROM - 6} top={1300} right={80} size={48}>en tu</Small>
      <Tag frame={frame} from={364} to={CTA_FROM - 6} top={1354} right={60} size={120} rotate={3}>panel</Tag>

      <Close frame={frame} />
    </AbsoluteFill>
  );
};
