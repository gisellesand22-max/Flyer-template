import React from "react";
import { C } from "./theme";

// Cara genérica dibujada en código. Todas las capas van de 0 a 1.
export type FaceProps = {
  cx: number;
  cy: number;
  r: number;
  scan?: number; // posición de la línea de escaneo (de arriba abajo); fuera de 0 a 1 no se ve
  box?: number; // esquinas de medida alrededor de la cara
  dist?: number; // líneas de distancia entre rasgos
  dots?: number; // puntos sobre los rasgos
  eyes?: number; // rasgos encendidos en aqua
  nose?: number;
  mouth?: number;
  pixel?: number; // la cara se vuelve cuadrícula de pixeles
};

// Puntos de los rasgos, relativos al centro y al radio
export const FEATURES = {
  eyeL: [-0.33, -0.12],
  eyeR: [0.33, -0.12],
  nose: [0, 0.2],
  mouth: [0, 0.5],
} as const;

const GRID = 13;

// Celdas de la versión pixelada, en orden pseudoaleatorio fijo
const CELLS = (() => {
  const out: { i: number; j: number; feature: boolean; order: number }[] = [];
  for (let j = 0; j < GRID + 2; j++) {
    for (let i = 0; i < GRID; i++) {
      const x = (i + 0.5) / GRID * 2 - 1; // -1 a 1
      const y = (j + 0.5) / (GRID + 2) * 2 - 1;
      if ((x / 0.8) ** 2 + y ** 2 > 1) continue;
      const near = Object.values(FEATURES).some(([fx, fy]) => Math.hypot(x - fx, y - fy) < 0.15);
      const order = ((i * 73 + j * 151) % 97) / 97;
      out.push({ i, j, feature: near, order });
    }
  }
  return out;
})();

export const Face: React.FC<FaceProps> = ({ cx, cy, r, scan = -1, box = 0, dist = 0, dots = 0, eyes = 0, nose = 0, mouth = 0, pixel = 0 }) => {
  const p = (k: keyof typeof FEATURES) => [cx + FEATURES[k][0] * r, cy + FEATURES[k][1] * r] as const;
  const [elx, ely] = p("eyeL");
  const [erx, ery] = p("eyeR");
  const [nx, ny] = p("nose");
  const [mx, my] = p("mouth");
  const rx = r * 0.8;
  const ry = r;
  const lit = (k: number) => (k > 0 ? C.aqua : C.blanco);
  const cell = (2 * rx) / GRID;
  const cellH = (2 * ry) / (GRID + 2);

  return (
    <g>
      <g opacity={1 - pixel}>
        {/* Cabeza y cabello */}
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={C.blanco} stroke={C.ciruela} strokeWidth={6} />
        <path
          d={`M${cx - rx * 0.96} ${cy - ry * 0.2} Q${cx - rx * 0.9} ${cy - ry * 1.08} ${cx} ${cy - ry} Q${cx + rx * 0.9} ${cy - ry * 1.08} ${cx + rx * 0.96} ${cy - ry * 0.2} Q${cx + rx * 0.5} ${cy - ry * 0.7} ${cx} ${cy - ry * 0.72} Q${cx - rx * 0.5} ${cy - ry * 0.7} ${cx - rx * 0.96} ${cy - ry * 0.2} Z`}
          fill={C.ciruela}
        />
        {/* Ojos */}
        {[
          [elx, ely],
          [erx, ery],
        ].map(([x, y], i) => (
          <g key={i}>
            <ellipse cx={x} cy={y} rx={r * 0.13} ry={r * 0.08} fill={lit(eyes)} stroke={C.ciruela} strokeWidth={4} />
            <circle cx={x} cy={y} r={r * 0.045} fill={C.ciruela} />
          </g>
        ))}
        {/* Nariz */}
        <path
          d={`M${nx} ${ny - r * 0.18} L${nx - r * 0.07} ${ny + r * 0.04} Q${nx} ${ny + r * 0.1} ${nx + r * 0.07} ${ny + r * 0.04}`}
          fill={nose > 0 ? C.aqua : "none"}
          stroke={C.ciruela}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Boca */}
        <path
          d={`M${mx - r * 0.2} ${my - r * 0.03} Q${mx} ${my + r * 0.16} ${mx + r * 0.2} ${my - r * 0.03} Z`}
          fill={lit(mouth)}
          stroke={C.ciruela}
          strokeWidth={4}
          strokeLinejoin="round"
        />
      </g>

      {/* Versión pixelada: las celdas aparecen en orden fijo */}
      {pixel > 0 &&
        CELLS.filter((c) => c.order < pixel).map((c) => (
          <rect
            key={`${c.i}-${c.j}`}
            x={cx - rx + c.i * cell + 1}
            y={cy - ry + c.j * cellH + 1}
            width={cell - 2}
            height={cellH - 2}
            fill={c.feature ? C.ciruela : (c.i + c.j) % 3 === 0 ? C.aqua : C.ciruelaTinte}
          />
        ))}

      {/* Esquinas de medida */}
      {box > 0 && (
        <g stroke={C.ciruela} strokeWidth={5} fill="none" strokeLinecap="round" opacity={box}>
          {[
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1],
          ].map(([sx, sy], i) => {
            const x = cx + sx * (rx + 14 + (1 - box) * 30);
            const y = cy + sy * (ry + 8 + (1 - box) * 30);
            return <path key={i} d={`M${x} ${y - sy * 34} L${x} ${y} L${x - sx * 34} ${y}`} />;
          })}
        </g>
      )}

      {/* Líneas de distancia entre rasgos */}
      {dist > 0 && (
        <g stroke={C.ciruela} strokeWidth={3} strokeDasharray="8 6" fill="none">
          {[
            [elx, ely, erx, ery],
            [elx, ely, nx, ny],
            [erx, ery, nx, ny],
            [nx, ny, mx, my],
          ].map(([x1, y1, x2, y2], i) => {
            const k = Math.min(Math.max(dist * 4 - i, 0), 1);
            return <line key={i} x1={x1} y1={y1} x2={x1 + (x2 - x1) * k} y2={y1 + (y2 - y1) * k} />;
          })}
        </g>
      )}

      {/* Puntos sobre los rasgos */}
      {dots > 0 &&
        [
          [elx, ely],
          [erx, ery],
          [nx, ny],
          [mx, my],
        ].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={9 * dots} fill={C.aqua} stroke={C.ciruela} strokeWidth={3} />)}

      {/* Línea de escaneo */}
      {scan >= 0 && scan <= 1 && (
        <line
          x1={cx - rx - 10}
          x2={cx + rx + 10}
          y1={cy - ry + scan * 2 * ry}
          y2={cy - ry + scan * 2 * ry}
          stroke={C.aqua}
          strokeWidth={8}
          strokeLinecap="round"
        />
      )}
    </g>
  );
};
