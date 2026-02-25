import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { BLOCKS, gridToPixel, PURPLE, CYAN } from "../config";

interface Props {
  illumination: number;
  glowIntensity?: number;
}

export const CircuitLines: React.FC<Props> = ({
  illumination,
  glowIntensity = 1,
}) => {
  const frame = useCurrentFrame();

  const connections: { x1: number; y1: number; x2: number; y2: number; avgX: number }[] = [];
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
        connections.push({
          x1: posA.x, y1: posA.y,
          x2: posB.x, y2: posB.y,
          avgX: (posA.x + posB.x) / 2,
        });
      }
    }
  }

  connections.sort((a, b) => a.avgX - b.avgX);

  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", inset: 0, zIndex: 6 }}
    >
      <defs>
        <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={PURPLE} />
          <stop offset="100%" stopColor={CYAN} />
        </linearGradient>
        <filter id="circuit-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {connections.map((conn, i) => {
        const lineIllum = interpolate(
          illumination,
          [i / connections.length, (i + 0.8) / connections.length],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        if (lineIllum <= 0) return null;

        const len = Math.sqrt(
          (conn.x2 - conn.x1) ** 2 + (conn.y2 - conn.y1) ** 2,
        );

        const dashOff = len * (1 - lineIllum);
        const pulseOp = 0.6 + Math.sin(frame * 0.1 + i * 2) * 0.2;

        return (
          <g key={i} filter={glowIntensity > 0 ? "url(#circuit-glow)" : undefined}>
            <line
              x1={conn.x1} y1={conn.y1}
              x2={conn.x2} y2={conn.y2}
              stroke="url(#circuit-grad)"
              strokeWidth={6}
              strokeOpacity={lineIllum * 0.2 * glowIntensity}
              strokeDasharray={len}
              strokeDashoffset={dashOff}
              strokeLinecap="round"
            />
            <line
              x1={conn.x1} y1={conn.y1}
              x2={conn.x2} y2={conn.y2}
              stroke="url(#circuit-grad)"
              strokeWidth={2}
              strokeOpacity={lineIllum * pulseOp}
              strokeDasharray={len}
              strokeDashoffset={dashOff}
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
};
