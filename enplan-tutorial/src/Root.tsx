import { Composition } from "remotion";
import { EnplanTutorial, TOTAL } from "./EnplanTutorial";

export const Root: React.FC = () => (
  <Composition id="EnplanTutorial" component={EnplanTutorial} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />
);
