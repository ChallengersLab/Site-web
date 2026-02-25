import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { IsometricScene } from "../components/IsometricScene";
import { BlueprintGrid } from "../components/BlueprintGrid";
import { GhostBlock } from "../components/GhostBlock";
import { UIBlock3D } from "../components/UIBlock3D";
import { CircuitLines } from "../components/CircuitLines";
import { ShockwaveEffect } from "../components/ShockwaveEffect";
import { KineticText } from "../components/KineticText";
import { CursorClick } from "../components/CursorClick";
import { GradientText } from "../components/GradientText";
import { ParticleField } from "../components/ParticleField";
import { BLOCKS, PURPLE, CYAN, gridToPixel } from "../config";
import type { CameraState } from "../types";

/**
 * Act 4 — Construction: The system materializes.
 *
 * 210 frames (0-209), scene-local. Uses IsometricScene — we return to 3D
 * because the system is being built. Ghost blocks materialize into solid
 * UIBlock3D instances, circuit lines illuminate, the system pulses alive,
 * camera pulls back, and the Challengers Lab brand is revealed.
 *
 * Frame choreography:
 *   0-40   Materialization (ghost -> solid, staggered springs)
 *  40-90   Circuit illumination + blueprint fade
 *  90-120  System pulse (heartbeat bounce + central shockwave)
 * 120-160  Camera pullback + constellation particles
 * 160-180  Text + cursor
 * 180-195  Brand reveal ("Challengers Lab")
 * 195-209  Fade to black
 */
