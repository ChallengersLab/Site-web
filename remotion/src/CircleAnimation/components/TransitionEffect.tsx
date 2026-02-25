import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { TIMING, METHOD, FUSED } from "../config";

export const TransitionEffect: React.FC = () => {
  const frame = useCurrentFrame();

  // Fusion pulse — radial energy burst
  const pulseGlow = interpolate(
    frame,
    [TIMING.fusionPulse.start, TIMING.fusionPulse.start + 5, TIMING.fusionPulse.end],
    [0, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // White flash
  const flashOpacity = interpolate(
    frame,
    [TIMING.fusionFlash.start, TIMING.fusionFlash.start + 3, TIMING.fusionFlash.end],
    [0, 0.7, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const showPulse = pulseGlow > 0;
  const showFlash = flashOpacity > 0;

  if (!showPulse && !showFlash) return null;

  return (
    <>
      {showPulse && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, ${METHOD.glow} 0%, ${FUSED.glowSoft} 40%, transparent 70%)`,
            opacity: pulseGlow,
            pointerEvents: "none",
            zIndex: 30,
          }}
        />
      )}
      {showFlash && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#FFFFFF",
            opacity: flashOpacity,
            pointerEvents: "none",
            zIndex: 40,
          }}
        />
      )}
    </>
  );
};
