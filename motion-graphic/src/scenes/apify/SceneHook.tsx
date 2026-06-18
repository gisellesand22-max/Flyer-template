import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: (i * 47 + 30) % 100,
  speed: 0.4 + (i % 5) * 0.18,
  delay: (i * 7) % 30,
  char: ["{}","[]","</>","01","//","&&","=>","SQL","API","JSON","GET","POST"][i % 12],
  size: 10 + (i % 4) * 2,
  opacity: 0.12 + (i % 3) * 0.08,
}));

export const SceneHook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 18], [40, 0], { extrapolateRight: "clamp" });

  const subOpacity = interpolate(frame, [22, 40], [0, 1], { extrapolateRight: "clamp" });

  const badgeScale = spring({ frame: frame - 45, fps, config: { damping: 10, stiffness: 200 } });
  const badgeOpacity = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(160deg, #0A0F1E 0%, #0D1B2A 100%)",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "0 40px",
    }}>
      {/* Floating code particles */}
      {PARTICLES.map((p) => {
        const y = ((frame * p.speed + p.delay * 20) % 120) - 10;
        return (
          <div key={p.id} style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${y}%`,
            fontSize: p.size,
            color: "#0D9488",
            opacity: p.opacity,
            fontFamily: "monospace",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}>
            {p.char}
          </div>
        );
      })}

      {/* Top teal line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 4,
        background: "linear-gradient(90deg, #0D9488, #14B8A6)",
      }} />

      {/* Main headline */}
      <div style={{
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        textAlign: "center",
        marginBottom: 16,
        zIndex: 1,
      }}>
        <div style={{
          fontSize: 13, color: "#14B8A6", fontWeight: 700,
          letterSpacing: 3, marginBottom: 14,
        }}>
          ¿NECESITAS DATOS DE INTERNET?
        </div>
        <div style={{
          fontSize: 40, fontWeight: 800, color: "#FFFFFF",
          lineHeight: 1.15, letterSpacing: -1,
        }}>
          Scraping masivo<br />
          <span style={{ color: "#FF7A00" }}>sin código</span>
        </div>
      </div>

      <div style={{
        opacity: subOpacity,
        fontSize: 16, color: "#94A3B8",
        textAlign: "center", lineHeight: 1.5,
        marginBottom: 40, zIndex: 1,
      }}>
        Extrae datos de cualquier sitio web<br />de forma automática para tu negocio
      </div>

      {/* Web icon */}
      <div style={{
        opacity: badgeOpacity,
        transform: `scale(${badgeScale})`,
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "rgba(13,148,136,0.12)",
        border: "1.5px solid rgba(13,148,136,0.35)",
        borderRadius: 100,
        padding: "12px 24px",
      }}>
        <span style={{ fontSize: 22 }}>🕷️</span>
        <span style={{ color: "#E2E8F0", fontSize: 14, fontWeight: 600 }}>
          Powered by <span style={{ color: "#FF7A00" }}>Apify</span> + <span style={{ color: "#14B8A6" }}>Claude</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
