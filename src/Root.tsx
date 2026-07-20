import React from 'react';
import {Composition} from 'remotion';
import {LifeInsuranceCalc, TOTAL_DURATION_IN_FRAMES} from './LifeInsuranceCalc';
import {BaristaVsBank, BARISTA_TOTAL_DURATION_IN_FRAMES} from './BaristaVsBank';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LifeInsuranceCalc"
        component={LifeInsuranceCalc}
        durationInFrames={TOTAL_DURATION_IN_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BaristaVsBank"
        component={BaristaVsBank}
        durationInFrames={BARISTA_TOTAL_DURATION_IN_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
