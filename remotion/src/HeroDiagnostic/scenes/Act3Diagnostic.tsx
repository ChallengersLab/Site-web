import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { BlueprintGrid } from "../components/BlueprintGrid";
import { GhostBlock } from "../components/GhostBlock";
import { KineticText } from "../components/KineticText";
import { ParticleField } from "../components/ParticleField";
import { Orb } from "../components/Orb";
import { BLOCKS, BG, gridToPixel } from "../config";

/**
 * Act 3 — Diagnostic: "C'est le systeme qui n'existe pas encore."
 *
 * Flat composition (NO IsometricScene). The 3D world was destroyed in Act 2;
 * we are now in abstract void-space. A blueprint grid draws itself, ghost
 * blocks flicker into placeholder positions, and monospace text names the
 * absence. 180 frames (0-179), scene-local.
 */
export const Act3Diagnostic: React.FC = () => {
  const frame = useCurrentFrame();

  // === Blueprint draw progress (frames 20-60) ===
  const drawProgress = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === Blueprint pulse intensity (frames 100-130, then hold at 1) ===
  const pulseIntensity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === Ghost block visibility (frames 60-100, staggered per block) ===
  const ghostBlocks = BLOCKS.map((block, index) => {
    const staggerStart = 60 + index * 6;
    const staggerEnd = staggerStart + 15;
    const visibility = interpolate(frame, [staggerStart, staggerEnd], [0, 0.2], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const pos = gridToPixel(block.gridPos.col, block.gridPos.row);
    return { block, pos, visibility };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Layer 0: Subtle purple orb at center — always present */}
      <Orb
        color="rgba(123,94,255,0.08)"
        size={400}
        x={960}
        y={540}
        delay={0}
        fadeInDuration={20}
      />

      {/* Layer 1: Residual particles — very slow, low opacity */}
      <ParticleField
        count={12}
        color="#FFFFFF"
        speed={0.1}
        opacity={0.05}
        seed={303}
        fadeInFrames={20}
      />

      {/* Layer 2: Blueprint grid — draws from frame 20, pulses from 100 */}
      <BlueprintGrid
        drawProgress={drawProgress}
        dashed
        pulseIntensity={pulseIntensity}
        frame={frame}
      />

      {/* Layer 3: Ghost blocks — appear from frame 60, staggered */}
      {ghostBlocks.map(({ block, pos, visibility }) =>
        visibility > 0 ? (
          <GhostBlock
            key={block.id}
            type={block.type}
            x={pos.x}
            y={pos.y}
            visibility={visibility}
            flicker
          />
        ) : null,
      )}

      {/* Layer 4: KineticText — monospace blueprint style, from frame 100 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <KineticText
          text="C\u2019est le syst\u00e8me qui n\u2019existe pas encore."
          startFrame={100}
          framePersChar={2}
          blueprint
          style={{ fontSize: 44, maxWidth: 1200 }}
        />
      </div>
    </AbsoluteFill>
  );
};
