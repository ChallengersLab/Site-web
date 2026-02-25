import React from "react";
import { useCurrentFrame } from "remotion";
import type { BlockType } from "../types";
import { GRID_CELL_W, GRID_CELL_H, PURPLE } from "../config";

interface Props {
  type: BlockType;
  x: number;
  y: number;
  visibility: number;
  flicker?: boolean;
}

export const GhostBlock: React.FC<Props> = ({
  type,
  x,
  y,
  visibility,
  flicker = true,
}) => {
  const frame = useCurrentFrame();

  const flickerOp = flicker
    ? 0.7 + Math.sin(frame * 0.5 + x * 0.1) * 0.3
    : 1;

  const vibX = Math.sin(frame * 0.3 + x * 0.05) * 2;
  const vibY = Math.cos(frame * 0.25 + y * 0.05) * 1.5;

  const opacity = visibility * flickerOp;

  return (
    <div
      style={{
        position: "absolute",
        left: x - GRID_CELL_W / 2,
        top: y - GRID_CELL_H / 2,
        width: GRID_CELL_W,
        height: GRID_CELL_H,
        opacity,
        transform: `translate(${vibX}px, ${vibY}px)`,
        zIndex: Math.round(y),
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 4px
          )`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 12,
          border: `1px dashed ${PURPLE}40`,
          background: "rgba(123,94,255,0.03)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{
          width: 60,
          height: 6,
          borderRadius: 3,
          background: `${PURPLE}20`,
        }} />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              height: 8,
              width: `${[85, 60, 70][i]}%`,
              borderRadius: 4,
              background: "rgba(255,255,255,0.04)",
            }}
          />
        ))}
      </div>
    </div>
  );
};
