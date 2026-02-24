import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Challengerslab - Performance Commerciale & IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #000000 0%, #0A0A0A 50%, #1a0a2e 100%)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: "linear-gradient(to right, #7B5EFF, #00F5FF)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.03em",
            }}
          >
            Challengerslab
          </span>
          <span
            style={{
              fontSize: 24,
              color: "#00F5FF",
              fontWeight: 600,
            }}
          >
            ESN
          </span>
        </div>
        <p
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.7)",
            marginTop: 16,
            fontWeight: 500,
          }}
        >
          L&apos;avenir de la performance commerciale est IA
        </p>
        <p
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.4)",
            marginTop: 8,
          }}
        >
          Cold Call &bull; DIR CO &bull; Sites IA &bull; No-Code
        </p>
      </div>
    ),
    { ...size }
  );
}
