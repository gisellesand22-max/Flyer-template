import React from "react";
import { Face, FEATURES } from "./Face";
import { C, PIXEL, POPPINS, prog, usePop, useT } from "./theme";

// Medidas internas de la tarjeta (840 x 340 menos el borde)
export const W = 828;
export const H = 328;

const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", left: 0, top: 0 }}>
    {children}
  </svg>
);

const Label: React.FC<{ x: number; y: number; k: number; children: React.ReactNode; size?: number }> = ({ x, y, k, children, size = 34 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      fontFamily: POPPINS,
      fontWeight: 600,
      fontSize: size,
      color: C.ciruela,
      opacity: Math.min(k * 1.5, 1),
      transform: `translateX(${(1 - k) * 20}px)`,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

// Sello pixel: el único acento pixel de la escena
const Stamp: React.FC<{ x: number; y: number; k: number; text: string; dark?: boolean; rot?: number; size?: number }> = ({ x, y, k, text, dark, rot = -6, size = 56 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      fontFamily: PIXEL,
      fontSize: size,
      padding: "8px 24px 12px",
      borderRadius: 12,
      background: dark ? C.ciruela : C.aqua,
      color: dark ? C.blanco : C.ciruela,
      border: `5px solid ${C.ciruela}`,
      transform: `rotate(${rot}deg) scale(${k > 0 ? 1.6 - 0.6 * k : 0})`,
      opacity: Math.min(k * 2, 1),
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </div>
);

// 0,45 a 2,2 s: el gancho. El título se escribe y los puntos de la contraseña se vuelven una cara.
const TITLE: [string, number][] = [
  ["Tu", 0.5],
  ["cara", 1.02],
  ["ya", 1.26],
  ["es", 1.48],
  ["una", 1.58],
  ["contraseña", 1.72],
];
export const HookScene: React.FC = () => {
  const t = useT();
  const field = usePop(0.7);
  const face = usePop(1.75, 9);
  const dotsK = 1 - prog(t, 1.72, 1.85);
  return (
    <div style={{ position: "absolute", inset: 0, background: C.ciruela, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26 }}>
      <div style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 60, lineHeight: 1.12, color: C.blanco, textAlign: "center", padding: "0 30px" }}>
        {TITLE.map(([w, at], i) => (
          <span key={i} style={{ display: "inline-block", marginRight: i < TITLE.length - 1 ? "0.25em" : 0, opacity: t >= at - 0.05 ? 1 : 0, color: i === TITLE.length - 1 ? C.aqua : C.blanco }}>
            {w}
          </span>
        ))}
      </div>
      <div
        style={{
          width: 520,
          height: 92,
          borderRadius: 46,
          background: C.blanco,
          border: `5px solid ${C.aqua}`,
          display: "flex",
          alignItems: "center",
          gap: 22,
          padding: "0 30px",
          boxSizing: "border-box",
          transform: `scale(${field})`,
          position: "relative",
        }}
      >
        <svg width={44} height={52} viewBox="0 0 44 52">
          <path d="M10 22 V15 a12 12 0 0 1 24 0 V22" fill="none" stroke={C.ciruela} strokeWidth={6} strokeLinecap="round" />
          <rect x={3} y={22} width={38} height={28} rx={7} fill={C.ciruela} />
        </svg>
        <div style={{ display: "flex", gap: 18 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ width: 24, height: 24, borderRadius: 12, background: C.ciruela, transform: `scale(${dotsK})` }} />
          ))}
        </div>
        {t >= 1.75 && (
          <svg width={110} height={110} viewBox="0 0 110 110" style={{ position: "absolute", left: 230, top: -14, transform: `scale(${face})` }}>
            <Face cx={55} cy={55} r={46} eyes={1} mouth={1} />
          </svg>
        )}
      </div>
    </div>
  );
};

