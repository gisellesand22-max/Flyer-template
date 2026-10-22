import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {entradaSalida, rebote} from './anim';
import {color, fuente} from './marca';
import {textos} from './textos';
import {Logo, NumeroPaso, Pin} from './Piezas';

const titular = (tam: number, c: string): React.CSSProperties => ({
  fontFamily: fuente.titular,
  fontWeight: 800,
  fontSize: tam,
  color: c,
  lineHeight: 1,
  letterSpacing: -tam * 0.02,
  textAlign: 'center',
});

const apoyo = (tam: number): React.CSSProperties => ({
  fontFamily: fuente.apoyo,
  fontWeight: 600,
  fontSize: tam,
  color: color.carbon,
  lineHeight: 1.15,
  textAlign: 'center',
});

const lleno: React.CSSProperties = {position: 'absolute', inset: 0};
const fijo = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Escena 1: el gancho.
export const Escena1: React.FC<{dura: number}> = ({dura}) => {
  const f = useCurrentFrame();
  const LINEA = 132;
  const TAM = 112;
  const arriba = 960 - (LINEA * 3) / 2;
  const trazo = interpolate(f, [34, 48], [0, 100], fijo);
  const aparece = rebote(f, 46);
  const borra = interpolate(f, [58, 64], [0, 1], fijo);
  const colapsa = interpolate(f, [62, 74], [0, 1], fijo);
  const salida = interpolate(f, [dura - 8, dura], [0, 1], fijo);
  const base: React.CSSProperties = {position: 'absolute', left: 0, right: 0, display: 'flex', justifyContent: 'center'};
  const entra = (i: number) => entradaSalida(f, dura, i * 4);

  return (
    <div style={{...lleno, opacity: 1 - salida, transform: `translateY(${-salida * 30}px)`}}>
      {/* "Sí hay todo" entra arriba y luego baja a su lugar */}
      <div
        style={{
          ...base,
          top: arriba - LINEA + colapsa * LINEA,
          opacity: Math.min(1, aparece * 1.4),
          transform: `translateY(${(1 - aparece) * 40}px) scale(${0.85 + 0.15 * aparece})`,
        }}
      >
        <span style={titular(TAM, color.lima)}>{textos.escena1.reemplazo}</span>
      </div>
      {/* "No hay nada" se tacha y desaparece */}
      <div style={{...base, top: arriba, ...{opacity: entra(0).opacity * (1 - borra)}, transform: entra(0).transform}}>
        <span style={{...titular(TAM, color.carbon), position: 'relative'}}>
          {textos.escena1.tachado}
          <span
            style={{
              position: 'absolute',
              left: -8,
              top: '50%',
              marginTop: -12,
              height: 24,
              borderRadius: 12,
              width: `calc(${trazo}% + ${trazo > 0 ? 16 : 0}px)`,
              background: color.lima,
            }}
          />
        </span>
      </div>
      {textos.escena1.resto.map((t, i) => (
        <div key={t} style={{...base, top: arriba + LINEA * (i + 1), ...entra(i + 1)}}>
          <span style={titular(TAM, color.carbon)}>{t}</span>
        </div>
      ))}
    </div>
  );
};

// Escena 2: la respuesta.
export const Escena2: React.FC<{dura: number}> = ({dura}) => {
  const f = useCurrentFrame();
  return (
    <div style={{...lleno, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 30}}>
      <div style={entradaSalida(f, dura, 0)}>
        <Logo ancho={460} />
      </div>
      <div style={{height: 80}} />
      <div style={{...titular(124, color.lima), ...entradaSalida(f, dura, 6)}}>
        {textos.escena2.titular.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
      <div style={{height: 34}} />
      <div style={{...apoyo(64), ...entradaSalida(f, dura, 14)}}>{textos.escena2.apoyo}</div>
      <div style={{height: 56}} />
      <div
        style={{
          ...entradaSalida(f, dura, 20),
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          border: `3px solid ${color.carbon}`,
          borderRadius: 50,
          padding: '14px 34px',
        }}
      >
        <Pin alto={40} />
        <span style={apoyo(40)}>{textos.escena2.ubicacion}</span>
      </div>
    </div>
  );
};

// Encabezado de pasos (escenas 3 a 6), siempre arriba del celular.
export const Paso: React.FC<{dura: number; numero: string; palabra: string; apoyoTexto?: string; apoyoCambio?: {texto: string; frame: number}}> = ({
  dura,
  numero,
  palabra,
  apoyoTexto,
  apoyoCambio,
}) => {
  const f = useCurrentFrame();
  const cambio = apoyoCambio ? interpolate(f, [apoyoCambio.frame - 5, apoyoCambio.frame + 3], [0, 1], fijo) : 0;
  const nuevo = apoyoCambio ? rebote(f, apoyoCambio.frame - 2) : 0;
  return (
    <div style={{position: 'absolute', left: 80, right: 80, top: 285, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={entradaSalida(f, dura, 0)}>
        <NumeroPaso n={numero} />
      </div>
      <div style={{height: 18}} />
      <div style={{...titular(120, color.lima), ...entradaSalida(f, dura, 4)}}>{palabra}</div>
      <div style={{height: 20}} />
      <div style={{position: 'relative', width: '100%', height: 60, display: 'flex', justifyContent: 'center'}}>
        {apoyoTexto && (
          <div style={{...apoyo(48), position: 'absolute', whiteSpace: 'nowrap', ...entradaSalida(f, dura, 10), ...(apoyoCambio ? {opacity: entradaSalida(f, dura, 10).opacity * (1 - cambio)} : {})}}>
            {apoyoTexto}
          </div>
        )}
        {apoyoCambio && f >= apoyoCambio.frame - 5 && (
          <div
            style={{
              ...apoyo(44),
              position: 'absolute',
              whiteSpace: 'nowrap',
              opacity: Math.min(1, nuevo * 1.5) * interpolate(f, [dura - 8, dura], [1, 0], fijo),
              transform: `translateY(${(1 - nuevo) * 40}px)`,
            }}
          >
            {apoyoCambio.texto}
          </div>
        )}
      </div>
    </div>
  );
};

// Escena 7: cierre.
export const Escena7: React.FC = () => {
  const f = useCurrentFrame();
  const sin = 9999; // no sale: es el último cuadro
  return (
    <div style={{...lleno, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 60}}>
      <div style={entradaSalida(f, sin, 2)}>
        <Logo ancho={600} />
      </div>
      <div style={{height: 90}} />
      <div
        style={{
          ...entradaSalida(f, sin, 4),
          background: color.lima,
          borderRadius: 70,
          padding: '34px 64px',
          display: 'flex',
          alignItems: 'center',
          gap: 22,
        }}
      >
        <span style={{...titular(60, color.carbon), letterSpacing: -0.5}}>{textos.escena7.boton}</span>
        <svg width="56" height="34" viewBox="0 0 48 28">
          <path d="M2 14h40M30 3l12 11-12 11" stroke={color.carbon} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{height: 56}} />
      <div style={{...apoyo(48), ...entradaSalida(f, sin, 6)}}>{textos.escena7.usuario}</div>
    </div>
  );
};
