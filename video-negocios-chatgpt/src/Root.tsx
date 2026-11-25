import React from "react";
import { Composition } from "remotion";
import { FPS, FRAMES } from "./brand";
import { Negocio } from "./Negocio";
import { Direccion1, Direccion2, Direccion3 } from "./Direccion";

const size = { width: 1080, height: 1920, fps: FPS, durationInFrames: FRAMES };

export const Root: React.FC = () => (
  <>
    <Composition id="Negocio" component={Negocio} {...size} />
    <Composition id="Direccion1" component={Direccion1} {...size} />
    <Composition id="Direccion2" component={Direccion2} {...size} />
    <Composition id="Direccion3" component={Direccion3} {...size} />
  </>
);