// 2,2 a 7,6 s: escaneo, medidas y rasgos
export const ScanScene: React.FC = () => {
  const t = useT();
  const scanPass = (t - 2.5) / 1.2;
  const scan = t >= 2.5 && t < 4.9 ? scanPass - Math.floor(scanPass) : -1;
  const mide = usePop(2.82);
  const bar = prog(t, 2.82, 5.0);
  const ojos = usePop(6.16, 10);
  const nariz = usePop(6.72, 10);
  const boca = usePop(7.16, 10);
  const r = 120;
  const cx = 190;
  const cy = 170;
  const rows: [string, number, keyof typeof FEATURES][] = [
    ["Ojos", ojos, "eyeR"],
    ["Nariz", nariz, "nose"],
    ["Boca", boca, "mouth"],
  ];
  const showRasgos = t >= 6.0;
  return (
    <>
      <Svg>
        <Face
          cx={cx}
          cy={cy}
          r={r}
          scan={scan}
          box={prog(t, 3.44, 3.7)}
          dist={prog(t, 4.22, 4.9)}
          dots={prog(t, 5.06, 5.2)}
          eyes={t >= 6.16 ? 1 : 0}
          nose={t >= 6.72 ? 1 : 0}
          mouth={t >= 7.16 ? 1 : 0}
        />
        {showRasgos &&
          rows.map(([, k, f], i) => {
            const fx = cx + FEATURES[f][0] * r;
            const fy = cy + FEATURES[f][1] * r;
            const ly = 82 + i * 82;
            return k > 0 ? (
              <path key={i} d={`M${fx} ${fy} L${fx + (420 - fx) * k} ${fy + (ly - fy) * k}`} stroke={C.ciruela} strokeWidth={3} fill="none" />
            ) : null;
          })}
      </Svg>
      {!showRasgos && (
        <>
          <Label x={400} y={70} k={mide} size={44}>
            Midiendo
          </Label>
          <div style={{ position: "absolute", left: 400, top: 150, width: 360, height: 30, borderRadius: 15, border: `4px solid ${C.ciruela}`, opacity: mide, boxSizing: "border-box" }}>
            <div style={{ width: `${bar * 100}%`, height: "100%", borderRadius: 15, background: C.aqua }} />
          </div>
          <Label x={400} y={206} k={usePopSafe(t, 3.44)} size={34}>
            Tamaño y distancia
          </Label>
        </>
      )}
      {showRasgos &&
        rows.map(([name, k], i) => (
          <div
            key={name}
            style={{
              position: "absolute",
              left: 430,
              top: 54 + i * 82,
              padding: "6px 26px",
              borderRadius: 30,
              background: C.ciruela,
              color: C.blanco,
              fontFamily: POPPINS,
              fontWeight: 600,
              fontSize: 36,
              transform: `scale(${k})`,
              transformOrigin: "left center",
            }}
          >
            {name}
          </div>
        ))}
    </>
  );
};

// Aparición lineal simple para usar dentro de condiciones
const usePopSafe = (t: number, at: number) => prog(t, at, at + 0.25);

// 7,6 a 9,4 s: compara con otra foto tuya
export const CompareScene: React.FC = () => {
  const t = useT();
  const photo = usePop(7.74);
  const lines = prog(t, 8.06, 8.8);
  const r = 100;
  const a = { cx: 200, cy: 150 };
  const b = { cx: 628, cy: 150 };
  return (
    <>
      <Svg>
        <Face cx={a.cx} cy={a.cy} r={r} dots={1} />
        <g transform={`translate(${b.cx} ${b.cy}) scale(${photo}) translate(${-b.cx} ${-b.cy})`}>
          <rect x={b.cx - 120} y={b.cy - 128} width={240} height={256} rx={20} fill={C.ciruelaTinte} stroke={C.ciruela} strokeWidth={5} />
          <Face cx={b.cx} cy={b.cy + 6} r={r} dots={1} />
        </g>
        {Object.values(FEATURES).map(([fx, fy], i) => {
          const x1 = a.cx + fx * r;
          const y1 = a.cy + fy * r;
          const x2 = b.cx + fx * r;
          const y2 = b.cy + 6 + fy * r;
          const k = Math.min(Math.max(lines * 4 - i, 0), 1);
          return <line key={i} x1={x1} y1={y1} x2={x1 + (x2 - x1) * k} y2={y1 + (y2 - y1) * k} stroke={C.ciruela} strokeWidth={3} strokeDasharray="10 7" />;
        })}
      </Svg>
      <Label x={168} y={276} k={1} size={30}>
        Tú
      </Label>
      <Label x={516} y={276} k={photo} size={30}>
        Otra foto tuya
      </Label>
    </>
  );
};

