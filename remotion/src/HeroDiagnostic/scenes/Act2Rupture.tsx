import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { GridOverlay } from "../components/GridOverlay";
import { FloatingUIBlocks } from "../components/FloatingUIBlocks";
import { ParticleField } from "../components/ParticleField";
import { Orb } from "../components/Orb";
import { GlitchEffect } from "../components/GlitchEffect";
import { ShockwaveEffect } from "../components/ShockwaveEffect";

export const Act2Rupture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---------------------------------------------------------------------------
  // Phase boundaries (scene-local frames)
  // ---------------------------------------------------------------------------
  const DISINTEGRATION_END = 40;
  const BLACKOUT_END = 50;
  // Phase 3 runs from 50 to 120

  // ---------------------------------------------------------------------------
  // Phase 1: Disintegration (frames 0-40)
  // ---------------------------------------------------------------------------
  const disintegrationProgress = interpolate(frame, [0, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const particleSpeedPhase1 = interpolate(frame, [0, 40], [0.3, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const gridFadeOut = interpolate(frame, [20, 40], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // Phase 2: Blackout (frames 40-50) — nearly everything at near-zero opacity
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Phase 3: Shockwave + Pivot text (frames 50-120)
  // ---------------------------------------------------------------------------
  const pivotScale = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  const pivotTextScale = interpolate(pivotScale, [0, 1], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pivotOpacity = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const gridFadeBackIn = interpolate(frame, [55, 90], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Orb breathing in phase 3
  const orbBreath =
    0.15 + Math.sin(frame / 30) * 0.03;

  // ---------------------------------------------------------------------------
  // Master opacity controls per phase
  // ---------------------------------------------------------------------------
  const isPhase1 = frame < DISINTEGRATION_END;
  const isBlackout = frame >= DISINTEGRATION_END && frame < BLACKOUT_END;
  const isPhase3 = frame >= BLACKOUT_END;

  // Phase 1 layer opacity (fade to 0 by frame 40)
  const phase1Opacity = isPhase1 ? 1 : 0;

  // Blackout faint orb glow
  const blackoutOrbOpacity = isBlackout ? 0.03 : 0;

  return (
    <AbsoluteFill>
      {/* ================================================================== */}
      {/* PHASE 1: Disintegration (frames 0-40)                             */}
      {/* ================================================================== */}
      {isPhase1 && (
        <>
          {/* Grid fading out */}
          <div style={{ opacity: gridFadeOut }}>
            <GridOverlay delay={0} fadeInDuration={1} />
          </div>

          {/* Floating UI blocks disintegrating */}
          <FloatingUIBlocks disintegrationProgress={disintegrationProgress} />

          {/* Chaotic particle field */}
          <ParticleField
            count={40}
            color="rgba(255,255,255,0.3)"
            speed={particleSpeedPhase1}
            opacity={0.15 * phase1Opacity}
            seed={42}
            fadeInFrames={1}
          />

          {/* Ambient orb from Act 1 */}
          <Orb
            color="rgba(123,94,255,0.12)"
            size={700}
            x={-100}
            y={200}
            delay={0}
            fadeInDuration={1}
          />

          {/* Glitch effect wrapping duplicate Act 1 text */}
          <GlitchEffect startFrame={0} durationFrames={40}>
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
              {/* Line 1 — same as Act 1 typewriter (fully revealed) */}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#888",
                  fontSize: 42,
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                Les bons {"\u00e9"}l{"\u00e9"}ments, vous les avez.
              </span>

              {/* Line 2 — same as Act 1 */}
              <div
                style={{
                  marginTop: 40,
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
          </GlitchEffect>
        </>
      )}

      {/* ================================================================== */}
      {/* PHASE 2: Blackout (frames 40-50)                                  */}
      {/* ================================================================== */}
      {isBlackout && (
        <div style={{ position: "absolute", inset: 0, opacity: blackoutOrbOpacity }}>
          <Orb
            color="rgba(123,94,255,1)"
            size={400}
            x={960}
            y={540}
            delay={0}
            fadeInDuration={1}
          />
        </div>
      )}

      {/* ================================================================== */}
      {/* PHASE 3: Shockwave + Pivot text (frames 50-120)                   */}
      {/* ================================================================== */}
      {isPhase3 && (
        <>
          {/* Grid fading back in subtly */}
          <div style={{ opacity: gridFadeBackIn }}>
            <GridOverlay delay={0} fadeInDuration={1} />
          </div>

          {/* Sparse calm particle field */}
          <ParticleField
            count={15}
            color="rgba(255,255,255,0.3)"
            speed={0.2}
            opacity={0.08}
            seed={99}
            fadeInFrames={15}
          />

          {/* Faint orb underneath pivot text */}
          <div style={{ opacity: orbBreath }}>
            <Orb
              color="rgba(123,94,255,1)"
              size={600}
              x={960}
              y={540}
              delay={0}
              fadeInDuration={1}
            />
          </div>

          {/* Shockwave fires at frame 50 (dual purple/cyan rings) */}
          <ShockwaveEffect startFrame={50} durationFrames={25} />

          {/* Pivot text */}
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
                fontFamily: "'Instrument Serif', serif",
                fontSize: 64,
                color: "#FFFFFF",
                textAlign: "center",
                lineHeight: 1.3,
                opacity: pivotOpacity,
                transform: `scale(${pivotTextScale})`,
              }}
            >
              Le probl{"\u00e8"}me, c{"'"}est pas votre {"\u00e9"}quipe.
            </div>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
