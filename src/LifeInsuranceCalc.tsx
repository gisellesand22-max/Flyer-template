import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENES} from './content';
import {SceneShell} from './components/SceneShell';
import {StatementScene} from './components/StatementScene';
import {WordCycleScene} from './components/WordCycleScene';
import {CtaScene} from './components/CtaScene';

export const TOTAL_DURATION_IN_FRAMES = SCENES.reduce((sum, s) => sum + s.durationInFrames, 0);

export const LifeInsuranceCalc: React.FC = () => {
  let cursor = 0;

  return (
    <AbsoluteFill>
      {SCENES.map((scene, i) => {
        const from = cursor;
        cursor += scene.durationInFrames;

        return (
          <Sequence key={i} from={from} durationInFrames={scene.durationInFrames}>
            <SceneShell bg={scene.bg}>
              {scene.kind === 'statement' && <StatementScene bg={scene.bg} lines={scene.lines} />}
              {scene.kind === 'wordCycle' && (
                <WordCycleScene
                  bg={scene.bg}
                  words={scene.words}
                  durationInFrames={scene.durationInFrames}
                />
              )}
              {scene.kind === 'cta' && <CtaScene text={scene.text} />}
            </SceneShell>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
