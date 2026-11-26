import React from "react";
import { Composition } from "remotion";
import { FPS, FRAMES } from "./brand";
import { Portada } from "./Portada";

export const Root: React.FC = () => (
  <Composition id="Portada" component={Portada} width={1080} height={1920} fps={FPS} durationInFrames={FRAMES} />
);
