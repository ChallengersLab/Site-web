import React from "react";
import { interpolate } from "remotion";
import { BLOCKS, gridToPixel, GRID_CELL_W, GRID_CELL_H, PURPLE, CYAN } from "../config";

interface Props {
  drawProgress: number;
  pulseIntensity?: number;
  dashed?: boolean;
  opacity?: number;
  frame: number;
}

export const BlueprintGrid: React.FC<Props> = ({
  drawProgress,
  pulseIntensity = 0,
  dashed = true,
  opacity = 1,
  frame,
}) => {
  const cells = BLOCKS.map((block) => {
    const pos = gridToPixel(block.gridPos.col, block.gridPos.row);
    return { ...pos, id: block.id };
  });

  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < BLOCKS.length; i++) {
    for (let j = i + 1; j < BLOCKS.length; j++) {
      const a = BLOCKS[i].gridPos;
      const b = BLOCKS[j].gridPos;
      if (
        (Math.abs(a.col - b.col) === 1 && a.row === b.row) ||
        (Math.abs(a.row - b.row) === 1 && a.col === b.col)
      ) {
        const posA = gridToPixel(a.col, a.row);
        const posB = gridToPixel(b.col, b.row);
        connections.push({ x1: posA.x, y1: posA.y, x2: posB.x, y2: posB.y });
      }
    }
  }

  const pulseOsc = pulseIntensity > 0
    ? 0.3 + Math.sin(frame * 0.08) * 0.15 * pulseIntensity
    : 0.3;

  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", inset: 0, opacity, zIndex: 5 }}
    >
      <defs>
        <linearGradient id="bp-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={PURPLE} />
          <stop offset="100%" stopColor={CYAN} />
        </linearGradient>
      </defs>

      {cells.map((cell, i) => {
        const cellProgress = interpolate(
          drawProgress,
          [i / cells.length, (i + 1) / cells.length],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const perimeter = 2 * (GRID_CELL_W - 24 + GRID_CELL_H - 24);
        const dashOffset = perimeter * (1 - cellProgress);

        return (
          <rect
            key={cell.id}
            x={cell.x - (GRID_CELL_W - 24) / 2}
            y={cell.y - (GRID_CELL_H - 24) / 2}
            width={GRID_CELL_W - 24}
            height={GRID_CELL_H - 24}
            rx={12}
            fill="none"
            stroke="url(#bp-gradient)"
            strokeWidth={1.5}
            strokeOpacity={pulseOsc}
            strokeDasharray={perimeter}
            strokeDashoffset={dashOffset}
          />
        );
      })}

      {connections.map((conn, i) => {
        const lineProgress = interpolate(
          drawProgress,
          [0.3 + (i / connections.length) * 0.5, 0.5 + (i / connections.length) * 0.5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const len = Math.sqrt(
          (conn.x2 - conn.x1) ** 2 + (conn.y2 - conn.y1) ** 2,
        );
        const dashOff = len * (1 - lineProgress);

        return (
          <line
            key={`conn-${i}`}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="url(#bp-gradient)"
            strokeWidth={1}
            strokeOpacity={pulseOsc * 0.6}
            strokeDasharray={dashed ? `${len} ${len}` : `${len}`}
            strokeDashoffset={dashOff}
          />
        );
      })}
    </svg>
  );
};
