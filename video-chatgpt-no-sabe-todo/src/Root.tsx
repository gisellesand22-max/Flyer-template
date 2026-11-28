import React from "react";
import { Composition } from "remotion";
import { FPS, FRAMES } from "./brand";
import { Video } from "./Sabe";

export const Root: React.FC = () => (
  <Composition id="Video" component={Video} width={1080} height={1920} fps={FPS} durationInFrames={FRAMES} />
);
