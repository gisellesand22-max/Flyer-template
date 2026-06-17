import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand";

const CrossedIcon = ({ label }: { label: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 180 } });

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      transform: `scale(${scale})`,
      position: "relative",
    }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 16,
        background: brand.grayLight,
        border: `2px solid ${brand.grayBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        position: "relative",
      }}>
        🔗
        {/* Red cross line */}
        <div style={{
          position: "absolute",
          width: "130%",
          height: 3,
          background: "#EF4444",
          transform: "rotate(-45deg)",
          borderRadius: 2,
        }} />
      </div>
      <span style={{ fontSize: 11, color: brand.gray, fontWeight: 600, letterSpacing: 0.5 }}>
        {label}
      </span>
    </div>
  );
};

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: "clamp" });

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });

  const iconsOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: "clamp" });

  const questionOpacity = interpolate(frame, [55, 75], [0, 1], { extrapolateRight: "clamp" });
  const questionScale = spring({ frame: frame - 55, fps, config: { damping: 10, stiffness: 200 } });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, #F0FDFA 0%, #FFFFFF 50%, #F8FFFE 100%)`,
      alignItems: "center",
      justifyContent: "center",
      padding: "0 40px",
      flexDirection: "column",
      gap: 0,
    }}>
      {/* Top accent bar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: `linear-gradient(90deg, ${brand.teal}, ${brand.tealLight})`,
      }} />

      {/* Headline */}
      <div style={{
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        textAlign: "center",
        marginBottom: 8,
      }}>
        <div style={{ fontSize: 15, color: brand.teal, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>
          ¿AÚN PAGAS POR ESTO?
        </div>
        <div style={{
          fontSize: 44,
          fontWeight: 800,
          color: brand.dark,
          lineHeight: 1.1,
          letterSpacing: -1,
        }}>
          Olvídate de<br />
          <span style={{ color: brand.teal }}>Linktree</span>
        </div>
      </div>

      {/* Subtitle */}
      <div style={{
        opacity: subtitleOpacity,
        fontSize: 16,
        color: brand.gray,
        textAlign: "center",
        marginBottom: 40,
        marginTop: 12,
        lineHeight: 1.5,
      }}>
        link in bio · link.tree · bio.link
      </div>

      {/* Crossed icons */}
      <div style={{
        opacity: iconsOpacity,
        display: "flex",
        gap: 32,
        marginBottom: 44,
      }}>
        <CrossedIcon label="LINKTREE" />
        <CrossedIcon label="BIO.LINK" />
        <CrossedIcon label="BEACONS" />
      </div>

      {/* Question badge */}
      <div style={{
        opacity: questionOpacity,
        transform: `scale(${questionScale})`,
        background: brand.teal,
        color: "#fff",
        borderRadius: 100,
        padding: "14px 28px",
        fontSize: 15,
        fontWeight: 700,
        textAlign: "center",
        boxShadow: `0 8px 32px ${brand.tealGlow}`,
        letterSpacing: 0.3,
      }}>
        ¿Y si pudieras construir el tuyo GRATIS? 👇
      </div>
    </AbsoluteFill>
  );
};
