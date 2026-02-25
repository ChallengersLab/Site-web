import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { ParticleField } from "../HeroDiagnostic/components/ParticleField";
import { GrainOverlay } from "./components/GrainOverlay";
import { AmbientGlow } from "./components/AmbientGlow";
import { CircleRing } from "./components/CircleRing";
import { LightTracer } from "./components/LightTracer";
import { NodeLabel } from "./components/NodeLabel";
import { FlashWord } from "./components/FlashWord";
import { TransitionEffect } from "./components/TransitionEffect";
import {
  BG,
  NODES,
  VICIOUS_WORDS,
  VIRTUOUS_WORDS,
  TIMING,
} from "./config";

export const CircleAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  const globalOpacity = interpolate(
    frame,
    [TIMING.fadeIn.start, TIMING.fadeIn.end, TIMING.fadeOut.start, TIMING.fadeOut.end],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Layer 0: Background radial gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(20,20,30,1) 0%, rgba(8,8,12,1) 70%)",
          opacity: globalOpacity,
        }}
      />

      {/* Layer 1: Atmosphere — particles */}
      <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
        <ParticleField
          count={25}
          color="#FFFFFF"
          speed={0.15}
          opacity={0.06}
          seed={777}
          fadeInFrames={20}
        />
      </div>

      {/* Layer 1b: Ambient glow */}
      <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
        <AmbientGlow />
      </div>

      {/* Layer 2: Circle ring */}
      <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
        <CircleRing />
      </div>

      {/* Layer 2b: Light tracer arc */}
      <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
        <LightTracer />
      </div>

      {/* Layer 2c: Node labels */}
      <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
        {NODES.map((node, i) => (
          <NodeLabel key={i} node={node} index={i} />
        ))}
      </div>

      {/* Layer 3: Flash words — vicious */}
      {VICIOUS_WORDS.map((word, i) => (
        <FlashWord
          key={`v-${i}`}
          text={word.text}
          startFrame={word.startFrame}
          x={word.x}
          y={word.y}
          size={word.size}
          rotateZ={word.rotateZ}
          glowColor="rgba(255, 68, 68, 0.6)"
        />
      ))}

      {/* Layer 3: Flash words — virtuous */}
      {VIRTUOUS_WORDS.map((word, i) => (
        <FlashWord
          key={`p-${i}`}
          text={word.text}
          startFrame={word.startFrame}
          x={word.x}
          y={word.y}
          size={word.size}
          rotateZ={word.rotateZ}
          glowColor="rgba(0, 245, 255, 0.6)"
        />
      ))}

      {/* Layer 4: Transition effects */}
      <TransitionEffect />

      {/* Layer 5: Film grain overlay */}
      <GrainOverlay opacity={0.035} />
    </AbsoluteFill>
  );
};
