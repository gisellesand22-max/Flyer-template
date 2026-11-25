import { Composition } from "remotion";
import { Capas } from "./Capas";
import { Direccion } from "./Direccion";
import { EnplanCanje, TOTAL } from "./EnplanCanje";

export const Root: React.FC = () => (
  <>
    <Composition id="EnplanCanje" component={EnplanCanje} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />
    {/* Direcciones gráficas para elegir: un cuadro por opción */}
    <Composition id="Direccion" component={Direccion} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ op: "1" as const }} />
    <Composition id="Capas" component={Capas} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ op: "A" as const }} />
  </>
);
