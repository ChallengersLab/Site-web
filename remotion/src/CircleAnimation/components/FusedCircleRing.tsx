import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { CENTER_X, CENTER_Y, FUSED_RADIUS, FPS, TIMING } from "../config";

export const FusedCircleRing: React.FC = () => {
  const frame = useCurrentFrame();
  const circumference = 2 * Math.PI * FUSED_RADIUS;

  // Appears during fusion merge
  const opacity = interpolate(
    frame,
    [TIMING.fusionMerge.start, TIMING.fusionMerge.end, TIMING.fadeToBlack.start, TIMING.fadeToBlack.end],
    [0, 0.8, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  if (opacity <= 0) return null;

  // Scale spring entrance
  const localFrame = Math.max(0, frame - TIMING.fusionMerge.start);
  const scaleSpring = spring({
    frame: localFrame,
    fps: FPS,
    config: { damping: 12, stiffness: 80, mass: 1.2 },
  });
  const scale = interpolate(scaleSpring, [0, 1], [0.3, 1]);

  // Gentle breathing pulse after settling
  const breathe =
    frame > TIMING.fusionMerge.end
      ? Math.sin((frame - TIMING.fusionMerge.end) * 0.06) * 0.02
      : 0;

  // Draw-in animation
  const drawProgress = interpolate(
    frame,
    [TIMING.fusionMerge.start, TIMING.fusionMerge.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const dashOffset = circumference * (1 - drawProgress);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
      }}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale + breathe})`,
          transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
        }}
      >
        <defs>
          <linearGradient id="fusedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B5EFF" />
            <stop offset="100%" stopColor="#00F5FF" />
          </linearGradient>
        </defs>
        {/* Outer glow */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={FUSED_RADIUS}
          fill="none"
          stroke="url(#fusedGradient)"
          strokeWidth={8}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ filter: "blur(25px)" }}
          opacity={0.5}
        />
        {/* Mid glow */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={FUSED_RADIUS}
          fill="none"
          stroke="url(#fusedGradient)"
          strokeWidth={5}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ filter: "blur(10px)" }}
          opacity={0.7}
        />
        {/* Core */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={FUSED_RADIUS}
          fill="none"
          stroke="url(#fusedGradient)"
          strokeWidth={2.5}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
