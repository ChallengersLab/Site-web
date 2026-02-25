import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CIRCLE1_START_X, CIRCLE2_START_X, CENTER_X, CENTER_Y, TIMING } from "../config";

export const AmbientGlow: React.FC = () => {
  const frame = useCurrentFrame();

  // Red glow follows circle 1
  const redOpacity = interpolate(
    frame,
    [TIMING.fadeIn.end, TIMING.circle1Draw.start, TIMING.slideStart.start, TIMING.fusionFlash.start],
    [0, 0.2, 0.2, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Purple glow follows circle 2
  const purpleOpacity = interpolate(
    frame,
    [TIMING.circle2Draw.start, TIMING.circle2Draw.end, TIMING.slideStart.start, TIMING.fusionFlash.start],
    [0, 0.2, 0.2, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Fused glow (purple-cyan) at center
  const fusedOpacity = interpolate(
    frame,
    [TIMING.fusionMerge.start, TIMING.fusionMerge.end, TIMING.fadeOut.start, TIMING.fadeOut.end],
    [0, 0.25, 0.25, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Animated center X for sliding circles
  const circle1X = interpolate(
    frame,
    [TIMING.slideStart.start, TIMING.slideEnd.start],
    [CIRCLE1_START_X, CENTER_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const circle2X = interpolate(
    frame,
    [TIMING.slideStart.start, TIMING.slideEnd.start],
    [CIRCLE2_START_X, CENTER_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const pulse = Math.sin(frame * 0.12) * 0.05;

  return (
    <>
      {redOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: circle1X - 350,
            top: CENTER_Y - 350,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,68,68,0.5) 0%, rgba(255,68,68,0.15) 40%, transparent 70%)",
            filter: "blur(80px)",
            opacity: Math.max(0, redOpacity + pulse),
            pointerEvents: "none",
          }}
        />
      )}
      {purpleOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: circle2X - 350,
            top: CENTER_Y - 350,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(123,94,255,0.5) 0%, rgba(123,94,255,0.15) 40%, transparent 70%)",
            filter: "blur(80px)",
            opacity: Math.max(0, purpleOpacity + pulse),
            pointerEvents: "none",
          }}
        />
      )}
      {fusedOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: CENTER_X - 400,
            top: CENTER_Y - 400,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(123,94,255,0.5) 0%, rgba(0,245,255,0.2) 40%, transparent 70%)",
            filter: "blur(100px)",
            opacity: Math.max(0, fusedOpacity + pulse),
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
};
