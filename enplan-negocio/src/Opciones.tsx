import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { APOYO, C, TITULAR, useBrandFonts } from "./brand";

// Un cuadro de muestra por opción: el momento "en Meta Ads" (21,45 s)
const FRAME = 643;

const Coin: React.FC<{ x: number; y: number; size: number; rot?: number }> = ({ x, y, size, rot = 0 }) => (
  <svg width={size} height={size} viewBox="-28 -28 56 56" style={{ position: "absolute", left: x - size / 2, top: y - size / 2, transform: `rotate(${rot}deg)` }}>
    <circle r={24} fill={C.lima} stroke={C.carbon} strokeWidth={4} />
    <text y={11} textAnchor="middle" fontFamily={TITULAR} fontWeight={800} fontSize={32} fill={C.carbon}>
      $
    </text>
  </svg>
);

// Texto blanco con contorno carbón, para leerse sobre el video sin caja
const outline: React.CSSProperties = { color: C.blanco, WebkitTextStroke: `10px ${C.carbon}`, paintOrder: "stroke fill" };

const Chip: React.FC<{ name: string; rot: number; big?: boolean }> = ({ name, rot, big }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: big ? C.lima : C.blanco,
      border: `4px solid ${C.carbon}`,
      borderRadius: 30,
      padding: "10px 20px 10px 12px",
      boxShadow: `8px 8px 0 ${C.carbon}`,
      transform: `rotate(${rot}deg) scale(${big ? 1.12 : 1})`,
    }}
  >
    <svg width={48} height={48} viewBox="-28 -28 56 56">
      <circle r={24} fill={big ? C.blanco : C.lima} stroke={C.carbon} strokeWidth={4} />
      <text y={11} textAnchor="middle" fontFamily={TITULAR} fontWeight={800} fontSize={32} fill={C.carbon}>
        $
      </text>
    </svg>
    <span style={{ fontFamily: TITULAR, fontWeight: 800, fontSize: 36, color: C.carbon }}>{name}</span>
  </div>
);

// Barra de avance arriba: dice cuánto falta y mantiene a la gente viendo
const Progress: React.FC<{ k: number }> = ({ k }) => (
  <div style={{ position: "absolute", left: 80, right: 80, top: 230, height: 14, borderRadius: 7, background: C.arena, border: `3px solid ${C.carbon}` }}>
    <div style={{ width: `${k * 100}%`, height: "100%", borderRadius: 7, background: C.lima }} />
  </div>
);

