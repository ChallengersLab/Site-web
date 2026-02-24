import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { GridOverlay } from "../components/GridOverlay";
import { FloatingUIBlocks } from "../components/FloatingUIBlocks";
import { ParticleField } from "../components/ParticleField";
import { Orb } from "../components/Orb";
import { Typewriter } from "../components/Typewriter";

export const Act1Mirror: React.FC = () => {
  const frame = useCurrentFrame();

  // Line 2 animation (starts at frame 90)
  const line2Opacity = interpolate(frame, [90, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Y = interpolate(frame, [90, 105], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Layer 1: Grid */}
      <GridOverlay delay={0} fadeInDuration={20} />

      {/* Layer 2: Floating UI blocks */}
      <FloatingUIBlocks disintegrationProgress={0} />

      {/* Layer 3: Particles */}
      <ParticleField
        count={40}
        color="rgba(255,255,255,0.3)"
        speed={0.3}
        opacity={0.15}
        seed={42}
        fadeInFrames={20}
      />

      {/* Layer 4: Ambient orb */}
      <Orb
        color="rgba(123,94,255,0.12)"
        size={700}
        x={-100}
        y={200}
        delay={0}
      />

      {/* Layer 5: Text content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 200px",
          zIndex: 10,
        }}
      >
        {/* Line 1: Typewriter */}
        <Typewriter
          text="Les bons \u00e9l\u00e9ments, vous les avez."
          startFrame={15}
          msPerChar={35}
          style={{
            fontSize: 42,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        />

        {/* Line 2: Fade in */}
        <div
          style={{
            marginTop: 40,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontFamily: "'Instrument Serif', serif",
            fontSize: 52,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Le playbook pour les faire performer, non.
        </div>
      </div>
    </AbsoluteFill>
  );
};
