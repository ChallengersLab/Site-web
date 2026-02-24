import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Ressources Sales & IA pour B2B — ChallengersLab";
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
          background: "#030303",
          position: "relative",
        }}
      >
        {/* Gradient orb */}
        <div
          style={{
            position: "absolute",
            right: -50,
            top: -50,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(123,94,255,0.25) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

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
        <div
          style={{ marginTop: 48, display: "flex", flexDirection: "column" }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Ressources
          </span>
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              background: "linear-gradient(135deg, #7B5EFF, #00F5FF)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Sales &times; IA
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.35)",
            marginTop: 32,
          }}
        >
          Guides, articles et outils pour structurer vos ventes B2B avec
          l&apos;IA
        </p>
      </div>
    ),
    { ...size }
  );
}
