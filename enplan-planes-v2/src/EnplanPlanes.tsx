import React from "react";
import { AbsoluteFill, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { APOYO, C, ramp, SAFE, T, TITULAR, useBrandFonts, usePop } from "./brand";

// Tiempos en cuadros a 30 fps (segundos del video hablado x 30)
const s = (sec: number) => Math.round(sec * 30);
export const TALK_END = 372; // 12,4 s: termina la toma
const APP_FROM = 216; // 7,2 s: entra el celular con la app
const APP_SCENE_END = TALK_END + 54; // 1,8 s con la tarjeta del beneficio
export const TOTAL = APP_SCENE_END + 60; // cierre de 2 s

// Subtítulos: [palabra, segundo]; `hl` es la palabra clave
type Chunk = { words: [string, number][]; end: number; hl: number };
const CAPTIONS: Chunk[] = [
  { words: [["Soy", 0.0], ["de", 0.98], ["Aguascalientes", 1.12]], end: 1.72, hl: 2 },
  { words: [["y", 1.72], ["estoy", 2.14], ["cansada", 2.32], ["de", 2.72], ["escuchar:", 2.84]], end: 3.8, hl: 2 },
  { words: [["Por", 6.42], ["eso", 6.42], ["desarrollé", 6.66]], end: 7.28, hl: 2 },
  { words: [["esta", 7.28], ["app", 7.42]], end: 7.66, hl: 1 },
  { words: [["donde", 7.66], ["vas", 7.8], ["a", 7.96], ["encontrar", 8.0]], end: 8.36, hl: 3 },
];
const QUOTE: [string, number][] = [
  ["No", 3.9], ["hay", 3.98], ["nada", 4.06], ["más", 4.2], ["que", 4.44], ["hacer,", 4.62],
  ["más", 5.1], ["que", 5.18], ["tomar", 5.34], ["aquí.", 5.62],
];
// Respuesta en tres frases, al ritmo de tu voz: [palabras, desde, hasta]
const ANSWER: { words: [string, number][]; from: number; to: number }[] = [
  { words: [["Hay", 8.36], ["muchos", 8.36], ["más", 8.82], ["planes,", 9.06]], from: 8.95, to: 9.82 },
  { words: [["restaurantes,", 9.82], ["servicios", 10.58]], from: 9.82, to: 11.42 },
  { words: [["y", 11.42], ["con", 11.42], ["descuento.", 11.68]], from: 11.42, to: 12.4 },
];

// Celular: chico abajo mientras hablas, grande al centro en la escena final
const SMALL = { top: 1300, h: 600 };
const BIG = { top: 560, h: 1000 };
const BEZEL = 18;
const phoneBox = (h: number, top: number) => {
  const sw = Math.round((h - BEZEL * 2) * (1080 / 1920));
  const pw = sw + BEZEL * 2;
  return { top, h, sw, sh: h - BEZEL * 2, pw, left: Math.round((1080 - pw) / 2) };
};

const Captions: React.FC<{ frame: number }> = ({ frame }) => {
  const t = frame / 30;
  const c = CAPTIONS.find((x) => t >= x.words[0][1] && t < x.end);
  if (!c) return null;
  return (
    <div style={{ position: "absolute", top: 1170, left: SAFE.left, width: SAFE.right - SAFE.left, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          background: C.arena,
          borderRadius: 40,
          padding: "14px 34px 18px",
          fontFamily: APOYO,
          fontWeight: 600,
          fontSize: 50,
          color: C.carbon,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {c.words.map(([w, at], i) => {
          const on = t >= at - 0.05;
          const key = i === c.hl;
          const line = ramp(frame, s(at), s(at) + 9);
          return (
            <span
              key={i}
              style={{
                position: "relative",
                display: "inline-block",
                marginRight: i < c.words.length - 1 ? "0.28em" : 0,
                opacity: on ? 1 : 0,
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

// Etiqueta de ubicación, como la de la landing
const Location: React.FC<{ frame: number }> = ({ frame }) => {
  const from = s(1.12);
  const to = s(3.8);
  const p = usePop(from, 9);
  if (frame < from || frame >= to) return null;
  const out = 1 - ramp(frame, to - T, to);
  return (
    <div style={{ position: "absolute", top: 290, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: C.blanco,
          border: `5px solid ${C.carbon}`,
          borderRadius: 60,
          padding: "14px 36px",
          fontFamily: APOYO,
          fontWeight: 600,
          fontSize: 50,
          color: C.carbon,
          transform: `translateY(${(1 - p) * -120}px) scale(${0.8 + 0.2 * p})`,
          opacity: Math.min(p * 2, 1) * out,
        }}
      >
        <svg width={40} height={50} viewBox="0 0 40 50">
          <path d="M20 3C10.6 3 4 10 4 18.5 4 30 20 47 20 47S36 30 36 18.5C36 10 29.4 3 20 3Z" fill="none" stroke={C.carbon} strokeWidth={5} />
          <circle cx={20} cy={18.5} r={6} fill={C.lima} stroke={C.carbon} strokeWidth={3} />
        </svg>
        Aguascalientes
      </div>
    </div>
  );
};

// La queja como cita: se escribe abajo, sube y luego se tacha
const Quote: React.FC<{ frame: number }> = ({ frame }) => {
  const from = s(3.8);
  const up = s(6.42);
  const strike = s(8.36);
  const gone = s(8.79);
  const p = usePop(from, 12);
  const move = interpolate(frame, [up, up + T], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (frame < from || frame >= gone + T) return null;
  const out = 1 - ramp(frame, gone, gone + T);
  const t = frame / 30;
  const cy = 1360 + (430 - 1360) * move;
  const scale = (0.85 + 0.15 * p) * (1 - 0.28 * move);
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        width: 880,
        top: cy - 160,
        height: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale}) translateY(${(1 - out) * -60}px)`,
        opacity: Math.min(p * 2, 1) * out,
      }}
    >
      <div
        style={{
          position: "relative",
          background: C.blanco,
          border: `5px solid ${C.carbon}`,
          borderRadius: 48,
          padding: "40px 44px 44px",
          boxShadow: `14px 14px 0 ${C.carbon}`,
        }}
      >
        {/* Cola de la burbuja hacia tu cara, solo abajo */}
        <svg width={70} height={46} viewBox="0 0 70 46" style={{ position: "absolute", top: -44, left: 380, opacity: 1 - move }}>
          <path d="M4 46 L35 4 L66 46" fill={C.blanco} stroke={C.carbon} strokeWidth={5} strokeLinejoin="round" />
        </svg>
        <div
          style={{
            position: "absolute",
            top: -34,
            left: -26,
            width: 76,
            height: 76,
            borderRadius: 38,
            background: C.lima,
            border: `5px solid ${C.carbon}`,
            fontFamily: TITULAR,
            fontWeight: 800,
            fontSize: 72,
            lineHeight: "96px",
            textAlign: "center",
            color: C.carbon,
          }}
        >
          “
        </div>
        <div style={{ fontFamily: TITULAR, fontWeight: 800, fontSize: 62, lineHeight: 1.18, color: C.carbon, textAlign: "center" }}>
          {QUOTE.map(([w, at], i) => {
            const k = ramp(frame, strike + i, strike + i + 5);
            return (
              <span key={i} style={{ position: "relative", display: "inline-block", marginRight: "0.26em", opacity: t >= at - 0.05 ? 1 : 0 }}>
                <span style={{ color: k > 0 ? C.arenaOscuro : C.carbon }}>{w}</span>
                <span
                  style={{
                    position: "absolute",
                    left: -4,
                    right: -4,
                    top: "52%",
                    height: 12,
                    borderRadius: 6,
                    background: C.lima,
                    transform: `scaleX(${k})`,
                    transformOrigin: "left",
                  }}
                />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// La respuesta en píldora lima: cada frase entra al decirla
const Answer: React.FC<{ frame: number }> = ({ frame }) => {
  const t = frame / 30;
  const i = ANSWER.findIndex((a) => t >= a.from && t < a.to);
  const first = usePop(s(ANSWER[0].from), 10);
  if (i < 0 || frame >= TALK_END) return null;
  const a = ANSWER[i];
  const swap = ramp(frame, s(a.from), s(a.from) + T);
  const out = 1 - ramp(frame, TALK_END - T, TALK_END);
  return (
    <div style={{ position: "absolute", top: 300, left: SAFE.left, width: SAFE.right - SAFE.left, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          background: C.lima,
          borderRadius: 56,
          padding: "22px 44px 26px",
          fontFamily: TITULAR,
          fontWeight: 800,
          fontSize: 72,
          lineHeight: 1.1,
          color: C.carbon,
          textAlign: "center",
          boxShadow: `14px 14px 0 ${C.carbon}`,
          transform: `scale(${(0.7 + 0.3 * first) * (i === 0 ? 1 : 0.94 + 0.06 * swap)})`,
          opacity: Math.min(first * 2, 1) * out,
        }}
      >
        {a.words.map(([w, at], k) => (
          <span key={k} style={{ display: "inline-block", marginRight: k < a.words.length - 1 ? "0.25em" : 0, opacity: t >= at - 0.05 ? 1 : 0 }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

// Iconos oficiales que salen del celular en "muchísimos más planes"
const ICONS: [string, number, number][] = [
  ["top", 540, 1205],
  ["comida", 195, 1340],
  ["servicios", 885, 1340],
  ["fitness", 255, 1505],
  ["ocio", 825, 1505],
  ["tiendas", 175, 1670],
  ["belleza", 905, 1670],
];
// Iconos que se agrandan cuando los nombras
const EMPHASIS: Record<string, [number, number]> = { comida: [9.82, 10.58], servicios: [10.58, 11.42] };
const Icons: React.FC<{ frame: number; phoneCx: number; phoneCy: number }> = ({ frame, phoneCx, phoneCy }) => (
  <>
    {ICONS.map(([name, x, y], i) => (
      <FlyIcon key={name} name={name} x={x} y={y} from={s(8.36) + i * 3} frame={frame} ox={phoneCx} oy={phoneCy} />
    ))}
  </>
);
const FlyIcon: React.FC<{ name: string; x: number; y: number; from: number; frame: number; ox: number; oy: number }> = ({
  name,
  x,
  y,
  from,
  frame,
  ox,
  oy,
}) => {
  const p = usePop(from, 11);
  if (frame < from || frame >= TALK_END) return null;
  const out = 1 - ramp(frame, TALK_END - T, TALK_END);
  const em = EMPHASIS[name];
  const k = em ? ramp(frame, s(em[0]), s(em[0]) + 6) * (1 - ramp(frame, s(em[1]), s(em[1]) + 6)) : 0;
  const size = 150 * (1 + 0.35 * k);
  const px = ox + (x - ox) * p;
  const py = oy + (y - oy) * p + Math.sin((frame - from) / 10) * 8;
  return (
    <>
      {k > 0 && (
        <div
          style={{
            position: "absolute",
            left: px - size * 0.6,
            top: py - size * 0.6,
            width: size * 1.2,
            height: size * 1.2,
            borderRadius: size,
            border: `8px solid ${C.lima}`,
            background: C.blanco,
            opacity: k,
          }}
        />
      )}
      <Img
        src={staticFile(`brand/icons/${name}.webp`)}
        style={{ position: "absolute", left: px - size / 2, top: py - size / 2, width: size, height: size, objectFit: "contain", transform: `scale(${p * out})` }}
      />
    </>
  );
};

// Tarjeta del beneficio que sale del celular en 3D
const BenefitCallout: React.FC<{ frame: number; box: ReturnType<typeof phoneBox> }> = ({ frame, box }) => {
  const from = TALK_END + 8;
  const to = APP_SCENE_END;
  const p = usePop(from, 14);
  if (frame < from || frame >= to) return null;
  const out = 1 - ramp(frame, to - T, to);
  const [x, y, w, h] = [30, 1470, 1020, 450];
  const sc = 0.85;
  const k = box.sw / 1080;
  const sx = box.left + BEZEL + (x + w / 2) * k;
  const sy = box.top + BEZEL + (y + h / 2) * k;
  const cx = 540;
  const cy = 1180;
  const s0 = k / sc;
  const rot = -12 * p + Math.sin((frame - from) / 14) * 2.5;
  return (
    <div
      style={{
        position: "absolute",
        left: sx + (cx - sx) * p - (w * sc) / 2,
        top: sy + (cy - sy) * p - (h * sc) / 2,
        width: w * sc,
        height: h * sc,
        transform: `perspective(1600px) rotateY(${rot}deg) rotateX(${6 * p}deg) scale(${(s0 + (1 - s0) * p) * (0.9 + 0.1 * out)})`,
        opacity: Math.min(p * 2, 1) * out,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 36,
          border: `7px solid ${C.lima}`,
          background: C.blanco,
          overflow: "hidden",
          boxShadow: `20px 20px 0 ${C.carbon}`,
        }}
      >
        <Sequence from={APP_FROM} layout="none">
          <OffthreadVideo
            src={staticFile("app.mp4")}
            muted
            style={{ position: "absolute", left: -x * sc - 7, top: -y * sc - 7, width: 1080 * sc, height: 1920 * sc, maxWidth: "none" }}
          />
        </Sequence>
      </div>
    </div>
  );
};

const Circles: React.FC<{ frame: number; show: number }> = ({ frame, show }) => {
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
        <div
          key={i}
          style={{ position: "absolute", left: x - r, top: y - r + f(p), width: r * 2, height: r * 2, borderRadius: r, background: C.lima, transform: `scale(${show})` }}
        />
      ))}
    </>
  );
};

const Close: React.FC<{ frame: number }> = ({ frame }) => {
  const from = APP_SCENE_END - T;
  const bg = ramp(frame, from, from + T);
  const logo = usePop(from + 3, 12);
  const btn = usePop(from + 10, 10);
  const info = usePop(from + 16, 14);
  if (frame < from) return null;
  return (
    <div style={{ position: "absolute", inset: 0, background: C.arena, opacity: bg }}>
      <Circles frame={frame} show={1} />
      <div style={{ position: "absolute", top: 640, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
        <Img
          src={staticFile("brand/logo/enplan_logo_carbon_sobre_arena.svg")}
          style={{ width: 600, transform: `scale(${0.7 + 0.3 * logo})`, opacity: Math.min(logo * 1.5, 1) }}
        />
      </div>
      <div style={{ position: "absolute", top: 930, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            background: C.lima,
            color: C.carbon,
            borderRadius: 80,
            padding: "28px 50px",
            fontFamily: TITULAR,
            fontWeight: 800,
            fontSize: 50,
            transform: `scale(${btn * (1 + 0.025 * Math.sin((frame - from) / 5))})`,
          }}
        >
          Checa tu siguiente plan
          <svg width={48} height={38} viewBox="0 0 52 40">
            <path d="M4 20 H44 M28 4 L46 20 L28 36" fill="none" stroke={C.carbon} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1120,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontFamily: APOYO,
          fontWeight: 600,
          fontSize: 50,
          lineHeight: 1.4,
          color: C.carbon,
          opacity: info,
          transform: `translateY(${(1 - info) * 30}px)`,
        }}
      >
        enplan.app
        <br />
        @enplan.ags
      </div>
    </div>
  );
};

export const EnplanPlanes: React.FC = () => {
  useBrandFonts();
  const frame = useCurrentFrame();

  // El celular entra en "esta app" y crece al terminar de hablar
  const enter = usePop(s(7.2), 13);
  const grow = usePop(TALK_END, 15);
  const h = SMALL.h + (BIG.h - SMALL.h) * grow;
  const top = SMALL.top + (BIG.top - SMALL.top) * grow + (1 - enter) * 700;
  const box = phoneBox(h, top);
  const arena = ramp(frame, TALK_END, TALK_END + T);

  return (
    <AbsoluteFill style={{ background: C.arena }}>
      {frame < TALK_END + T && (
        <AbsoluteFill style={{ opacity: 1 - arena }}>
          <OffthreadVideo src={staticFile("habla.mp4")} endAt={TALK_END} />
        </AbsoluteFill>
      )}
      <Circles frame={frame} show={arena} />

      <Location frame={frame} />
      <Quote frame={frame} />
      <Answer frame={frame} />
      <Captions frame={frame} />

      {frame >= APP_FROM && frame < APP_SCENE_END && (
        <div
          style={{
            position: "absolute",
            left: box.left,
            top: box.top,
            width: box.pw,
            height: box.h,
            background: C.carbon,
            borderRadius: 32 + 40 * (box.h / 1000),
            boxShadow: `14px 14px 0 ${C.arenaOscuro}`,
            opacity: 1 - ramp(frame, APP_SCENE_END - T, APP_SCENE_END),
          }}
        >
          <div
            style={{
              position: "absolute",
              left: BEZEL,
              top: BEZEL,
              width: box.sw,
              height: box.sh,
              borderRadius: 18 + 38 * (box.h / 1000),
              overflow: "hidden",
              background: C.arena,
            }}
          >
            <Sequence from={APP_FROM} layout="none">
              <OffthreadVideo src={staticFile("app.mp4")} muted style={{ width: box.sw, height: box.sh }} />
            </Sequence>
            <div style={{ position: "absolute", inset: 0, background: C.arena, opacity: ramp(frame, TALK_END + 8, TALK_END + 8 + T) * 0.55 }} />
          </div>
          <div style={{ position: "absolute", top: BEZEL + 10, left: box.pw / 2 - 40, width: 80, height: 18, borderRadius: 9, background: C.carbon }} />
        </div>
      )}

      <Icons frame={frame} phoneCx={540} phoneCy={box.top + box.h / 2} />
      <BenefitCallout frame={frame} box={box} />
      <Close frame={frame} />
    </AbsoluteFill>
  );
};
