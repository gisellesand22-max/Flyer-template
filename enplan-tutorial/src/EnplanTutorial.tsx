import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { APOYO, C, ramp, T, TITULAR, useBrandFonts, usePop } from "./brand";

// Escenas en cuadros (30 fps). Los textos son los del carrusel.
const HOOK = 0;
const S1 = 150;
const S2 = 285;
const S3 = 465;
const POLL = 630;
const CLOSE = 720;
export const TOTAL = 780;

// Piezas recortadas de las láminas del carrusel: [lámina, x, y, ancho, alto] en 1024 x 1280
type Crop = [number, number, number, number, number];
const PILL: Crop = [1, 68, 162, 264, 54];
const PHONE1: Crop = [1, 510, 444, 470, 836];
const PHONE_L: Crop = [2, 82, 550, 378, 656];
const PHONE_R: Crop = [2, 556, 532, 364, 652];
const MENU: Crop = [3, 52, 652, 450, 324];
const DIALOG: Crop = [3, 514, 640, 474, 440];
const ICON: Crop = [3, 88, 1006, 174, 190];

const Piece: React.FC<{ crop: Crop; scale: number; style?: React.CSSProperties; radius?: number }> = ({ crop, scale, style, radius = 0 }) => {
  const [n, x, y, w, h] = crop;
  return (
    <div style={{ position: "absolute", width: w * scale, height: h * scale, overflow: "hidden", borderRadius: radius, ...style }}>
      <Img src={staticFile(`laminas/lamina${n}.png`)} style={{ position: "absolute", left: -x * scale, top: -y * scale, width: 1024 * scale, height: 1280 * scale, maxWidth: "none" }} />
    </div>
  );
};

// Toque: un dedo llega al botón, punto lima y onda que se abre
const Tap: React.FC<{ frame: number; at: number; x: number; y: number }> = ({ frame, at, x, y }) => {
  if (frame < at - 16 || frame > at + 18) return null;
  const pre = ramp(frame, at - 8, at);
  const k = ramp(frame, at, at + 18);
  const r = 26 + 60 * k;
  const move = interpolate(frame, [at - 16, at - 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (v) => 1 - (1 - v) ** 3 });
  const press = frame >= at && frame < at + 5 ? 0.85 : 1;
  return (
    <>
      <svg
        width={78}
        height={98}
        viewBox="0 0 50 64"
        style={{ position: "absolute", left: x - 6 + (1 - move) * 160, top: y - 4 + (1 - move) * 200, transform: `scale(${press})`, opacity: frame > at + 10 ? 1 - k : 1, zIndex: 5 }}
      >
        <path d="M4 4 L4 50 L16 39 L25 58 L34 54 L25 35 L42 35 Z" fill={C.blanco} stroke={C.carbon} strokeWidth={4} strokeLinejoin="round" />
      </svg>
      <div style={{ position: "absolute", left: x - 28, top: y - 28, width: 56, height: 56, borderRadius: 28, background: C.lima, border: `5px solid ${C.carbon}`, boxSizing: "border-box", opacity: frame < at ? pre : 1 - k, transform: `scale(${frame < at ? 0.7 + 0.3 * pre : 0.85})` }} />
      {frame >= at && <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, border: `7px solid ${C.lima}`, opacity: 1 - k }} />}
    </>
  );
};

// Escena que entra deslizando desde la derecha y sale hacia la izquierda, como el carrusel
const Slide: React.FC<{ frame: number; from: number; to: number; children: React.ReactNode }> = ({ frame, from, to, children }) => {
  if (frame < from || frame >= to) return null;
  const inK = interpolate(frame, [from, from + T + 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (x) => 1 - (1 - x) ** 3 });
  const outK = ramp(frame, to - T, to);
  const first = from === HOOK;
  return (
    <AbsoluteFill style={{ transform: `translateX(${(first ? 0 : (1 - inK) * 500) - outK * 500}px)`, opacity: (first ? 1 : inK) * (1 - outK) }}>
      {children}
    </AbsoluteFill>
  );
};

