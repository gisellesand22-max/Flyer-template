import React from "react";
import { C, POPPINS, progress, typed, usePop, useSec } from "./theme";

// Medidas internas de la tarjeta (840 x 340 menos el borde)
const W = 828;
const H = 328;

const Check: React.FC<{ x: number; y: number; r: number; k: number }> = ({ x, y, r, k }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}>
    <circle r={r} fill={C.aqua} stroke={C.plum} strokeWidth={5} />
    <path
      d={`M${-r * 0.45} 0 L${-r * 0.1} ${r * 0.35} L${r * 0.5} ${-r * 0.35}`}
      fill="none"
      stroke={C.plum}
      strokeWidth={r * 0.22}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>
);

// Persona genérica dentro de un círculo aqua
const Avatar: React.FC<{ cx: number; cy: number; r: number; id: string }> = ({ cx, cy, r, id }) => (
  <g>
    <clipPath id={id}>
      <circle cx={cx} cy={cy} r={r} />
    </clipPath>
    <circle cx={cx} cy={cy} r={r} fill={C.aqua} />
    <g clipPath={`url(#${id})`}>
      <circle cx={cx} cy={cy - r * 0.22} r={r * 0.36} fill={C.plum} />
      <ellipse cx={cx} cy={cy + r * 0.85} rx={r * 0.7} ry={r * 0.55} fill={C.plum} />
    </g>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.plum} strokeWidth={5} />
  </g>
);

// Flecha que se dibuja de (x1,y) a (x2,y) según `p` (0 a 1)
const Arrow: React.FC<{ x1: number; x2: number; y: number; p: number }> = ({ x1, x2, y, p }) => {
  if (p <= 0) return null;
  const x = x1 + (x2 - x1) * p;
  const dir = Math.sign(x2 - x1);
  return (
    <g stroke={C.plum} strokeWidth={7} strokeLinecap="round" fill="none">
      <line x1={x1} y1={y} x2={x} y2={y} />
      {p > 0.9 && <path d={`M${x - dir * 18} ${y - 16} L${x} ${y} L${x - dir * 18} ${y + 16}`} strokeLinejoin="round" />}
    </g>
  );
};

const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", left: 0, top: 0 }}>
    {children}
  </svg>
);

