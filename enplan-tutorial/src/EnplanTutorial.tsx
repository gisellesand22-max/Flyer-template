import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { APOYO, C, ramp, T, TITULAR, useBrandFonts, usePop } from "./brand";

// Escenas en cuadros (30 fps). Los textos son los del carrusel.
const HOOK = 0;
const S1 = 135;
const S2 = 255;
const S3 = 420;
const CLOSE = 615;
export const TOTAL = 675;

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

// Toque: punto lima y onda que se abre
const Tap: React.FC<{ frame: number; at: number; x: number; y: number }> = ({ frame, at, x, y }) => {
  if (frame < at - 8 || frame > at + 18) return null;
  const pre = ramp(frame, at - 8, at);
  const k = ramp(frame, at, at + 18);
  const r = 26 + 60 * k;
  return (
    <>
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

// Texto con partes en negritas: [texto, negrita]
type Rich = [string, boolean][];
const RichText: React.FC<{ parts: Rich; size: number; style?: React.CSSProperties }> = ({ parts, size, style }) => (
  <div style={{ fontFamily: APOYO, fontWeight: 600, fontSize: size, lineHeight: 1.25, color: C.carbon, ...style }}>
    {parts.map(([t, b], i) =>
      b ? (
        <span key={i} style={{ fontFamily: TITULAR, fontWeight: 800 }}>
          {t}
        </span>
      ) : (
        <span key={i}>{t}</span>
      ),
    )}
  </div>
);

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
        style={{ position: "absolute", left: 80, top: 740, width: 860, opacity: sub, transform: `translateY(${(1 - sub) * 30}px)` }}
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
          style={{ opacity: txt, transform: `translateY(${(1 - txt) * 30}px)` }}
        />
      </div>
      <div style={{ position: "absolute", left, top: top + (1 - ph) * 500, transform: `rotate(${-3 * ph}deg)` }}>
        <Piece crop={PHONE1} scale={sc} style={{ position: "relative" }} />
        <Tap frame={frame} at={S1 + 40} x={214 * sc} y={798 * sc} />
        <Tap frame={frame} at={S1 + 80} x={224 * sc} y={590 * sc} />
      </div>
    </Slide>
  );
};

const Step2: React.FC<{ frame: number }> = ({ frame }) => {
  const h1 = usePop(S2 + 4, 14);
  const hl = ramp(frame, S2 + 14, S2 + 26);
  const b = usePop(S2 + 12, 10);
  const txt = usePop(S2 + 16, 14);
  const pl = usePop(S2 + 14, 14);
  const pr = usePop(S2 + 82, 13);
  const sc = 1.35;
  const shift = ramp(frame, S2 + 76, S2 + 90);
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
          style={{ opacity: txt, transform: `translateY(${(1 - txt) * 30}px)` }}
        />
      </div>
      <div style={{ position: "absolute", left: 285 - 225 * shift, top: 790 + (1 - pl) * 500, transform: `rotate(${-3 * pl}deg)` }}>
        <Piece crop={PHONE_L} scale={sc} style={{ position: "relative" }} />
        <Tap frame={frame} at={S2 + 58} x={320 * sc} y={584 * sc} />
      </div>
      {frame >= S2 + 82 && (
        <div style={{ position: "absolute", left: 500 + (1 - pr) * 500, top: 770, transform: `rotate(${3 * pr}deg)`, opacity: Math.min(pr * 2, 1) }}>
          <Piece crop={PHONE_R} scale={sc} style={{ position: "relative" }} />
          <Tap frame={frame} at={S2 + 122} x={220 * sc} y={328 * sc} />
        </div>
      )}
    </Slide>
  );
};

const Step3: React.FC<{ frame: number }> = ({ frame }) => {
  const h1 = usePop(S3 + 4, 14);
  const hl = ramp(frame, S3 + 16, S3 + 28);
  const b = usePop(S3 + 12, 10);
  const txt = usePop(S3 + 16, 14);
  const menu = usePop(S3 + 22, 13);
  const dlg = usePop(S3 + 80, 13);
  const icon = usePop(S3 + 132, 12);
  const done = usePop(S3 + 140, 14);
  const back = ramp(frame, S3 + 78, S3 + 90);
  const fly = ramp(frame, S3 + 128, S3 + 146);
  return (
    <Slide frame={frame} from={S3} to={CLOSE}>
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
          style={{ opacity: txt, transform: `translateY(${(1 - txt) * 30}px)` }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 800 + (1 - menu) * 500,
          transform: `perspective(1600px) rotateY(${12 * menu}deg) scale(${1 - 0.12 * back})`,
          transformOrigin: "left top",
          opacity: (1 - 0.5 * back) * (1 - fly),
        }}
      >
        <Piece crop={MENU} scale={1.5} radius={30} style={{ position: "relative" }} />
        <Tap frame={frame} at={S3 + 56} x={230 * 1.5} y={278 * 1.5} />
      </div>
      {frame >= S3 + 80 && (
        <div style={{ position: "absolute", left: 300, top: 880 + (1 - dlg) * 400, transform: `perspective(1600px) rotateY(${-10 * dlg}deg)`, opacity: Math.min(dlg * 2, 1) * (1 - fly), transformOrigin: "center" }}>
          <Piece crop={DIALOG} scale={1.5} radius={30} style={{ position: "relative" }} />
          <Tap frame={frame} at={S3 + 112} x={412 * 1.5} y={76 * 1.5} />
        </div>
      )}
      {frame >= S3 + 128 && (
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
      <Header frame={frame} />
      <Hook frame={frame} />
      <Step1 frame={frame} />
      <Step2 frame={frame} />
      <Step3 frame={frame} />
      <Close frame={frame} />
    </AbsoluteFill>
  );
};
