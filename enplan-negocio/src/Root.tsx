import { Composition } from "remotion";
import { EnplanNegocio, TOTAL } from "./EnplanNegocio";
import { Opcion } from "./Opciones";
import { Refinado } from "./Refinados";

export const Root: React.FC = () => (
  <>
    <Composition id="EnplanNegocio" component={EnplanNegocio} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />
    {/* Un cuadro por opción de subtítulos, para elegir */}
    <Composition id="Opcion" component={Opcion} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ opcion: "A" as const }} />
    {/* Estilos más refinados para el clip de la app */}
    <Composition id="Refinado" component={Refinado} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ estilo: "A" as const }} />
  </>
);
