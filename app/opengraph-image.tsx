import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "ChallengersLab — Agence Sales & IA pour PME B2B";
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
          background: "#0D0D0D",
          position: "relative",
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            left: -100,
            top: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(238,255,102,0.3) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -80,
            bottom: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(78,203,160,0.15) 0%, transparent 65%)",
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
              background: "linear-gradient(135deg, #EEFF66, #4ECBA0)",
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
              fontSize: 60,
              fontWeight: 800,
              color: "white",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            L&apos;agence qui croise
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "16px",
              marginTop: 8,
            }}
          >
            <span
              style={{
                fontSize: 60,
                fontWeight: 800,
                background: "linear-gradient(135deg, #EEFF66, #4ECBA0)",
                backgroundClip: "text",
                color: "transparent",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Sales & IA
            </span>
            <span
              style={{
                fontSize: 60,
                fontWeight: 800,
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              pour les B2B
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.35)",
            marginTop: 32,
          }}
        >
          Prospection externalisée &bull; Coaching Challenger Sales &bull;
          Automatisation IA
        </p>
      </div>
    ),
    { ...size }
  );
}
