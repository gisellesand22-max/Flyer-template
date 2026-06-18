import { AbsoluteFill, Sequence } from "remotion";
import { SceneHook } from "./scenes/apify/SceneHook";
import { SceneConnect } from "./scenes/apify/SceneConnect";
import { SceneTyping } from "./scenes/apify/SceneTyping";
import { SceneBullets } from "./scenes/apify/SceneBullets";
import { SceneCTA } from "./scenes/apify/SceneCTA";

export const ApifyMG = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0F1E", fontFamily: "'Inter','Segoe UI',Arial,sans-serif" }}>
      {/* Scene 1 — Hook: 0-90f (0-3s) */}
      <Sequence from={0} durationInFrames={90}>
        <SceneHook />
      </Sequence>

      {/* Scene 2 — Connect: 90-210f (3-7s) */}
      <Sequence from={90} durationInFrames={120}>
        <SceneConnect />
      </Sequence>

      {/* Scene 3 — Typing: 210-330f (7-11s) */}
      <Sequence from={210} durationInFrames={120}>
        <SceneTyping />
      </Sequence>

      {/* Scene 4 — Bullets: 330-390f (11-13s) */}
      <Sequence from={330} durationInFrames={60}>
        <SceneBullets />
      </Sequence>

      {/* Scene 5 — CTA: 390-450f (13-15s) */}
      <Sequence from={390} durationInFrames={60}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
