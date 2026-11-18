import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, interpolate, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { CHUNKS } from "./captions";
import { C, FPS, PIXEL, POPPINS, prog, SEG_STARTS, TALK_END, TALK_FRAMES, typed, usePop, useT } from "./theme";

// Zona de tarjetas: debajo de la cara y encima de los subtítulos
const CARD = { left: 80, top: 1140, width: 840, height: 280 };
const IW = 828;
const IH = 268;
const TRANS = 0.2;

const Card: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => {
  const t = useT();
  const pop = usePop(from);
  if (t < from || t >= to) return null;
  const out = interpolate(t, [to - TRANS, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        ...CARD,
        background: C.blanco,
        border: `5px solid ${C.tinta}`,
        borderRadius: 32,
        boxShadow: `12px 12px 0 ${C.aqua}`,
        overflow: "hidden",
        boxSizing: "border-box",
        opacity: Math.min(pop * 1.5, 1) * out,
        transform: `scale(${(0.8 + 0.2 * pop) * (0.92 + 0.08 * out)})`,
      }}
    >
      {children}
    </div>
  );
};

const Pixel: React.FC<{ text: string; size: number; k: number; style?: React.CSSProperties }> = ({ text, size, k, style }) => (
  <div
    style={{
      fontFamily: PIXEL,
      fontSize: size,
      padding: "6px 20px 10px",
      borderRadius: 12,
      background: C.aqua,
      color: C.tinta,
      border: `5px solid ${C.tinta}`,
      transform: `rotate(-4deg) scale(${k > 0 ? 1.5 - 0.5 * k : 0})`,
      opacity: Math.min(k * 2, 1),
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {text}
  </div>
);

// 1,0 a 2,1 s: grabar contenido
const RecScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useT();
  const cam = usePop(1.05, 10);
  const rec = usePop(1.34, 9);
  const secs = Math.floor(frame / FPS);
  return (
    <>
      <svg width={IW} height={IH} viewBox={`0 0 ${IW} ${IH}`} style={{ position: "absolute", inset: 0 }}>
        {/* Esquinas de visor */}
        <g stroke={C.tinta} strokeWidth={6} fill="none" strokeLinecap="round">
          <path d="M30 70 V30 H70 M758 30 H798 V70 M798 198 V238 H758 M70 238 H30 V198" />
        </g>
        <g transform={`translate(230 134) scale(${cam})`}>
          <rect x={-120} y={-62} width={180} height={124} rx={22} fill={C.tinta} />
          <path d="M70 -30 L130 -62 V62 L70 30 Z" fill={C.tinta} />
          <circle cx={-30} cy={0} r={40} fill={C.aqua} stroke={C.blanco} strokeWidth={6} />
          <circle cx={-30} cy={0} r={16} fill={C.tinta} />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 470, top: 70, display: "flex", alignItems: "center", gap: 16, opacity: Math.min(rec * 2, 1) }}>
        <div style={{ width: 34, height: 34, borderRadius: 17, background: C.tinta, opacity: Math.floor(t * 3) % 2 === 0 ? 1 : 0.25 }} />
        <Pixel text="REC" size={56} k={rec} />
      </div>
      <div style={{ position: "absolute", left: 470, top: 168, fontFamily: POPPINS, fontWeight: 600, fontSize: 44, color: C.tinta, opacity: rec }}>
        00:00:0{secs}
      </div>
    </>
  );
};

