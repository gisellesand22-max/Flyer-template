import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const ApifyLogo = ({ size = 52 }: { size?: number }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.22,
    background: "linear-gradient(135deg,#FF7A00,#FF9A3C)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 24px rgba(255,122,0,0.5)",
  }}>
    <span style={{ color: "#fff", fontSize: size * 0.42, fontWeight: 900, fontFamily: "Arial" }}>A</span>
  </div>
);

const ClaudeLogo = ({ size = 52 }: { size?: number }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: "linear-gradient(135deg,#0D9488,#7C3AED)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 24px rgba(13,148,136,0.5)",
  }}>
    <span style={{ color: "#fff", fontSize: size * 0.42, fontWeight: 900, fontFamily: "Arial" }}>C</span>
  </div>
);

export const SceneCTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const logosScale = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 180 } });
  const logosOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });

  const titleScale = spring({ frame: frame - 16, fps, config: { damping: 12, stiffness: 160 } });
  const titleOpacity = interpolate(frame, [16, 30], [0, 1], { extrapolateRight: "clamp" });

  const btnScale = spring({ frame: frame - 32, fps, config: { damping: 8, stiffness: 220 } });
  const btnOpacity = interpolate(frame, [32, 46], [0, 1], { extrapolateRight: "clamp" });

  const pulse = 1 + Math.sin(frame * 0.18) * 0.03;

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(160deg, #0D9488 0%, #0F766E 100%)",
      opacity: bgOpacity,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "0 36px",
      gap: 0,
    }}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
      <div style={{ position: "absolute", bottom: -30, left: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

      {/* Logos side by side */}
      <div style={{
        transform: `scale(${logosScale})`, opacity: logosOpacity,
        display: "flex", alignItems: "center", gap: 16, marginBottom: 28,
      }}>
        <ApifyLogo size={56} />
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 20, fontWeight: 300 }}>+</div>
        <ClaudeLogo size={56} />
      </div>

      {/* Main CTA text */}
      <div style={{
        transform: `scale(${titleScale})`, opacity: titleOpacity,
        textAlign: "center", color: "#fff", marginBottom: 24,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, marginBottom: 12, opacity: 0.75 }}>
          BÚSCALO EN
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, letterSpacing: -0.5 }}>
          Conectores MCP<br />de Claude
        </div>
        <div style={{ fontSize: 15, opacity: 0.8, marginTop: 10, lineHeight: 1.5 }}>
          Scraping + contactos + emails<br />en lenguaje normal 🚀
        </div>
      </div>

      {/* Button */}
      <div style={{
        transform: `scale(${btnScale * pulse})`, opacity: btnOpacity,
        background: "#fff",
        color: "#0D9488",
        borderRadius: 100,
        padding: "14px 30px",
        fontSize: 15, fontWeight: 800, letterSpacing: 0.3,
        boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
        marginBottom: 28,
      }}>
        Prueba Apify en Claude →
      </div>

      <div style={{
        position: "absolute", bottom: 36,
        fontSize: 12, color: "rgba(255,255,255,0.65)", fontWeight: 600, letterSpacing: 1,
      }}>
        @gisellesand
      </div>
    </AbsoluteFill>
  );
};
