import React from 'react';
import {Img, staticFile} from 'remotion';
import {color, fuente} from './marca';

export const Logo: React.FC<{ancho: number}> = ({ancho}) => (
  <Img src={staticFile('logo/enplan_logo_carbon_sobre_arena.svg')} style={{width: ancho, display: 'block'}} />
);

export const Pin: React.FC<{alto: number; relleno?: string}> = ({alto, relleno = color.carbon}) => (
  <svg width={alto * 0.75} height={alto} viewBox="0 0 30 40">
    <path d="M15 1C7.3 1 1 7.1 1 14.7 1 25 15 39 15 39s14-14 14-24.3C29 7.1 22.7 1 15 1z" fill={relleno} />
    <circle cx="15" cy="14.5" r="5.5" fill={color.arena} />
  </svg>
);

export const NumeroPaso: React.FC<{n: string}> = ({n}) => (
  <div
    style={{
      width: 100,
      height: 100,
      borderRadius: 50,
      background: color.lima,
      color: color.carbon,
      fontFamily: fuente.titular,
      fontWeight: 800,
      fontSize: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {n}
  </div>
);
