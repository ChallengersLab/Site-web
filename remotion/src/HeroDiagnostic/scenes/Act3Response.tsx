import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { GridOverlay } from "../components/GridOverlay";
import { Orb } from "../components/Orb";
import { NetworkGraph } from "../components/NetworkGraph";
import { SplitScreen } from "../components/SplitScreen";
import { GradientText } from "../components/GradientText";
import { ParticleField } from "../components/ParticleField";

export const Act3Response: React.FC = () => {
  const frame = useCurrentFrame();

  // ---------------------------------------------------------------------------
  // NetworkGraph progress (frames 10-80): same-side nodes and lines draw
  // ---------------------------------------------------------------------------
  const networkProgress = interpolate(frame, [10, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // NetworkGraph mergeProgress (frames 60-90): cross-center connections form
  // ---------------------------------------------------------------------------
  const mergeProgress = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // "Ce qu'on livre :" text (fade in 30-45, fade out 50-65)
  // ---------------------------------------------------------------------------
  const deliverTextOpacity = interpolate(
    frame,
    [30, 45, 50, 65],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ---------------------------------------------------------------------------
  // Network + SplitScreen fade out (frames 145-165)
  // ---------------------------------------------------------------------------
  const networkFadeOut = interpolate(frame, [145, 165], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const splitScreenOpacity = interpolate(frame, [145, 165], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // Final line (frames 165-240)
  // ---------------------------------------------------------------------------
  const finalLineOpacity = interpolate(frame, [165, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const finalLineY = interpolate(frame, [165, 180], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Layer 1: Grid fades in over first 20 frames */}
      <GridOverlay delay={0} fadeInDuration={20} />

      {/* Layer 2: Orbs — purple left, cyan right */}
      <Orb
        color="rgba(123,94,255,0.25)"
        size={700}
        x={-200}
        y={100}
        delay={0}
        fadeInDuration={20}
      />
      <Orb
        color="rgba(0,245,255,0.18)"
        size={600}
        x={1400}
        y={300}
        delay={0}
        fadeInDuration={20}
      />

      {/* Layer 3: Network Graph — the visual star */}
      <NetworkGraph
        progress={networkProgress}
        mergeProgress={mergeProgress}
        opacity={networkFadeOut}
      />

      {/* Layer 4a: "Ce qu'on livre :" center text */}
      {frame >= 30 && frame <= 65 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 56,
              color: "#FFFFFF",
              opacity: deliverTextOpacity,
              textAlign: "center",
            }}
          >
            {`Ce qu\u2019on livre\u00A0:`}
          </span>
        </div>
      )}

      {/* Layer 4b: SplitScreen labels (frames 70-165) */}
      {frame >= 70 && frame <= 165 && (
        <div style={{ opacity: splitScreenOpacity }}>
          <SplitScreen
            leftLabel="Un process de vente reproductible."
            rightLabel="Des automatisations qui tiennent."
            startFrame={70}
          />
        </div>
      )}

      {/* Layer 5: Final line (frames 165-240) */}
      {frame >= 165 && (
        <>
          {/* Sparse lingering particles */}
          <ParticleField
            count={20}
            color="rgba(255,255,255,0.3)"
            speed={0.15}
            opacity={0.1}
            seed={77}
            fadeInFrames={15}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <div
              style={{
                opacity: finalLineOpacity,
                transform: `translateY(${finalLineY}px)`,
                fontFamily: "'Instrument Serif', serif",
                fontSize: 52,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              <GradientText>
                {`Vos \u00e9quipes performent. Votre croissance acc\u00e9l\u00e8re.`}
              </GradientText>
            </div>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
