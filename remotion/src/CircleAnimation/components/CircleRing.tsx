import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface CircleRingProps {
  cx: number;
  cy: number;
  radius: number;
  color: string;
  drawStart: number;
  drawEnd: number;
  fadeOutStart: number;
  fadeOutEnd: number;
  /** If set, ring fades out between these frames (for pre-fusion disappear) */
  disappearStart?: number;
  disappearEnd?: number;
}

export const CircleRing: React.FC<CircleRingProps> = ({
  cx,
  cy,
  radius,
  color,
  drawStart,
  drawEnd,
  fadeOutStart,
  fadeOutEnd,
  disappearStart,
  disappearEnd,
}) => {
  const frame = useCurrentFrame();
  const circumference = 2 * Math.PI * radius;

  // Draw-in
  const drawProgress = interpolate(
    frame,
    [drawStart, drawEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const dashOffset = circumference * (1 - drawProgress);

  // Opacity
  let ringOpacity: number;
  if (disappearStart !== undefined && disappearEnd !== undefined) {
    ringOpacity = interpolate(
      frame,
      [drawStart - 5, drawStart, disappearStart, disappearEnd],
      [0, 0.6, 0.6, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
  } else {
    ringOpacity = interpolate(
      frame,
      [drawStart - 5, drawStart, fadeOutStart, fadeOutEnd],
      [0, 0.6, 0.6, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
  }

  if (ringOpacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: ringOpacity,
      }}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Outer glow */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ filter: "blur(20px)" }}
          opacity={0.5}
        />
        {/* Mid glow */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ filter: "blur(8px)" }}
          opacity={0.7}
        />
        {/* Core */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