// 2,1 a 5,4 s: editar a mano es lento
const TRACKS: [number, number][][] = [
  [[0, 150], [160, 120], [290, 210], [510, 90], [610, 140]],
  [[40, 220], [280, 170], [470, 230]],
  [[0, 90], [100, 260], [370, 120], [500, 250]],
];
const Tracks: React.FC<{ fill: (row: number, i: number) => number; x0: number; y0: number; rowH: number }> = ({ fill, x0, y0, rowH }) => (
  <>
    {TRACKS.map((row, r) =>
      row.map(([x, w], i) => {
        const k = fill(r, i);
        const bg = [C.tinta, C.aquaClaro, C.aqua][r];
        return (
          <div
            key={`${r}-${i}`}
            style={{
              position: "absolute",
              left: x0 + x,
              top: y0 + r * rowH,
              width: w * k,
              height: rowH - 10,
              borderRadius: 10,
              background: bg,
              border: r === 0 ? "none" : `3px solid ${C.tinta}`,
              boxSizing: "border-box",
              opacity: k > 0 ? 1 : 0,
            }}
          />
        );
      }),
    )}
  </>
);
const TimelineScene: React.FC = () => {
  const t = useT();
  const slow = t >= 4.58;
  const spin = slow ? 240 + (t - 4.58) * 1400 : (t - 2.14) * 100;
  const head = 40 + (t - 2.14) * 30;
  const bar = slow ? prog(t, 4.58, 5.38) * 0.07 : 0;
  return (
    <>
      <div style={{ position: "absolute", left: 30, top: 18, fontFamily: POPPINS, fontWeight: 600, fontSize: 34, color: C.tinta }}>Editando</div>
      <svg width={60} height={60} viewBox="-30 -30 60 60" style={{ position: "absolute", right: 30, top: 12 }}>
        <circle r={25} fill={C.blanco} stroke={C.tinta} strokeWidth={5} />
        <line x1={0} y1={0} x2={0} y2={-16} stroke={C.tinta} strokeWidth={5} strokeLinecap="round" transform={`rotate(${spin})`} />
        <line x1={0} y1={0} x2={11} y2={0} stroke={C.tinta} strokeWidth={5} strokeLinecap="round" transform={`rotate(${spin / 12})`} />
      </svg>
      <Tracks fill={() => 1} x0={40} y0={82} rowH={46} />
      <div style={{ position: "absolute", left: head, top: 72, width: 6, height: 150, background: C.tinta, borderRadius: 3 }} />
      <div style={{ position: "absolute", left: head - 12, top: 64, width: 30, height: 18, borderRadius: 6, background: C.tinta }} />
      {slow && (
        <div style={{ position: "absolute", left: 40, top: 224, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 520, height: 24, borderRadius: 12, border: `4px solid ${C.tinta}`, boxSizing: "border-box" }}>
            <div style={{ width: `${Math.max(bar, 0.02) * 100}%`, height: "100%", borderRadius: 12, background: C.tinta }} />
          </div>
          <span style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 30, color: C.tinta }}>Cargando…</span>
        </div>
      )}
    </>
  );
};

