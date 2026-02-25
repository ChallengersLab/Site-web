import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CENTER_X, CENTER_Y, CIRCLE_RADIUS, TIMING, VICIOUS, VIRTUOUS } from "../config";

export const CircleRing: React.FC = () => {
  const frame = useCurrentFrame();
  const circumference = 2 * Math.PI * CIRCLE_RADIUS;

  // === Draw-in animation (frames 10-25) ===
  const drawProgress = interpolate(
    frame,
    [TIMING.circleDraw.start, TIMING.circleDraw.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const dashOffset = circumference * (1 - drawProgress);

  // === Visibility: hidden during blackout ===
  const ringOpacity = interpolate(
    frame,
    [
      TIMING.fadeIn.start,
      TIMING.circleDraw.start,
      TIMING.fragment.start,
      TIMING.flash.start,
      TIMING.blackout.start,
      TIMING.blackout.end,
      TIMING.reform.end,
      TIMING.fadeOut.start,
      TIMING.fadeOut.end,
    ],
    [0, 0.6, 0.6, 0.3, 0, 0, 0.6, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === Color transition ===
  const isVirtuous = frame >= TIMING.reform.start;
  const strokeColor = isVirtuous ? VIRTUOUS.primary : VICIOUS.primary;

  // === Fragmentation: dash-array gaps grow ===
  const fragmentProgress = interpolate(
    frame,
    [TIMING.fragment.start, TIMING.flash.start],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const isFragmenting = fragmentProgress > 0 && fragmentProgress < 1;

  const segmentLength = circumference / 4;
  const gapSize = fragmentProgress * segmentLength * 0.6;
  const fragmentDashArray = isFragmenting
    ? `${segmentLength - gapSize} ${gapSize}`
    : `${circumference}`;
  const fragmentDashOffset = isFragmenting ? 0 : dashOffset;

  // === Pulse scale during transition ===
  const pulseScale = interpolate(
    frame,
    [TIMING.pulse.start, TIMING.pulse.start + 3, TIMING.pulse.end],
    [1, 1.06, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === Reform draw-in ===
  const reformProgress = interpolate(
    frame,
    [TIMING.reform.start, TIMING.reform.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const isReforming = frame >= TIMING.blackout.end && frame <= TIMING.reform.end;
  const reformDashOffset = isReforming ? circumference * (1 - reformProgress) : 0;

  const finalDashArray = isReforming ? `${circumference}` : fragmentDashArray;
  const finalDashOffset = isReforming ? reformDashOffset : fragmentDashOffset;

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
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${pulseScale})`,
          transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
        }}
      >
        {/* Outer glow layer (wide blur) */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={CIRCLE_RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={6}
          strokeDasharray={finalDashArray}
          strokeDashoffset={finalDashOffset}
          strokeLinecap="round"
          style={{ filter: "blur(20px)" }}
          opacity={0.5}
        />
        {/* Mid glow layer */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={CIRCLE_RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={4}
          strokeDasharray={finalDashArray}
          strokeDashoffset={finalDashOffset}
          strokeLinecap="round"
          style={{ filter: "blur(8px)" }}
          opacity={0.7}
        />
        {/* Core stroke */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={CIRCLE_RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={2}
          strokeDasharray={finalDashArray}
          strokeDashoffset={finalDashOffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
