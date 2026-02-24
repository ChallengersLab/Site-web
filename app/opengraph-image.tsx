import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ChallengersLab - Sales × AI pour PME & Scale-ups B2B";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "80px",
          background: "#050505",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #7B5EFF, #00F5FF)",
              fontSize: "14px",
              fontWeight: 800,
              color: "white",
            }}
          >
            CL
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, color: "white" }}>
            ChallengersLab
          </span>
        </div>

        {/* Headline */}
        <div style={{ marginTop: 48, display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "white",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            Vos concurrents utilisent
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
            <span
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: "white",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              déjà l&apos;IA.
            </span>
            <span
              style={{
                fontSize: 64,
                fontWeight: 800,
                background: "linear-gradient(135deg, #7B5EFF, #00F5FF)",
                backgroundClip: "text",
                color: "transparent",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Et vous ?
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.45)",
            marginTop: 24,
          }}
        >
          Sales × AI pour PME et Scale-ups B2B
        </p>
      </div>
    ),
    { ...size }
  );
}
