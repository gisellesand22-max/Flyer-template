import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../colors';
import {Bg} from '../content';
import {headlineFont} from '../fonts';

export const WordCycleScene: React.FC<{bg: Bg; words: string[]; durationInFrames: number}> = ({
  bg,
  words,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const perWord = durationInFrames / words.length;
  const index = Math.min(words.length - 1, Math.floor(frame / perWord));
  const localFrame = frame - index * perWord;

  const isLastWord = index === words.length - 1;
  const pop = spring({frame: localFrame, fps, config: {damping: 12, mass: 0.5, stiffness: 160}});
  const fadeOut = isLastWord
    ? 1
    : interpolate(localFrame, [perWord - 6, perWord - 1], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const opacity = Math.min(pop, fadeOut);

  const color = bg === 'green' ? COLORS.gold : COLORS.textOnCream;

  return (
    <AbsoluteFill
      style={{justifyContent: 'center', alignItems: 'center', padding: '0 60px'}}
    >
      <div
        style={{
          fontFamily: headlineFont,
          fontWeight: 800,
          fontSize: 92,
          letterSpacing: 3,
          textAlign: 'center',
          color,
          opacity,
          transform: `scale(${pop})`,
        }}
      >
        {words[index]}
      </div>
      <div style={{position: 'absolute', bottom: 90, display: 'flex', gap: 18}}>
        {words.map((_, i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: i === index ? COLORS.gold : 'rgba(150,150,150,0.35)',
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
