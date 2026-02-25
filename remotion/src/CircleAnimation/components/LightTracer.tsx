import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CENTER_X, CENTER_Y, CIRCLE_RADIUS, TIMING, VICIOUS, VIRTUOUS } from "../config";

const ARC_SWEEP = 60;

export const LightTracer: React.FC = () => {
  const frame = useCurrentFrame();

  const isViciousPhase = frame >= TIMING.nodesAppear.end && frame < TIMING.slowDown.start;
  const isSlowingDown = frame >= TIMING.slowDown.start && frame < TIMING.pulse.start;
  const isVirtuousPhase = frame >= TIMING.reform.end && frame < TIMING.fadeOut.start;

  if (!isViciousPhase && !isSlowingDown && !isVirtuousPhase) return null;

  let angleDeg: number;
  let color: string;
  let glowIntensity: number;

  if (isViciousPhase) {
    const localFrame = frame - TIMING.nodesAppear.end;
    const totalFrames = TIMING.slowDown.start - TIMING.nodesAppear.end;
    const rawProgress = localFrame / totalFrames;
    const quarterProgress = (rawProgress * 3) % 1;
    const jerky = quarterProgress < 0.5
      ? 2 * quarterProgress * quarterProgress
      : 1 - Math.pow(-2 * quarterProgress + 2, 2) / 2;
    const fullRotations = Math.floor(rawProgress * 3);
    angleDeg = (fullRotations + jerky) * 360;
    color = VICIOUS.primary;
    glowIntensity = 0.8;
  } else if (isSlowingDown) {
    const progress = interpolate(
      frame,
      [TIMING.slowDown.start, TIMING.slowDown.end],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const eased = 1 - Math.pow(1 - progress, 3);
    angleDeg = eased * 120;
    const viciousEndAngle = 3 * 360;
    angleDeg += viciousEndAngle;
    color = VICIOUS.primary;
    glowIntensity = interpolate(progress, [0, 1], [0.8, 0.2], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else {
    const localFrame = frame - TIMING.reform.end;
    const totalFrames = TIMING.fadeOut.start - TIMING.reform.end;
    const rawProgress = localFrame / totalFrames;
    const eased = rawProgress * rawProgress;
    angleDeg = eased * 6 * 360;
    color = VIRTUOUS.primary;
    glowIntensity = interpolate(rawProgress, [0, 0.3, 1], [0.4, 0.9, 0.9], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  const startAngle = angleDeg - ARC_SWEEP / 2;
  const endAngle = angleDeg + ARC_SWEEP / 2;
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;

  const x1 = CENTER_X + CIRCLE_RADIUS * Math.cos(toRad(startAngle));
  const y1 = CENTER_Y + CIRCLE_RADIUS * Math.sin(toRad(startAngle));
  const x2 = CENTER_X + CIRCLE_RADIUS * Math.cos(toRad(endAngle));
  const y2 = CENTER_Y + CIRCLE_RADIUS * Math.sin(toRad(endAngle));

  const largeArc = ARC_SWEEP > 180 ? 1 : 0;
  const arcPath = `M ${x1} ${y1} A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`;

  const fadeOut = interpolate(
    frame,
    [TIMING.fadeOut.start, TIMING.fadeOut.end],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: fadeOut,
      }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <path
          d={arcPath}
          fill="none"
          stroke={color}
          strokeWidth={12}
          strokeLinecap="round"
          style={{ filter: "blur(16px)" }}
          opacity={glowIntensity * 0.6}
        />
        <path
          d={arcPath}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          style={{ filter: "blur(6px)" }}
          opacity={glowIntensity * 0.8}
        />
        <path
          d={arcPath}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={glowIntensity}
        />
      </svg>
    </div>
  );
};
