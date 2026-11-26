import React from "react";
import { Composition } from "remotion";
import { FPS, FRAMES } from "./brand";
import { Portada } from "./Portada";

const size = { width: 1080, height: 1920, fps: FPS, durationInFrames: FRAMES };

export const Root: React.FC = () => (
  <>
    <Composition id="PortadaLisa" component={Portada} {...size} />
    <Composition id="PortadaMapa" component={Portada} defaultProps={{ conMapa: true }} {...size} />
  </>
);
