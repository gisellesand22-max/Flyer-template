import { Composition } from "remotion";
import { EnplanCanje, TOTAL } from "./EnplanCanje";

export const Root: React.FC = () => (
  <Composition id="EnplanCanje" component={EnplanCanje} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />
);
