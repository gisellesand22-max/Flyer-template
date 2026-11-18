import { Composition } from "remotion";
import { EditarIA } from "./EditarIA";
import { Estilo } from "./Estilos";
import { FPS, TOTAL_FRAMES } from "./theme";

export const Root: React.FC = () => (
  <>
    <Composition id="EditarIA" component={EditarIA} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />
    {/* Un cuadro por opción de estilo, para elegir */}
    <Composition id="Estilo" component={Estilo} durationInFrames={1} fps={FPS} width={1080} height={1920} defaultProps={{ opcion: "A" as const }} />
  </>
);
