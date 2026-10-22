import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {color, escenas} from './marca';
import {textos} from './textos';
import {Celular, IconosFlotantes} from './Celular';
import {Escena1, Escena2, Escena7, Paso} from './Escenas';

const {e1, e2, e3, e4, e5, e6, e7} = escenas;

export const Video: React.FC = () => (
  <AbsoluteFill style={{background: color.arena}}>
    <Sequence from={e1.desde} durationInFrames={e1.dura}>
      <Escena1 dura={e1.dura} />
    </Sequence>
    <Sequence from={e2.desde} durationInFrames={e2.dura}>
      <Escena2 dura={e2.dura} />
    </Sequence>
    <Celular />
    <Sequence from={e3.desde} durationInFrames={e3.dura}>
      <Paso dura={e3.dura} numero={textos.escena3.numero} palabra={textos.escena3.titular} />
    </Sequence>
    <Sequence from={e4.desde} durationInFrames={e4.dura}>
      <Paso dura={e4.dura} numero={textos.escena4.numero} palabra={textos.escena4.titular} apoyoTexto={textos.escena4.apoyo} />
    </Sequence>
    <Sequence from={e5.desde} durationInFrames={e5.dura}>
      <Paso dura={e5.dura} numero={textos.escena5.numero} palabra={textos.escena5.titular} apoyoTexto={textos.escena5.apoyo} />
    </Sequence>
    <Sequence from={e6.desde} durationInFrames={e6.dura}>
      <Paso
        dura={e6.dura}
        numero={textos.escena6.numero}
        palabra={textos.escena6.titular}
        apoyoTexto={textos.escena6.apoyoA}
        apoyoCambio={{texto: textos.escena6.apoyoB, frame: 42}}
      />
    </Sequence>
    <IconosFlotantes />
    <Sequence from={e7.desde} durationInFrames={e7.dura}>
      <Escena7 />
    </Sequence>
  </AbsoluteFill>
);
