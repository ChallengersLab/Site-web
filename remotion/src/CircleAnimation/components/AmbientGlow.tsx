import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CENTER_X, CENTER_Y, TIMING } from "../config";

export const AmbientGlow: React.FC = () => {
  const frame = useCurrentFrame();

  const redOpacity = interpolate(
    frame,
    [TIMING.fadeIn.start, TIMING.fadeIn.end, TIMING.slowDown.start, TIMING.flash.start],
    [0, 0.2, 0.25, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cyanOpacity = interpolate(
    frame,
    [TIMING.blackout.end, TIMING.reform.end, TIMING.fadeOut.start, TIMING.fadeOut.end],
    [0, 0.2, 0.25, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const viciousPulse = Math.sin(frame * 0.18) * 0.08 + Math.sin(frame * 0.31) * 0.04;
  const virtuousPulse = Math.sin(frame * 0.08) * 0.05;

  const redFinal = Math.max(0, redOpacity + (redOpacity > 0 ? viciousPulse : 0));
  const cyanFinal = Math.max(0, cyanOpacity + (cyanOpacity > 0 ? virtuousPulse : 0));

  return (
    <>
      {redFinal > 0 && (
        <div
          style={{
            position: "absolute",
            left: CENTER_X - 400,
            top: CENTER_Y - 400,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,68,68,0.5) 0%, rgba(255,107,53,0.2) 40%, transparent 70%)",
            filter: "blur(100px)",
            opacity: redFinal,
            pointerEvents: "none",
          }}
        />
      )}
      {cyanFinal > 0 && (
        <div
          style={{
            position: "absolute",
            left: CENTER_X - 400,
            top: CENTER_Y - 400,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,245,255,0.5) 0%, rgba(0,212,170,0.2) 40%, transparent 70%)",
            filter: "blur(100px)",
            opacity: cyanFinal,
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
};
