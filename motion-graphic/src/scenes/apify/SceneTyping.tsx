import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const PROMPT = "encuéntrame contactos de agencias de marketing en CDMX con su email";

const RESULTS = [
  { name: "Ana Torres",    company: "Agencia Ctrl+Alt",  email: "ana@ctrlalt.mx" },
  { name: "Luis Mendoza",  company: "Pixel House MX",    email: "luis@pixelhouse.mx" },
  { name: "Sara Vega",     company: "Growth Studio",     email: "sara@growthstudio.mx" },
  { name: "Marco Ríos",    company: "Brandify",          email: "marco@brandify.mx" },
];

const ApifyLogo = () => (
  <div style={{
    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
    background: "linear-gradient(135deg,#FF7A00,#FF9A3C)",
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <span style={{ color: "#fff", fontSize: 11, fontWeight: 900 }}>A</span>
  </div>
);

export const SceneTyping = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const windowY = interpolate(frame, [0, 18], [50, 0], { extrapolateRight: "clamp" });
  const windowOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  // Typing
  const TYPING_START = 20;
  const TYPING_DURATION = 55;
  const charsTyped = Math.floor(
    interpolate(frame, [TYPING_START, TYPING_START + TYPING_DURATION], [0, PROMPT.length], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    })
  );
  const typedText = PROMPT.slice(0, charsTyped);
  const showCursor = frame >= TYPING_START && frame < TYPING_START + TYPING_DURATION + 8;

  const SENT_FRAME = TYPING_START + TYPING_DURATION + 4;
  const DOTS_END = SENT_FRAME + 18;
  const RESULTS_START = DOTS_END;

  const showDots = frame > SENT_FRAME && frame < DOTS_END;

  // Results appear row by row
  const tableOpacity = interpolate(frame, [RESULTS_START, RESULTS_START + 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(160deg,#0A0F1E 0%,#0D1B2A 100%)",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 18px",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#0D9488,#14B8A6)" }} />

      <div style={{
        fontSize: 11, color: "#14B8A6", fontWeight: 700, letterSpacing: 3,
        position: "absolute", top: 48,
      }}>
        BÚSQUEDA DE CONTACTOS
      </div>

      {/* Chat window */}
      <div style={{
        width: "100%",
        background: "#111827",
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        transform: `translateY(${windowY}px)`,
        opacity: windowOpacity,
        boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
      }}>
        {/* Chrome */}
        <div style={{
          background: "#1F2937",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#EF4444" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#F59E0B" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#10B981" }} />
          <div style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#6B7280", fontWeight: 600 }}>claude.ai</div>
        </div>

        {/* Messages */}
        <div style={{ padding: "16px 14px", minHeight: 290 }}>

          {/* User bubble */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
            <div style={{
              background: "#0D9488",
              color: "#fff",
              borderRadius: "16px 16px 4px 16px",
              padding: "9px 14px",
              fontSize: 12, fontWeight: 500, maxWidth: "85%", lineHeight: 1.5,
            }}>
              {typedText}
              {showCursor && (
                <span style={{
                  display: "inline-block", width: 2, height: 12,
                  background: "rgba(255,255,255,0.8)", marginLeft: 2,
                  verticalAlign: "middle",
                  opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0,
                }} />
              )}
            </div>
          </div>

          {/* Typing dots */}
          {showDots && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <ApifyLogo />
              <div style={{
                background: "#1F2937", borderRadius: "16px 16px 16px 4px",
                padding: "9px 14px", display: "flex", gap: 4, alignItems: "center",
              }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: "50%", background: "#FF7A00",
                    opacity: Math.sin((frame * 0.35) + i * 1.1) > 0 ? 1 : 0.3,
                    transform: `translateY(${Math.sin((frame * 0.35) + i * 1.1) * -3}px)`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Results table */}
          {frame >= RESULTS_START && (
            <div style={{ display: "flex", gap: 8, opacity: tableOpacity }}>
              <ApifyLogo />
              <div style={{
                background: "#1F2937", borderRadius: "16px 16px 16px 4px",
                padding: "12px", flex: 1,
              }}>
                <div style={{ fontSize: 11, color: "#FF7A00", fontWeight: 700, marginBottom: 8, letterSpacing: 0.5 }}>
                  ✅ {RESULTS.length} contactos encontrados
                </div>
                {RESULTS.map((r, i) => {
                  const rowDelay = RESULTS_START + i * 10;
                  const rowScale = spring({ frame: frame - rowDelay, fps, config: { damping: 14, stiffness: 180 } });
                  const rowOpacity = interpolate(frame, [rowDelay, rowDelay + 8], [0, 1], { extrapolateRight: "clamp" });
                  return (
                    <div key={i} style={{
                      transform: `scale(${rowScale})`, opacity: rowOpacity,
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: 8, padding: "7px 10px",
                      marginBottom: i < RESULTS.length - 1 ? 6 : 0,
                      borderLeft: "2px solid #FF7A00",
                    }}>
                      <div style={{ fontSize: 11, color: "#E2E8F0", fontWeight: 700 }}>{r.name}</div>
                      <div style={{ fontSize: 10, color: "#6B7280" }}>{r.company}</div>
                      <div style={{ fontSize: 10, color: "#14B8A6", fontWeight: 600 }}>{r.email}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "10px 14px", display: "flex", gap: 8, background: "#1F2937",
        }}>
          <div style={{
            flex: 1, background: "#111827",
            border: "1px solid rgba(13,148,136,0.3)",
            borderRadius: 10, padding: "7px 10px",
            fontSize: 11, color: "#4B5563",
          }}>
            Escribe lo que necesitas...
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "#0D9488", display: "flex",
            alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 13,
          }}>↑</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
