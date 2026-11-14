import { Composition } from "remotion";
import { EnplanPlanes, TOTAL } from "./EnplanPlanes";

export const Root: React.FC = () => (
  <Composition id="EnplanPlanes" component={EnplanPlanes} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />
);
