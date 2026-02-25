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
  const pos = angleToXY(node.angle, radius, cx, cy);

  const staggerStart = appearStart + index * 4;
  const opacity = interpolate(
    frame,
    [staggerStart, staggerStart + 10, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const capsuleWidth = 220;
  const capsuleHeight = 48;

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: pos.x - capsuleWidth / 2,
        top: pos.y - capsuleHeight / 2,
        width: capsuleWidth,
        height: capsuleHeight,
        borderRadius: capsuleHeight / 2,
        background: "rgba(3, 3, 3, 0.8)",
        border: `1px solid ${color}`,
        boxShadow: `0 0 20px ${glowColor}, 0 0 60px ${glowColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        pointerEvents: "none",
        backdropFilter: "blur(4px)",
      }}
    >
      <span
        style={{
          color: "#e8e8e8",
          fontSize: 18,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          textAlign: "center",
          lineHeight: 1.2,
          padding: "0 14px",
          whiteSpace: "nowrap",
        }}
      >
        {node.label}
      </span>
    </div>
  );
};
