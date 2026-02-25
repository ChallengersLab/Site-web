import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { IsometricScene } from "../components/IsometricScene";
import { UIBlock3D } from "../components/UIBlock3D";
import { KineticText } from "../components/KineticText";
import { ShockwaveEffect } from "../components/ShockwaveEffect";
import { Orb } from "../components/Orb";
import { useVortex } from "../components/VortexEffect";
import { getCameraShake } from "../components/CameraShake";
import { BLOCKS, PURPLE, CYAN, gridToPixel } from "../config";
import type { CameraState } from "../types";

const teamBlocks = BLOCKS.filter((b) => b.team === "team");
const dealsBlocks = BLOCKS.filter((b) => b.team === "deals");

export const Act2Rupture: React.FC = () => {
  const frame = useCurrentFrame();

  // =========================================================================
  // Phase boundaries
  // =========================================================================
  const PHASE1_END = 35;
  const WHIP_START = 35;
  const WHIP_END = 45;
  const FLASH_START = 45;
  const FLASH_END = 47;
  const BLACKOUT_START = 47;
  const BLACKOUT_END = 55;
  const PHASE3_START = 55;
  const FADE_OUT_START = 100;

  // =========================================================================
  // Camera state
  // =========================================================================
  let orbitDeg: number;
  let perspective: number;

  if (frame < PHASE1_END) {
    // Phase 1: perspective compresses, orbit continues from Act1's 35 deg
    perspective = interpolate(frame, [0, PHASE1_END], [1200, 800], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    orbitDeg = 35;
  } else if (frame < WHIP_END) {
    // Phase 2a: whip-pan 35 -> 215 in 10 frames
    perspective = 800;
    orbitDeg = interpolate(frame, [WHIP_START, WHIP_END], [35, 215], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (frame < PHASE3_START) {
    // Phase 2b: flash + blackout, camera settling
    perspective = interpolate(frame, [WHIP_END, PHASE3_START], [800, 1200], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    orbitDeg = interpolate(frame, [WHIP_END, PHASE3_START], [215, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else {
    // Phase 3: settled
    perspective = 1200;
    orbitDeg = 0;
  }

  // Camera shake: intense during whip-pan, subtle residual in Phase 3
  const whipShake = getCameraShake(frame, WHIP_START, 15, 20);
  const residualShake = getCameraShake(frame, PHASE3_START, 64, 5);

  const camera: CameraState = {
    orbitDeg,
    perspective,
    scale: 1,
    offsetX: whipShake.offsetX + residualShake.offsetX,
    offsetY: whipShake.offsetY + residualShake.offsetY,
  };

  // =========================================================================
  // Phase 1: Vortex for dead blocks (frames 0-35)
  // =========================================================================
  const vortexProgress = interpolate(frame, [0, PHASE1_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dealsPositions = dealsBlocks.map((b) => {
    const pos = gridToPixel(b.gridPos.col, b.gridPos.row);
    return { x: pos.x, y: pos.y, attraction: 1 };
  });

  const vortexResults = useVortex(dealsPositions, 960, 540, vortexProgress, frame);

  // =========================================================================
  // Phase 3: block fade-in + final fade-out
  // =========================================================================
  const teamFadeIn = interpolate(frame, [70, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalFadeOut = interpolate(frame, [FADE_OUT_START, 119], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // Visibility flags
  // =========================================================================
  const isPhase1 = frame < PHASE1_END;
  const isWhipPan = frame >= WHIP_START && frame < WHIP_END;
  const isFlash = frame >= FLASH_START && frame < FLASH_END;
  const isBlackout = frame >= BLACKOUT_START && frame < BLACKOUT_END;
  const isPhase3 = frame >= PHASE3_START;
  const hideBlocks = isWhipPan || isFlash || isBlackout;

  // =========================================================================
  // Orb opacity
  // =========================================================================
  const orbPhase1Opacity = isPhase1
    ? 0.3 + Math.sin(frame * 0.12) * 0.1
    : 0;
  const orbBlackoutOpacity = isBlackout ? 0.03 : 0;
  const orbPhase3Opacity = isPhase3
    ? (0.25 + Math.sin(frame * 0.1) * 0.1) * finalFadeOut
    : 0;

  // =========================================================================
  // White flash
  // =========================================================================
  const flashOpacity = isFlash
    ? interpolate(frame, [FLASH_START, FLASH_START + 1, FLASH_END], [0, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // =========================================================================
  // Render
  // =========================================================================
  return (
    <IsometricScene camera={camera}>
      {/* ----------------------------------------------------------------- */}
      {/* Phase 1: Dead blocks sucked into vortex                           */}
      {/* ----------------------------------------------------------------- */}
      {isPhase1 &&
        dealsBlocks.map((block, i) => {
          const v = vortexResults[i];
          return (
            <UIBlock3D
              key={block.id}
              type={block.type}
              state="dead"
              x={v.x}
              y={v.y}
              delay={0}
              opacity={v.opacity}
              scale={v.scale}
              transform={`rotate(${v.rotation}deg) scale(${v.scale})`}
            />
          );
        })}

      {/* Phase 1: Active blocks (team) — float gently with halos */}
      {isPhase1 &&
        teamBlocks.map((block, i) => {
          const pos = gridToPixel(block.gridPos.col, block.gridPos.row);
          return (
            <UIBlock3D
              key={block.id}
              type={block.type}
              state="active"
              x={pos.x}
              y={pos.y}
              delay={0}
              halo
              haloColor={i % 2 === 0 ? PURPLE : CYAN}
            />
          );
        })}

      {/* Phase 1: Pulsing purple orb at center */}
      {isPhase1 && (
        <Orb
          color={PURPLE}
          size={500}
          x={960}
          y={540}
          delay={0}
          fadeInDuration={10}
        />
      )}
      {/* Override orb opacity with breathing */}
      {isPhase1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: orbPhase1Opacity,
          }}
        />
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Phase 2: White flash overlay                                      */}
      {/* ----------------------------------------------------------------- */}
      {flashOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#FFFFFF",
            opacity: flashOpacity,
            zIndex: 100,
          }}
        />
      )}

      {/* Phase 2: Blackout — faint orb glow */}
      {isBlackout && (
        <div style={{ position: "absolute", inset: 0, opacity: orbBlackoutOpacity }}>
          <Orb
            color={PURPLE}
            size={400}
            x={960}
            y={540}
            delay={0}
            fadeInDuration={1}
          />
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Phase 3: Text + Resolution                                        */}
      {/* ----------------------------------------------------------------- */}

      {/* Shockwave at text start (frame 60) */}
      {isPhase3 && (
        <ShockwaveEffect startFrame={60} color={PURPLE} durationFrames={15} />
      )}

      {/* Shockwave at "pas eux" (frame 85) */}
      {isPhase3 && (
        <ShockwaveEffect startFrame={85} color={CYAN} durationFrames={15} />
      )}

      {/* Kinetic text: pivot line */}
      {isPhase3 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            opacity: finalFadeOut,
          }}
        >
          <KineticText
            text="Le probleme, ce n'est pas eux."
            startFrame={60}
            framePersChar={2}
            style={{ fontSize: 60, maxWidth: 1200 }}
          />
        </div>
      )}

      {/* Phase 3: Active blocks fade back in */}
      {isPhase3 &&
        !hideBlocks &&
        teamBlocks.map((block, i) => {
          const pos = gridToPixel(block.gridPos.col, block.gridPos.row);
          const blockOpacity = teamFadeIn * finalFadeOut;
          return (
            <UIBlock3D
              key={block.id}
              type={block.type}
              state="active"
              x={pos.x}
              y={pos.y}
              delay={0}
              opacity={blockOpacity}
              halo
              haloColor={i % 2 === 0 ? PURPLE : CYAN}
            />
          );
        })}

      {/* Phase 3: Orb glow at center */}
      {isPhase3 && (
        <div style={{ position: "absolute", inset: 0, opacity: orbPhase3Opacity, pointerEvents: "none" }}>
          <Orb
            color={PURPLE}
            size={600}
            x={960}
            y={540}
            delay={0}
            fadeInDuration={1}
          />
        </div>
      )}
    </IsometricScene>
  );
};
