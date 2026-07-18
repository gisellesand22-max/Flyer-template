import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../colors';
import {Bg, Line, Segment, Variant} from '../content';
import {bodyFont, headlineFont} from '../fonts';

const START_DELAY = 8;
const LINE_STAGGER = 8;

const segmentStyle = (variant: Variant | undefined, bg: Bg): React.CSSProperties => {
  const normalColor = bg === 'green' ? COLORS.white : COLORS.textOnCream;

  if (variant === 'big') {
    return {
      fontFamily: headlineFont,
      fontWeight: 800,
      color: COLORS.gold,
      fontSize: 140,
      lineHeight: 1,
    };
  }

  if (variant === 'emphasis') {
    return {
      fontFamily: headlineFont,
      fontWeight: 700,
      color: COLORS.gold,
      fontSize: 62,
      lineHeight: 1.2,
    };
  }

  return {
    fontFamily: bodyFont,
    fontWeight: 600,
    color: normalColor,
    fontSize: 50,
    lineHeight: 1.3,
  };
};

const SegmentSpan: React.FC<{seg: Segment; bg: Bg; frame: number; fps: number}> = ({
  seg,
  bg,
  frame,
  fps,
}) => {
  const style = segmentStyle(seg.variant, bg);

  if (seg.variant === 'big') {
    const pop = spring({frame, fps, config: {damping: 11, mass: 0.6, stiffness: 140}});
    return (
      <span style={{...style, display: 'inline-block', transform: `scale(${pop})`}}>
        {seg.text}
      </span>
    );
  }

  return <span style={style}>{seg.text}</span>;
};

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