// Texto karaoke con partes en negritas: [texto, negrita]. Se escribe palabra por palabra
// (unas 4 palabras por segundo) y la palabra actual salta a una píldora lima.
type Rich = [string, boolean][];
const PER_WORD = 7;
const RichText: React.FC<{ parts: Rich; size: number; start: number; frame: number; style?: React.CSSProperties }> = ({ parts, size, start, frame, style }) => {
  const words: { w: string; b: boolean }[] = [];
  for (const [t, b] of parts)
    for (const w of t.trim().split(/\s+/)) {
      // Una coma o paréntesis de cierre se pega a la palabra anterior
      if (/^[,.;:)]/.test(w) && words.length) words[words.length - 1].w += w;
      else words.push({ w, b });
    }
  const shown = Math.max(0, Math.min(words.length, Math.floor((frame - start) / PER_WORD) + 1));
  const done = frame - start >= words.length * PER_WORD + 6;
  return (
    <div style={{ fontFamily: APOYO, fontWeight: 600, fontSize: size, lineHeight: 1.3, color: C.carbon, ...style }}>
      {frame >= start &&
        words.slice(0, shown).map(({ w, b }, i) => {
          const on = i === shown - 1 && !done;
          const k = ramp(frame, start + i * PER_WORD, start + i * PER_WORD + 5);
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: "0.26em",
                fontFamily: b ? TITULAR : APOYO,
                fontWeight: b ? 800 : 600,
                transform: `scale(${0.7 + 0.3 * k}) rotate(${on ? -3 : 0}deg)`,
                background: on ? C.lima : "transparent",
                borderRadius: 14,
                boxShadow: on ? `0 0 0 8px ${C.lima}` : "none",
              }}
            >
              {w}
            </span>
          );
        })}
    </div>
  );
};

// Palabra gigante lima con contorno carbón, en cada toque
const Slam: React.FC<{ frame: number; at: number; dur?: number; text: string; size?: number; y?: number }> = ({ frame, at, dur = 22, text, size = 150, y = 1060 }) => {
  if (frame < at || frame >= at + dur) return null;
  const p = interpolate(frame, [at, at + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (v) => 1 - (1 - v) ** 3 });
  const out = 1 - ramp(frame, at + dur - 5, at + dur);
  return (
    <div style={{ position: "absolute", left: 0, top: y, width: 1080, textAlign: "center", zIndex: 10, opacity: out }}>
      <span
        style={{
          display: "inline-block",
          fontFamily: TITULAR,
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1,
          color: C.lima,
          WebkitTextStroke: `14px ${C.carbon}`,
          paintOrder: "stroke fill",
          textShadow: `12px 12px 0 ${C.carbon}`,
          transform: `rotate(-4deg) scale(${1.7 - 0.7 * p})`,
          opacity: Math.min(p * 2, 1),
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Confeti de círculos lima y lila
const Confetti: React.FC<{ frame: number; at: number; x: number; y: number }> = ({ frame, at, x, y }) => {
  if (frame < at || frame > at + 30) return null;
  const k = ramp(frame, at, at + 30);
  return (
    <>
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const r = 60 + 330 * k;
        const size = (i % 3 === 0 ? 34 : 22) * (1 - 0.5 * k);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + Math.cos(a) * r - size / 2,
              top: y + Math.sin(a) * r * 0.8 + 160 * k * k - size / 2,
              width: size,
              height: size,
              borderRadius: size,
              background: i % 4 === 0 ? C.lila : C.lima,
              border: `3px solid ${C.carbon}`,
              opacity: 1 - k * 0.6,
              zIndex: 9,
            }}
          />
        );
      })}
    </>
  );
};

// Titular con resaltado lima que se dibuja de izquierda a derecha
const Highlight: React.FC<{ k: number; children: React.ReactNode }> = ({ k, children }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <span style={{ position: "absolute", left: -6, right: -6, bottom: "6%", height: "46%", background: C.lima, transform: `scaleX(${k})`, transformOrigin: "left" }} />
    <span style={{ position: "relative" }}>{children}</span>
  </span>
);

