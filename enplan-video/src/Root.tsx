import React from 'react';
import {Composition} from 'remotion';
import './theme';
import {EnplanExplainer} from './Video';
import {DURATION, FPS} from './timing';

export const RemotionRoot: React.FC = () => (
  <Composition id="EnplanExplainer" component={EnplanExplainer} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} />
);
