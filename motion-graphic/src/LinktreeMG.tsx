import { AbsoluteFill, Sequence } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2ClaudeTyping } from "./scenes/Scene2ClaudeTyping";
import { Scene3Result } from "./scenes/Scene3Result";
import { Scene4CTA } from "./scenes/Scene4CTA";
import { brand } from "./brand";

export const LinktreeMG = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: brand.bg, fontFamily: brand.fontSans }}>
      {/* Scene 1: Hook — 0-90f (0-3s) */}
      <Sequence from={0} durationInFrames={90}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: Claude typing — 90-270f (3-9s) */}
      <Sequence from={90} durationInFrames={180}>
        <Scene2ClaudeTyping />
      </Sequence>

      {/* Scene 3: Result preview — 270-390f (9-13s) */}
      <Sequence from={270} durationInFrames={120}>
        <Scene3Result />
      </Sequence>

      {/* Scene 4: CTA — 390-450f (13-15s) */}
      <Sequence from={390} durationInFrames={60}>
        <Scene4CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