const Badge: React.FC<{ n: number; k: number }> = ({ n, k }) => (
  <div style={{ flex: "none", width: 112, height: 112, borderRadius: 56, background: C.lima, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TITULAR, fontWeight: 800, fontSize: 60, color: C.carbon, transform: `scale(${k})` }}>{n}</div>
);

// Encabezado fijo: logo y avance de pasos
const Header: React.FC<{ frame: number }> = ({ frame }) => {
  const step = frame >= S3 ? 3 : frame >= S2 ? 2 : frame >= S1 ? 1 : 0;
  if (frame >= CLOSE) return null;
  return (
    <>
      <Img src={staticFile("brand/logo/enplan_logo_carbon_sobre_arena.svg")} style={{ position: "absolute", left: 66, top: 236, width: 280 }} />
      <div style={{ position: "absolute", right: 80, top: 262, display: "flex", alignItems: "center", gap: 14 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ width: i === step ? 64 : 20, height: 20, borderRadius: 10, background: i === step ? C.carbon : C.arenaOscuro }} />
        ))}
        <div style={{ marginLeft: 10, background: C.carbon, color: C.blanco, borderRadius: 40, padding: "10px 26px", fontFamily: TITULAR, fontWeight: 800, fontSize: 34 }}>
          {step === 0 ? "3 pasos" : `Paso ${step}`}
        </div>
      </div>
    </>
  );
};

const Hook: React.FC<{ frame: number }> = ({ frame }) => {
  const pill = usePop(HOOK + 4, 12);
  const l1 = usePop(HOOK + 10, 14);
  const l2 = usePop(HOOK + 18, 14);
  const hl = ramp(frame, HOOK + 22, HOOK + 36);
  const sub = usePop(HOOK + 34, 14);
  const phone = usePop(HOOK + 26, 15);
  return (
    <Slide frame={frame} from={HOOK} to={S1}>
      <div style={{ position: "absolute", left: 80, top: 390, transform: `scale(${pill})`, transformOrigin: "left center" }}>
        <Piece crop={PILL} scale={1.25} style={{ position: "relative" }} />
      </div>
      <div style={{ position: "absolute", left: 80, top: 480, fontFamily: TITULAR, fontWeight: 800, fontSize: 112, lineHeight: 1.04, color: C.carbon }}>
        <div style={{ opacity: l1, transform: `translateY(${(1 - l1) * 40}px)` }}>
          Lleva <Highlight k={hl}>enplan.</Highlight>
        </div>
        <div style={{ opacity: l2, transform: `translateY(${(1 - l2) * 40}px)` }}>en tu iPhone</div>
      </div>
      <RichText
        parts={[["Sin descargar nada de la App Store. En 3 pasos la tienes como app.", false]]}
        size={46}
        start={HOOK + 34}
        frame={frame}
        style={{ position: "absolute", left: 80, top: 740, width: 860, opacity: sub }}
      />
      <div style={{ position: "absolute", left: 470, top: 930 + (1 - phone) * 600, transform: "rotate(4deg)" }}>
        <Piece crop={PHONE1} scale={1.15} style={{ position: "relative" }} />
      </div>
    </Slide>
  );
};

const Step1: React.FC<{ frame: number }> = ({ frame }) => {
  const b = usePop(S1 + 6, 10);
  const txt = usePop(S1 + 10, 14);
  const ph = usePop(S1 + 14, 14);
  const cam = useCamera(frame);
  const sc = 1.18;
  const left = 540 - (PHONE1[3] * sc) / 2;
  const top = 640;
  return (
    <Slide frame={frame} from={S1} to={S2}>
      <div style={{ position: "absolute", left: 80, top: 390, width: 920, display: "flex", gap: 28, alignItems: "flex-start" }}>
        <Badge n={1} k={b} />
        <RichText
          parts={[
            ["Entra a ", false],
            ["enplan.app", true],
            [" desde Safari y toca ", false],
            ["Ver promociones", true],
          ]}
          size={52}
          start={S1 + 10}
          frame={frame}
          style={{ opacity: txt }}
        />
      </div>
      <div style={{ position: "absolute", left, top: top + (1 - ph) * 500, transform: `rotate(${-3 * ph}deg) scale(${cam.z})`, transformOrigin: `${cam.x - left}px 0px` }}>
        <Piece crop={PHONE1} scale={sc} style={{ position: "relative" }} />
        <Tap frame={frame} at={S1 + 62} x={214 * sc} y={798 * sc} />
        <Tap frame={frame} at={S1 + 104} x={224 * sc} y={590 * sc} />
      </div>
    </Slide>
  );
};

