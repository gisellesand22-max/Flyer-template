import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Big, Dots, Icons, Logo, Phone, Pop, Safe, Small, Underlined} from './components';
import {ICONS, TEXTS} from './texts';
import {C, HEAD} from './theme';
import {T} from './timing';

const center: React.CSSProperties = {display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'};

// Escena 1: qué es
const Scene1: React.FC = () => {
  const t = TEXTS.escena1;
  const [a0, a1] = T.s1.a;
  const [b0, b1] = T.s1.b;
  return (
    <Safe style={{justifyContent: 'flex-start', paddingTop: 230}}>
      <Pop start={a0} end={b1}>
        <Logo width={640} />
      </Pop>
      <div style={{position: 'relative', width: '100%', marginTop: 140, height: 420}}>
        <div style={{position: 'absolute', inset: 0, ...center}}>
          <Pop start={a0} end={a1} delay={3}>
            <Small>{t.pantallaA.chico}</Small>
          </Pop>
          <Pop start={a0} end={a1} delay={5}>
            <Big size={136} color={C.lima} style={{margin: '14px 0 18px'}}>
              {t.pantallaA.grande}
            </Big>
          </Pop>
          <Pop start={a0} end={a1} delay={7}>
            <Small>{t.pantallaA.chico2}</Small>
          </Pop>
        </div>
        <div style={{position: 'absolute', inset: 0, ...center}}>
          <Pop start={b0} end={b1}>
            <Small>{t.pantallaB.chico}</Small>
          </Pop>
          <Pop start={b0} end={b1} delay={2}>
            <div style={{marginTop: 16}}>
              <Underlined start={b0 + 8} thickness={18}>
                <Big size={180}>{t.pantallaB.grande}</Big>
              </Underlined>
            </div>
          </Pop>
        </div>
      </div>
    </Safe>
  );
};

// Escena 2: qué resuelve
const Scene2: React.FC = () => {
  const t = TEXTS.escena2;
  const [a0, a1] = T.s2.a;
  const [b0, b1] = T.s2.b;
  return (
    <>
      <Dots start={a0} end={b1} dots={[{x: 210, y: 640, r: 16}, {x: 880, y: 720, r: 24}, {x: 820, y: 1260, r: 14}]} />
      <Safe>
        <div style={{...center, height: 560, justifyContent: 'center'}}>
          <Pop start={a0} end={a1}>
            <Small size={72}>{t.pantallaA.chico}</Small>
          </Pop>
          <Pop start={a0} end={b1} delay={2}>
            <Big size={330} color={C.lima} style={{margin: '0 0 34px'}}>
              {t.pantallaA.grande}
            </Big>
          </Pop>
          <div style={{position: 'relative', height: 90, width: '100%'}}>
            <div style={{position: 'absolute', inset: 0, ...center}}>
              <Pop start={a0} end={a1} delay={4}>
                <Small size={72}>{t.pantallaA.chico2}</Small>
              </Pop>
            </div>
            <div style={{position: 'absolute', inset: 0, ...center}}>
              <Pop start={b0} end={b1}>
                <Small size={72}>{t.pantallaB.apoyo}</Small>
              </Pop>
            </div>
          </div>
        </div>
      </Safe>
    </>
  );
};

const NumCircle: React.FC<{n: number}> = ({n}) => (
  <div
    style={{
      width: 104,
      height: 104,
      flex: '0 0 104px',
      borderRadius: '50%',
      background: C.lima,
      color: C.carbon,
      fontFamily: HEAD,
      fontWeight: 800,
      fontSize: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {n}
  </div>
);

const Step: React.FC<{n: number; window: number[]; top: number; height: number; children: React.ReactNode}> = ({
  n,
  window,
  top,
  height,
  children,
}) => (
  <div style={{position: 'absolute', left: 80, right: 80, top, height, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Pop start={window[0]} end={window[1]} style={{display: 'flex', alignItems: 'center', gap: 28}}>
      <NumCircle n={n} />
      <Small size={60} weight={600} style={{textAlign: 'left'}}>
        {children}
      </Small>
    </Pop>
  </div>
);

// Escena 3: cómo se usa
const Scene3: React.FC = () => {
  const t = TEXTS.escena3;
  const s = T.s3;
  return (
    <>
      <Phone inAt={s.phoneIn} outAt={T.s4.from} steps={[s.p1[0], s.p2[0], s.p3[0]]} />
      {/* Arriba del celular: pasos 1 y 3. Abajo: paso 2 */}
      <Step n={1} window={s.p1} top={280} height={220}>
        {t.paso1}
      </Step>
      <Step n={2} window={s.p2} top={1384} height={120}>
        {t.paso2}
      </Step>
      <Step n={3} window={s.p3} top={280} height={220}>
        {t.paso3[0]}
        <br />
        {t.paso3[1]}
      </Step>
    </>
  );
};

// Escena 4: para quién es
const Scene4: React.FC = () => {
  const t = TEXTS.escena4;
  const [a0, a1] = T.s4.a;
  const [b0, b1] = T.s4.b;
  return (
    <div style={{position: 'absolute', left: 80, right: 80, top: 640, height: 560}}>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22}}>
        <Pop start={a0} end={a1} delay={6}>
          <Small size={64}>{t.pantallaA.chico}</Small>
        </Pop>
        <Pop start={a0} end={a1} delay={8}>
          <Big size={300} color={C.lima}>
            {t.pantallaA.grande}
          </Big>
        </Pop>
        <Pop start={a0} end={a1} delay={10}>
          <Small size={64} style={{textAlign: 'left'}}>
            {t.pantallaA.lado[0]}
            <br />
            {t.pantallaA.lado[1]}
          </Small>
        </Pop>
      </div>
      <div style={{position: 'absolute', inset: 0, ...center, justifyContent: 'center'}}>
        <Pop start={b0} end={b1}>
          <Small size={64}>{t.pantallaB.chico}</Small>
        </Pop>
        <Pop start={b0} end={b1} delay={2}>
          <div style={{margin: '18px 0 40px'}}>
            <Underlined start={b0 + 8} thickness={16}>
              <Big size={140}>{t.pantallaB.grande}</Big>
            </Underlined>
          </div>
        </Pop>
        <Pop start={b0} end={b1} delay={4}>
          <Small size={64}>{t.pantallaB.chico2}</Small>
        </Pop>
      </div>
    </div>
  );
};

// Escena 5: llamado a negocios
const Scene5: React.FC = () => {
  const t = TEXTS.escena5;
  const [a0, a1] = T.s5.a;
  const [b0, b1] = T.s5.b;
  return (
    <>
      <Dots start={a0} end={b1} dots={[{x: 190, y: 700, r: 20}, {x: 900, y: 1220, r: 16}, {x: 860, y: 640, r: 12}]} />
      <Safe>
        <div style={{position: 'relative', width: '100%', height: 520}}>
          <div style={{position: 'absolute', inset: 0, ...center, justifyContent: 'center'}}>
            <Pop start={a0} end={a1}>
              <Small size={72}>{t.pantallaA.chico}</Small>
            </Pop>
            <Pop start={a0} end={a1} delay={2}>
              <Big size={170} color={C.lima} style={{marginTop: 12}}>
                {t.pantallaA.grande}
              </Big>
            </Pop>
          </div>
          <div style={{position: 'absolute', inset: 0, ...center, justifyContent: 'center'}}>
            <Pop start={b0} end={b1}>
              <Small size={64}>{t.pantallaB.chico}</Small>
            </Pop>
            <Pop start={b0} end={b1} delay={2}>
              <Big size={136} style={{marginTop: 20}}>
                {t.pantallaB.grande[0]}
              </Big>
            </Pop>
            <Pop start={b0} end={b1} delay={4}>
              <Big size={136} style={{marginTop: 6}}>
                {t.pantallaB.grande[1]}
              </Big>
            </Pop>
          </div>
        </div>
      </Safe>
    </>
  );
};

// Escena 6: cierre
const Scene6: React.FC = () => {
  const t = TEXTS.escena6;
  const [a0] = T.s6.a;
  return (
    <>
      <Dots start={a0} dots={[{x: 150, y: 640, r: 14}, {x: 930, y: 1290, r: 20}]} />
      <Safe>
        <Pop start={a0}>
          <Logo width={520} />
        </Pop>
        <div style={{...center, marginTop: 90}}>
          <Pop start={a0} delay={3}>
            <Big size={92}>{t.titulo[0]}</Big>
          </Pop>
          <Pop start={a0} delay={5}>
            <Big size={92} style={{marginTop: 8}}>
              {t.titulo[1]} <span style={{color: C.lima}}>{t.tituloAcento}</span>
            </Big>
          </Pop>
        </div>
        <Pop start={a0} delay={8} style={{marginTop: 70}}>
          <div
            style={{
              background: C.lima,
              borderRadius: 999,
              padding: '30px 60px',
              display: 'flex',
              alignItems: 'center',
              gap: 22,
            }}
          >
            <Big size={60}>{t.boton}</Big>
            <svg viewBox="0 0 40 40" style={{width: 52, height: 52}}>
              <path d="M6 20 H32 M21 9 L32 20 L21 31" fill="none" stroke={C.carbon} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Pop>
        <Pop start={a0} delay={10} style={{marginTop: 40}}>
          <Small size={48}>{t.redes}</Small>
        </Pop>
      </Safe>
    </>
  );
};

export const EnplanExplainer: React.FC = () => (
  <AbsoluteFill style={{background: C.arena}}>
    <Scene1 />
    <Scene2 />
    <Scene3 />
    <Icons files={ICONS.map((i) => i.archivo)} emergeAt={T.s3.p2[0] + 2} regroupAt={T.s4.from} outAt={T.s4.b[1] - 4} />
    <Scene4 />
    <Scene5 />
    <Scene6 />
  </AbsoluteFill>
);
