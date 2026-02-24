import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface OrbProps {
  color: string;
  size: number;
  x: number;
  y: number;
  delay?: number;
  fadeInDuration?: number;
}

export const Orb: React.FC<OrbProps> = ({
  color,
  size,
  x,
  y,
  delay = 0,
  fadeInDuration = 30,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [delay, delay + fadeInDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const driftY = Math.sin((frame + delay) / 60) * 20;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2 + driftY,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        filter: "blur(80px)",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
