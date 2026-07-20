import React from 'react';
import {spring} from 'remotion';
import {COLORS} from '../colors';
import {Bg, Segment, Variant} from '../content';
import {bodyFont, headlineFont} from '../fonts';

export const START_DELAY = 8;
export const LINE_STAGGER = 8;

export const segmentStyle = (variant: Variant | undefined, bg: Bg): React.CSSProperties => {
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

export const SegmentSpan: React.FC<{seg: Segment; bg: Bg; frame: number; fps: number}> = ({
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
