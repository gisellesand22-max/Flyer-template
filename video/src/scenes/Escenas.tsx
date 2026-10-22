import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame, Easing} from 'remotion';
import {textos} from '../textos';
import {
  color,
  Escena,
  Flecha,
  fuente,
  Pin,
  Titular,
  useEntrada,
  useRebote,
} from '../marca';

// Escena 1: gancho, entrada palabra por palabra.
const Palabra: React.FC<{texto: string; inicio: number}> = ({texto, inicio}) => {
  const e = useEntrada(inicio, 30, 10);
  return <span style={{display: 'inline-block', marginRight: '0.24em', ...e}}>{texto}</span>;
};

export const Escena1: React.FC<{duracion: number}> = ({duracion}) => {
  const palabras = textos.escena1.titular.split(' ');
  return (
    <Escena duracion={duracion}>
      <Titular size={100} style={{lineHeight: 1.12}}>
        {palabras.map((p, i) => (
          <Palabra key={i} texto={p} inicio={6 + i * 3} />
        ))}
      </Titular>
    </Escena>
  );
};

// Escena 2: la solución.
export const Escena2: React.FC<{duracion: number}> = ({duracion}) => {
  const t = textos.escena2;
  return (
    <Escena duracion={duracion}>
      <div style={{...useEntrada(4)}}>
        <Img src={staticFile('logo/enplan_logo_carbon_sobre_arena.svg')} style={{width: 640}} />
      </div>
      <div
        style={{
          ...useEntrada(14),
          marginTop: 36,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          border: `3px solid ${color.carbon}`,
          borderRadius: 999,
          padding: '14px 36px 14px 26px',
          fontFamily: fuente.apoyo,
          fontWeight: 400,
          fontSize: 44,
          color: color.carbon,
        }}
      >
        <Pin size={44} />
        {t.etiqueta}
      </div>
      <Titular size={92} style={{...useEntrada(30), marginTop: 110}}>
        {t.titular}
      </Titular>
      <div
        style={{
          ...useEntrada(46),
          marginTop: 40,
          fontFamily: fuente.apoyo,
          fontWeight: 400,
          fontSize: 52,
          lineHeight: 1.3,
          color: color.carbon,
          textAlign: 'center',
          maxWidth: 820,
        }}
      >
        <span style={{opacity: 0.8}}>{t.apoyo}</span>
      </div>
    </Escena>
  );
};

// Escena 3: categorías en cuadrícula de dos columnas.
const Categoria: React.FC<{nombre: string; icono: string; inicio: number}> = ({
  nombre,
  icono,
  inicio,
}) => (
  <div
    style={{
      ...useRebote(inicio),
      width: 430,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        width: 180,
        height: 160,
        borderRadius: 40,
        backgroundColor: color.blanco,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Img src={staticFile(icono)} style={{width: 150, height: 150, objectFit: 'contain'}} />
    </div>
    <div
      style={{
        marginTop: 4,
        fontFamily: fuente.titular,
        fontWeight: 800,
        fontSize: 44,
        color: color.carbon,
      }}
    >
      {nombre}
    </div>
  </div>
);

export const Escena3: React.FC<{duracion: number}> = ({duracion}) => {
  const t = textos.escena3;
  return (
    <Escena duracion={duracion} justify="flex-start">
      <Titular size={80} style={useEntrada(2)}>
        {t.titular}
      </Titular>
      <div
        style={{
          marginTop: 36,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          columnGap: 40,
          rowGap: 14,
          width: 900,
        }}
      >
        {t.categorias.map((c, i) => (
          <Categoria key={c.nombre} nombre={c.nombre} icono={c.icono} inicio={20 + i * 6} />
        ))}
      </div>
    </Escena>
  );
};

// Escena 4: beneficios en tarjetas apiladas.
const Tarjeta: React.FC<{texto: string; numero: number; inicio: number; acento: string}> = ({
  texto,
  numero,
  inicio,
  acento,
}) => (
  <div
    style={{
      ...useEntrada(inicio, 60, 16),
      width: 900,
      backgroundColor: color.blanco,
      borderRadius: 56,
      padding: '44px 48px',
      display: 'flex',
      alignItems: 'center',
      gap: 36,
    }}
  >
    <div
      style={{
        flexShrink: 0,
        width: 120,
        height: 120,
        borderRadius: 999,
        backgroundColor: acento,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: fuente.titular,
        fontWeight: 800,
        fontSize: 64,
        color: color.carbon,
      }}
    >
      {numero}
    </div>
    <div
      style={{
        fontFamily: fuente.apoyo,
        fontWeight: 600,
        fontSize: 56,
        lineHeight: 1.2,
        color: color.carbon,
      }}
    >
      {texto}
    </div>
  </div>
);

export const Escena4: React.FC<{duracion: number}> = ({duracion}) => (
  <Escena duracion={duracion}>
    <div style={{display: 'flex', flexDirection: 'column', gap: 40}}>
      {textos.escena4.tarjetas.map((t, i) => (
        <Tarjeta
          key={i}
          texto={t}
          numero={i + 1}
          inicio={4 + i * 22}
          acento={i === 2 ? color.lila : color.lima}
        />
      ))}
    </div>
  </Escena>
);

// Escena 5: mockup del panel de negocio.
const Etiqueta: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    style={{
      fontFamily: fuente.apoyo,
      fontWeight: 600,
      fontSize: 44,
      lineHeight: 1.1,
      color: color.carbon,
    }}
  >
    {children}
  </div>
);

const Numero: React.FC<{valor: string; inicio: number}> = ({valor, inicio}) => {
  const frame = useCurrentFrame();
  const objetivo = parseInt(valor, 10);
  const n = Math.round(
    interpolate(frame, [inicio, inicio + 24], [0, objetivo], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }),
  );
  return (
    <div style={{fontFamily: fuente.titular, fontWeight: 800, fontSize: 96, color: color.carbon}}>
      {n}
    </div>
  );
};

