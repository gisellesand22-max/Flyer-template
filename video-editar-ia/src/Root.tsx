import { Composition } from "remotion";
import { EditarIA } from "./EditarIA";
import { FPS, TOTAL_FRAMES } from "./theme";

export const Root: React.FC = () => (
  <Composition id="EditarIA" component={EditarIA} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />
);
