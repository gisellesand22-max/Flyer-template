import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, TEXT } from "../config";
import { bodyFamily } from "../fonts";

type Props = {
  text: string;
  delayFrames: number; // when this bubble starts popping in
};

/**
 * A white pill with purple text that pops in (scale + fade) at delayFrames
 * and then stays put. Chat-bubble style.
 */
export const Bubble: React.FC<Props> = ({ text, delayFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - delayFrames;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 140 },
  });
  const opacity = interpolate(local, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Slight overshoot pop.
  const scale = interpolate(enter, [0, 1], [0.6, 1]);

  return (
    <div
      style={{
        alignSelf: "center",
        backgroundColor: COLORS.bubbleBg,
        color: COLORS.bubbleText,
        fontFamily: bodyFamily,
        fontSize: TEXT.fontSize,
        fontWeight: TEXT.fontWeight,
        lineHeight: 1.15,
        borderRadius: TEXT.bubbleRadius,
        padding: `${TEXT.bubblePaddingV}px ${TEXT.bubblePaddingH}px`,
        boxShadow: "0 8px 28px rgba(0,0,0,0.28)",
        opacity,
        transform: `scale(${scale})`,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};
