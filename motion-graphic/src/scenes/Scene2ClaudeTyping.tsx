import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand } from "../brand";

const PROMPT = "construyeme un website tipo linktree para poner mis links";
const RESPONSE_LINES = [
  "¡Claro! Aquí está tu sitio web",
  "personalizado con tus links. ✨",
  "",
  "✅ Diseño limpio y moderno",
  "✅ Listo para publicar",
  "✅ 100% tuyo, sin mensualidad",
];

const ClaudeLogo = () => (
  <div style={{
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${brand.teal}, #7C3AED)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }}>
    <span style={{ color: "#fff", fontSize: 14, fontWeight: 800 }}>C</span>
  </div>
);

export const Scene2ClaudeTyping = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Window slides in
  const windowY = interpolate(frame, [0, 20], [60, 0], { extrapolateRight: "clamp" });
  const windowOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Typing starts at frame 25, ~45 chars typed over 60 frames
  const TYPING_START = 25;
  const TYPING_DURATION = 70;
  const charsTyped = Math.floor(
    interpolate(frame, [TYPING_START, TYPING_START + TYPING_DURATION], [0, PROMPT.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const typedText = PROMPT.slice(0, charsTyped);
  const showCursor = frame >= TYPING_START && frame < TYPING_START + TYPING_DURATION + 8;

  // Send button flash
  const sentFrame = TYPING_START + TYPING_DURATION + 5;
  const sendScale = spring({ frame: frame - sentFrame, fps, config: { damping: 8, stiffness: 300 } });

  // Response appears
  const RESPONSE_START = sentFrame + 15;
  const responseOpacity = interpolate(frame, [RESPONSE_START, RESPONSE_START + 15], [0, 1], { extrapolateRight: "clamp" });

  // Typing indicator (3 dots) between send and response
  const showDots = frame > sentFrame + 5 && frame < RESPONSE_START;

  // Response text typed line by line
  const responseCharsTotal = RESPONSE_LINES.join("\n").length;
  const responseCharsTyped = Math.floor(
    interpolate(
      frame,
      [RESPONSE_START, RESPONSE_START + 80],
      [0, responseCharsTotal],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );

  let charsLeft = responseCharsTyped;
  const visibleLines = RESPONSE_LINES.map((line) => {
    if (charsLeft <= 0) return "";
    const visible = line.slice(0, charsLeft);
    charsLeft -= line.length + 1; // +1 for newline
    return visible;
  });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, #F0FDFA 0%, #FFFFFF 100%)`,
      alignItems: "center",
      justifyContent: "center",
      padding: "0 24px",
    }}>
      {/* Top label */}
      <div style={{
        position: "absolute",
        top: 48,
        left: 0,
        right: 0,
        textAlign: "center",
        opacity: windowOpacity,
      }}>
        <div style={{
          fontSize: 12,
          color: brand.teal,
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}>
          ES ASÍ DE SENCILLO
        </div>
      </div>

      {/* Claude chat window */}
      <div style={{
        width: "100%",
        maxWidth: 460,
        background: "#FFFFFF",
        borderRadius: 20,
        boxShadow: "0 24px 80px rgba(0,0,0,0.12)",
        border: `1px solid ${brand.grayBorder}`,
        overflow: "hidden",
        transform: `translateY(${windowY}px)`,
        opacity: windowOpacity,
      }}>
        {/* Chrome bar */}
        <div style={{
          background: brand.bgLight,
          borderBottom: `1px solid ${brand.grayBorder}`,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
          <div style={{
            flex: 1,
            textAlign: "center",
            fontSize: 11,
            color: brand.gray,
            fontWeight: 600,
          }}>
            claude.ai
          </div>
        </div>

        {/* Chat body */}
        <div style={{ padding: "20px 16px", minHeight: 320 }}>
          {/* User message */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <div style={{
              background: brand.teal,
              color: "#fff",
              borderRadius: "18px 18px 4px 18px",
              padding: "10px 16px",
              fontSize: 14,
              fontWeight: 500,
              maxWidth: "80%",
              lineHeight: 1.4,
              minHeight: 20,
            }}>
              {typedText}
              {showCursor && (
                <span style={{
                  display: "inline-block",
                  width: 2,
                  height: 14,
                  background: "rgba(255,255,255,0.8)",
                  marginLeft: 2,
                  verticalAlign: "middle",
                  animation: "none",
                  opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
                }} />
              )}
            </div>
          </div>

          {/* Send button flash */}
          {frame >= sentFrame && frame < sentFrame + 20 && (
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 8,
              transform: `scale(${sendScale})`,
            }}>
              <div style={{
                background: brand.tealLight,
                color: "#fff",
                borderRadius: 8,
                padding: "4px 12px",
                fontSize: 12,
                fontWeight: 600,
              }}>
                ↑ Enviado
              </div>
            </div>
          )}

          {/* Typing dots */}
          {showDots && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <ClaudeLogo />
              <div style={{
                background: brand.grayLight,
                borderRadius: "18px 18px 18px 4px",
                padding: "10px 16px",
                display: "flex",
                gap: 4,
                alignItems: "center",
              }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: brand.teal,
                    opacity: Math.sin((frame * 0.3) + i * 1) > 0 ? 1 : 0.3,
                    transform: `translateY(${Math.sin((frame * 0.3) + i * 1) * -3}px)`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Claude response */}
          {frame >= RESPONSE_START && (
            <div style={{
              display: "flex",
              gap: 8,
              opacity: responseOpacity,
            }}>
              <ClaudeLogo />
              <div style={{
                background: brand.grayLight,
                borderRadius: "18px 18px 18px 4px",
                padding: "12px 16px",
                fontSize: 13,
                color: brand.dark,
                lineHeight: 1.6,
                maxWidth: "82%",
              }}>
                {visibleLines.map((line, i) => (
                  <div key={i} style={{
                    minHeight: line === "" ? 8 : "auto",
                    color: line.startsWith("✅") ? brand.tealDim : brand.dark,
                    fontWeight: line.startsWith("✅") ? 600 : 400,
                  }}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div style={{
          borderTop: `1px solid ${brand.grayBorder}`,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: brand.bgLight,
        }}>
          <div style={{
            flex: 1,
            background: "#fff",
            border: `1.5px solid ${brand.tealBorder}`,
            borderRadius: 12,
            padding: "8px 12px",
            fontSize: 13,
            color: brand.gray,
          }}>
            Escribe en lenguaje normal...
          </div>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: brand.teal,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 14,
          }}>
            ↑
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
