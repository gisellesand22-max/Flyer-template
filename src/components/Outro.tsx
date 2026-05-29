import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, OUTRO } from "../config";
import { headingFamily, bodyFamily } from "../fonts";

type Props = { durationInFrames: number };

export const Outro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  const enter = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const scale = interpolate(enter, [0, 1], [0.9, 1]);

  const lineW = interpolate(frame, [18, 40], [0, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: COLORS.dark }}>
      {OUTRO.image ? (
        <>
          <Img
            src={staticFile(`images/${OUTRO.image}`)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.6)" }} />
        </>
      ) : null}

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 90,
        }}
      >
        <div style={{ transform: `scale(${scale})`, opacity: enter }}>
          <div
            style={{
              fontFamily: headingFamily,
              color: COLORS.text,
              fontSize: 110,
              fontWeight: 700,
            }}
          >
            {OUTRO.title}
          </div>
          <div
            style={{
              height: 4,
              width: lineW,
              backgroundColor: COLORS.secondary,
              margin: "30px auto",
            }}
          />
          <div
            style={{
              fontFamily: bodyFamily,
              color: COLORS.textMuted,
              fontSize: 44,
              maxWidth: 820,
              lineHeight: 1.3,
            }}
          >
            {OUTRO.tagline}
          </div>
          <div
            style={{
              fontFamily: bodyFamily,
              color: COLORS.secondary,
              fontSize: 34,
              letterSpacing: 2,
              marginTop: 50,
            }}
          >
            {OUTRO.contact}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
