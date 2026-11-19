import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { APOYO, C, ramp, SAFE, T, TITULAR, useBrandFonts, usePop } from "./brand";

// Tiempos en segundos del video ya sin silencios (public/toma.mp4)
const s = (sec: number) => Math.round(sec * 30);
const TALK_END = 1119; // 37,3 s
export const TOTAL = TALK_END + 60; // cierre de 2 s
const PHONE_FROM = s(26.28); // "aplicación"
const PHONE_TO = s(33.24); // "quién ha visto"

// Subtítulos: [palabra, segundo]; `hl` son las palabras clave
type Chunk = { words: [string, number][]; end: number; hl: number[] };
const CAPTIONS: Chunk[] = [
  { words: [["En", 0.05], ["los", 0.18], ["últimos", 0.3], ["meses", 0.56]], end: 0.9, hl: [2, 3] },
  { words: [["me", 0.9], ["clavé", 1.08], ["muchísimo", 1.36]], end: 1.74, hl: [1] },
  { words: [["con", 1.74], ["el", 2.02], ["mundo", 2.16], ["de", 2.32], ["la", 2.48]], end: 2.58, hl: [2] },
  { words: [["inteligencia", 2.58], ["artificial", 3.08]], end: 3.76, hl: [0, 1] },
  { words: [["y", 3.76], ["nada", 4.02], ["más", 4.14], ["quería", 4.32]], end: 4.48, hl: [3] },
  { words: [["construirme", 4.48], ["herramientas", 5.1]], end: 5.58, hl: [1] },
  { words: [["para", 5.58], ["mí,", 5.8], ["para", 6.16], ["mis", 6.26], ["amigos,", 6.4]], end: 6.98, hl: [4] },
  { words: [["hasta", 6.98], ["que", 7.24], ["por", 7.4], ["fin", 7.58]], end: 8.0, hl: [3] },
  { words: [["se", 8.0], ["me", 8.18], ["ocurrió", 8.28]], end: 8.7, hl: [2] },
  { words: [["desarrollar", 8.7], ["una", 9.48]], end: 9.72, hl: [0] },
  { words: [["para", 9.72], ["la", 10.08], ["ciudad", 10.82], ["de", 11.02], ["donde", 11.2], ["soy.", 11.36]], end: 11.7, hl: [2] },
  { words: [["Y", 11.7], ["estoy", 12.0], ["cansada", 12.3]], end: 12.62, hl: [2] },
  { words: [["de", 12.62], ["escuchar", 12.72], ["el", 13.08], ["típico:", 13.26]], end: 13.62, hl: [3] },
  { words: [["o", 15.06], ["que", 15.5], ["todo", 15.7], ["mundo", 15.96]], end: 16.2, hl: [3] },
  { words: [["tenga", 16.2], ["sus", 16.5], ["descuentos", 16.84]], end: 17.82, hl: [2] },
  { words: [["en", 17.82], ["lonas,", 17.98], ["en", 18.6], ["flyers,", 18.66]], end: 19.34, hl: [1, 3] },
  { words: [["que", 19.34], ["gasten", 19.94], ["un", 20.56], ["buen", 20.74]], end: 21.02, hl: [1] },
  { words: [["en", 21.02], ["Meta", 21.2], ["Ads,", 21.45]], end: 21.74, hl: [1, 2] },
  { words: [["cuando", 21.74], ["realmente", 22.08]], end: 22.62, hl: [1] },
  { words: [["no", 22.62], ["van", 22.84], ["a", 22.92], ["saber", 23.0]], end: 23.2, hl: [3] },
  { words: [["ni", 23.2], ["quién", 23.4], ["llegó", 23.54], ["a", 23.76], ["su", 23.86], ["negocio.", 23.94]], end: 24.5, hl: [1, 2] },
  { words: [["Entonces", 24.5], ["se", 25.12], ["me", 25.56], ["ocurrió", 25.68]], end: 25.94, hl: [3] },
  { words: [["hacer", 25.94], ["esta", 26.08], ["aplicación", 26.28]], end: 26.82, hl: [2] },
  { words: [["que", 26.82], ["maneja", 27.2], ["esto,", 28.22]], end: 28.9, hl: [1] },
  { words: [["y", 28.9], ["tú,", 29.0], ["desde", 29.12], ["tu", 29.36], ["negocio,", 29.56]], end: 29.86, hl: [4] },
  { words: [["vas", 29.86], ["a", 29.98], ["tener", 30.06], ["un", 30.26], ["dashboard", 30.44]], end: 30.78, hl: [4] },
  { words: [["donde", 30.78], ["vas", 31.12], ["a", 31.32], ["ver", 31.44]], end: 31.62, hl: [3] },
  { words: [["quién", 31.62], ["ha", 31.88], ["canjeado", 32.02], ["tus", 32.42], ["promos,", 32.6]], end: 33.24, hl: [2] },
  { words: [["quién", 33.24], ["ha", 33.38], ["visto", 33.68], ["tu", 33.9], ["negocio,", 34.08]], end: 34.6, hl: [2] },
  { words: [["por", 34.6], ["solo", 35.12], ["99", 35.32], ["pesos,", 35.82]], end: 36.2, hl: [2, 3] },
  { words: [["o", 36.27], ["sea,", 36.35], ["nada.", 36.72]], end: 37.4, hl: [2] },
];
const QUOTE: [string, number][] = [
  ["No", 13.7], ["hay", 14.0], ["nada", 14.1], ["que", 14.22], ["hacer", 14.4], ["aquí", 14.58],
];

