import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {BARISTA_SCENES} from './contentBarista';
import {SceneShell} from './components/SceneShell';
import {IconStatementScene} from './components/IconStatementScene';
import {CtaScene} from './components/CtaScene';

export const BARISTA_TOTAL_DURATION_IN_FRAMES = BARISTA_SCENES.reduce(
  (sum, s) => sum + s.durationInFrames,
  0,
);

export const BaristaVsBank: React.FC = () => {
  let cursor = 0;

  return (
    <AbsoluteFill>
      {BARISTA_SCENES.map((scene, i) => {
        const from = cursor;
        cursor += scene.durationInFrames;

        return (
          <Sequence key={i} from={from} durationInFrames={scene.durationInFrames}>
            <SceneShell bg={scene.bg}>
              {scene.kind === 'icon-statement' && (
                <IconStatementScene
                  bg={scene.bg}
                  icon={scene.icon}
                  lines={scene.lines}
                  strikeFirstLine={scene.strikeFirstLine}
                />
              )}
              {scene.kind === 'cta' && <CtaScene text={scene.text} icon={scene.icon} />}
            </SceneShell>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