export const Act4Construction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // CAMERA
  // =========================================================================

  // Orbit: 0 at start, slowly increases through the scene
  const orbitDeg = interpolate(
    frame,
    [0, 40, 90, 120, 160, 209],
    [0, 0, 5, 8, 12, 12],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Scale: 1 until frame 120, then pull back to 0.85
  const cameraScale = interpolate(frame, [120, 160], [1, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const camera: CameraState = {
    orbitDeg,
    perspective: 1200,
    scale: cameraScale,
    offsetX: 0,
    offsetY: 0,
  };

  // =========================================================================
  // BLUEPRINT GRID (frames 0-70, fading out)
  // =========================================================================

  const blueprintOpacity = interpolate(
    frame,
    [0, 40, 70],
    [1, 0.3, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // =========================================================================
  // BLOCK MATERIALIZATION (frames 0-40, staggered 5 frames apart)
  // =========================================================================

  const blockData = BLOCKS.map((block, index) => {
    const matStart = index * 5; // stagger: 0, 5, 10, 15, 20, 25, 30, 35
    const matEnd = matStart + 10;
    const pos = gridToPixel(block.gridPos.col, block.gridPos.row);

    // Ghost visibility: fades from 0.2 to 0 during materialization window
    const ghostVisibility = interpolate(
      frame,
      [matStart, matEnd],
      [0.2, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    // UIBlock3D opacity: fades from 0 to 1 during materialization window
    const solidOpacity = interpolate(
      frame,
      [matStart, matEnd],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    // Spring scale for the UIBlock3D: starts at 0.8, overshoots to ~1.0
    const matElapsed = Math.max(0, frame - matStart);
    const springVal = spring({
      frame: matElapsed,
      fps,
      config: { stiffness: 180, damping: 12, mass: 0.5 },
    });
    // Map spring 0->1 to scale 0.8->1.0
    const solidScale = 0.8 + springVal * 0.2;

    // Shockwave color: PURPLE for team blocks, CYAN for deal blocks
    const shockColor = block.team === "team" ? PURPLE : CYAN;

    return {
      block,
      pos,
      index,
      matStart,
      ghostVisibility,
      solidOpacity,
      solidScale,
      shockColor,
    };
  });

  // =========================================================================
  // CIRCUIT ILLUMINATION (frames 40-90)
  // =========================================================================

  const circuitIllumination = interpolate(frame, [40, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow intensity: pulses during system pulse phase (frames 90+)
  const glowIntensity =
    frame >= 90
      ? 0.8 + Math.sin(frame * 0.15) * 0.2
      : interpolate(frame, [40, 90], [0.5, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  // =========================================================================
  // SYSTEM PULSE (frames 90-120): heartbeat bounce on all blocks
  // =========================================================================

  const pulseElapsed = Math.max(0, frame - 90);
  const pulseSpring = spring({
    frame: pulseElapsed,
    fps,
    config: { stiffness: 200, damping: 8, mass: 0.5 },
  });
  // Creates a single bounce: scale goes 1.0 -> ~1.02 -> 1.0
  // spring goes 0 -> overshoot -> 1; we want scale to peak at ~1.02 then settle at 1.0
  // Use sin of the spring progress for a bump effect
  const pulseBump =
    frame >= 90 && frame <= 120
      ? 1 + 0.02 * Math.sin(pulseSpring * Math.PI)
      : 1;

  // =========================================================================
  // BRAND REVEAL — system contracts (frames 180-190)
  // =========================================================================

  const systemContractScale = interpolate(frame, [180, 190], [1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Combined block scale multiplier
  const getBlockScale = (baseScale: number): number => {
    return baseScale * pulseBump * systemContractScale;
  };

  // =========================================================================
  // BRAND TEXT (frames 180-195 spring in, 200-209 fade out)
  // =========================================================================

  const brandElapsed = Math.max(0, frame - 180);
  const brandSpring = spring({
    frame: brandElapsed,
    fps,
    config: { stiffness: 180, damping: 14, mass: 0.5 },
  });
  const brandScale = frame >= 180 ? 0.9 + brandSpring * 0.1 : 0;
  const brandOpacity = frame >= 180 ? brandSpring : 0;

  // Brand text final fade (frames 200-209)
  const brandFinalFade = interpolate(frame, [200, 209], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // MASTER FADE TO BLACK (frames 195-209, everything except brand)
  // =========================================================================

  const masterFade = interpolate(frame, [195, 209], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // PARTICLE FIELD (appears from frame 120)
  // =========================================================================

  const particleOpacity = interpolate(frame, [120, 150], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <IsometricScene camera={camera}>
      {/* Master opacity wrapper — fades everything except brand text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: masterFade,
        }}
      >
        {/* Layer 1: Blueprint Grid (fading out over frames 0-70) */}
        {blueprintOpacity > 0 && (
          <BlueprintGrid
            drawProgress={1}
            dashed={frame < 20}
            pulseIntensity={1}
            opacity={blueprintOpacity}
            frame={frame}
          />
        )}

        {/* Layer 2: Ghost blocks (only visible during materialization) */}
        {blockData.map(({ block, pos, ghostVisibility }) =>
          ghostVisibility > 0 ? (
            <GhostBlock
              key={`ghost-${block.id}`}
              type={block.type}
              x={pos.x}
              y={pos.y}
              visibility={ghostVisibility}
              flicker
            />
          ) : null,
        )}

        {/* Layer 3: Solid UIBlock3D blocks (materialize in) */}
        {blockData.map(({ block, pos, solidOpacity, solidScale }) =>
          solidOpacity > 0 ? (
            <UIBlock3D
              key={`solid-${block.id}`}
              type={block.type}
              state="solid"
              x={pos.x}
              y={pos.y}
              opacity={solidOpacity}
              scale={getBlockScale(solidScale)}
              halo={frame >= 90 && frame <= 120}
              haloColor={block.team === "team" ? PURPLE : CYAN}
            />
          ) : null,
        )}

        {/* Layer 4: Per-block mini shockwaves during materialization */}
        {blockData.map(({ block, pos, matStart, shockColor }) => (
          <div
            key={`shock-${block.id}`}
            style={{
              position: "absolute",
              left: pos.x - 100,
              top: pos.y - 100,
              width: 200,
              height: 200,
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 15,
            }}
          >
            <div style={{ position: "relative", width: 200, height: 200 }}>
              <ShockwaveEffect
                startFrame={matStart}
                color={shockColor}
                durationFrames={10}
              />
            </div>
          </div>
        ))}

        {/* Layer 5: Circuit lines (illuminate frames 40-90, stay lit) */}
        {circuitIllumination > 0 && (
          <CircuitLines
            illumination={circuitIllumination}
            glowIntensity={glowIntensity}
          />
        )}

        {/* Layer 6: Central system pulse shockwave at frame 90 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 16,
            pointerEvents: "none",
          }}
        >
          <ShockwaveEffect
            startFrame={90}
            color={PURPLE}
            durationFrames={20}
          />
        </div>

        {/* Layer 7: Constellation particle field (from frame 120) */}
        {particleOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <ParticleField
              count={30}
              color="rgba(255,255,255,0.3)"
              speed={0.15}
              opacity={particleOpacity}
              connectDistance={200}
              connectColor="rgba(255,255,255,0.06)"
              seed={404}
              fadeInFrames={1}
            />
          </div>
        )}

        {/* Layer 8: KineticText — "On le construit avec vous." (frame 160) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <KineticText
            text="On le construit avec vous."
            startFrame={160}
            framePersChar={2}
            style={{ fontSize: 48 }}
            fontFamily="'Instrument Serif', serif"
          />
        </div>

        {/* Layer 9: CursorClick (frame 172) */}
        <CursorClick
          startFrame={172}
          targetX={960}
          targetY={540}
          fromX={1600}
          fromY={800}
          travelFrames={15}
        />
      </div>

      {/* Layer 10: Brand reveal — OUTSIDE masterFade so it fades independently */}
      {frame >= 180 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 30,
            pointerEvents: "none",
            opacity: brandOpacity * brandFinalFade,
            transform: `scale(${brandScale})`,
          }}
        >
          <GradientText
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 72,
              lineHeight: 1.2,
            }}
          >
            Challengers Lab
          </GradientText>
        </div>
      )}
    </IsometricScene>
  );
};