const Step2: React.FC<{ frame: number }> = ({ frame }) => {
  const STEP_START = S2 + 16;
  const cam = useCamera(frame);
  const h1 = usePop(S2 + 4, 14);
  const hl = ramp(frame, S2 + 14, S2 + 26);
  const b = usePop(S2 + 12, 10);
  const txt = usePop(S2 + 16, 14);
  const pl = usePop(S2 + 14, 14);
  const pr = usePop(S2 + 116, 13);
  const sc = 1.35;
  const shift = ramp(frame, S2 + 110, S2 + 124);
  return (
    <Slide frame={frame} from={S2} to={S3}>
      <div style={{ position: "absolute", left: 80, top: 370, fontFamily: TITULAR, fontWeight: 800, fontSize: 96, lineHeight: 1.04, color: C.carbon, opacity: h1, transform: `translateY(${(1 - h1) * 40}px)` }}>
        Toca <Highlight k={hl}>•••</Highlight>
        <br />y Compartir
      </div>
      <div style={{ position: "absolute", left: 80, top: 600, width: 920, display: "flex", gap: 26, alignItems: "flex-start" }}>
        <Badge n={2} k={b} />
        <RichText
          parts={[
            ["Abajo a la derecha toca los ", false],
            ["tres puntitos", true],
            [", después ", false],
            ["Compartir", true],
            [" (Share)", false],
          ]}
          size={44}
          start={STEP_START}
          frame={frame}
          style={{ opacity: txt }}
        />
      </div>
      <div style={{ position: "absolute", left: 285 - 225 * shift, top: 790 + (1 - pl) * 500, transform: `rotate(${-3 * pl}deg) scale(${cam.z})`, transformOrigin: `${cam.x - (285 - 225 * shift)}px 0px` }}>
        <Piece crop={PHONE_L} scale={sc} style={{ position: "relative" }} />
        <Tap frame={frame} at={S2 + 92} x={320 * sc} y={584 * sc} />
      </div>
      {frame >= S2 + 116 && (
        <div style={{ position: "absolute", left: 500 + (1 - pr) * 500, top: 770, transform: `rotate(${3 * pr}deg) scale(${cam.z})`, transformOrigin: `${cam.x - 500}px 0px`, opacity: Math.min(pr * 2, 1) }}>
          <Piece crop={PHONE_R} scale={sc} style={{ position: "relative" }} />
          <Tap frame={frame} at={S2 + 150} x={220 * sc} y={328 * sc} />
        </div>
      )}
    </Slide>
  );
};

