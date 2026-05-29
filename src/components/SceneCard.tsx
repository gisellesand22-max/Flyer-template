import React, { useState } from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { COLORS, TEXT, VIDEO } from "../config";
import { Bubble } from "./Bubble";

type Props = {
  image: string;
  bubbles: string[];
  align?: "top" | "center" | "bottom";
  durationInFrames: number;
};

export const SceneCard: React.FC<Props> = ({
  image,
  bubbles,
  align = "center",
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  // Falls back to the gradient placeholder if the image file isn't present.
  const [imgFailed, setImgFailed] = useState(false);

  // Ken Burns slow zoom on the background.
  const zoom = interpolate(frame, [0, durationInFrames], [1.06, 1.16], {
    extrapolateRight: "clamp",
  });

  // Fade the whole scene in/out at the edges for clean cuts.
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  const stagger = Math.round(TEXT.staggerSeconds * VIDEO.fps);

  const justify =
    align === "top" ? "flex-start" : align === "center" ? "center" : "flex-end";

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: COLORS.dark }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        {image && !imgFailed ? (
          <Img
            src={staticFile(`images/${image}`)}
            onError={() => setImgFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          // Placeholder until a real background image is provided.
          <AbsoluteFill
            style={{
              background: `linear-gradient(135deg, #2a2a40, ${COLORS.dark})`,
            }}
          />
        )}
      </AbsoluteFill>

      {/* Subtle overlay for legibility */}
      <AbsoluteFill style={{ backgroundColor: COLORS.overlay }} />

      <AbsoluteFill
        style={{
          justifyContent: justify,
          alignItems: "center",
          padding: "160px 70px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: TEXT.bubbleGap,
            alignItems: "center",
          }}
        >
          {bubbles.map((text, i) => (
            <Bubble key={i} text={text} delayFrames={6 + i * stagger} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
