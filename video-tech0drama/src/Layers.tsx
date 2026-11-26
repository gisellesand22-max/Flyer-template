import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

// Video completo (el fondo)
export const Base: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile("toma.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover", ...style }} />
  </AbsoluteFill>
);
