import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface LightTracerProps {
  cx: number;
  cy: number;
  radius: number;
  color: string;
  /** Phase start/end for this tracer's active window */
  activeStart: number;
  activeEnd: number;
  /** "jerky" for vicious circle, "smooth" for method/fused */
  mode: "jerky" | "smooth";
  /** Number of full rotations during active window */
  rotations: number;
  fadeOutStart: number;
  fadeOutEnd: number;
}

const ARC_SWEEP = 60;

export const LightTracer: React.FC<LightTracerProps> = ({
  cx,
  cy,
  radius,
  color,
  activeStart,
  activeEnd,
  mode,
  rotations,
  fadeOutStart,
  fadeOutEnd,
}) => {
  const frame = useCurrentFrame();

  if (frame < activeStart || frame >= fadeOutEnd) return null;

  const localFrame = frame - activeStart;
  const totalFrames = activeEnd - activeStart;
  const rawProgress = Math.min(localFrame / totalFrames, 1);

  let angleDeg: number;
  let glowIntensity: number;

  if (mode === "jerky") {
    const quarterProgress = (rawProgress * rotations) % 1;
    const jerky =
      quarterProgress < 0.5
        ? 2 * quarterProgress * quarterProgress
        : 1 - Math.pow(-2 * quarterProgress + 2, 2) / 2;
    const fullRotations = Math.floor(rawProgress * rotations);
    angleDeg = (fullRotations + jerky) * 360;
    glowIntensity = 0.8;
  } else {
    // Smooth accelerating
    const eased = rawProgress * rawProgress;
    angleDeg = eased * rotations * 360;
    glowIntensity = interpolate(rawProgress, [0, 0.3, 1], [0.4, 0.9, 0.9], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  const startAngle = angleDeg - ARC_SWEEP / 2;
  const endAngle = angleDeg + ARC_SWEEP / 2;
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;

  const x1 = cx + radius * Math.cos(toRad(startAngle));
  const y1 = cy + radius * Math.sin(toRad(startAngle));
  const x2 = cx + radius * Math.cos(toRad(endAngle));
  const y2 = cy + radius * Math.sin(toRad(endAngle));

  const largeArc = ARC_SWEEP > 180 ? 1 : 0;
  const arcPath = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;

  const fadeOpacity = interpolate(frame, [fadeOutStart, fadeOutEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: fadeOpacity,
      }}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
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
