import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { SCENES, OUTRO, VIDEO, COLORS } from "./config";
import { SceneCard } from "./components/SceneCard";
import { Outro } from "./components/Outro";

const sec = (s: number) => Math.round(s * VIDEO.fps);

export const Promo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <Series>
        {SCENES.map((scene, i) => {
          const dur = sec(scene.durationInSeconds);
          return (
            <Series.Sequence durationInFrames={dur} key={i}>
              <SceneCard
                image={scene.image}
                kicker={scene.kicker}
                title={scene.title}
                subtitle={scene.subtitle}
                align={scene.align}
                durationInFrames={dur}
              />
            </Series.Sequence>
          );
        })}
        <Series.Sequence durationInFrames={sec(OUTRO.durationInSeconds)}>
          <Outro durationInFrames={sec(OUTRO.durationInSeconds)} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
