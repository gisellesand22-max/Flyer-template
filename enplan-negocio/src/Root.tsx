import { Composition } from "remotion";
import { EnplanNegocio, TOTAL } from "./EnplanNegocio";

export const Root: React.FC = () => (
  <Composition id="EnplanNegocio" component={EnplanNegocio} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />
);
