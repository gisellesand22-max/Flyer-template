import { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, OffthreadVideo, staticFile } from "remotion";
import { Captions, Card, StepStamp, Title } from "./Overlays";
import {
  ChatScene,
  CriteriaScene,
  CvScene,
  EndScene,
  HiringScene,
  LaptopScene,
  ProfileActiveScene,
  SheetScene,
  TargetScene,
} from "./Scenes";

export const TrabajoRemoto: React.FC = () => {
  // Espera a que carguen Poppins y Silkscreen antes de dibujar cada cuadro
  const [handle] = useState(() => delayRender("fuentes"));
  useEffect(() => {
    Promise.all(
      ["400 40px Poppins", "600 40px Poppins", "700 40px Poppins", "400 40px Silkscreen"].map((f) =>
        document.fonts.load(f),
      ),
    ).then(() => continueRender(handle));
  }, [handle]);

  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile("corte_v1.mp4")} />

      <Title />
      <StepStamp n={1} label="Define tu puesto" from={6.26} to={19.86} />
      <StepStamp n={2} label="Adapta tu CV" from={19.88} to={28.7} />
      <StepStamp n={3} label="Organízate" from={28.72} to={41.1} />
      <StepStamp n={4} label="Contacta directo" from={41.14} to={48.2} />

      <Card from={0.3} to={5.95}><LaptopScene /></Card>
      <Card from={6.26} to={14.74}><TargetScene /></Card>
      <Card from={14.78} to={19.86}><CriteriaScene /></Card>
      <Card from={19.88} to={28.7}><CvScene /></Card>
      <Card from={28.72} to={30.92}><ProfileActiveScene /></Card>
      <Card from={30.94} to={41.1}><SheetScene /></Card>
      <Card from={41.14} to={44.86}><ChatScene /></Card>
      <Card from={44.9} to={48.4}><HiringScene /></Card>
      <Card from={48.42} to={51.1}><EndScene /></Card>

      <Captions />
    </AbsoluteFill>
  );
};