// 0 a 5,9 s: laptop que se abre, ofertas remotas, monedas y clic en "Aplicar"
export const LaptopScene: React.FC = () => {
  const t = useSec();
  const lid = usePop(0.35, 14);
  const row0 = usePop(1.82);
  const row1 = usePop(2.0);
  const row2 = usePop(2.2);
  const remote = usePop(2.22, 9);
  const globe = usePop(2.3, 10);
  const coin1 = usePop(3.02, 8);
  const coin2 = usePop(3.25, 8);
  const pin = usePop(5.14, 8);
  const clicked = t >= 4.42;
  const ring = progress(t, 4.42, 4.8);
  const cur = progress(t, 3.85, 4.4);
  const cx = 700 + (520 - 700) * cur;
  const cy = 300 + (96 - 300) * cur;
  const rows = [row0, row1, row2];

  return (
    <Svg>
      {/* Pantalla con bisagra abajo */}
      <g transform={`translate(0 244) scale(1 ${lid}) translate(0 -244)`}>
        <rect x={244} y={14} width={340} height={230} rx={16} fill={C.plum} />
        <rect x={258} y={28} width={312} height={202} rx={6} fill={C.white} />
        <rect x={258} y={28} width={312} height={24} fill={C.plumTint} />
        {[274, 290, 306].map((x) => (
          <circle key={x} cx={x} cy={40} r={5} fill={C.plum} opacity={0.5} />
        ))}
        {rows.map((k, i) => {
          const y = 64 + i * 56;
          return (
            <g key={i} opacity={Math.min(k * 1.4, 1)} transform={`translate(${(1 - k) * 60} 0)`}>
              <circle cx={284} cy={y + 20} r={15} fill={C.plumTint} stroke={C.plum} strokeWidth={3} />
              <rect x={308} y={y + 6} width={140} height={13} rx={6} fill={C.plum} />
              {i === 0 ? (
                <g transform={`translate(308 ${y + 24}) scale(${remote})`}>
                  <rect width={88} height={22} rx={11} fill={C.aqua} stroke={C.plum} strokeWidth={2} />
                  <text x={44} y={16} textAnchor="middle" fontFamily={POPPINS} fontWeight={700} fontSize={14} fill={C.plum}>
                    Remoto
                  </text>
                </g>
              ) : (
                <rect x={308} y={y + 27} width={96} height={10} rx={5} fill={C.plumTint} />
              )}
              {i === 0 && (
                <g>
                  {clicked && (
                    <circle cx={520} cy={y + 20} r={30 + ring * 30} fill="none" stroke={C.aqua} strokeWidth={6} opacity={1 - ring} />
                  )}
                  <rect x={478} y={y + 4} width={84} height={32} rx={16} fill={clicked ? C.aqua : C.plum} stroke={C.plum} strokeWidth={3} />
                  <text x={520} y={y + 26} textAnchor="middle" fontFamily={POPPINS} fontWeight={700} fontSize={15} fill={clicked ? C.plum : C.white}>
                    Aplicar
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </g>
      {/* Base */}
      <path d="M200 244 H628 L690 286 Q692 296 680 296 H148 Q136 296 138 286 Z" fill={C.plum} />
      <rect x={370} y={250} width={88} height={10} rx={5} fill={C.aqua} />

      {/* Monedas */}
      {[
        { k: coin1, x: 110, y: 110 },
        { k: coin2, x: 160, y: 205 },
      ].map(({ k, x, y }, i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${k})`}>
          <circle r={44} fill={C.aqua} stroke={C.plum} strokeWidth={6} />
          <circle r={32} fill="none" stroke={C.plum} strokeWidth={3} opacity={0.5} />
          <text y={17} textAnchor="middle" fontFamily={POPPINS} fontWeight={700} fontSize={48} fill={C.plum}>
            $
          </text>
        </g>
      ))}

      {/* Globo: trabajo desde cualquier lugar */}
      <g transform={`translate(720 140) scale(${globe})`}>
        <circle r={62} fill={C.aqua} stroke={C.plum} strokeWidth={6} />
        <ellipse rx={26} ry={62} fill="none" stroke={C.plum} strokeWidth={4} />
        <line x1={-62} y1={0} x2={62} y2={0} stroke={C.plum} strokeWidth={4} />
        <path d="M-54 -30 Q0 -18 54 -30 M-54 30 Q0 18 54 30" fill="none" stroke={C.plum} strokeWidth={4} />
        <g transform={`translate(18 -40) scale(${pin})`}>
          <path d="M0 -44 C-20 -44 -30 -30 -30 -16 C-30 6 0 26 0 26 C0 26 30 6 30 -16 C30 -30 20 -44 0 -44 Z" fill={C.plum} stroke={C.white} strokeWidth={4} />
          <circle cy={-17} r={10} fill={C.aqua} />
        </g>
      </g>

      {/* Cursor */}
      {t >= 3.85 && (
        <path
          transform={`translate(${cx} ${cy}) scale(${clicked && t < 4.6 ? 0.85 : 1})`}
          d="M0 0 L0 44 L12 33 L21 52 L30 48 L21 29 L37 29 Z"
          fill={C.white}
          stroke={C.plum}
          strokeWidth={4}
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
};

const chip = (bg: string, fg: string): React.CSSProperties => ({
  background: bg,
  color: fg,
  border: `5px solid ${C.plum}`,
  borderRadius: 44,
  padding: "10px 28px",
  fontFamily: POPPINS,
  fontWeight: 700,
  fontSize: 38,
  whiteSpace: "nowrap",
});

// 6,3 a 14,7 s: diana con dardo y cambio de rol Marketing → IA
export const TargetScene: React.FC = () => {
  const t = useSec();
  const fly = progress(t, 6.62, 6.96);
  const hit = usePop(6.96, 6);
  const label = usePop(6.96);
  const mk = usePop(10.5);
  const arrow = progress(t, 11.6, 12.1);
  const ia = usePop(13.58, 8);
  const sub = usePop(12.76);
  const dx = 150 + (430 - 150) * (1 - fly);
  const dy = 164 + (-80 - 164) * (1 - fly);

  return (
    <>
      <Svg>
        <g transform={`translate(150 164) scale(${1 + 0.06 * Math.sin(hit * Math.PI)})`}>
          <circle r={124} fill={C.plum} />
          <circle r={92} fill={C.white} />
          <circle r={60} fill={C.plum} />
          <circle r={28} fill={C.aqua} />
        </g>
        {t >= 6.62 && (
          <g transform={`translate(${dx} ${dy})`}>
            <line x1={0} y1={0} x2={86} y2={-62} stroke={C.plum} strokeWidth={10} strokeLinecap="round" />
            <path d="M70 -50 L112 -60 L96 -94 Z" fill={C.aqua} stroke={C.plum} strokeWidth={4} strokeLinejoin="round" />
            <circle r={7} fill={C.plum} />
          </g>
        )}
        <g transform={`translate(0 0)`}>
          <Arrow x1={545} x2={600} y={178} p={arrow} />
        </g>
      </Svg>
      <div style={{ position: "absolute", left: 310, top: 36, opacity: label, fontFamily: POPPINS, fontWeight: 700, fontSize: 44, color: C.plum }}>
        Tu puesto
      </div>
      <div style={{ position: "absolute", left: 300, top: 140, transform: `scale(${mk})`, opacity: ia > 0.5 ? 0.55 : 1, ...chip(C.white, C.plum) }}>
        Marketing
      </div>
      <div style={{ position: "absolute", left: 620, top: 132, transform: `scale(${ia})`, ...chip(C.aqua, C.plum), fontSize: 46 }}>
        IA
      </div>
      <div style={{ position: "absolute", left: 312, top: 240, opacity: sub, fontFamily: POPPINS, fontWeight: 600, fontSize: 32, color: C.plum }}>
        Un rol más específico
      </div>
    </>
  );
};

// 14,8 a 19,9 s: dónde, industria y salario
export const CriteriaScene: React.FC = () => {
  const pin = usePop(15.92, 8);
  const ind = usePop(17.64, 8);
  const pay = usePop(18.72, 8);
  const items = [
    { k: pin, x: 138, label: "Dónde" },
    { k: ind, x: 414, label: "Industria" },
    { k: pay, x: 690, label: "Salario" },
  ];
  return (
    <>
      <Svg>
        {items.map(({ x }) => (
          <circle key={x} cx={x} cy={124} r={84} fill="none" stroke={C.plumLine} strokeWidth={4} strokeDasharray="12 10" />
        ))}
        <g transform={`translate(138 124) scale(${pin})`}>
          <path d="M0 -70 C-34 -70 -52 -44 -52 -20 C-52 20 0 66 0 66 C0 66 52 20 52 -20 C52 -44 34 -70 0 -70 Z" fill={C.plum} />
          <circle cy={-20} r={20} fill={C.aqua} />
        </g>
        <g transform={`translate(414 124) scale(${ind})`}>
          <rect x={-52} y={-62} width={70} height={124} rx={6} fill={C.plum} />
          <rect x={18} y={-22} width={40} height={84} rx={6} fill={C.plum} opacity={0.75} />
          {[-46, -14, 18].map((y) =>
            [-38, -10].map((x) => <rect key={`${x}${y}`} x={x} y={y} width={18} height={20} rx={3} fill={C.aqua} />),
          )}
          <rect x={-26} y={42} width={20} height={20} fill={C.white} />
        </g>
        <g transform={`translate(690 124) scale(${pay})`}>
          <rect x={-70} y={-42} width={140} height={84} rx={12} fill={C.aqua} stroke={C.plum} strokeWidth={6} />
          <circle r={26} fill={C.plum} />
          <text y={13} textAnchor="middle" fontFamily={POPPINS} fontWeight={700} fontSize={36} fill={C.white}>
            $
          </text>
          <circle cx={-48} cy={0} r={6} fill={C.plum} />
          <circle cx={48} cy={0} r={6} fill={C.plum} />
        </g>
      </Svg>
      {items.map(({ k, x, label }) => (
        <div
          key={label}
          style={{
            position: "absolute",
            left: x - 130,
            width: 260,
            top: 228,
            textAlign: "center",
            opacity: Math.min(k * 1.5, 1),
            fontFamily: POPPINS,
            fontWeight: 700,
            fontSize: 38,
            color: C.plum,
          }}
        >
          {label}
        </div>
      ))}
    </>
  );
};

// 19,9 a 28,7 s: CV que se escribe, vacante, IA que lo adapta
export const CvScene: React.FC = () => {
  const t = useSec();
  const vac = usePop(21.06);
  const ia = usePop(25.64, 8);
  const done = usePop(28.24, 7);
  const lines = [180, 150, 172, 120, 164, 138];
  const writeStart = 20.3;
  const per = 0.5;
  const current = Math.min(Math.floor((t - writeStart) / per), lines.length - 1);
  const ticks = [22.16, 22.5, 22.84].map((s) => progress(t, s, s + 0.15));
  const spin = t * 90;

  return (
    <Svg>
      {/* Hoja del CV */}
      <path d="M30 18 H210 L252 60 V312 H30 Z" fill={C.white} stroke={C.plum} strokeWidth={6} strokeLinejoin="round" />
      <path d="M210 18 V60 H252" fill={C.plumTint} stroke={C.plum} strokeWidth={4} strokeLinejoin="round" />
      <Avatar cx={76} cy={68} r={26} id="cv-avatar" />
      <text x={114} y={80} fontFamily={POPPINS} fontWeight={700} fontSize={32} fill={C.plum}>
        CV
      </text>
      {lines.map((full, i) => {
        const y = 124 + i * 30;
        const w = full * progress(t, writeStart + i * per, writeStart + (i + 1) * per);
        const hl = progress(t, 25.95 + i * 0.19, 26.15 + i * 0.19);
        return (
          <g key={i}>
            <rect x={44} y={y - 11} width={(full + 12) * hl} height={22} rx={6} fill={C.aqua} />
            <rect x={50} y={y - 5} width={w} height={10} rx={5} fill={C.plum} />
          </g>
        );
      })}
      {/* Lápiz que escribe */}
      {t >= writeStart && t < writeStart + lines.length * per && current >= 0 && (
        <g
          transform={`translate(${50 + lines[current] * progress(t, writeStart + current * per, writeStart + (current + 1) * per)} ${124 + current * 30})`}
        >
          <path d="M0 0 L8 -20 L44 -56 L56 -44 L20 -8 Z" fill={C.plum} />
          <path d="M0 0 L8 -20 L20 -8 Z" fill={C.aqua} />
        </g>
      )}

      {/* Vacante */}
      <g transform={`translate(688 165) scale(${vac}) translate(-688 -165)`} opacity={Math.min(vac * 1.5, 1)}>
        <rect x={578} y={18} width={220} height={294} rx={22} fill={C.plum} />
        <text x={600} y={70} fontFamily={POPPINS} fontWeight={700} fontSize={34} fill={C.white}>
          Vacante
        </text>
        {ticks.map((k, i) => {
          const y = 130 + i * 56;
          return (
            <g key={i}>
              <circle cx={612} cy={y} r={15} fill={k > 0 ? C.aqua : "none"} stroke={C.aqua} strokeWidth={4} />
              {k > 0 && (
                <path d={`M604 ${y} L610 ${y + 6} L621 ${y - 6}`} fill="none" stroke={C.plum} strokeWidth={4} strokeLinecap="round" opacity={k} />
              )}
              <rect x={638} y={y - 7} width={136 - i * 20} height={14} rx={7} fill={C.white} />
            </g>
          );
        })}
      </g>

      {/* IA que conecta vacante y CV */}
      <Arrow x1={570} x2={498} y={165} p={progress(t, 25.8, 26.1)} />
      <Arrow x1={330} x2={262} y={165} p={progress(t, 26.5, 26.8)} />
      <g transform={`translate(414 165) scale(${ia})`}>
        {[0, 1, 2, 3].map((i) => {
          const a = ((spin + i * 90) * Math.PI) / 180;
          return (
            <path
              key={i}
              transform={`translate(${Math.cos(a) * 96} ${Math.sin(a) * 96})`}
              d="M0 -14 Q2 -2 14 0 Q2 2 0 14 Q-2 2 -14 0 Q-2 -2 0 -14 Z"
              fill={C.plum}
            />
          );
        })}
        <circle r={70} fill={C.aqua} stroke={C.plum} strokeWidth={6} />
        <text y={21} textAnchor="middle" fontFamily={POPPINS} fontWeight={700} fontSize={60} fill={C.plum}>
          IA
        </text>
      </g>
      {t >= 28.24 && <Check x={238} y={40} r={32} k={done} />}
    </Svg>
  );
};

// 28,7 a 30,9 s: perfil con interruptor "Activo"
export const ProfileActiveScene: React.FC = () => {
  const t = useSec();
  const on = usePop(29.78, 10);
  const pulse = progress(t, 29.9, 30.7);
  return (
    <>
      <Svg>
        {t >= 29.9 && <circle cx={150} cy={164} r={100 + pulse * 40} fill="none" stroke={C.aqua} strokeWidth={10} opacity={1 - pulse} />}
        <Avatar cx={150} cy={164} r={100} id="profile-avatar" />
        <rect x={300} y={92} width={300} height={16} rx={8} fill={C.plumTint} />
        <rect x={300} y={124} width={220} height={16} rx={8} fill={C.plumTint} />
        <rect x={300} y={196} width={160} height={76} rx={38} fill={on > 0.5 ? C.aqua : C.plumTint} stroke={C.plum} strokeWidth={6} />
        <circle cx={338 + 84 * on} cy={234} r={28} fill={C.plum} />
      </Svg>
      <div style={{ position: "absolute", left: 300, top: 26, fontFamily: POPPINS, fontWeight: 700, fontSize: 42, color: C.plum }}>
        Tu perfil
      </div>
      <div
        style={{
          position: "absolute",
          left: 486,
          top: 200,
          fontFamily: POPPINS,
          fontWeight: 700,
          fontSize: 46,
          color: C.plum,
          opacity: on,
          transform: `translateX(${(1 - on) * 30}px)`,
        }}
      >
        Activo
      </div>
    </>
  );
};

// 30,9 a 41,1 s: hoja de cálculo que se llena mientras hablas
const COLS: [string, number][] = [
  ["Empresa", 34.32],
  ["Link", 35.46],
  ["Salario", 36.02],
  ["Fecha", 36.74],
];
const ROWS: [string, number, number][][] = [
  [["Empresa A", 34.45, 34.85], ["ver vacante", 35.55, 35.9], ["$$$", 36.1, 36.4], ["12/10", 36.85, 37.3]],
  [["Empresa B", 38.1, 38.45], ["ver vacante", 38.45, 38.8], ["$$$", 38.8, 39.0], ["15/10", 39.0, 39.35]],
  [["Empresa C", 39.35, 39.65], ["ver vacante", 39.65, 39.95], ["$$$", 39.95, 40.15], ["18/10", 40.15, 40.45]],
];

export const SheetScene: React.FC = () => {
  const t = useSec();
  const rowH = 52;
  const numW = 44;
  const colW = (W - numW) / 4;
  const title = typed("Mis aplicaciones", t, 31.4, 32.1);

  // Celda activa: la última que empezó a escribirse
  const cells: { r: number; c: number; text: string; from: number; to: number }[] = [];
  COLS.forEach(([h, s], c) => cells.push({ r: 0, c, text: h, from: s, to: s + 0.25 }));
  ROWS.forEach((row, r) => row.forEach(([txt, a, b], c) => cells.push({ r: r + 1, c, text: txt, from: a, to: b })));
  const active = cells.filter((x) => t >= x.from).sort((a, b) => b.from - a.from)[0];

  const flash = (c: number, r: number) =>
    r > 0 && ((c === 3 && t >= 39.62 && t < 40.7) || (c === 0 && t >= 40.78));

  const border = `2px solid ${C.plumLine}`;
  const cellBase: React.CSSProperties = {
    boxSizing: "border-box",
    borderRight: border,
    borderBottom: border,
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    fontFamily: POPPINS,
    color: C.plum,
    overflow: "hidden",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ height: 52, background: C.plum, display: "flex", alignItems: "center", gap: 14, padding: "0 20px" }}>
        <svg width={26} height={32} viewBox="0 0 26 32">
          <rect width={26} height={32} rx={4} fill={C.white} />
          {[9, 16, 23].map((y) => (
            <rect key={y} x={5} y={y} width={16} height={3} fill={C.plum} />
          ))}
        </svg>
        <span style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 28, color: C.white }}>{title}</span>
      </div>
      <div style={{ height: 36, borderBottom: border, display: "flex", alignItems: "center", gap: 16, padding: "0 16px", fontFamily: POPPINS, fontSize: 20, color: C.plum }}>
        <span style={{ fontStyle: "italic", fontWeight: 600, opacity: 0.6 }}>fx</span>
        <span>{active ? typed(active.text, t, active.from, active.to) : ""}</span>
      </div>
      <div style={{ display: "flex", height: 30, background: C.plumTint }}>
        <div style={{ ...cellBase, width: numW }} />
        {["A", "B", "C", "D"].map((l) => (
          <div key={l} style={{ ...cellBase, width: colW, justifyContent: "center", fontSize: 18, fontWeight: 600 }}>
            {l}
          </div>
        ))}
      </div>
      {[0, 1, 2, 3].map((r) => (
        <div key={r} style={{ display: "flex", height: rowH }}>
          <div style={{ ...cellBase, width: numW, background: C.plumTint, justifyContent: "center", fontSize: 18, fontWeight: 600 }}>{r + 1}</div>
          {[0, 1, 2, 3].map((c) => {
            const cell = cells.find((x) => x.r === r && x.c === c)!;
            const isActive = active === cell;
            return (
              <div
                key={c}
                style={{
                  ...cellBase,
                  width: colW,
                  fontSize: 25,
                  fontWeight: r === 0 ? 700 : 400,
                  textDecoration: r > 0 && c === 1 ? "underline" : "none",
                  background: flash(c, r) ? C.aqua : r === 0 && t >= cell.from ? C.plumTint : C.white,
                  outline: isActive ? `4px solid ${C.plum}` : "none",
                  outlineOffset: -4,
                }}
              >
                {typed(cell.text, t, cell.from, cell.to)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// 41,1 a 44,7 s: mensaje que se escribe en el teclado y se envía
const MSG = "Hola, vi tu vacante y quiero contarte…";
const KEYS = ["qwertyuiop", "asdfghjklñ", "zxcvbnm"];

export const ChatScene: React.FC = () => {
  const t = useSec();
  const sent = t >= 43.75;
  const text = sent ? "" : typed(MSG, t, 41.3, 43.55);
  const last = text.slice(-1).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const typing = t >= 41.3 && t < 43.55;
  const bubble = usePop(43.8, 10);
  const seen = usePop(44.2, 10);
  const press = t >= 43.6 && t < 43.8;
  const keyStyle = (on: boolean, w: number): React.CSSProperties => ({
    width: w,
    height: 36,
    borderRadius: 8,
    background: on ? C.aqua : C.white,
    border: `3px solid ${C.plum}`,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: POPPINS,
    fontWeight: 600,
    fontSize: 18,
    color: C.plum,
    transform: on ? "translateY(3px)" : "none",
  });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ height: 104, position: "relative", padding: "12px 20px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg width={40} height={40} viewBox="0 0 40 40">
            <Avatar cx={20} cy={20} r={17} id="chat-avatar" />
          </svg>
          <span style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 26, color: C.plum }}>Reclutadora</span>
        </div>
        {sent && (
          <div
            style={{
              position: "absolute",
              right: 20,
              top: 52 + (1 - bubble) * 60,
              opacity: Math.min(bubble * 1.5, 1),
              background: C.plum,
              color: C.white,
              fontFamily: POPPINS,
              fontWeight: 600,
              fontSize: 22,
              padding: "6px 16px",
              borderRadius: "18px 18px 4px 18px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {MSG}
            <svg width={30} height={18} viewBox="0 0 30 18" style={{ opacity: seen }}>
              <path d="M2 9 L7 14 L16 4 M12 13 L13 14 L24 4" fill="none" stroke={C.aqua} strokeWidth={3} strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
      <div style={{ height: 58, display: "flex", alignItems: "center", gap: 12, padding: "0 20px" }}>
        <div
          style={{
            flex: 1,
            height: 48,
            border: `4px solid ${C.plum}`,
            borderRadius: 24,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            fontFamily: POPPINS,
            fontSize: 22,
            color: C.plum,
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {text}
          {!sent && Math.floor(t * 3) % 2 === 0 && <span style={{ width: 3, height: 26, background: C.plum, marginLeft: 2 }} />}
        </div>
        <svg width={48} height={48} viewBox="0 0 48 48" style={{ transform: `scale(${press ? 0.85 : 1})` }}>
          <circle cx={24} cy={24} r={24} fill={press || sent ? C.aqua : C.plum} stroke={C.plum} strokeWidth={4} />
          <path d="M14 24 H32 M24 15 L33 24 L24 33" fill="none" stroke={press || sent ? C.plum : C.white} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div
        style={{
          flex: 1,
          background: C.plumTint,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {KEYS.map((row) => (
          <div key={row} style={{ display: "flex", gap: 6 }}>
            {row.split("").map((k) => (
              <div key={k} style={keyStyle(typing && last === k, 70)}>
                {k}
              </div>
            ))}
          </div>
        ))}
        <div style={keyStyle(typing && last === " ", 400)} />
      </div>
    </div>
  );
};

// 44,9 a 48,2 s: buscar al hiring manager y conectar
export const HiringScene: React.FC = () => {
  const t = useSec();
  const query = typed("hiring manager", t, 45.4, 46.4);
  const result = usePop(46.78);
  const done = t >= 47.48;
  const press = t >= 47.3 && t < 47.48;
  return (
    <div style={{ position: "absolute", inset: 0, padding: 22, boxSizing: "border-box" }}>
      <div
        style={{
          height: 76,
          border: `5px solid ${C.plum}`,
          borderRadius: 38,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 22px",
          fontFamily: POPPINS,
          fontSize: 32,
          color: C.plum,
        }}
      >
        <svg width={36} height={36} viewBox="0 0 36 36">
          <circle cx={15} cy={15} r={11} fill="none" stroke={C.plum} strokeWidth={4} />
          <line x1={23} y1={23} x2={33} y2={33} stroke={C.plum} strokeWidth={5} strokeLinecap="round" />
        </svg>
        {query}
      </div>
      <div
        style={{
          marginTop: 26,
          display: "flex",
          alignItems: "center",
          gap: 22,
          opacity: Math.min(result * 1.5, 1),
          transform: `translateY(${(1 - result) * 40}px)`,
        }}
      >
        <svg width={150} height={150} viewBox="0 0 150 150">
          <Avatar cx={75} cy={75} r={70} id="hm-avatar" />
        </svg>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 38, color: C.plum }}>Hiring manager</div>
          <div style={{ fontFamily: POPPINS, fontWeight: 400, fontSize: 28, color: C.plum }}>Empresa</div>
        </div>
        <div
          style={{
            background: done ? C.aqua : C.plum,
            color: done ? C.plum : C.white,
            border: `4px solid ${C.plum}`,
            borderRadius: 32,
            padding: "10px 26px",
            fontFamily: POPPINS,
            fontWeight: 700,
            fontSize: 30,
            transform: `scale(${press ? 0.9 : 1})`,
          }}
        >
          {done ? "Enviado ✓" : "Conectar"}
        </div>
      </div>
    </div>
  );
};

// 48,4 s al final: llamado a la acción
export const EndScene: React.FC = () => {
  const t = useSec();
  const txt = usePop(48.62);
  const btn = usePop(49.5, 8);
  const bob = Math.sin(t * 8) * 8;
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 22, opacity: Math.min(txt * 1.5, 1) }}>
        <svg width={110} height={100} viewBox="0 0 110 100">
          <path d="M10 10 H100 V70 H44 L22 92 V70 H10 Z" fill={C.plum} strokeLinejoin="round" />
          {[34, 55, 76].map((x) => (
            <circle key={x} cx={x} cy={40} r={7} fill={C.aqua} />
          ))}
        </svg>
        <div style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 48, color: C.plum, lineHeight: 1.1 }}>
          Mira los
          <br />
          comentarios
        </div>
        <svg width={60} height={80} viewBox="0 0 60 80" style={{ transform: `translateY(${bob}px)` }}>
          <path d="M30 6 V66 M10 46 L30 70 L50 46" fill="none" stroke={C.plum} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div
        style={{
          transform: `scale(${btn * (1 + 0.03 * Math.sin(t * 6))})`,
          background: C.aqua,
          color: C.plum,
          border: `5px solid ${C.plum}`,
          borderRadius: 44,
          padding: "12px 40px",
          fontFamily: POPPINS,
          fontWeight: 700,
          fontSize: 42,
        }}
      >
        Sígueme para más
      </div>
    </div>
  );
};

export { H, W };
