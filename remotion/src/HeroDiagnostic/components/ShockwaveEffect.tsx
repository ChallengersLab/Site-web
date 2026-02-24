import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface ShockwaveEffectProps {
  startFrame: number;
  color?: string;
  durationFrames?: number;
}

const Ring: React.FC<{
  progress: number;
  color: string;
}> = ({ progress, color }) => {
  const diameter = progress * 3000;
  const opacity = (1 - progress) * 0.5;

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: diameter,
        height: diameter,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        border: `2px solid ${color}`,
        boxShadow: `0 0 30px ${color}40`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

export const ShockwaveEffect: React.FC<ShockwaveEffectProps> = ({
  startFrame,
  color,
  durationFrames = 20,
}) => {
  const frame = useCurrentFrame();

  const isActive = frame >= startFrame && frame < startFrame + durationFrames;

  if (!isActive) return null;

  // Single-color mode
  if (color) {
    const progress = interpolate(
      frame,
      [startFrame, startFrame + durationFrames],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    const diameter = progress * 3000;
    const opacity = (1 - progress) * 0.6;

    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: diameter,
          height: diameter,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: `2px solid ${color}`,
          boxShadow: `0 0 30px ${color}40`,
          opacity,
          pointerEvents: "none",
        }}
      />
    );
  }

  // Dual-ring mode (default): purple leading, cyan 2 frames behind
  const purpleProgress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const cyanProgress = interpolate(
    frame,
    [startFrame + 2, startFrame + durationFrames + 2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <>
      <Ring progress={purpleProgress} color="#7B5EFF" />
      <Ring progress={cyanProgress} color="#00F5FF" />
    </>
  );
};
