import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { IsometricScene } from "../components/IsometricScene";
import { KineticText } from "../components/KineticText";
import { UIBlock3D } from "../components/UIBlock3D";
import { ParticleField } from "../components/ParticleField";
import { Orb } from "../components/Orb";
import { BLOCKS, PURPLE, gridToPixel } from "../config";
import type { CameraState } from "../types";

export const Act1Mirror: React.FC = () => {
  const frame = useCurrentFrame();

  // --- Camera: slow orbit from 30 to 35 degrees ---
  const orbitDeg = interpolate(frame, [0, 239], [30, 35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const camera: CameraState = {
    orbitDeg,
    perspective: 1200,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  };

  // --- Word-synced effects ---

  // Frame 115: "bossent" revealed — white flash on team blocks
  const teamFlash = interpolate(frame, [115, 120, 125], [0, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Frame 140: "Les deals" starts — reddish tint on dead blocks
  const dealsFlash = interpolate(frame, [140, 145, 150], [0, 0.25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Frame 165-190: "trainent" — dead blocks slide down 20px
  const deadSlideY = interpolate(frame, [165, 190], [0, 20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => {
      // Ease-out cubic for gentle deceleration
      return 1 - Math.pow(1 - t, 3);
    },
  });

  return (
    <IsometricScene camera={camera}>
      {/* Layer 1: Orb background — purple, large, left-center */}
      <Orb
        color={PURPLE}
        size={800}
        x={400}
        y={540}
        delay={0}
        fadeInDuration={40}
      />

      {/* Layer 2: 8 UIBlock3D instances from BLOCKS config */}
      {BLOCKS.map((block, index) => {
        const pos = gridToPixel(block.gridPos.col, block.gridPos.row);
        const isTeam = block.team === "team";
        const isDeals = block.team === "deals";
        const isDeepCol = block.gridPos.col >= 2;

        // Extra translateY for dead blocks at "trainent"
        const extraY = isDeals ? deadSlideY : 0;

        return (
          <div
            key={block.id}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              // Depth-of-field blur for dead blocks in columns 2-3
              filter: isDeals && isDeepCol ? "blur(1px)" : "none",
            }}
          >
            <UIBlock3D
              type={block.type}
              state={isTeam ? "active" : "dead"}
              x={pos.x}
              y={pos.y + extraY}
              delay={index * 3}
            />

            {/* Team block white flash overlay at "bossent" */}
            {isTeam && teamFlash > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: pos.x - 160,
                  top: pos.y - 120,
                  width: 320,
                  height: 240,
                  borderRadius: 12,
                  background: "rgba(255, 255, 255, " + teamFlash + ")",
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Dead block reddish tint at "Les deals" */}
            {isDeals && dealsFlash > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: pos.x - 160,
                  top: pos.y - 120 + extraY,
                  width: 320,
                  height: 240,
                  borderRadius: 12,
                  background: "rgba(255, 68, 68, " + dealsFlash + ")",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        );
      })}

      {/* Layer 3: KineticText — centered, z-index 10 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <KineticText
          text="Vos equipes bossent."
          startFrame={90}
          framePersChar={2}
          style={{
            fontSize: 52,
          }}
          fontFamily="'Instrument Serif', serif"
        />

        <div style={{ height: 40 }} />

        <KineticText
          text="Les deals trainent."
          startFrame={135}
          framePersChar={2}
          style={{
            fontSize: 52,
          }}
          fontFamily="'Instrument Serif', serif"
        />
      </div>

      {/* Layer 4: ParticleField foreground — parallax with camera orbit */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <ParticleField
          count={25}
          color="#FFFFFF"
          speed={0.4}
          opacity={0.2}
          seed={101}
          fadeInFrames={30}
        />
      </div>
    </IsometricScene>
  );
};
