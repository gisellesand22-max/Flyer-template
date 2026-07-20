import React from 'react';
import {COLORS} from '../colors';

export type IconName = 'coffee' | 'bank' | 'policy' | 'magnifier' | 'shield' | 'cursor' | 'arrow';

const stroke = {
  fill: 'none',
  stroke: 'white',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const IconGraphic: React.FC<{name: IconName}> = ({name}) => {
  switch (name) {
    case 'coffee':
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8z" {...stroke} />
          <path d="M16 10h2a2.5 2.5 0 0 1 0 5h-2" {...stroke} />
          <path d="M9 3.5c-.6 1 .6 1.5 0 2.5" {...stroke} />
          <path d="M12.7 3.5c-.6 1 .6 1.5 0 2.5" {...stroke} />
        </svg>
      );
    case 'bank':
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <polygon points="12,3 21,9 3,9" {...stroke} />
          <line x1="4" y1="20" x2="20" y2="20" {...stroke} />
          <line x1="5.5" y1="9" x2="5.5" y2="18" {...stroke} />
          <line x1="9.8" y1="9" x2="9.8" y2="18" {...stroke} />
          <line x1="14.2" y1="9" x2="14.2" y2="18" {...stroke} />
          <line x1="18.5" y1="9" x2="18.5" y2="18" {...stroke} />
        </svg>
      );
    case 'policy':
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <rect x="5" y="3" width="14" height="18" rx="1.5" {...stroke} />
          <line x1="8" y1="8" x2="16" y2="8" {...stroke} />
          <line x1="8" y1="12" x2="16" y2="12" {...stroke} />
          <line x1="8" y1="16" x2="13" y2="16" {...stroke} />
        </svg>
      );
    case 'magnifier':
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <circle cx="10.5" cy="10.5" r="6.5" {...stroke} />
          <line x1="15.5" y1="15.5" x2="21" y2="21" {...stroke} />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z" {...stroke} />
          <polyline points="8.5,12 11,14.5 15.5,9.5" {...stroke} />
        </svg>
      );
    case 'cursor':
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M5 3l6 17 2.2-6.8L20 11 5 3z" {...stroke} />
        </svg>
      );
    case 'arrow':
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <line x1="4" y1="12" x2="18" y2="12" {...stroke} />
          <polyline points="12,6 18,12 12,18" {...stroke} />
        </svg>
      );
    default:
      return null;
  }
};

export const IconBadge: React.FC<{name: IconName; size?: number}> = ({name, size = 150}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: COLORS.gold,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <div style={{width: size * 0.5, height: size * 0.5}}>
        <IconGraphic name={name} />
      </div>
    </div>
  );
};
