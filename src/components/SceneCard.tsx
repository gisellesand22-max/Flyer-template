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
import { COLORS } from "../config";
import { headingFamily, bodyFamily } from "../fonts";

type Props = {
  image: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "top" | "center" | "bottom";
  durationInFrames: number;
};

export const SceneCard: React.FC<Props> = ({
  image,
  kicker,
  title,
  subtitle,
  align = "bottom",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ken Burns slow zoom on the background.
  const zoom = interpolate(frame, [0, durationInFrames], [1.08, 1.18], {
    extrapolateRight: "clamp",
  });

  // Fade the whole scene in and out at the edges.
  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  // Text spring-in.
  const enter = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  const ty = interpolate(enter, [0, 1], [40, 0]);

  const justify =
    align === "top" ? "flex-start" : align === "center" ? "center" : "flex-end";

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: COLORS.dark }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        {image ? (
          <Img
            src={staticFile(`images/${image}`)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          // Placeholder shown until a real background image is provided.
          <AbsoluteFill
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.dark})`,
            }}
          />
        )}
      </AbsoluteFill>

      {/* Gradient overlay for text legibility */}
      <AbsoluteFill
        style={{
          background:
            align === "top"
              ? `linear-gradient(to bottom, ${COLORS.overlay}, transparent 55%)`
              : align === "center"
              ? COLORS.overlay
              : `linear-gradient(to top, ${COLORS.overlay}, transparent 55%)`,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: justify,
          alignItems: "flex-start",
          padding: "120px 90px",
        }}
      >
        <div style={{ transform: `translateY(${ty}px)`, opacity: enter }}>
          {kicker ? (
            <div
              style={{
                fontFamily: bodyFamily,
                color: COLORS.secondary,
                fontSize: 34,
                letterSpacing: 8,
                fontWeight: 600,
                marginBottom: 18,
              }}
            >
              {kicker}
            </div>
          ) : null}
          <div
            style={{
              fontFamily: headingFamily,
              color: COLORS.text,
              fontSize: 96,
              lineHeight: 1.05,
              fontWeight: 700,
              maxWidth: 880,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontFamily: bodyFamily,
                color: COLORS.textMuted,
                fontSize: 40,
                marginTop: 24,
                maxWidth: 820,
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