// A: karaoke. Pocas palabras grandes, la palabra que dices brinca en lima
const OpcionA: React.FC = () => (
  <>
    <Progress k={0.55} />
    <div style={{ position: "absolute", top: 1110, left: 60, right: 60, textAlign: "center", fontFamily: TITULAR, fontWeight: 800, fontSize: 92, lineHeight: 1.1 }}>
      <span style={outline}>en </span>
      <span style={outline}>Meta </span>
      <span
        style={{
          display: "inline-block",
          background: C.lima,
          color: C.carbon,
          border: `6px solid ${C.carbon}`,
          borderRadius: 24,
          padding: "0 22px 6px",
          transform: "rotate(-4deg) scale(1.12)",
          boxShadow: `8px 8px 0 ${C.carbon}`,
        }}
      >
        Ads
      </span>
    </div>
    <div style={{ position: "absolute", top: 1330, left: 90, right: 90, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Chip name="Lonas" rot={-4} />
      <Chip name="Flyers" rot={3} />
      <Chip name="Meta Ads" rot={-2} big />
    </div>
    <Coin x={880} y={1260} size={70} rot={20} />
    <Coin x={960} y={1180} size={50} rot={-15} />
  </>
);

// B: stickers. Cada frase es una calcomanía inclinada, más una encuesta para comentar
const OpcionB: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 1100, left: 0, width: 1080, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ background: C.arena, border: `5px solid ${C.carbon}`, borderRadius: 22, padding: "8px 26px 12px", fontFamily: APOYO, fontWeight: 600, fontSize: 50, color: C.carbon, transform: "rotate(-3deg)", boxShadow: `8px 8px 0 ${C.carbon}` }}>
        que gasten un buen
      </div>
      <div style={{ background: C.lima, border: `5px solid ${C.carbon}`, borderRadius: 22, padding: "8px 30px 14px", fontFamily: TITULAR, fontWeight: 800, fontSize: 74, color: C.carbon, transform: "rotate(3deg)", boxShadow: `10px 10px 0 ${C.carbon}` }}>
        en Meta Ads
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        top: 1340,
        left: 140,
        width: 800,
        background: C.blanco,
        border: `5px solid ${C.carbon}`,
        borderRadius: 34,
        boxShadow: `12px 12px 0 ${C.lila}`,
        padding: "22px 28px",
        boxSizing: "border-box",
        transform: "rotate(-1.5deg)",
      }}
    >
      <div style={{ fontFamily: TITULAR, fontWeight: 800, fontSize: 38, color: C.carbon, marginBottom: 16 }}>¿Tu negocio también paga por flyers?</div>
      <div style={{ display: "flex", gap: 18 }}>
        {[
          ["Sí", C.lima],
          ["No", C.arena],
        ].map(([t, bg]) => (
          <div key={t} style={{ flex: 1, height: 70, borderRadius: 35, border: `4px solid ${C.carbon}`, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TITULAR, fontWeight: 800, fontSize: 36, color: C.carbon }}>
            {t}
          </div>
        ))}
      </div>
      {/* Dedo que toca la opción */}
      <svg width={70} height={84} viewBox="0 0 50 64" style={{ position: "absolute", left: 250, top: 110 }}>
        <path d="M4 4 L4 50 L16 39 L25 58 L34 54 L25 35 L42 35 Z" fill={C.blanco} stroke={C.carbon} strokeWidth={4} strokeLinejoin="round" />
      </svg>
      <div style={{ position: "absolute", left: 210, top: 92, width: 90, height: 90, borderRadius: 45, border: `5px solid ${C.lima}` }} />
    </div>
  </>
);

// C: palabra gigante. La frase chica arriba y la palabra clave enorme, con zoom al video
const OpcionC: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 1080, left: 0, width: 1080, display: "flex", justifyContent: "center" }}>
      <div style={{ background: C.carbon, borderRadius: 30, padding: "8px 26px 12px", fontFamily: APOYO, fontWeight: 600, fontSize: 46, color: C.blanco }}>que gasten un buen en</div>
    </div>
    <div style={{ position: "absolute", top: 1170, left: 0, width: 1080, textAlign: "center", fontFamily: TITULAR, fontWeight: 800, fontSize: 168, lineHeight: 1, transform: "rotate(-4deg)" }}>
      <span style={{ color: C.lima, WebkitTextStroke: `14px ${C.carbon}`, paintOrder: "stroke fill", textShadow: `12px 12px 0 ${C.carbon}` }}>META ADS</span>
    </div>
    <Coin x={150} y={1150} size={90} rot={-20} />
    <Coin x={985} y={1045} size={64} rot={25} />
    <Coin x={210} y={1440} size={60} rot={10} />
    <Coin x={880} y={1430} size={84} rot={-8} />
    <div style={{ position: "absolute", top: 1400, left: 0, width: 1080, display: "flex", justifyContent: "center", gap: 20 }}>
      {["Lonas", "Flyers"].map((n) => (
        <div key={n} style={{ background: C.arena, border: `4px solid ${C.carbon}`, borderRadius: 30, padding: "6px 22px", fontFamily: TITULAR, fontWeight: 800, fontSize: 34, color: C.carbon, textDecoration: "line-through", textDecorationColor: C.carbon, opacity: 0.85 }}>
          {n}
        </div>
      ))}
    </div>
  </>
);

export const Opcion: React.FC<{ opcion: "A" | "B" | "C" }> = ({ opcion }) => {
  useBrandFonts();
  const zoom = opcion === "C" ? 1.12 : 1;
  return (
    <AbsoluteFill style={{ background: C.arena }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "540px 600px" }}>
        <OffthreadVideo src={staticFile("toma.mp4")} startFrom={FRAME} />
      </AbsoluteFill>
      {opcion === "A" && <OpcionA />}
      {opcion === "B" && <OpcionB />}
      {opcion === "C" && <OpcionC />}
    </AbsoluteFill>
  );
};
