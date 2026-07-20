import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../colors';
import {Bg, Line} from '../content';
import {LINE_STAGGER, SegmentSpan, START_DELAY} from './textStyles';
import {IconBadge, IconName} from './IconBadge';

const ICON_DELAY = 0;
const TEXT_DELAY = 14;
const STRIKE_DELAY = 34;
const STRIKE_DURATION = 14;

export const IconStatementScene: React.FC<{
  bg: Bg;
  icon: IconName;
  lines: Line[];
  strikeFirstLine?: boolean;
}> = ({bg, icon, lines, strikeFirstLine}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const iconFrame = frame - ICON_DELAY;
  const iconPop = spring({frame: iconFrame, fps, config: {damping: 12, mass: 0.6, stiffness: 150}});
  const iconOpacity = interpolate(iconPop, [0, 1], [0, 1]);

  const strikeScale = interpolate(
    frame,
    [STRIKE_DELAY, STRIKE_DELAY + STRIKE_DURATION],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 90px',
      }}
    >
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 46}}>
        <div style={{opacity: iconOpacity, transform: `scale(${iconPop})`}}>
          <IconBadge name={icon} />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center'}}>
          {lines.map((line, i) => {
            const localFrame = frame - TEXT_DELAY - START_DELAY - i * LINE_STAGGER;
            const progress = spring({frame: localFrame, fps, config: {damping: 18, mass: 0.7}});
            const opacity = interpolate(progress, [0, 1], [0, 1]);
            const translateY = interpolate(progress, [0, 1], [36, 0]);
            const isFirst = i === 0;

            return (
              <div
                key={i}
                style={{
                  position: 'relative',
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
                {isFirst && strikeFirstLine && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      width: '100%',
                      height: 6,
                      background: COLORS.gold,
                      borderRadius: 3,
                      transform: `translateY(-50%) scaleX(${strikeScale})`,
                      transformOrigin: 'left center',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
