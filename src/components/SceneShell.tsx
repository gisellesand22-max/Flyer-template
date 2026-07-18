import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../colors';
import {Bg} from '../content';

const WIPE_DURATION = 16;

export const SceneShell: React.FC<{bg: Bg; children: React.ReactNode}> = ({bg, children}) => {
  const frame = useCurrentFrame();
  const background = bg === 'green' ? COLORS.green : COLORS.cream;

  const wipeX = interpolate(frame, [0, WIPE_DURATION], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{background, overflow: 'hidden'}}>
      {children}
      <div
        style={{
          position: 'absolute',
          top: '-35%',
          left: '-35%',
          width: '170%',
          height: '170%',
          background: COLORS.gold,
          transform: `rotate(-9deg) translateX(${wipeX}%)`,
          transformOrigin: 'center',
        }}
      />
    </AbsoluteFill>
  );
};
