import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Bg, Line} from '../content';
import {LINE_STAGGER, SegmentSpan, START_DELAY} from './textStyles';

export const StatementScene: React.FC<{bg: Bg; lines: Line[]}> = ({bg, lines}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 90px',
      }}
    >
      <div style={{display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center'}}>
        {lines.map((line, i) => {
          const localFrame = frame - START_DELAY - i * LINE_STAGGER;
          const progress = spring({frame: localFrame, fps, config: {damping: 18, mass: 0.7}});
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          const translateY = interpolate(progress, [0, 1], [36, 0]);

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'baseline',
                textAlign: 'center',
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              {line.map((seg, j) => (
                <SegmentSpan key={j} seg={seg} bg={bg} frame={localFrame} fps={fps} />
              ))}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
