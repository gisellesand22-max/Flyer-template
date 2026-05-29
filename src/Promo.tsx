import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { SCENES, VIDEO, COLORS } from "./config";
import { SceneCard } from "./components/SceneCard";

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
                bubbles={scene.bubbles}
                align={scene.align}
                durationInFrames={dur}
              />
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};
