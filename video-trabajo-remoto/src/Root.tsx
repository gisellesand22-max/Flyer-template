import { Composition } from "remotion";
import { TrabajoRemoto } from "./TrabajoRemoto";

// Duración del video v2: 48,46 s a 30 fps
export const Root: React.FC = () => (
  <Composition
    id="TrabajoRemoto"
    component={TrabajoRemoto}
    durationInFrames={1453}
    fps={30}
    width={1080}
    height={1920}
  />
);
