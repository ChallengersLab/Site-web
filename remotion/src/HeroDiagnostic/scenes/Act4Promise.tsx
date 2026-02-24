import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { GridOverlay } from "../components/GridOverlay";
import { ParticleField } from "../components/ParticleField";
import { Orb } from "../components/Orb";
import { GradientText } from "../components/GradientText";

export const Act4Promise: React.FC = () => {
  const frame = useCurrentFrame();

  // Line 1 fade in
  const line1Opacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 2 fade in + translateY
  const line2Opacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Y = interpolate(frame, [40, 60], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Master fade to black
  const masterOpacity = interpolate(frame, [105, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: masterOpacity }}>
      {/* Grid — barely visible, capped at ~0.3 opacity */}
      <div style={{ opacity: 0.3 }}>
        <GridOverlay delay={0} fadeInDuration={1} />
      </div>

      {/* Constellation particles — 60 particles, slow, with faint connection lines */}
      <ParticleField
        count={60}
        color="rgba(255,255,255,0.25)"
        speed={0.1}
        opacity={0.12}
        seed={99}
        fadeInFrames={1}
        connectDistance={250}
        connectColor="rgba(255,255,255,0.05)"
      />

      {/* Orbs — steady, breathing */}
      <Orb
        color="rgba(123,94,255,0.2)"
        size={600}
        x={200}
        y={150}
        delay={0}
        fadeInDuration={1}
      />
      <Orb
        color="rgba(0,245,255,0.12)"
        size={500}
        x={1100}
        y={400}
        delay={0}
        fadeInDuration={1}
      />

      {/* Text — the star */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 200px",
          gap: 20,
          zIndex: 10,
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 60,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.2,
            opacity: line1Opacity,
          }}
        >
          On ne vend pas des missions.
        </div>

        {/* Line 2 */}
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          <GradientText
            italic
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 60,
              lineHeight: 1.2,
            }}
          >
            On résout vos problèmes.
          </GradientText>
        </div>
      </div>
    </AbsoluteFill>
  );
};