// 9,4 a 11,4 s: si coincide, pasas; si no, no
export const MatchScene: React.FC = () => {
  const t = useT();
  const open = t >= 10.04 && t < 11.16;
  const shackle = open ? prog(t, 10.04, 10.2) : 1 - prog(t, 11.16, 11.26);
  const pasas = usePop(10.04, 8);
  const no = usePop(11.16, 8);
  const denied = t >= 11.16;
  return (
    <>
      <Svg>
        <g transform="translate(250 175)">
          <path
            d={`M-58 -10 V${-60 - shackle * 40} a58 58 0 0 1 116 0 V-10`}
            fill="none"
            stroke={C.ciruela}
            strokeWidth={22}
            strokeLinecap="round"
          />
          <rect x={-95} y={-20} width={190} height={150} rx={28} fill={denied ? C.ciruela : open ? C.aqua : C.ciruela} stroke={C.ciruela} strokeWidth={6} />
          {open && <path d="M-40 55 L-10 85 L45 25" fill="none" stroke={C.ciruela} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />}
          {denied && <path d="M-35 20 L35 90 M35 20 L-35 90" fill="none" stroke={C.blanco} strokeWidth={14} strokeLinecap="round" />}
          {!open && !denied && <circle cx={0} cy={50} r={16} fill={C.aqua} />}
        </g>
      </Svg>
      {open && <Stamp x={440} y={110} k={pasas} text="PASAS" />}
      {denied && <Stamp x={500} y={110} k={no} text="NO" dark />}
    </>
  );
};

// 11,4 a 14,45 s: al final es un modelo matemático (el efecto retro del video)
export const PixelScene: React.FC = () => {
  const t = useT();
  return (
    <Svg>
      <Face cx={414} cy={164} r={140} dots={1 - prog(t, 11.9, 12.1)} pixel={prog(t, 11.92, 12.7)} />
    </Svg>
  );
};

// 14,48 a 15,88 s: encuesta visual
export const PollScene: React.FC = () => {
  const t = useT();
  const title = usePop(14.48);
  const si = usePop(14.7);
  const no = usePop(14.85);
  const wiggle = Math.sin(t * 7) * 60;
  const btn = (k: number, filled: boolean): React.CSSProperties => ({
    width: 280,
    height: 96,
    borderRadius: 48,
    border: `6px solid ${C.ciruela}`,
    background: filled ? C.aqua : C.blanco,
    color: C.ciruela,
    fontFamily: POPPINS,
    fontWeight: 700,
    fontSize: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: `scale(${k})`,
    boxSizing: "border-box",
  });
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
      <div style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 64, color: C.ciruela, transform: `scale(${title})` }}>¿Aceptarías?</div>
      <div style={{ display: "flex", gap: 40, position: "relative" }}>
        <div style={btn(si, true)}>Sí</div>
        <div style={btn(no, false)}>No</div>
        <svg width={50} height={64} viewBox="0 0 50 64" style={{ position: "absolute", left: 290 + wiggle, top: 52, opacity: no }}>
          <path d="M4 4 L4 50 L16 39 L25 58 L34 54 L25 35 L42 35 Z" fill={C.blanco} stroke={C.ciruela} strokeWidth={4} strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

