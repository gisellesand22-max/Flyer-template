import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { FRAMES } from "./brand";

const vid = (style?: React.CSSProperties) => (
  <OffthreadVideo
    src={staticFile("toma.mp4")}
    style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
  />
);

// Video completo (el fondo)
export const Base: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <AbsoluteFill>{vid(style)}</AbsoluteFill>
);

// Solo tu figura, recortada con la silueta de cada cuadro.
// Se pone encima del texto que va "detrás de ti".
export const Person: React.FC = () => {
  const frame = Math.min(useCurrentFrame(), FRAMES - 1);
  const m = staticFile(`matte/${String(frame).padStart(4, "0")}.png`);
  return (
    <AbsoluteFill
      style={{
        WebkitMaskImage: `url(${m})`,
        maskImage: `url(${m})`,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
      }}
    >
      {vid()}
      {/* Precarga la silueta para que Remotion espere a que cargue */}
      <Img src={m} style={{ display: "none" }} />
    </AbsoluteFill>
  );
};