// 5,9 a 8,4 s: la IA edita
const PROMPT = "Edita este video con mi marca";
const AiScene: React.FC = () => {
  const t = useT();
  const sent = t >= 7.24;
  const ia = usePop(7.46, 9);
  const done = usePop(8.25, 9);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 26,
          top: 20,
          width: 640,
          height: 74,
          borderRadius: 37,
          border: `5px solid ${C.tinta}`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          fontFamily: POPPINS,
          fontWeight: 600,
          fontSize: 30,
          color: C.tinta,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {sent ? "" : typed(PROMPT, t, 6.0, 7.05)}
        {!sent && Math.floor(t * 3) % 2 === 0 && <span style={{ width: 3, height: 34, background: C.tinta, marginLeft: 2 }} />}
      </div>
      {sent && (
        <div
          style={{
            position: "absolute",
            left: 26,
            top: 20,
            padding: "14px 24px",
            borderRadius: "28px 28px 28px 6px",
            background: C.tinta,
            color: C.blanco,
            fontFamily: POPPINS,
            fontWeight: 600,
            fontSize: 30,
            transform: `translateY(${(1 - prog(t, 7.24, 7.4)) * 20}px)`,
          }}
        >
          {PROMPT}
        </div>
      )}
      <svg width={74} height={74} viewBox="0 0 74 74" style={{ position: "absolute", left: 690, top: 20, transform: `scale(${t >= 7.18 && t < 7.3 ? 0.85 : 1})` }}>
        <circle cx={37} cy={37} r={34} fill={C.tinta} />
        <path d="M22 37 H50 M38 24 L51 37 L38 50" fill="none" stroke={C.blanco} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 690,
          top: 120,
          width: 100,
          height: 100,
          borderRadius: 50,
          background: C.aqua,
          border: `6px solid ${C.tinta}`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: POPPINS,
          fontWeight: 700,
          fontSize: 40,
          color: C.tinta,
          transform: `scale(${ia}) rotate(${(1 - ia) * -40}deg)`,
        }}
      >
        IA
      </div>
      {/* La misma línea de tiempo, ahora se llena sola y rápido */}
      {TRACKS.map((_, r) => (
        <div key={r} style={{ position: "absolute", left: 30, top: 114 + r * 46, width: 630, height: 36, borderRadius: 10, border: `3px dashed ${C.aquaClaro}`, boxSizing: "border-box" }} />
      ))}
      <div style={{ transform: "scale(0.82)", transformOrigin: "30px 114px", position: "absolute", inset: 0 }}>
        <Tracks fill={(r, i) => prog(t, 7.6 + r * 0.1 + i * 0.05, 7.8 + r * 0.1 + i * 0.05)} x0={30} y0={114} rowH={56} />
      </div>
      {t >= 8.25 && (
        <svg width={64} height={64} viewBox="-32 -32 64 64" style={{ position: "absolute", left: 590, top: 190, transform: `scale(${done})` }}>
          <circle r={28} fill={C.aqua} stroke={C.tinta} strokeWidth={5} />
          <path d="M-12 0 L-3 10 L14 -10" fill="none" stroke={C.tinta} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );
};

