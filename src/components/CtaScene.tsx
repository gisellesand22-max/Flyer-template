import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../colors';
import {headlineFont} from '../fonts';
import {IconBadge, IconName} from './IconBadge';

export const CtaScene: React.FC<{text: string; icon?: IconName}> = ({text, icon}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const pop = spring({frame, fps, config: {damping: 13, mass: 0.6, stiffness: 150}});
  const underline = interpolate(frame, [10, 24], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: '0 70px'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
        {icon && (
          <div style={{transform: `scale(${pop})`}}>
            <IconBadge name={icon} size={130} />
          </div>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${pop})`,
          }}
        >
          <div
            style={{
              fontFamily: headlineFont,
              fontWeight: 800,
              fontSize: 80,
              color: COLORS.white,
              textAlign: 'center',
            }}
          >
            {text}
          </div>
          <div
            style={{
              marginTop: 20,
              height: 8,
              width: `${underline}%`,
              maxWidth: 620,
              background: COLORS.gold,
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
