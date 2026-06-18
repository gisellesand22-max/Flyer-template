import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const ApifyLogo = ({ size = 64 }: { size?: number }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.22,
    background: "linear-gradient(135deg, #FF7A00, #FF9A3C)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 32px rgba(255,122,0,0.4)",
  }}>
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 40 46" fill="none">
      <path d="M20 0L40 11.5V34.5L20 46L0 34.5V11.5L20 0Z" fill="white" opacity="0.15" />
      <path d="M20 6L34 14V30L20 38L6 30V14L20 6Z" fill="white" opacity="0.25" />
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle"
        fill="white" fontSize="22" fontWeight="900" fontFamily="Arial">A</text>
    </svg>
  </div>
);

const ClaudeLogo = ({ size = 64 }: { size?: number }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: "linear-gradient(135deg, #0D9488, #7C3AED)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 32px rgba(13,148,136,0.4)",
  }}>
    <span style={{ color: "#fff", fontSize: size * 0.42, fontWeight: 900, fontFamily: "Arial" }}>C</span>
  </div>
);

export const SceneConnect = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const apifyScale = spring({ frame: frame - 8, fps, config: { damping: 12, stiffness: 160 } });
  const claudeScale = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 160 } });

  // Animated line draw
  const lineProgress = interpolate(frame, [28, 55], [0, 1], { extrapolateRight: "clamp" });

  const mcpBadgeScale = spring({ frame: frame - 58, fps, config: { damping: 10, stiffness: 200 } });
  const mcpOpacity = interpolate(frame, [58, 72], [0, 1], { extrapolateRight: "clamp" });

  const textOpacity = interpolate(frame, [75, 95], [0, 1], { extrapolateRight: "clamp" });
  const textY = interpolate(frame, [75, 95], [20, 0], { extrapolateRight: "clamp" });

  // Pulse dot on line
  const dotPos = (frame % 40) / 40;

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(160deg, #0A0F1E 0%, #0D1B2A 100%)",
      opacity: bgOpacity,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "0 40px",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#0D9488,#14B8A6)" }} />

      <div style={{ fontSize: 12, color: "#14B8A6", fontWeight: 700, letterSpacing: 3, marginBottom: 44, textAlign: "center" }}>
        CONECTOR MCP
      </div>

      {/* Logos + connection line */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 0, marginBottom: 44, position: "relative", width: "100%",
      }}>
        {/* Apify */}
        <div style={{
          transform: `scale(${apifyScale})`,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        }}>
          <ApifyLogo size={76} />
          <span style={{ color: "#FF7A00", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>APIFY</span>
        </div>

        {/* Animated connection line */}
        <div style={{
          flex: 1, maxWidth: 140, height: 3, margin: "0 16px",
          position: "relative", overflow: "hidden",
          background: "rgba(255,255,255,0.06)", borderRadius: 2,
        }}>
          {/* Fill */}
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: `${lineProgress * 100}%`, height: "100%",
            background: "linear-gradient(90deg, #FF7A00, #0D9488)",
            borderRadius: 2,
          }} />
          {/* Pulse dot */}
          {lineProgress > 0.1 && lineProgress < 1 && (
            <div style={{
              position: "absolute", top: "50%",
              left: `${dotPos * lineProgress * 100}%`,
              width: 8, height: 8, borderRadius: "50%",
              background: "#fff",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 8px #fff",
            }} />
          )}
          {/* Connected checkmark */}
          {lineProgress >= 1 && (
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              fontSize: 14, color: "#10B981",
            }}>⚡</div>
          )}
        </div>

        {/* Claude */}
        <div style={{
          transform: `scale(${claudeScale})`,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        }}>
          <ClaudeLogo size={76} />
          <span style={{ color: "#14B8A6", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>CLAUDE</span>
        </div>
      </div>

      {/* MCP badge */}
      <div style={{
        transform: `scale(${mcpBadgeScale})`,
        opacity: mcpOpacity,
        background: "rgba(13,148,136,0.15)",
        border: "1.5px solid rgba(13,148,136,0.4)",
        borderRadius: 100,
        padding: "10px 24px",
        color: "#14B8A6",
        fontSize: 13, fontWeight: 700, letterSpacing: 1,
        marginBottom: 28,
      }}>
        🔌 Conéctalo en tus Conectores
      </div>

      {/* Description */}
      <div style={{
        opacity: textOpacity,
        transform: `translateY(${textY}px)`,
        textAlign: "center",
        padding: "0 8px",
      }}>
        <div style={{
          fontSize: 17, color: "#E2E8F0", fontWeight: 500,
          lineHeight: 1.6,
        }}>
          Pregúntale <span style={{ color: "#FF7A00", fontWeight: 700 }}>explícitamente</span> lo que<br />
          quieres encontrar en internet
        </div>
      </div>
    </AbsoluteFill>
  );
};
