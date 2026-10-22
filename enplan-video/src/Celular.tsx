import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {rebote, suave, ventana} from './anim';
import {color, escenas, fuente} from './marca';
import {categorias, textos} from './textos';
import {Logo, Pin} from './Piezas';

// Posición del celular dentro del cuadro 1080x1920.
export const CEL = {x: 320, y: 620, ancho: 440, alto: 880, bisel: 18};
export const centroPantalla = {x: CEL.x + CEL.ancho / 2, y: CEL.y + CEL.alto / 2};

const {e3, e4, e5, e6, e7} = escenas;

const Campo: React.FC<{largo: number}> = ({largo}) => (
  <div style={{height: 64, borderRadius: 32, background: color.blanco, display: 'flex', alignItems: 'center', padding: '0 28px'}}>
    <div style={{height: 14, width: largo, borderRadius: 7, background: color.carbon, opacity: 0.2}} />
  </div>
);

const PantallaRegistro: React.FC<{f: number}> = ({f}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 22, padding: '90px 34px 0'}}>
    <div style={{display: 'flex', justifyContent: 'center', marginBottom: 40}}>
      <Logo ancho={200} />
    </div>
    {[150, 210, 120].map((l, i) => (
      <div key={i} style={{transform: `scale(${rebote(f, 10 + i * 5)})`}}>
        <Campo largo={l} />
      </div>
    ))}
    <div
      style={{
        marginTop: 18,
        height: 72,
        borderRadius: 36,
        background: color.lima,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${rebote(f, 28)})`,
      }}
    >
      <svg width="48" height="28" viewBox="0 0 48 28">
        <path d="M2 14h40M30 3l12 11-12 11" stroke={color.carbon} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>
);

const PantallaBuscar: React.FC = () => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 26, padding: '90px 34px 0'}}>
    <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
      <Logo ancho={200} />
    </div>
    <Campo largo={180} />
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
      {categorias.map((c) => (
        <div key={c.nombre} style={{height: 96, borderRadius: 28, background: color.blanco}} />
      ))}
      <div style={{height: 96, borderRadius: 28, background: color.lila}} />
    </div>
  </div>
);

const Tarjeta: React.FC<{beneficio: string; icono: string; escala: number}> = ({beneficio, icono, escala}) => (
  <div
    style={{
      background: color.blanco,
      borderRadius: 36,
      padding: '22px 22px',
      transform: `scale(${escala})`,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}
  >
    <div
      style={{
        alignSelf: 'flex-start',
        background: color.lila,
        color: color.carbon,
        fontFamily: fuente.apoyo,
        fontWeight: 600,
        fontSize: 22,
        padding: '6px 16px',
        borderRadius: 20,
      }}
    >
      {textos.escena5.etiquetaEjemplo}
    </div>
    <div style={{fontFamily: fuente.titular, fontWeight: 800, fontSize: 72, color: color.carbon, lineHeight: 1.05, letterSpacing: -2, whiteSpace: 'nowrap'}}>
      {beneficio}
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
      <Img src={staticFile(icono)} style={{width: 52, height: 52, objectFit: 'contain'}} />
      <div style={{fontFamily: fuente.apoyo, fontWeight: 600, fontSize: 23, color: color.carbon, whiteSpace: 'nowrap'}}>{textos.escena5.negocio}</div>
    </div>
  </div>
);

const PantallaPlanes: React.FC<{f: number}> = ({f}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 26, padding: '110px 30px 0'}}>
    <Tarjeta beneficio={textos.escena5.beneficios[0]} icono="icons/comida.webp" escala={rebote(f, 12)} />
    <Tarjeta beneficio={textos.escena5.beneficios[1]} icono="icons/belleza.webp" escala={rebote(f, 20)} />
  </div>
);

// Código genérico: solo formas, sin cifras.
const patron = [
  '1110101', '1010011', '1110100', '0001011', '1101110', '0100101', '1011011',
];

const PantallaCodigo: React.FC<{f: number}> = ({f}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, padding: '120px 30px 0'}}>
    <div style={{transform: `translateY(${(1 - rebote(f, 6)) * -40}px)`, opacity: Math.min(1, rebote(f, 6))}}>
      <Pin alto={110} relleno={color.lima} />
    </div>
    <div
      style={{
        background: color.blanco,
        borderRadius: 36,
        padding: 30,
        transform: `scale(${rebote(f, 12)})`,
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 36px)',
        gap: 6,
      }}
    >
      {patron.join('').split('').map((v, i) => (
        <div key={i} style={{width: 36, height: 36, borderRadius: 8, background: v === '1' ? color.carbon : 'transparent'}} />
      ))}
    </div>
  </div>
);

export const Celular: React.FC = () => {
  const f = useCurrentFrame();
  if (f < e3.desde || f > e7.desde + 2) return null;

  const entrada = suave(f, e3.desde);
  const salida = interpolate(f, [e7.desde - 8, e7.desde + 2], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = (1 - entrada) * 1300 - salida * 80;

  const capas = [
    {desde: e3.desde, hasta: e4.desde + 4, el: <PantallaRegistro f={f - e3.desde} />},
    {desde: e4.desde - 4, hasta: e5.desde + 4, el: <PantallaBuscar />},
    {desde: e5.desde - 4, hasta: e6.desde + 4, el: <PantallaPlanes f={f - e5.desde} />},
    {desde: e6.desde - 4, hasta: e7.desde + 20, el: <PantallaCodigo f={f - e6.desde} />},
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: CEL.x,
        top: CEL.y,
        width: CEL.ancho,
        height: CEL.alto,
        borderRadius: 76,
        background: color.carbon,
        padding: CEL.bisel,
        transform: `translateY(${y}px)`,
        opacity: 1 - salida,
      }}
    >
      <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 58, background: color.arena, overflow: 'hidden'}}>
        <div
          style={{position: 'absolute', top: 20, left: '50%', marginLeft: -50, width: 100, height: 28, borderRadius: 14, background: color.carbon, zIndex: 2}}
        />
        {capas.map((c, i) => {
          const o = ventana(f, c.desde, c.hasta, i === 0 ? 1 : 8);
          if (o <= 0) return null;
          return (
            <div key={i} style={{position: 'absolute', inset: 0, opacity: o}}>
              {c.el}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Iconos que saltan de la pantalla y flotan alrededor (escenas 4 y 5).
const destinos = [
  {x: 195, y: 728},
  {x: 885, y: 840},
  {x: 195, y: 946},
  {x: 885, y: 1058},
  {x: 195, y: 1164},
  {x: 885, y: 1276},
  {x: 195, y: 1382},
];
const TAM = 155;

export const IconosFlotantes: React.FC = () => {
  const f = useCurrentFrame();
  if (f < e4.desde || f > e5.desde + 30) return null;
  return (
    <>
      {categorias.map((c, i) => {
        const sale = rebote(f, e4.desde + 14 + i * 6);
        const regresa = suave(f, e5.desde + i * 2);
        const p = sale * (1 - regresa);
        const d = destinos[i];
        const flota = Math.sin((f + i * 17) / 14) * 9;
        const pos = Math.min(p, 1); // sin rebote en la posición: no sale de la zona segura
        const x = centroPantalla.x + (d.x - centroPantalla.x) * pos;
        const y = centroPantalla.y + (d.y - centroPantalla.y) * pos + flota * pos;
        const escala = 0.15 + 0.85 * p;
        const opacidad = interpolate(p, [0, 0.15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const etiqueta = interpolate(p, [0.75, 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <div
            key={c.nombre}
            style={{
              position: 'absolute',
              left: x - TAM / 2,
              top: y - TAM / 2,
              width: TAM,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: opacidad,
              transform: `scale(${escala})`,
            }}
          >
            <Img src={staticFile(c.archivo)} style={{width: TAM, height: TAM, objectFit: 'contain'}} />
            <div style={{fontFamily: fuente.apoyo, fontWeight: 600, fontSize: 32, color: color.carbon, marginTop: 2, opacity: etiqueta}}>
              {c.nombre}
            </div>
          </div>
        );
      })}
    </>
  );
};
