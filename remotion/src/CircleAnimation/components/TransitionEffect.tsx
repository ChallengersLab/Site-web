import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { TIMING, VICIOUS } from "../config";

export const TransitionEffect: React.FC = () => {
  const frame = useCurrentFrame();

  const pulseGlow = interpolate(
    frame,
    [TIMING.pulse.start, TIMING.pulse.start + 3, TIMING.pulse.end],
    [0, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const flashOpacity = interpolate(
    frame,
    [TIMING.flash.start, TIMING.flash.start + 2, TIMING.flash.end],
    [0, 0.85, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const blackoutOpacity = interpolate(
    frame,
    [TIMING.blackout.start, TIMING.blackout.start + 2, TIMING.blackout.end - 4, TIMING.blackout.end],
    [0, 0.95, 0.95, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const showPulse = pulseGlow > 0;
  const showFlash = flashOpacity > 0;
  const showBlackout = blackoutOpacity > 0;

  if (!showPulse && !showFlash && !showBlackout) return null;

  return (
    <>
      {showPulse && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, ${VICIOUS.glow} 0%, transparent 60%)`,
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
      {showBlackout && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#08080C",
            opacity: blackoutOpacity,
            pointerEvents: "none",
            zIndex: 35,
          }}
        />
      )}
    </>
  );
};
