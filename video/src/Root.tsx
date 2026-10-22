import React from 'react';
import {Composition} from 'remotion';
import {FPS} from './marca';
import {DURACION_TOTAL, EnplanNegocios} from './Video';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="EnplanNegocios"
    component={EnplanNegocios}
    durationInFrames={DURACION_TOTAL}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
