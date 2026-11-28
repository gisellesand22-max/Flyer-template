import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { FRAMES } from "./brand";

const vid = (muted = false) => (
  <OffthreadVideo muted={muted} src={staticFile("toma_retoque.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
);

// Video completo (con audio)
export const Base: React.FC = () => <AbsoluteFill>{vid()}</AbsoluteFill>;

// Solo tu figura, recortada con la silueta de cada cuadro (sin audio)
export const Person: React.FC = () => {
  const frame = Math.min(useCurrentFrame(), FRAMES - 1);
  const m = staticFile(`matte/${String(frame).padStart(4, "0")}.png`);
  return (
    <AbsoluteFill style={{ WebkitMaskImage: `url(${m})`, maskImage: `url(${m})`, WebkitMaskSize: "100% 100%", maskSize: "100% 100%" }}>
      {vid(true)}
      <Img src={m} style={{ display: "none" }} />
    </AbsoluteFill>
  );
};
