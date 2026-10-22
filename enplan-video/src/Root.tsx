import React from 'react';
import {Composition, continueRender, delayRender} from 'remotion';
import '@fontsource/montserrat/800.css';
import '@fontsource/work-sans/600.css';
import {DURACION, FPS} from './marca';
import {Video} from './Video';

const espera = delayRender('Cargando tipografías');
Promise.all([
  document.fonts.load("800 100px 'Montserrat'"),
  document.fonts.load("600 100px 'Work Sans'"),
]).then(() => continueRender(espera));

export const Root: React.FC = () => (
  <Composition id="EnplanExplainer" component={Video} durationInFrames={DURACION} fps={FPS} width={1080} height={1920} />
);
