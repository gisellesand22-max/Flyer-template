import { Composition } from "remotion";
import { EnplanRegistro } from "./EnplanRegistro";
import { FPS, TOTAL_FRAMES } from "./timeline";

export const Root: React.FC = () => (
  <Composition
    id="EnplanRegistro"
    component={EnplanRegistro}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
