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
  useFlotar,
  useRebote,
} from '../marca';

const progreso = (frame: number, desde: number, hasta: number) =>
  interpolate(frame, [desde, hasta], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

// Escena 1: gancho en lima sobre carbón (lima sobre arena no se lee, brand.md sección 3).
// Entrada palabra por palabra y, al final, un círculo arena cubre la pantalla.
const Palabra: React.FC<{texto: string; inicio: number}> = ({texto, inicio}) => {
  const e = useEntrada(inicio, 36, 9);
  return <span style={{display: 'inline-block', marginRight: '0.24em', ...e}}>{texto}</span>;
};

export const Escena1: React.FC<{duracion: number}> = ({duracion}) => {
  const frame = useCurrentFrame();
  const palabras = textos.escena1.titular.split(' ');
  const cortina = progreso(frame, duracion - 12, duracion);
  return (
    <>
      <Escena duracion={duracion} fondo={color.carbon} acento={color.lila}>
        <Titular size={100} style={{lineHeight: 1.12, color: color.lima, transform: useFlotar(0, 6)}}>
          {palabras.map((p, i) => (
            <Palabra key={i} texto={p} inicio={3 + i * 2} />
          ))}
        </Titular>
      </Escena>
      <div
        style={{
          position: 'absolute',
          left: 540 - 1200,
          top: 1920 - 1200,
          width: 2400,
          height: 2400,
          borderRadius: 999,
          backgroundColor: color.arena,
          transform: `translateY(${(1 - cortina) * 1400}px) scale(${0.2 + cortina * 0.8})`,
        }}
      />
    </>
  );
};

// Escena 2: la solución.
export const Escena2: React.FC<{duracion: number}> = ({duracion}) => {
  const frame = useCurrentFrame();
  const t = textos.escena2;
  const pin = Math.abs(Math.sin(frame / 9)) * -8;
  return (
    <Escena duracion={duracion}>
      <div style={useEntrada(2, 60)}>
        <Img
          src={staticFile('logo/enplan_logo_carbon_sobre_arena.svg')}
          style={{width: 640, transform: useFlotar(0, 6)}}
        />
      </div>
      <div
        style={{
          ...useEntrada(10),
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
        <div style={{transform: `translateY(${pin}px)`}}>
          <Pin size={44} />
        </div>
        {t.etiqueta}
      </div>
      <Titular size={92} style={{...useEntrada(22), marginTop: 100}}>
        {t.titular}
      </Titular>
      <div
        style={{
          ...useEntrada(36),
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

// Escena 3: categorías en cuadrícula de dos columnas. Cada icono flota después de entrar.
const Categoria: React.FC<{nombre: string; icono: string; inicio: number; fase: number}> = ({
  nombre,
  icono,
  inicio,
  fase,
}) => (
  <div
    style={{
      ...useRebote(inicio),
      width: 420,
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
      <Img
        src={staticFile(icono)}
        style={{width: 150, height: 150, objectFit: 'contain', transform: useFlotar(fase, 7)}}
      />
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
          marginTop: 30,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          columnGap: 40,
          rowGap: 12,
          width: 880,
        }}
      >
        {t.categorias.map((c, i) => (
          <Categoria
            key={c.nombre}
            nombre={c.nombre}
            icono={c.icono}
            inicio={12 + i * 4}
            fase={i * 0.9}
          />
        ))}
      </div>
    </Escena>
  );
};

// Escena 4: beneficios en tarjetas apiladas. El número de cada tarjeta late al entrar.
const Tarjeta: React.FC<{texto: string; numero: number; inicio: number}> = ({texto, numero, inicio}) => {
  const frame = useCurrentFrame();
  const latido = 1 + Math.sin(Math.min(Math.max(frame - inicio - 8, 0), 12) / 12 * Math.PI) * 0.15;
  return (
    <div
      style={{
        ...useEntrada(inicio, 80, 12),
        width: 880,
        backgroundColor: color.blanco,
        borderRadius: 56,
        padding: '40px 48px',
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
          backgroundColor: color.lima,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: fuente.titular,
          fontWeight: 800,
          fontSize: 64,
          color: color.carbon,
          transform: `scale(${latido})`,
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
};

export const Escena4: React.FC<{duracion: number}> = ({duracion}) => (
  <Escena duracion={duracion}>
    <div style={{display: 'flex', flexDirection: 'column', gap: 36}}>
      {textos.escena4.tarjetas.map((t, i) => (
        <div key={i} style={{transform: useFlotar(i * 1.2, 5)}}>
          <Tarjeta texto={t} numero={i + 1} inicio={2 + i * 7} />
        </div>
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
  const n = Math.round(progreso(frame, inicio, inicio + 24) * parseInt(valor, 10));
  return (
    <div style={{fontFamily: fuente.titular, fontWeight: 800, fontSize: 96, color: color.carbon}}>
      {n}
    </div>
  );
};

// Barra que crece al entrar y luego "respira" un poco para que el panel se vea vivo.
const Crecer: React.FC<{inicio: number; pct: number; style: React.CSSProperties; dir: 'v' | 'h'; fase?: number}> = ({
  inicio,
  pct,
  style,
  dir,
  fase = 0,
}) => {
  const frame = useCurrentFrame();
  const vivo = 1 + Math.sin(frame / 14 + fase) * 0.05 * progreso(frame, inicio + 18, inicio + 30);
  const medida = `${Math.min(pct * progreso(frame, inicio, inicio + 18) * vivo, 100)}%`;
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
  const base = 16;
  return (
    <Escena duracion={duracion} justify="flex-start">
      <Titular size={80} style={useEntrada(2)}>
        {t.titular}
      </Titular>
      <div
        style={{
          ...useEntrada(base - 8, 120, 18),
          marginTop: 40,
          width: 820,
          backgroundColor: color.blanco,
          borderRadius: 64,
          border: `4px solid ${color.carbon}`,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
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
          <div style={{...tarjeta, flex: 1, ...useEntrada(base, 30)}}>
            <Etiqueta>{t.visitasDiarias.etiqueta}</Etiqueta>
            <Numero valor={t.visitasDiarias.valor} inicio={base + 4} />
          </div>
          <div style={{...tarjeta, flex: 1, ...useEntrada(base + 5, 30)}}>
            <Etiqueta>{t.codigosValidados.etiqueta}</Etiqueta>
            <Numero valor={t.codigosValidados.valor} inicio={base + 9} />
          </div>
        </div>
        <div style={{...tarjeta, ...useEntrada(base + 10, 30)}}>
          <Etiqueta>{t.tendencias.etiqueta}</Etiqueta>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 18, height: 150, marginTop: 14}}>
            {t.tendencias.valores.map((v, i) => (
              <div key={i} style={{flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end'}}>
                <Crecer
                  dir="v"
                  inicio={base + 14 + i * 3}
                  pct={(v / maxT) * 100}
                  fase={i}
                  style={{
                    width: '100%',
                    borderRadius: 14,
                    backgroundColor: v === maxT ? color.lima : color.arenaOscuro,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div style={{display: 'flex', gap: 20}}>
          <div style={{...tarjeta, flex: 1.15, ...useEntrada(base + 18, 30)}}>
            <Etiqueta>{t.edad.etiqueta}</Etiqueta>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14}}>
              {t.edad.rangos.map((r, i) => (
                <div key={r.rango} style={{height: 28, backgroundColor: color.blanco, borderRadius: 999}}>
                  <Crecer
                    dir="h"
                    inicio={base + 22 + i * 3}
                    pct={(r.valor / maxE) * 95}
                    fase={i * 1.3}
                    style={{height: '100%', borderRadius: 999, backgroundColor: color.lila}}
                  />
                </div>
              ))}
            </div>
          </div>
          <div style={{...tarjeta, flex: 1, display: 'flex', flexDirection: 'column', ...useEntrada(base + 22, 30)}}>
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
                inicio={base + 26}
                pct={t.genero.partes[0].valor}
                style={{height: '100%', backgroundColor: color.lima}}
              />
              <Crecer
                dir="h"
                inicio={base + 30}
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

// Escena 6: cierre con un solo llamado a la acción. El botón late y la flecha empuja.
export const Escena6: React.FC<{duracion: number}> = ({duracion}) => {
  const frame = useCurrentFrame();
  const t = textos.escena6;
  const activo = progreso(frame, 20, 30);
  const latido = 1 + Math.sin(frame / 7) * 0.03 * activo;
  const empuje = Math.max(Math.sin(frame / 5), 0) * 12 * activo;
  return (
    <Escena duracion={duracion} sinSalida>
      <div style={useEntrada(2, 60)}>
        <Img
          src={staticFile('logo/enplan_logo_carbon_sobre_arena.svg')}
          style={{width: 720, transform: useFlotar(0, 6)}}
        />
      </div>
      <div style={{...useEntrada(10, 60), marginTop: 90}}>
        <div
          style={{
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
            transform: `scale(${latido})`,
          }}
        >
          {t.boton}
          <div style={{transform: `translateX(${empuje}px)`}}>
            <Flecha size={60} />
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 90,
          fontFamily: fuente.apoyo,
          fontWeight: 600,
          fontSize: 52,
          lineHeight: 1.5,
          color: color.carbon,
          textAlign: 'center',
        }}
      >
        <div style={useEntrada(18)}>{t.redes}</div>
        <div style={useEntrada(24)}>{t.web}</div>
      </div>
    </Escena>
  );
};