// 15,88 a 16,98 s: tu cara como llave para todo
export const KeyScene: React.FC = () => {
  const t = useT();
  const key = usePop(15.9, 10);
  const turn = prog(t, 16.3, 16.55);
  const icons = [usePop(16.7, 9), usePop(16.76, 9), usePop(16.82, 9), usePop(16.88, 9)];
  const spots: [number, number][] = [
    [560, 80],
    [720, 80],
    [560, 240],
    [720, 240],
  ];
  return (
    <Svg>
      <g transform={`translate(${60 + 40 * key} 164) rotate(${turn * -20})`}>
        <line x1={150} y1={0} x2={380} y2={0} stroke={C.ciruela} strokeWidth={26} strokeLinecap="round" />
        <path d="M330 0 V40 M370 0 V30" stroke={C.ciruela} strokeWidth={22} strokeLinecap="round" />
        <g transform="translate(80 0)">
          <circle r={86} fill={C.aqua} stroke={C.ciruela} strokeWidth={8} />
          <Face cx={0} cy={4} r={58} eyes={1} mouth={1} />
        </g>
      </g>
      {spots.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${icons[i]})`}>
          <circle r={62} fill={C.ciruela} />
          {i === 0 && (
            <g fill="none" stroke={C.blanco} strokeWidth={6} strokeLinecap="round">
              <rect x={-20} y={-34} width={40} height={68} rx={8} />
              <line x1={-6} y1={24} x2={6} y2={24} />
            </g>
          )}
          {i === 1 && (
            <g fill="none" stroke={C.blanco} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round">
              <path d="M-34 -10 L0 -34 L34 -10 Z" />
              <path d="M-24 -6 V22 M-8 -6 V22 M8 -6 V22 M24 -6 V22 M-34 30 H34" />
            </g>
          )}
          {i === 2 && (
            <g fill="none" stroke={C.blanco} strokeWidth={6} strokeLinejoin="round">
              <rect x={-24} y={-36} width={48} height={72} rx={4} />
              <circle cx={12} cy={2} r={4} fill={C.blanco} />
            </g>
          )}
          {i === 3 && (
            <path
              d="M-4 -34 Q4 -34 4 -24 V-6 L32 8 V18 L4 10 V24 L14 32 V38 L0 34 L-14 38 V32 L-4 24 V10 L-32 18 V8 L-4 -6 V-24 Q-4 -34 -4 -34 Z"
              fill={C.blanco}
            />
          )}
        </g>
      ))}
    </Svg>
  );
};

// 16,98 a 22,35 s: credencial genérica de la CURP biométrica
export const CurpScene: React.FC = () => {
  const t = useT();
  const card = usePop(17.0);
  const tag = usePop(18.44, 8);
  const rostro = usePop(20.12, 9);
  const huella = usePop(20.78, 9);
  const iris = usePop(21.78, 9);
  const slot = (x: number, k: number, label: string, child: React.ReactNode) => (
    <div style={{ position: "absolute", left: x, top: 108, width: 200, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: 22,
          border: `4px dashed ${C.ciruela}`,
          background: k > 0.05 ? C.aqua : C.blanco,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <div style={{ transform: `scale(${k})` }}>{child}</div>
      </div>
      <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 30, color: C.ciruela, opacity: Math.min(k * 2, 1) }}>{label}</div>
    </div>
  );
  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${0.85 + 0.15 * card})`, opacity: Math.min(card * 2, 1) }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 86, background: C.ciruela, display: "flex", alignItems: "center", paddingLeft: 34, boxSizing: "border-box" }}>
        <span style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 48, color: C.blanco }}>CURP biométrica</span>
      </div>
      {t >= 18.44 && <Stamp x={472} y={16} k={tag} text="YA SE USA" rot={-4} size={38} />}
      {slot(
        60,
        rostro,
        "Rostro",
        <svg width={110} height={110} viewBox="0 0 110 110">
          <Face cx={55} cy={57} r={46} />
        </svg>,
      )}
      {slot(
        314,
        huella,
        "Huellas",
        <svg width={100} height={110} viewBox="0 0 100 110">
          <g fill="none" stroke={C.ciruela} strokeWidth={5} strokeLinecap="round">
            {[12, 22, 32, 42].map((rr) => (
              <path key={rr} d={`M${50 - rr} ${66} Q${50 - rr} ${66 - rr * 1.5} 50 ${66 - rr * 1.5} Q${50 + rr} ${66 - rr * 1.5} ${50 + rr} ${66} V${66 + rr * 0.5}`} />
            ))}
          </g>
        </svg>,
      )}
      {slot(
        568,
        iris,
        "Iris",
        <svg width={120} height={90} viewBox="0 0 120 90">
          <path d="M8 45 Q60 -8 112 45 Q60 98 8 45 Z" fill={C.blanco} stroke={C.ciruela} strokeWidth={6} strokeLinejoin="round" />
          <circle cx={60} cy={45} r={22} fill={C.ciruela} />
          <circle cx={60} cy={45} r={9} fill={C.aqua} />
        </svg>,
      )}
    </div>
  );
};