const Step3: React.FC<{ frame: number }> = ({ frame }) => {
  const STEP_START = S3 + 16;
  const cam = useCamera(frame);
  const h1 = usePop(S3 + 4, 14);
  const hl = ramp(frame, S3 + 16, S3 + 28);
  const b = usePop(S3 + 12, 10);
  const txt = usePop(S3 + 16, 14);
  const menu = usePop(S3 + 30, 13);
  const dlg = usePop(S3 + 96, 13);
  const icon = usePop(S3 + 140, 12);
  const done = usePop(S3 + 148, 14);
  const back = ramp(frame, S3 + 94, S3 + 106);
  const fly = ramp(frame, S3 + 136, S3 + 154);
  return (
    <Slide frame={frame} from={S3} to={POLL}>
      <div style={{ position: "absolute", left: 80, top: 370, fontFamily: TITULAR, fontWeight: 800, fontSize: 92, lineHeight: 1.04, color: C.carbon, opacity: h1, transform: `translateY(${(1 - h1) * 40}px)` }}>
        Agrégala a tu
        <br />
        inicio y <Highlight k={hl}>¡listo!</Highlight>
      </div>
      <div style={{ position: "absolute", left: 80, top: 600, width: 920, display: "flex", gap: 26, alignItems: "flex-start" }}>
        <Badge n={3} k={b} />
        <RichText
          parts={[
            ["Baja y toca ", false],
            ["Agregar a inicio", true],
            [" (Add to Home Screen), luego ", false],
            ["Agregar", true],
          ]}
          size={44}
          start={STEP_START}
          frame={frame}
          style={{ opacity: txt }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 800 + (1 - menu) * 500,
          transform: `perspective(1600px) rotateY(${12 * menu}deg) scale(${(1 - 0.12 * back) * cam.z})`,
          transformOrigin: cam.z > 1 ? `${cam.x - 80}px 0px` : "left top",
          opacity: (1 - 0.5 * back) * (1 - fly),
        }}
      >
        <Piece crop={MENU} scale={1.5} radius={30} style={{ position: "relative" }} />
        <Tap frame={frame} at={S3 + 72} x={230 * 1.5} y={278 * 1.5} />
      </div>
      {frame >= S3 + 96 && (
        <div style={{ position: "absolute", left: 300, top: 880 + (1 - dlg) * 400, transform: `perspective(1600px) rotateY(${-10 * dlg}deg) scale(${cam.z})`, opacity: Math.min(dlg * 2, 1) * (1 - fly), transformOrigin: cam.z > 1 ? `${cam.x - 300}px 0px` : "center" }}>
          <Piece crop={DIALOG} scale={1.5} radius={30} style={{ position: "relative" }} />
          <Tap frame={frame} at={S3 + 124} x={412 * 1.5} y={76 * 1.5} />
        </div>
      )}
      {frame >= S3 + 136 && (
        <>
          <div style={{ position: "absolute", left: 560 - 400 * fly, top: 1000 + 120 * fly, transform: `rotate(${-8 * fly}deg) scale(${icon * 1.5})`, transformOrigin: "left top" }}>
            <Piece crop={ICON} scale={1} radius={30} style={{ position: "relative" }} />
          </div>
          <div style={{ position: "absolute", left: 470, top: 1150, width: 530, fontFamily: TITULAR, fontWeight: 800, fontSize: 50, lineHeight: 1.15, color: C.carbon, opacity: done, transform: `translateY(${(1 - done) * 30}px)` }}>
            Ya está en tu pantalla de inicio como app{" "}
            <span style={{ display: "inline-block", width: 52, height: 52, borderRadius: 14, background: C.lima, verticalAlign: "middle", position: "relative" }}>
              <span style={{ position: "absolute", left: 17, top: 17, width: 18, height: 18, borderRadius: 9, background: C.carbon }} />
            </span>
          </div>
        </>
      )}
    </Slide>
  );
};

// Encuesta final para invitar a comentar (texto nuevo, no está en el carrusel)
const Poll: React.FC<{ frame: number }> = ({ frame }) => {
  const card = usePop(POLL + 6, 13);
  const tap = POLL + 50;
  const chosen = frame >= tap;
  return (
    <Slide frame={frame} from={POLL} to={CLOSE}>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 640,
          width: 880,
          background: C.blanco,
          border: `5px solid ${C.carbon}`,
          borderRadius: 48,
          boxShadow: `14px 14px 0 ${C.carbon}`,
          padding: "48px 44px 54px",
          boxSizing: "border-box",
          transform: `scale(${0.8 + 0.2 * card}) rotate(${-1.5 * card}deg)`,
          opacity: Math.min(card * 2, 1),
        }}
      >
        <div style={{ fontFamily: TITULAR, fontWeight: 800, fontSize: 66, lineHeight: 1.1, color: C.carbon, marginBottom: 36 }}>¿Ya la tienes en tu inicio?</div>
        <div style={{ display: "flex", gap: 24, position: "relative" }}>
          {(["Sí", "Todavía no"] as const).map((o) => (
            <div
              key={o}
              style={{
                flex: 1,
                height: 104,
                borderRadius: 52,
                border: `5px solid ${C.carbon}`,
                background: o === "Sí" && chosen ? C.lima : C.arena,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: TITULAR,
                fontWeight: 800,
                fontSize: 46,
                color: C.carbon,
                transform: `scale(${o === "Sí" && frame >= tap && frame < tap + 5 ? 0.94 : 1})`,
              }}
            >
              {o}
            </div>
          ))}
          <Tap frame={frame} at={tap} x={190} y={52} />
        </div>
      </div>
      <Confetti frame={frame} at={tap + 2} x={330} y={980} />
    </Slide>
  );
};

