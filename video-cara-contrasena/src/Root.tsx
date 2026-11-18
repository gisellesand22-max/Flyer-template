import { Composition } from "remotion";
import { CaraContrasena } from "./CaraContrasena";
import { FPS, TOTAL_FRAMES } from "./theme";

export const Root: React.FC = () => (
  <Composition id="CaraContrasena" component={CaraContrasena} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />
);