// 8,4 a 9,55 s: "como este video", el video se señala a sí mismo
const ThisVideo: React.FC = () => {
  const t = useT();
  const k = usePop(8.42, 11);
  const tag = usePop(8.8, 9);
  if (t < 8.42 || t >= 9.55) return null;
  const out = 1 - prog(t, 9.4, 9.55);
  const inset = 60 + (1 - k) * 80 + Math.sin(t * 9) * 6;
  const L = 130;
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {[C.tinta, C.aqua].map((col, i) => (
          <path
            key={col}
            d={`M${inset} ${inset + L} V${inset} H${inset + L} M${1080 - inset - L} ${inset} H${1080 - inset} V${inset + L} M${1080 - inset} ${1920 - inset - L} V${1920 - inset} H${1080 - inset - L} M${inset + L} ${1920 - inset} H${inset} V${1920 - inset - L}`}
            fill="none"
            stroke={col}
            strokeWidth={i === 0 ? 22 : 10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <div style={{ position: "absolute", top: 1220, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
        <Pixel text="ESTE VIDEO" size={72} k={tag} />
      </div>
    </AbsoluteFill>
  );
};

// 11,1 a 13,95 s: el link de Remotion se instala en Claude Code
const LinkScene: React.FC = () => {
  const t = useT();
  const chip = usePop(11.46, 10);
  const name = prog(t, 11.68, 11.75);
  const arrow = prog(t, 12.14, 12.5);
  const term = usePop(12.3, 11);
  const bar = prog(t, 12.74, 13.4);
  const ok = usePop(13.45, 9);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 26,
          top: 96,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 26px",
          borderRadius: 40,
          background: C.aqua,
          border: `5px solid ${C.tinta}`,
          transform: `scale(${chip})`,
          transformOrigin: "left center",
        }}
      >
        <svg width={40} height={40} viewBox="0 0 40 40">
          <g fill="none" stroke={C.tinta} strokeWidth={5} strokeLinecap="round">
            <path d="M17 23 L23 17" />
            <path d="M14 18 L9 23 a6 6 0 0 0 8 8 L22 26" />
            <path d="M18 14 L23 9 a6 6 0 0 1 8 8 L26 22" />
          </g>
        </svg>
        <span style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 38, color: C.tinta, opacity: name }}>Remotion</span>
      </div>
      <svg width={IW} height={IH} viewBox={`0 0 ${IW} ${IH}`} style={{ position: "absolute", inset: 0 }}>
        {arrow > 0 && (
          <g stroke={C.tinta} strokeWidth={6} strokeLinecap="round" fill="none">
            <line x1={330} y1={134} x2={330 + 90 * arrow} y2={134} />
            {arrow > 0.9 && <path d="M404 120 L420 134 L404 148" strokeLinejoin="round" />}
          </g>
        )}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 440,
          top: 22,
          width: 362,
          height: 224,
          borderRadius: 20,
          border: `5px solid ${C.tinta}`,
          overflow: "hidden",
          background: C.blanco,
          boxSizing: "border-box",
          transform: `scale(${term})`,
        }}
      >
        <div style={{ height: 52, background: C.tinta, display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 13, height: 13, borderRadius: 7, background: C.blanco, opacity: 0.8 }} />
          ))}
          <span style={{ marginLeft: 8, fontFamily: POPPINS, fontWeight: 600, fontSize: 28, color: C.blanco }}>Claude Code</span>
        </div>
        <div style={{ padding: "18px 20px", fontFamily: POPPINS, fontWeight: 600, fontSize: 30, color: C.tinta, display: "flex", alignItems: "center", gap: 6 }}>
          ›<span style={{ width: 14, height: 30, background: C.tinta, opacity: Math.floor(t * 3) % 2 === 0 ? 1 : 0 }} />
        </div>
        {t >= 12.74 && (
          <div style={{ position: "absolute", left: 20, bottom: 26, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 230, height: 24, borderRadius: 12, border: `4px solid ${C.tinta}`, boxSizing: "border-box" }}>
              <div style={{ width: `${bar * 100}%`, height: "100%", borderRadius: 12, background: C.tinta }} />
            </div>
            {t >= 13.45 && (
              <svg width={52} height={52} viewBox="-26 -26 52 52" style={{ transform: `scale(${ok})` }}>
                <circle r={23} fill={C.aqua} stroke={C.tinta} strokeWidth={5} />
                <path d="M-10 0 L-2 8 L11 -8" fill="none" stroke={C.tinta} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const Captions: React.FC = () => {
  const t = useT();
  const c = CHUNKS.find((x) => t >= x.words[0][1] && t < x.end);
  if (!c) return null;
  return (
    <div style={{ position: "absolute", top: CARD.top + CARD.height + 20, left: CARD.left, width: CARD.width, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          background: C.blanco,
          border: `4px solid ${C.tinta}`,
          borderRadius: 40,
          boxShadow: `8px 8px 0 ${C.aqua}`,
          padding: "8px 30px 12px",
          fontFamily: POPPINS,
          fontWeight: 700,
          fontSize: 50,
          lineHeight: 1.25,
          color: C.tinta,
          textAlign: "center",
        }}
      >
        {c.words.map(([w, at], i) => {
          // Palabras clave seguidas comparten un solo bloque aqua
          const h = c.hl.includes(i);
          const prev = h && c.hl.includes(i - 1);
          const next = h && c.hl.includes(i + 1);
          const r = (on: boolean) => (on ? 0 : 18);
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: i === c.words.length - 1 || next ? 0 : "0.26em",
                opacity: t >= at - 0.05 ? 1 : 0,
                transform: `scale(${interpolate(t, [at - 0.05, at + 0.1], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
                background: h ? C.aqua : "transparent",
                borderRadius: `${r(prev)}px ${r(next)}px ${r(next)}px ${r(prev)}px`,
                padding: h ? `0 ${next ? "0.26em" : "10px"} 0 ${prev ? 0 : "10px"}` : 0,
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// Zoom corto que tapa cada corte, y uno suave en "este video"
const useZoom = () => {
  const frame = useCurrentFrame();
  const t = useT();
  let z = 0;
  for (const s of SEG_STARTS.slice(1)) {
    const f = Math.round(s * FPS);
    z = Math.max(z, 1 - prog(frame, f, f + 8));
  }
  z = Math.max(z, prog(t, 8.8, 8.95) * (1 - prog(t, 9.4, 9.55)) * 0.75);
  return 1 + 0.08 * z;
};

const EndScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const from = TALK_FRAMES - 8;
  const bg = prog(frame, from, TALK_FRAMES);
  const a = usePop(TALK_END - 0.05);
  const b = usePop(TALK_END + 0.25);
  if (frame < from) return null;
  return (
    <AbsoluteFill style={{ background: C.blanco, opacity: bg, alignItems: "center", justifyContent: "center", gap: 30 }}>
      <svg width={170} height={170} viewBox="-30 -30 60 60" style={{ transform: `scale(${a})` }}>
        <circle r={27} fill={C.aqua} stroke={C.tinta} strokeWidth={3} />
        <g fill="none" stroke={C.tinta} strokeWidth={3.4} strokeLinecap="round" transform="translate(-20 -20)">
          <path d="M17 23 L23 17" />
          <path d="M14 18 L9 23 a6 6 0 0 0 8 8 L22 26" />
          <path d="M18 14 L23 9 a6 6 0 0 1 8 8 L26 22" />
        </g>
      </svg>
      <div style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 66, color: C.tinta, opacity: Math.min(a * 2, 1) }}>El link está en</div>
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 700,
          fontSize: 76,
          lineHeight: 1.2,
          color: C.tinta,
          textAlign: "center",
          background: C.aqua,
          border: `5px solid ${C.tinta}`,
          borderRadius: 40,
          boxShadow: `12px 12px 0 ${C.tinta}`,
          padding: "18px 44px 24px",
          transform: `scale(${0.85 + 0.15 * b})`,
          opacity: Math.min(b * 2, 1),
        }}
      >
        el primer comentario
        <br />y en mi bio
      </div>
    </AbsoluteFill>
  );
};

// Etiqueta del tema arriba, como la píldora de sección del brandbook
const TopicChip: React.FC = () => {
  const t = useT();
  const k = usePop(1.0);
  if (t < 1.0 || t >= TALK_END) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 260,
        padding: "10px 28px",
        background: C.blanco,
        border: `4px solid ${C.tinta}`,
        borderRadius: 40,
        boxShadow: `6px 6px 0 ${C.aqua}`,
        fontFamily: POPPINS,
        fontWeight: 700,
        fontSize: 34,
        color: C.tinta,
        transform: `translateY(${(1 - k) * -30}px)`,
        opacity: Math.min(k * 2, 1),
      }}
    >
      Editar con IA
    </div>
  );
};

export const EditarIA: React.FC = () => {
  const [handle] = useState(() => delayRender("fuentes"));
  useEffect(() => {
    Promise.all(["600 40px Poppins", "700 40px Poppins", "400 40px Silkscreen"].map((f) => document.fonts.load(f))).then(() => continueRender(handle));
  }, [handle]);
  const zoom = useZoom();

  return (
    <AbsoluteFill style={{ background: C.blanco }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "540px 700px" }}>
        <OffthreadVideo src={staticFile("toma.mp4")} />
      </AbsoluteFill>

      <Card from={1.0} to={2.14}>
        <RecScene />
      </Card>
      <Card from={2.14} to={5.38}>
        <TimelineScene />
      </Card>
      <Card from={5.9} to={8.42}>
        <AiScene />
      </Card>
      <ThisVideo />
      <Card from={11.09} to={TALK_END - 0.05}>
        <LinkScene />
      </Card>

      <TopicChip />
      <Captions />
      <EndScreen />
    </AbsoluteFill>
  );
};
