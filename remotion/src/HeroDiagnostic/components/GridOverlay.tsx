import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface GridOverlayProps {
  delay?: number;
  fadeInDuration?: number;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({
  delay = 0,
  fadeInDuration = 30,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [delay, delay + fadeInDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(rgba(123,94,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(123,94,255,0.07) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
