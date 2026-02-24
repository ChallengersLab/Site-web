import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface FloatingUIBlocksProps {
  disintegrationProgress?: number; // 0 = stable, 1 = fully scattered
}

interface UIBlock {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  type: "list" | "chart" | "inbox" | "table" | "calendar";
  delay: number;
}

const BLOCKS: UIBlock[] = [
  { x: 100, y: 80, width: 320, height: 220, rotation: -3, type: "list", delay: 0 },
  { x: 1450, y: 120, width: 280, height: 180, rotation: 4, type: "chart", delay: 5 },
  { x: 250, y: 650, width: 300, height: 200, rotation: 2, type: "inbox", delay: 10 },
  { x: 1300, y: 600, width: 260, height: 240, rotation: -5, type: "table", delay: 8 },
  { x: 800, y: 50, width: 240, height: 160, rotation: 1, type: "calendar", delay: 15 },
  { x: 50, y: 400, width: 200, height: 150, rotation: -2, type: "chart", delay: 12 },
  { x: 1550, y: 400, width: 280, height: 200, rotation: 3, type: "list", delay: 7 },
];

const LINE_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  borderRadius: 2,
};

const renderBlockContent = (
  type: UIBlock["type"],
  width: number,
  height: number,
): React.ReactNode => {
  const padding = 14;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  switch (type) {
    case "list": {
      const widths = [0.9, 0.7, 0.85, 0.6, 0.75];
      return (
        <div style={{ padding, display: "flex", flexDirection: "column", gap: 10 }}>
          {widths.map((w, i) => (
            <div
              key={i}
              style={{
                ...LINE_STYLE,
                width: innerW * w,
                height: 6,
              }}
            />
          ))}
        </div>
      );
    }

    case "chart": {
      const barHeights = [0.6, 0.9, 0.4, 0.75];
      const barWidth = Math.floor(innerW / (barHeights.length * 2));
      return (
        <div
          style={{
            padding,
            display: "flex",
            alignItems: "flex-end",
            gap: barWidth,
            height: innerH,
          }}
        >
          {barHeights.map((h, i) => (
            <div
              key={i}
              style={{
                ...LINE_STYLE,
                width: barWidth,
                height: innerH * h * 0.7,
              }}
            />
          ))}
        </div>
      );
    }

    case "inbox": {
      return (
        <div style={{ padding, display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              ...LINE_STYLE,
              width: innerW * 0.7,
              height: 10,
            }}
          />
          <div
            style={{
              ...LINE_STYLE,
              width: innerW * 0.95,
              height: 5,
            }}
          />
          <div
            style={{
              ...LINE_STYLE,
              width: innerW * 0.85,
              height: 5,
            }}
          />
          <div
            style={{
              ...LINE_STYLE,
              width: innerW * 0.6,
              height: 5,
            }}
          />
        </div>
      );
    }

    case "table": {
      const rows = 4;
      const cols = 3;
      const cellW = Math.floor((innerW - (cols - 1) * 6) / cols);
      const cellH = Math.floor((innerH - (rows - 1) * 6) / rows);
      return (
        <div style={{ padding, display: "flex", flexDirection: "column", gap: 6 }}>
          {Array.from({ length: rows }).map((_, r) => (
            <div key={r} style={{ display: "flex", gap: 6 }}>
              {Array.from({ length: cols }).map((_, c) => (
                <div
                  key={c}
                  style={{
                    ...LINE_STYLE,
                    width: cellW,
                    height: cellH,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      );
    }

    case "calendar": {
      const gridCols = 5;
      const gridRows = 3;
      const squareSize = Math.min(
        Math.floor((innerW - (gridCols - 1) * 4) / gridCols),
        Math.floor((innerH - 20 - (gridRows - 1) * 4) / gridRows),
      );
      return (
        <div style={{ padding, display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              ...LINE_STYLE,
              width: innerW,
              height: 8,
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {Array.from({ length: gridCols * gridRows }).map((_, i) => (
              <div
                key={i}
                style={{
                  ...LINE_STYLE,
                  width: squareSize,
                  height: squareSize,
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};

export const FloatingUIBlocks: React.FC<FloatingUIBlocksProps> = ({
  disintegrationProgress = 0,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {BLOCKS.map((block, i) => {
        const seed = i + 1;

        // Fade in
        const fadeOpacity = interpolate(
          frame,
          [block.delay, block.delay + 15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        // Sinusoidal drift
        const driftAmplitude = 1 + disintegrationProgress * 5;
        const driftX =
          Math.sin(frame / 80 + seed * 2.1) * 8 * driftAmplitude;
        const driftY =
          Math.cos(frame / 100 + seed * 3.3) * 6 * driftAmplitude;

        // Rotation oscillation + disintegration
        const baseOscillation =
          Math.sin(frame / 120 + seed * 1.9) * 1.5;
        const totalRotation =
          (block.rotation + baseOscillation) *
          (1 + disintegrationProgress * 8);

        // Disintegration effects
        const disintOpacity = fadeOpacity * (1 - disintegrationProgress);
        const scale = 1 - disintegrationProgress * 0.3;

        // Accent bar — some blocks get one
        const hasAccent = i % 3 === 0;
        const accentColor =
          i % 2 === 0
            ? "rgba(123,94,255,0.06)"
            : "rgba(0,245,255,0.06)";

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: block.x + driftX,
              top: block.y + driftY,
              width: block.width,
              height: block.height,
              transform: `rotate(${totalRotation}deg) scale(${scale})`,
              opacity: disintOpacity,
              border: "1px solid rgba(255,255,255,0.04)",
              background: "rgba(255,255,255,0.015)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {hasAccent && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  background: accentColor,
                }}
              />
            )}
            {renderBlockContent(block.type, block.width, block.height)}
          </div>
        );
      })}
    </div>
  );
};
