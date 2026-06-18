import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const BULLETS = [
  { icon: "🕷️", title: "Scraping masivo",     sub: "Extrae datos de cualquier sitio web automáticamente" },
  { icon: "📧", title: "Busca contactos + email", sub: "Solo escribe el tipo de cliente que necesitas" },
  { icon: "💬", title: "Sin código",           sub: "Todo en lenguaje normal desde Claude" },
];

export const SceneBullets = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 12], [20, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(160deg,#0A0F1E 0%,#0D1B2A 100%)",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "0 32px",
      gap: 0,
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#0D9488,#14B8A6)" }} />

      <div style={{
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        fontSize: 13, color: "#FF7A00", fontWeight: 700,
        letterSpacing: 3, marginBottom: 32, textAlign: "center",
      }}>
        ¿QUÉ PUEDES HACER?
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
        {BULLETS.map((b, i) => {
          const delay = i * 14;
          const scale = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 180 } });
          const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              transform: `scale(${scale})`, opacity,
              background: "rgba(13,148,136,0.08)",
              border: "1.5px solid rgba(13,148,136,0.25)",
              borderRadius: 16,
              padding: "16px 18px",
              display: "flex", alignItems: "flex-start", gap: 14,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: "rgba(255,122,0,0.15)",
                border: "1.5px solid rgba(255,122,0,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22,
              }}>
                {b.icon}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#E2E8F0", marginBottom: 4 }}>
                  {b.title}
                </div>
                <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>
                  {b.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
