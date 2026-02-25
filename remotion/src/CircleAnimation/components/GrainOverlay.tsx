import React from "react";
import { useCurrentFrame } from "remotion";

interface GrainOverlayProps {
  opacity?: number;
}

export const GrainOverlay: React.FC<GrainOverlayProps> = ({ opacity = 0.035 }) => {
  const frame = useCurrentFrame();
  const seed = frame % 100;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
        opacity,
        mixBlendMode: "overlay",
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id={`grain-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </div>
  );
};
