import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import {
  CENTER_X,
  CENTER_Y,
  CIRCLE1_START_X,
  CIRCLE2_START_X,
  CIRCLE_RADIUS,
  TIMING,
} from "../config";

export const VennGlow: React.FC = () => {
  const frame = useCurrentFrame();

  const glowOpacity = interpolate(
    frame,
    [
      TIMING.vennGlow.start,
      TIMING.vennGlow.start + 15,
      TIMING.vennGlow.end - 5,
      TIMING.vennGlow.end,
    ],
    [0, 0.6, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  if (glowOpacity <= 0) return null;

  // Animated circle centers
  const c1x = interpolate(
    frame,
    [TIMING.slideStart.start, TIMING.slideEnd.start],
    [CIRCLE1_START_X, CENTER_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const c2x = interpolate(
    frame,
    [TIMING.slideStart.start, TIMING.slideEnd.start],
    [CIRCLE2_START_X, CENTER_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Midpoint between the two circles
  const midX = (c1x + c2x) / 2;

  // Distance between centers — glow size grows as they get closer
  const dist = c2x - c1x;
  const overlap = Math.max(0, 2 * CIRCLE_RADIUS - dist);
  if (overlap <= 0) return null;

  const glowSize = overlap * 1.5;

  return (
    <div
      style={{
        position: "absolute",
        left: midX - glowSize / 2,
        top: CENTER_Y - glowSize / 2,
        width: glowSize,
        height: glowSize,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(123,94,255,0.3) 30%, rgba(0,245,255,0.15) 60%, transparent 85%)",
        filter: "blur(30px)",
        opacity: glowOpacity,
        mixBlendMode: "screen",
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
};