// Subtítulos: Work Sans en caja arena; la palabra clave en Montserrat 800 con subrayado lima
const Captions: React.FC<{ frame: number }> = ({ frame }) => {
  const t = frame / 30;
  const c = CAPTIONS.find((x) => t >= x.words[0][1] && t < x.end);
  if (!c || frame >= TALK_END) return null;
  return (
    <div style={{ position: "absolute", top: 1170, left: SAFE.left, width: SAFE.right - SAFE.left, display: "flex", justifyContent: "center" }}>
      <div style={{ background: C.arena, borderRadius: 40, padding: "14px 34px 18px", fontFamily: APOYO, fontWeight: 600, fontSize: 50, color: C.carbon, textAlign: "center", lineHeight: 1.2 }}>
        {c.words.map(([w, at], i) => {
          const key = c.hl.includes(i);
          const line = ramp(frame, s(at), s(at) + 9);
          return (
            <span
              key={i}
              style={{
                position: "relative",
                display: "inline-block",
                marginRight: i < c.words.length - 1 ? "0.28em" : 0,
                opacity: t >= at - 0.05 ? 1 : 0,
                fontFamily: key ? TITULAR : APOYO,
                fontWeight: key ? 800 : 600,
              }}
            >
              {key && (
                <span
                  style={{
                    position: "absolute",
                    left: -2,
                    right: -2,
                    bottom: 4,
                    height: 14,
                    borderRadius: 7,
                    background: C.lima,
                    transform: `scaleX(${line})`,
                    transformOrigin: "left",
                  }}
                />
              )}
              <span style={{ position: "relative" }}>{w}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

// Tarjeta blanca con borde carbón, debajo de los subtítulos
const ZONE = { left: 100, top: 1300, width: 880, height: 220 };
const Card: React.FC<{ frame: number; from: number; to: number; bg?: string; children: React.ReactNode }> = ({ frame, from, to, bg = C.blanco, children }) => {
  const p = usePop(from, 14);
  if (frame < from || frame >= to) return null;
  const out = 1 - ramp(frame, to - T, to);
  return (
    <div
      style={{
        position: "absolute",
        ...ZONE,
        background: bg,
        border: `5px solid ${C.carbon}`,
        borderRadius: 40,
        boxShadow: `12px 12px 0 ${C.carbon}`,
        boxSizing: "border-box",
        overflow: "hidden",
        opacity: Math.min(p * 2, 1) * out,
        transform: `translateY(${(1 - p) * 60}px) scale(${0.9 + 0.1 * out})`,
      }}
    >
      {children}
    </div>
  );
};

const Pop: React.FC<{ frame: number; at: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ frame, at, style, children }) => {
  const p = usePop(s(at), 11);
  if (frame < s(at)) return null;
  return <div style={{ ...style, transform: `${style?.transform ?? ""} scale(${p})`, opacity: Math.min(p * 2, 1) }}>{children}</div>;
};

const pill = (bg: string): React.CSSProperties => ({
  background: bg,
  border: `4px solid ${C.carbon}`,
  borderRadius: 40,
  padding: "10px 28px",
  fontFamily: TITULAR,
  fontWeight: 800,
  fontSize: 40,
  color: C.carbon,
  whiteSpace: "nowrap",
});

// 2,5 a 4,4 s: inteligencia artificial
const IACard: React.FC<{ frame: number }> = ({ frame }) => (
  <Card frame={frame} from={s(2.5)} to={s(4.45)}>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
      <Pop frame={frame} at={2.58} style={{ width: 130, height: 130, borderRadius: 65, background: C.lima, border: `5px solid ${C.carbon}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TITULAR, fontWeight: 800, fontSize: 56, color: C.carbon, boxSizing: "border-box" }}>
        IA
      </Pop>
      <Pop frame={frame} at={3.08} style={{ fontFamily: TITULAR, fontWeight: 800, fontSize: 48, color: C.carbon, lineHeight: 1.1 }}>
        Inteligencia
        <br />
        artificial
      </Pop>
    </div>
  </Card>
);

// 4,45 a 10,7 s: herramientas para mí, para mis amigos y para mi ciudad
const Tile: React.FC<{ label: string; lima?: boolean }> = ({ label, lima }) => (
  <div style={{ width: 250, height: 150, borderRadius: 28, border: `4px solid ${C.carbon}`, background: lima ? C.lima : C.arena, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 18, boxSizing: "border-box" }}>
    <div style={{ display: "flex", gap: 8 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ width: 26, height: 26, borderRadius: 8, background: i === 0 ? C.carbon : lima ? C.blanco : C.arenaOscuro }} />
      ))}
    </div>
    <div style={{ fontFamily: TITULAR, fontWeight: 800, fontSize: 30, color: C.carbon, lineHeight: 1.1 }}>{label}</div>
  </div>
);
const ToolsCard: React.FC<{ frame: number }> = ({ frame }) => (
  <Card frame={frame} from={s(5.7)} to={s(10.75)}>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
      <Pop frame={frame} at={5.78}>
        <Tile label="Para mí" />
      </Pop>
      <Pop frame={frame} at={6.4}>
        <Tile label="Para mis amigos" />
      </Pop>
      <Pop frame={frame} at={8.7}>
        <Tile label="Para mi ciudad" lima />
      </Pop>
    </div>
  </Card>
);

// 10,75 a 12,3 s: Aguascalientes
const Location: React.FC<{ frame: number }> = ({ frame }) => {
  const from = s(10.82);
  const to = s(12.3);
  const p = usePop(from, 9);
  if (frame < from || frame >= to) return null;
  const out = 1 - ramp(frame, to - T, to);
  return (
    <div style={{ position: "absolute", top: ZONE.top + 50, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: C.blanco,
          border: `5px solid ${C.carbon}`,
          borderRadius: 70,
          boxShadow: `12px 12px 0 ${C.carbon}`,
          padding: "20px 44px",
          fontFamily: APOYO,
          fontWeight: 600,
          fontSize: 60,
          color: C.carbon,
          transform: `translateY(${(1 - p) * -160}px)`,
          opacity: Math.min(p * 2, 1) * out,
        }}
      >
        <svg width={48} height={60} viewBox="0 0 40 50">
          <path d="M20 3C10.6 3 4 10 4 18.5 4 30 20 47 20 47S36 30 36 18.5C36 10 29.4 3 20 3Z" fill="none" stroke={C.carbon} strokeWidth={5} />
          <circle cx={20} cy={18.5} r={6} fill={C.lima} stroke={C.carbon} strokeWidth={3} />
        </svg>
        Aguascalientes
      </div>
    </div>
  );
};

// 13,6 a 15,45 s: la queja como cita
const Quote: React.FC<{ frame: number }> = ({ frame }) => {
  const from = s(13.6);
  const to = s(15.45);
  const p = usePop(from, 12);
  if (frame < from || frame >= to) return null;
  const out = 1 - ramp(frame, to - T, to);
  const t = frame / 30;
  return (
    <div style={{ position: "absolute", top: 1200, left: 0, width: 1080, display: "flex", justifyContent: "center", opacity: Math.min(p * 2, 1) * out, transform: `scale(${0.85 + 0.15 * p})` }}>
      <div style={{ position: "relative", background: C.blanco, border: `5px solid ${C.carbon}`, borderRadius: 48, padding: "36px 50px 40px", boxShadow: `14px 14px 0 ${C.carbon}`, maxWidth: 860 }}>
        <svg width={70} height={46} viewBox="0 0 70 46" style={{ position: "absolute", top: -44, left: "calc(50% - 35px)" }}>
          <path d="M4 46 L35 4 L66 46" fill={C.blanco} stroke={C.carbon} strokeWidth={5} strokeLinejoin="round" />
        </svg>
        <div style={{ position: "absolute", top: -34, left: -26, width: 76, height: 76, borderRadius: 38, background: C.lima, border: `5px solid ${C.carbon}`, fontFamily: TITULAR, fontWeight: 800, fontSize: 72, lineHeight: "96px", textAlign: "center", color: C.carbon }}>“</div>
        <div style={{ fontFamily: TITULAR, fontWeight: 800, fontSize: 66, lineHeight: 1.15, color: C.carbon, textAlign: "center" }}>
          {QUOTE.map(([w, at], i) => (
            <span key={i} style={{ display: "inline-block", marginRight: i < QUOTE.length - 1 ? "0.26em" : 0, opacity: t >= at - 0.05 ? 1 : 0 }}>
              {w}
            </span>
          ))}
          <span style={{ opacity: t >= 14.58 ? 1 : 0 }}>”</span>
        </div>
      </div>
    </div>
  );
};

// 15,5 a 21,74 s: lonas, flyers y Meta Ads, cada uno cuesta
const Coin: React.FC = () => (
  <svg width={56} height={56} viewBox="-28 -28 56 56">
    <circle r={24} fill={C.lima} stroke={C.carbon} strokeWidth={4} />
    <text y={11} textAnchor="middle" fontFamily={TITULAR} fontWeight={800} fontSize={32} fill={C.carbon}>
      $
    </text>
  </svg>
);
const SpendCard: React.FC<{ frame: number }> = ({ frame }) => {
  const items: [string, number][] = [
    ["Lonas", 17.98],
    ["Flyers", 18.66],
    ["Meta Ads", 21.2],
  ];
  return (
    <Card frame={frame} from={s(16.84)} to={s(21.74) + 9}>
      <div style={{ position: "absolute", left: 30, top: 22, fontFamily: APOYO, fontWeight: 600, fontSize: 34, color: C.carbon }}>Tus descuentos en…</div>
      <div style={{ position: "absolute", left: 30, right: 30, top: 86, display: "flex", justifyContent: "space-between" }}>
        {items.map(([name, at]) => (
          <Pop key={name} frame={frame} at={at} style={{ display: "flex", alignItems: "center", gap: 10, background: C.arena, border: `4px solid ${C.carbon}`, borderRadius: 30, padding: "10px 18px 10px 12px" }}>
            <Coin />
            <span style={{ fontFamily: TITULAR, fontWeight: 800, fontSize: 36, color: C.carbon }}>{name}</span>
          </Pop>
        ))}
      </div>
    </Card>
  );
};

// 21,74 a 24,45 s: no saben quién llegó
const Person: React.FC<{ q: number }> = ({ q }) => (
  <svg width={110} height={150} viewBox="0 0 110 150">
    <circle cx={55} cy={74} r={22} fill={C.carbon} />
    <path d="M17 148 Q17 104 55 104 Q93 104 93 148 Z" fill={C.carbon} />
    <g transform={`translate(55 28) scale(${q})`}>
      <circle r={24} fill={C.lima} stroke={C.carbon} strokeWidth={4} />
      <text y={11} textAnchor="middle" fontFamily={TITULAR} fontWeight={800} fontSize={32} fill={C.carbon}>
        ?
      </text>
    </g>
  </svg>
);
const WhoCard: React.FC<{ frame: number }> = ({ frame }) => {
  const q = [usePop(s(23.4), 9), usePop(s(23.48), 9), usePop(s(23.56), 9)];
  return (
    <Card frame={frame} from={s(21.78)} to={s(24.45)}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 26 }}>
        <Img src={staticFile("brand/icons/tiendas.webp")} style={{ width: 170, height: 170, objectFit: "contain" }} />
        {q.map((k, i) => (
          <Person key={i} q={k} />
        ))}
      </div>
    </Card>
  );
};

// 24,5 a 26,28 s: el logo antes de la app
const LogoCard: React.FC<{ frame: number }> = ({ frame }) => (
  <Card frame={frame} from={s(24.5)} to={PHONE_FROM + 4} bg={C.arena}>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Pop frame={frame} at={24.6}>
        <Img src={staticFile("brand/logo/enplan_logo_carbon_sobre_arena.svg")} style={{ width: 460 }} />
      </Pop>
    </div>
  </Card>
);

// Celular con el canje real
const BEZEL = 18;
const PH = 600;
const SW = Math.round((PH - BEZEL * 2) * (1080 / 1920));
const PW = SW + BEZEL * 2;
const PL = Math.round((1080 - PW) / 2);
const PT = 1300;
const Phone: React.FC<{ frame: number }> = ({ frame }) => {
  const enter = usePop(PHONE_FROM, 13);
  if (frame < PHONE_FROM || frame >= PHONE_TO + T) return null;
  const out = 1 - ramp(frame, PHONE_TO, PHONE_TO + T);
  return (
    <div style={{ position: "absolute", left: PL, top: PT + (1 - enter) * 700, width: PW, height: PH, background: C.carbon, borderRadius: 56, boxShadow: `14px 14px 0 ${C.arenaOscuro}`, opacity: out }}>
      <div style={{ position: "absolute", left: BEZEL, top: BEZEL, width: SW, height: PH - BEZEL * 2, borderRadius: 40, overflow: "hidden", background: C.arena }}>
        <Sequence from={PHONE_FROM} layout="none">
          <OffthreadVideo src={staticFile("canje.mp4")} muted style={{ width: SW, height: PH - BEZEL * 2 }} />
        </Sequence>
      </div>
      <div style={{ position: "absolute", top: BEZEL + 10, left: PW / 2 - 40, width: 80, height: 18, borderRadius: 9, background: C.carbon }} />
    </div>
  );
};

// "Muestra al negocio" sale del celular en 3D cuando dices "canjeado"
const RedeemCallout: React.FC<{ frame: number }> = ({ frame }) => {
  const from = s(32.02);
  const to = PHONE_TO + 6;
  const p = usePop(from, 14);
  if (frame < from || frame >= to) return null;
  const out = 1 - ramp(frame, to - T, to);
  const [x, y, w, h] = [50, 830, 980, 395];
  const sc = 0.8;
  const k = SW / 1080;
  const sx = PL + BEZEL + (x + w / 2) * k;
  const sy = PT + BEZEL + (y + h / 2) * k;
  const cx = 540;
  const cy = 1430;
  const s0 = k / sc;
  return (
    <div
      style={{
        position: "absolute",
        left: sx + (cx - sx) * p - (w * sc) / 2,
        top: sy + (cy - sy) * p - (h * sc) / 2,
        width: w * sc,
        height: h * sc,
        transform: `perspective(1600px) rotateY(${-12 * p + Math.sin((frame - from) / 14) * 2.5}deg) rotateX(${6 * p}deg) scale(${(s0 + (1 - s0) * p) * (0.9 + 0.1 * out)})`,
        opacity: Math.min(p * 2, 1) * out,
      }}
    >
      <div style={{ position: "absolute", inset: 0, borderRadius: 36, border: `7px solid ${C.lima}`, background: C.blanco, overflow: "hidden", boxShadow: `20px 20px 0 ${C.carbon}` }}>
        <Sequence from={PHONE_FROM} layout="none">
          <OffthreadVideo src={staticFile("canje.mp4")} muted style={{ position: "absolute", left: -x * sc - 7, top: -y * sc - 7, width: 1080 * sc, height: 1920 * sc, maxWidth: "none" }} />
        </Sequence>
      </div>
    </div>
  );
};

// 33,24 s al final: el plan Básico real, con sus números y su precio
const BasicCard: React.FC<{ frame: number }> = ({ frame }) => {
  const from = PHONE_TO;
  const p = usePop(from, 14);
  const line = ramp(frame, s(33.68), s(33.68) + 12);
  const ring = usePop(s(35.32), 9);
  if (frame < from || frame >= TALK_END) return null;
  const out = 1 - ramp(frame, TALK_END - T, TALK_END);
  const sc = 0.6;
  const w = 960 * sc;
  const h = 880 * sc;
  return (
    <div
      style={{
        position: "absolute",
        left: 540 - w / 2,
        top: 1290,
        width: w,
        height: h,
        transform: `perspective(1600px) rotateY(${12 * p + Math.sin((frame - from) / 14) * 2}deg) rotateX(${5 * p}deg) translateY(${(1 - p) * 500}px)`,
        opacity: Math.min(p * 2, 1) * out,
      }}
    >
      <div style={{ position: "absolute", inset: 0, borderRadius: 36, border: `7px solid ${C.lima}`, overflow: "hidden", boxShadow: `20px 20px 0 ${C.carbon}`, background: C.blanco }}>
        <Img src={staticFile("basico.png")} style={{ position: "absolute", left: -7, top: -7, width: 960 * sc, height: 880 * sc }} />
        {/* Subrayado lima bajo "Tus primeros números: visitas y canjes" */}
        <div style={{ position: "absolute", left: 136 * sc - 7, top: 560 * sc - 7, width: 720 * sc, height: 10, borderRadius: 5, background: C.lima, transform: `scaleX(${line})`, transformOrigin: "left" }} />
      </div>
      {/* Aro lima alrededor de "$99" */}
      {frame >= s(35.32) && (
        <div style={{ position: "absolute", left: 60 * sc - 7, top: 160 * sc - 7, width: 190 * sc, height: 120 * sc, borderRadius: 60, border: `7px solid ${C.lima}`, transform: `scale(${ring})` }} />
      )}
    </div>
  );
};

const Circles: React.FC<{ frame: number }> = ({ frame }) => {
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
        <div key={i} style={{ position: "absolute", left: x - r, top: y - r + f(p), width: r * 2, height: r * 2, borderRadius: r, background: C.lima }} />
      ))}
    </>
  );
};

// Cierre: logo, botón, sitio y cuenta
const Close: React.FC<{ frame: number }> = ({ frame }) => {
  const from = TALK_END - T;
  const bg = ramp(frame, from, from + T);
  const logo = usePop(from + 3, 12);
  const btn = usePop(from + 10, 10);
  const info = usePop(from + 16, 14);
  if (frame < from) return null;
  return (
    <div style={{ position: "absolute", inset: 0, background: C.arena, opacity: bg }}>
      <Circles frame={frame} />
      <div style={{ position: "absolute", top: 640, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
        <Img src={staticFile("brand/logo/enplan_logo_carbon_sobre_arena.svg")} style={{ width: 600, transform: `scale(${0.7 + 0.3 * logo})`, opacity: Math.min(logo * 1.5, 1) }} />
      </div>
      <div style={{ position: "absolute", top: 930, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, background: C.lima, color: C.carbon, borderRadius: 80, padding: "28px 54px", fontFamily: TITULAR, fontWeight: 800, fontSize: 54, transform: `scale(${btn * (1 + 0.025 * Math.sin((frame - from) / 5))})` }}>
          Registra tu negocio
          <svg width={50} height={40} viewBox="0 0 52 40">
            <path d="M4 20 H44 M28 4 L46 20 L28 36" fill="none" stroke={C.carbon} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div style={{ position: "absolute", top: 1120, left: 0, width: 1080, textAlign: "center", fontFamily: APOYO, fontWeight: 600, fontSize: 50, lineHeight: 1.4, color: C.carbon, opacity: info, transform: `translateY(${(1 - info) * 30}px)` }}>
        enplan.app
        <br />
        @enplan.ags
      </div>
    </div>
  );
};

export const EnplanNegocio: React.FC = () => {
  useBrandFonts();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.arena }}>
      {frame < TALK_END + T && <OffthreadVideo src={staticFile("toma.mp4")} endAt={TALK_END} />}
      <Captions frame={frame} />
      <IACard frame={frame} />
      <ToolsCard frame={frame} />
      <Location frame={frame} />
      <Quote frame={frame} />
      <SpendCard frame={frame} />
      <WhoCard frame={frame} />
      <LogoCard frame={frame} />
      <Phone frame={frame} />
      <RedeemCallout frame={frame} />
      <BasicCard frame={frame} />
      <Close frame={frame} />
    </AbsoluteFill>
  );
};

