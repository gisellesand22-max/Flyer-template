import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand";

const LinkCard = ({
  icon,
  title,
  delay,
}: {
  icon: string;
  title: string;
  delay: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 160 } });
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      transform: `scale(${scale})`,
      opacity,
      background: "#FFFFFF",
      border: `1.5px solid ${brand.tealBorder}`,
      borderRadius: 14,
      padding: "14px 18px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      boxShadow: `0 4px 16px ${brand.tealGlow}`,
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: brand.bgLight,
        border: `1.5px solid ${brand.tealBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
      }}>
        {icon}
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, color: brand.dark }}>{title}</span>
      <span style={{ marginLeft: "auto", color: brand.teal, fontSize: 16 }}>→</span>
    </div>
  );
};

export const Scene3Result = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerScale = spring({ frame, fps, config: { damping: 12, stiffness: 150 } });
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const badgeScale = spring({ frame: frame - 70, fps, config: { damping: 10, stiffness: 200 } });
  const badgeOpacity = interpolate(frame, [70, 85], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, #F0FDFA 0%, #FFFFFF 60%)`,
      padding: "0 32px",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 0,
    }}>
      {/* Top bar */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 4,
        background: `linear-gradient(90deg, ${brand.teal}, ${brand.tealLight})`,
      }} />

      {/* Header — mimics the Giselle linktree */}
      <div style={{
        transform: `scale(${headerScale})`,
        opacity: headerOpacity,
        textAlign: "center",
        marginBottom: 20,
      }}>
        {/* Avatar placeholder */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${brand.teal}, ${brand.tealLight})`,
          margin: "0 auto 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          boxShadow: `0 8px 24px ${brand.tealGlow}`,
        }}>
          👩‍💻
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: brand.dark, letterSpacing: -0.5 }}>
          Giselle <span style={{ color: brand.teal }}>Sand</span>
        </div>
        <div style={{ fontSize: 12, color: brand.gray, marginTop: 4, fontWeight: 500 }}>
          Sistemas de Contenido & IA
        </div>
      </div>

      {/* Link cards */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        <LinkCard icon="📋" title="Sistema de Notas para Juntas" delay={20} />
        <LinkCard icon="🚀" title="Software a medida con IA" delay={35} />
        <LinkCard icon="🌐" title="Portafolio" delay={50} />
        <LinkCard icon="💼" title="LinkedIn" delay={65} />
      </div>

      {/* "Hecho con Claude Code" badge */}
      <div style={{
        transform: `scale(${badgeScale})`,
        opacity: badgeOpacity,
        background: brand.teal,
        color: "#fff",
        borderRadius: 100,
        padding: "10px 22px",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 0.5,
        boxShadow: `0 8px 24px ${brand.tealGlow}`,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        ⚡ Construido con Claude Code · GRATIS
      </div>
    </AbsoluteFill>
  );
};
