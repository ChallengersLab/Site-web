import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface GlitchEffectProps {
  children: React.ReactNode;
  startFrame: number;
  durationFrames: number;
}

export const GlitchEffect: React.FC<GlitchEffectProps> = ({
  children,
  startFrame,
  durationFrames,
}) => {
  const frame = useCurrentFrame();

  const isActive = frame >= startFrame && frame < startFrame + durationFrames;

  if (!isActive) {
    return <>{children}</>;
  }

  const elapsed = frame - startFrame;

  const intensity = interpolate(elapsed, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const offsetX = Math.sin(elapsed * 1.5) * 15 * intensity;
  const offsetY = Math.cos(elapsed * 2.3) * 8 * intensity;
  const skew = Math.sin(elapsed * 3) * 3 * intensity;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Red channel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${offsetX}px, ${-offsetY}px) skewX(${skew}deg)`,
          mixBlendMode: "screen",
          opacity: 0.6 * intensity,
          filter: "hue-rotate(-30deg) saturate(3)",
          pointerEvents: "none",
        }}
      >
        {children}
      </div>

      {/* Blue channel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${-offsetX}px, ${offsetY}px) skewX(${-skew}deg)`,
          mixBlendMode: "screen",
          opacity: 0.6 * intensity,
          filter: "hue-rotate(200deg) saturate(3)",
          pointerEvents: "none",
        }}
      >
        {children}
      </div>

      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,${0.15 * intensity}) 2px, rgba(0,0,0,${0.15 * intensity}) 4px)`,
          pointerEvents: "none",
        }}
      />

      {/* Original content (slightly faded) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          opacity: 1 - 0.3 * intensity,
        }}
      >
        {children}
      </div>
    </div>
  );
};
