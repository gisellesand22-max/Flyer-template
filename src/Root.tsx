import React from "react";
import { Composition } from "remotion";
import { Promo } from "./Promo";
import { SCENES, VIDEO } from "./config";

const totalSeconds = SCENES.reduce((acc, s) => acc + s.durationInSeconds, 0);

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Promo"
      component={Promo}
      durationInFrames={Math.round(totalSeconds * VIDEO.fps)}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
    />
  );
};
