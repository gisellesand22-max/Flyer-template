import React from "react";
import { Composition } from "remotion";
import { FPS, FRAMES } from "./brand";
import { Video } from "./Sabe";
import { OpcionA, OpcionB, OpcionC, OpcionD } from "./Opciones";

export const Root: React.FC = () => (
  <>
  <Composition id="OpcionA" component={OpcionA} width={1080} height={1920} fps={FPS} durationInFrames={FRAMES} />
  <Composition id="OpcionB" component={OpcionB} width={1080} height={1920} fps={FPS} durationInFrames={FRAMES} />
  <Composition id="OpcionC" component={OpcionC} width={1080} height={1920} fps={FPS} durationInFrames={FRAMES} />
  <Composition id="OpcionD" component={OpcionD} width={1080} height={1920} fps={FPS} durationInFrames={FRAMES} />
  <Composition id="Video" component={Video} width={1080} height={1920} fps={FPS} durationInFrames={FRAMES} />
  </>
);