const Crecer: React.FC<{inicio: number; pct: number; style: React.CSSProperties; dir: 'v' | 'h'}> = ({
  inicio,
  pct,
  style,
  dir,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [inicio, inicio + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const medida = `${pct * p}%`;
  return <div style={{...style, ...(dir === 'v' ? {height: medida} : {width: medida})}} />;
};

const tarjeta: React.CSSProperties = {
  backgroundColor: color.arena,
  borderRadius: 36,
  padding: '24px 28px',
};

export const Escena5: React.FC<{duracion: number}> = ({duracion}) => {
  const t = textos.escena5;
  const maxT = Math.max(...t.tendencias.valores);
  const maxE = Math.max(...t.edad.rangos.map((r) => r.valor));
  const base = 30;
  return (
    <Escena duracion={duracion} justify="flex-start">
      <Titular size={80} style={useEntrada(2)}>
        {t.titular}
      </Titular>
      <div
        style={{
          ...useEntrada(base - 10, 80, 18),
          marginTop: 44,
          width: 820,
          backgroundColor: color.blanco,
          borderRadius: 64,
          border: `4px solid ${color.carbon}`,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          position: 'relative',
        }}
      >
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <div
            style={{
              backgroundColor: color.lila,
              borderRadius: 999,
              padding: '8px 22px',
              fontFamily: fuente.apoyo,
              fontWeight: 600,
              fontSize: 32,
              color: color.carbon,
            }}
          >
            {t.etiquetaEjemplo}
          </div>
        </div>
        <div style={{display: 'flex', gap: 20}}>
          <div style={{...tarjeta, flex: 1}}>
            <Etiqueta>{t.visitasDiarias.etiqueta}</Etiqueta>
            <Numero valor={t.visitasDiarias.valor} inicio={base + 4} />
          </div>
          <div style={{...tarjeta, flex: 1}}>
            <Etiqueta>{t.codigosValidados.etiqueta}</Etiqueta>
            <Numero valor={t.codigosValidados.valor} inicio={base + 10} />
          </div>
        </div>
        <div style={tarjeta}>
          <Etiqueta>{t.tendencias.etiqueta}</Etiqueta>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 18, height: 150, marginTop: 14}}>
            {t.tendencias.valores.map((v, i) => (
              <div key={i} style={{flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end'}}>
                <Crecer
                  dir="v"
                  inicio={base + 16 + i * 3}
                  pct={(v / maxT) * 100}
                  style={{
                    width: '100%',
                    borderRadius: 14,
                    backgroundColor: i === t.tendencias.valores.indexOf(maxT) ? color.lima : color.arenaOscuro,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div style={{display: 'flex', gap: 20}}>
          <div style={{...tarjeta, flex: 1.15}}>
            <Etiqueta>{t.edad.etiqueta}</Etiqueta>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14}}>
              {t.edad.rangos.map((r, i) => (
                <div key={r.rango} style={{height: 28, backgroundColor: color.blanco, borderRadius: 999}}>
                  <Crecer
                    dir="h"
                    inicio={base + 30 + i * 3}
                    pct={(r.valor / maxE) * 100}
                    style={{height: '100%', borderRadius: 999, backgroundColor: color.lila}}
                  />
                </div>
              ))}
            </div>
          </div>
          <div style={{...tarjeta, flex: 1, display: 'flex', flexDirection: 'column'}}>
            <Etiqueta>{t.genero.etiqueta}</Etiqueta>
            <div
              style={{
                display: 'flex',
                height: 56,
                borderRadius: 999,
                overflow: 'hidden',
                marginTop: 'auto',
                backgroundColor: color.blanco,
              }}
            >
              <Crecer
                dir="h"
                inicio={base + 36}
                pct={t.genero.partes[0].valor}
                style={{height: '100%', backgroundColor: color.lima}}
              />
              <Crecer
                dir="h"
                inicio={base + 40}
                pct={t.genero.partes[1].valor}
                style={{height: '100%', backgroundColor: color.carbon}}
              />
            </div>
          </div>
        </div>
      </div>
    </Escena>
  );
};

// Escena 6: cierre con un solo llamado a la acción.
export const Escena6: React.FC<{duracion: number}> = ({duracion}) => {
  const t = textos.escena6;
  return (
    <Escena duracion={duracion + 9}>
      <div style={useEntrada(2)}>
        <Img src={staticFile('logo/enplan_logo_carbon_sobre_arena.svg')} style={{width: 720}} />
      </div>
      <div
        style={{
          ...useEntrada(12),
          marginTop: 90,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          backgroundColor: color.lima,
          borderRadius: 999,
          padding: '34px 56px',
          fontFamily: fuente.titular,
          fontWeight: 800,
          fontSize: 60,
          color: color.carbon,
        }}
      >
        {t.boton}
        <Flecha size={60} />
      </div>
      <div
        style={{
          ...useEntrada(22),
          marginTop: 90,
          fontFamily: fuente.apoyo,
          fontWeight: 600,
          fontSize: 52,
          lineHeight: 1.5,
          color: color.carbon,
          textAlign: 'center',
        }}
      >
        <div>{t.redes}</div>
        <div>{t.web}</div>
      </div>
    </Escena>
  );
};
