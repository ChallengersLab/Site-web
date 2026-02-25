import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import {
  CIRCLE_RADIUS,
  TIMING,
  VICIOUS,
  VIRTUOUS,
  angleToXY,
} from "../config";
import type { NodeConfig } from "../config";

interface NodeLabelProps {
  node: NodeConfig;
  index: number;
}

export const NodeLabel: React.FC<NodeLabelProps> = ({ node, index }) => {
  const frame = useCurrentFrame();

  const pos = angleToXY(node.angle, CIRCLE_RADIUS);

  const appearStart = TIMING.nodesAppear.start + index * 4;
  // blackout.end (158) and reform.start (158) share the same frame,
  // so we merge them into one keyframe to keep inputRange strictly increasing.
  const opacity = interpolate(
    frame,
    [
      appearStart,
      appearStart + 10,
      TIMING.fragment.start,
      TIMING.flash.start,
      TIMING.blackout.start,
      TIMING.blackout.end,
      TIMING.reform.end,
      TIMING.fadeOut.start,
      TIMING.fadeOut.end,
    ],
    [0, 1, 1, 0.5, 0, 0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const labelTransition = interpolate(
    frame,
    [TIMING.reform.start, TIMING.reform.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const isVirtuous = labelTransition >= 0.5;
  const label = isVirtuous ? node.virtuousLabel : node.viciousLabel;

  const borderColor = isVirtuous ? VIRTUOUS.primary : VICIOUS.primary;
  const glowColor = isVirtuous ? VIRTUOUS.glow : VICIOUS.glow;

  const capsuleWidth = 220;
  const capsuleHeight = 52;

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
        background: "rgba(8, 8, 12, 0.75)",
        border: `1px solid ${borderColor}`,
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
          color: "#FFFFFF",
          fontSize: 20,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          textAlign: "center",
          lineHeight: 1.2,
          padding: "0 16px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
};
