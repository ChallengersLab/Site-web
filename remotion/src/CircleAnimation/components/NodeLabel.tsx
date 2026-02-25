import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { angleToXY } from "../config";
import type { NodeConfig } from "../config";

interface NodeLabelProps {
  node: NodeConfig;
  index: number;
  cx: number;
  cy: number;
  radius: number;
  color: string;
  glowColor: string;
  appearStart: number;
  fadeOutStart: number;
  fadeOutEnd: number;
}

const NODE_OFFSET = 55; // px beyond circle edge

export const NodeLabel: React.FC<NodeLabelProps> = ({
  node,
  index,
  cx,
  cy,
  radius,
  color,
  glowColor,
  appearStart,
  fadeOutStart,
  fadeOutEnd,
}) => {
  const frame = useCurrentFrame();
  const pos = angleToXY(node.angle, radius + NODE_OFFSET, cx, cy);

  const staggerStart = appearStart + index * 3;
  const opacity = interpolate(
    frame,
    [staggerStart, staggerStart + 10, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const capsuleHeight = 50;

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        height: capsuleHeight,
        borderRadius: capsuleHeight / 2,
        background: "rgba(3, 3, 3, 0.85)",
        border: `1px solid ${color}`,
        boxShadow: `0 0 15px ${glowColor}, 0 0 40px ${glowColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
        opacity,
        pointerEvents: "none",
        backdropFilter: "blur(4px)",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          color: "#e8e8e8",
          fontSize: 20,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {node.label}
      </span>
    </div>
  );
};