// Barra de avance arriba
const Progress: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame >= CLOSE) return null;
  return (
    <div style={{ position: "absolute", left: 80, right: 80, top: 176, height: 16, borderRadius: 8, background: C.blanco, border: `3px solid ${C.carbon}` }}>
      <div style={{ width: `${(frame / CLOSE) * 100}%`, height: "100%", borderRadius: 8, background: C.lima }} />
    </div>
  );
};

// La cámara se acerca a cada botón en el momento del toque
const TAPS: [number, number, number][] = [
  [S1 + 62, 515, 1582],
  [S1 + 104, 527, 1336],
  [S2 + 92, 717, 1578],
  [S2 + 150, 797, 1213],
  [S3 + 72, 425, 1217],
  [S3 + 124, 918, 994],
];
const useCamera = (frame: number) => {
  for (const [at, x, y] of TAPS) {
    if (frame >= at - 8 && frame < at + 22) {
      const k = ramp(frame, at - 8, at) * (1 - ramp(frame, at + 12, at + 22));
      return { z: 1 + 0.12 * k, x, y };
    }
  }
  return { z: 1, x: 540, y: 960 };
};

const Close: React.FC<{ frame: number }> = ({ frame }) => {
  const bg = ramp(frame, CLOSE - T, CLOSE);
  const logo = usePop(CLOSE, 12);
  const btn = usePop(CLOSE + 8, 10);
  const info = usePop(CLOSE + 14, 14);
  if (frame < CLOSE - T) return null;
  return (
    <AbsoluteFill style={{ background: C.arena, opacity: bg, alignItems: "center", justifyContent: "center", gap: 46 }}>
      <Img src={staticFile("brand/logo/enplan_logo_carbon_sobre_arena.svg")} style={{ width: 600, transform: `scale(${0.7 + 0.3 * logo})`, opacity: Math.min(logo * 1.5, 1) }} />
      <div style={{ display: "flex", alignItems: "center", gap: 18, background: C.carbon, color: C.blanco, borderRadius: 80, padding: "26px 54px", fontFamily: TITULAR, fontWeight: 800, fontSize: 58, transform: `scale(${btn})` }}>
        enplan.app
        <span style={{ width: 22, height: 22, borderRadius: 11, background: C.lima }} />
      </div>
      <div style={{ fontFamily: APOYO, fontWeight: 600, fontSize: 50, color: C.carbon, opacity: info }}>@enplan.ags</div>
    </AbsoluteFill>
  );
};

export const EnplanTutorial: React.FC = () => {
  useBrandFonts();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.arena }}>
      <Progress frame={frame} />
      <Header frame={frame} />
      <Hook frame={frame} />
      <Step1 frame={frame} />
      <Step2 frame={frame} />
      <Step3 frame={frame} />
      <Poll frame={frame} />
      <Slam frame={frame} at={HOOK + 105} dur={30} text="3 PASOS" size={170} y={1180} />
      <Slam frame={frame} at={S1 + 64} text="ENPLAN.APP" size={130} />
      <Slam frame={frame} at={S2 + 94} text="•••" size={220} />
      <Slam frame={frame} at={S2 + 152} text="SHARE" size={170} />
      <Slam frame={frame} at={S3 + 126} text="AGREGAR" size={150} />
      <Slam frame={frame} at={S3 + 150} dur={14} text="¡LISTO!" size={170} y={1500} />
      <Confetti frame={frame} at={S3 + 150} x={300} y={1260} />
      <Close frame={frame} />
    </AbsoluteFill>
  );
};
