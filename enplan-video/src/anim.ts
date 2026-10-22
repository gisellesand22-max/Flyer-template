import {interpolate, spring} from 'remotion';
import {FPS} from './marca';

// Entrada con rebote suave: sube desde abajo y aparece.
export const rebote = (frame: number, retraso = 0) =>
  spring({frame: frame - retraso, fps: FPS, config: {damping: 11, stiffness: 140, mass: 0.7}});

export const suave = (frame: number, retraso = 0) =>
  spring({frame: frame - retraso, fps: FPS, config: {damping: 20, stiffness: 120}});

// Estilo de entrada (abajo hacia arriba + fundido) y salida al final de la escena.
export const entradaSalida = (frame: number, dura: number, retraso = 0, salida = 8) => {
  const p = rebote(frame, retraso);
  const fuera = interpolate(frame, [dura - salida, dura], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacidadEntrada = interpolate(frame - retraso, [0, 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return {
    opacity: opacidadEntrada * (1 - fuera),
    transform: `translateY(${(1 - p) * 60 - fuera * 30}px) scale(${0.92 + 0.08 * p})`,
  };
};

export const ventana = (frame: number, desde: number, hasta: number, fundido = 8) =>
  interpolate(frame, [desde, desde + fundido, hasta - fundido, hasta], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
