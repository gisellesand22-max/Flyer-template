import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand";

export const Scene4CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const titleScale = spring({ frame: frame - 5, fps, config: { damping: 12, stiffness: 180 } });
  const titleOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });

  const timeScale = spring({ frame: frame - 20, fps, config: { damping: 10, stiffness: 200 } });
  const timeOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });

  const ctaScale = spring({ frame: frame - 35, fps, config: { damping: 8, stiffness: 220 } });
  const ctaOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });

  // Pulse glow on CTA
  const glowSize = interpolate(frame, [40, 60], [20, 32], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, ${brand.teal} 0%, #0F766E 100%)`,
      opacity: bgOpacity,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 0,
      padding: "0 36px",
    }}>
      {/* Decorative circles */}
      <div style={{
        position: "absolute",
        top: -60,
        right: -60,
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
      }} />
      <div style={{
        position: "absolute",
        bottom: -40,
        left: -40,
        width: 140,
        height: 140,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.06)",
      }} />

      {/* Main message */}
      <div style={{
        transform: `scale(${titleScale})`,
        opacity: titleOpacity,
        textAlign: "center",
        color: "#fff",
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, marginBottom: 12, opacity: 0.8 }}>
          TÚ TAMBIÉN PUEDES
        </div>
        <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, letterSpacing: -1 }}>
          Pídelo en<br />
          <span style={{ opacity: 0.9 }}>lenguaje normal</span>
        </div>
      </div>

      {/* Time badge */}
      <div style={{
        transform: `scale(${timeScale})`,
        opacity: timeOpacity,
        background: "rgba(255,255,255,0.15)",
        borderRadius: 100,
        padding: "10px 24px",
        color: "#fff",
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 28,
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.25)",
      }}>
        ⏱️ Me tomó menos de 2 horas
      </div>

      {/* CTA button */}
      <div style={{
        transform: `scale(${ctaScale})`,
        opacity: ctaOpacity,
        background: "#FFFFFF",
        color: brand.teal,
        borderRadius: 100,
        padding: "16px 32px",
        fontSize: 16,
        fontWeight: 800,
        letterSpacing: 0.3,
        boxShadow: `0 ${glowSize}px 60px rgba(0,0,0,0.25)`,
        textAlign: "center",
      }}>
        Prueba Claude Code →
      </div>

      {/* Handle */}
      <div style={{
        position: "absolute",
        bottom: 40,
        fontSize: 13,
        color: "rgba(255,255,255,0.7)",
        fontWeight: 600,
        letterSpacing: 1,
      }}>
        @gisellesand
      </div>
    </AbsoluteFill>
  );
};
