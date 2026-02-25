import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { ParticleField } from "../HeroDiagnostic/components/ParticleField";
import { GrainOverlay } from "./components/GrainOverlay";
import { AmbientGlow } from "./components/AmbientGlow";
import { CircleRing } from "./components/CircleRing";
import { FusedCircleRing } from "./components/FusedCircleRing";
import { LightTracer } from "./components/LightTracer";
import { NodeLabel } from "./components/NodeLabel";
import { FlashWord } from "./components/FlashWord";
import { TransitionEffect } from "./components/TransitionEffect";
import { VennGlow } from "./components/VennGlow";
import {
  BG,
  TIMING,
  CIRCLE1_START_X,
  CIRCLE2_START_X,
  CENTER_X,
  CENTER_Y,
  CIRCLE_RADIUS,
  FUSED_RADIUS,
  VICIOUS,
  METHOD,
  FUSED,
  CIRCLE1_NODES,
  CIRCLE2_NODES,
  FUSED_NODES,
  CIRCLE1_WORDS,
  CIRCLE2_WORDS,
  FUSED_WORDS,
} from "./config";

export const CircleAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  const globalOpacity = interpolate(
    frame,
    [TIMING.fadeIn.start, TIMING.fadeIn.end, TIMING.fadeOut.start, TIMING.fadeOut.end],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Animated circle positions during slide phase
  const c1x = interpolate(
    frame,
    [TIMING.slideStart.start, TIMING.slideEnd.start],
    [CIRCLE1_START_X, CENTER_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const c2x = interpolate(
    frame,
    [TIMING.slideStart.start, TIMING.slideEnd.start],
    [CIRCLE2_START_X, CENTER_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Hide individual circles after fusion
  const preFusion = frame < TIMING.fusionMerge.end;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(20,20,30,1) 0%, rgba(3,3,3,1) 70%)",
          opacity: globalOpacity,
        }}
      />

      {/* Particles */}
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

      {/* Ambient glows */}
      <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
        <AmbientGlow />
      </div>

      {/* === Circle 1 (Vicious — Red) === */}
      {preFusion && (
        <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
          <CircleRing
            cx={c1x}
            cy={CENTER_Y}
            radius={CIRCLE_RADIUS}
            color={VICIOUS.primary}
            drawStart={TIMING.circle1Draw.start}
            drawEnd={TIMING.circle1Draw.end}
            fadeOutStart={TIMING.fadeOut.start}
            fadeOutEnd={TIMING.fadeOut.end}
            disappearStart={TIMING.fusionFlash.start}
            disappearEnd={TIMING.fusionMerge.start}
          />
          <LightTracer
            cx={c1x}
            cy={CENTER_Y}
            radius={CIRCLE_RADIUS}
            color={VICIOUS.primary}
            mode="jerky"
            rotations={3}
            activeStart={TIMING.viciousLoop.start}
            activeEnd={TIMING.viciousLoop.end}
            fadeOutStart={TIMING.fusionFlash.start}
            fadeOutEnd={TIMING.fusionMerge.start}
          />
          {CIRCLE1_NODES.map((node, i) => (
            <NodeLabel
              key={`c1n-${i}`}
              node={node}
              index={i}
              cx={c1x}
              cy={CENTER_Y}
              radius={CIRCLE_RADIUS}
              color={VICIOUS.primary}
              glowColor={VICIOUS.glow}
              appearStart={TIMING.circle1Nodes.start}
              fadeOutStart={TIMING.nodesFadeOut.start}
              fadeOutEnd={TIMING.nodesFadeOut.end}
            />
          ))}
          {CIRCLE1_WORDS.map((word, i) => (
            <FlashWord
              key={`c1w-${i}`}
              text={word.text}
              startFrame={word.startFrame}
              angle={word.angle}
              distance={word.distance}
              cx={c1x}
              cy={CENTER_Y}
              size={word.size}
              rotateZ={word.rotateZ}
              glowColor="rgba(255, 68, 68, 0.6)"
            />
          ))}
        </div>
      )}

      {/* === Circle 2 (Method — Purple) === */}
      {preFusion && (
        <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
          <CircleRing
            cx={c2x}
            cy={CENTER_Y}
            radius={CIRCLE_RADIUS}
            color={METHOD.primary}
            drawStart={TIMING.circle2Draw.start}
            drawEnd={TIMING.circle2Draw.end}
            fadeOutStart={TIMING.fadeOut.start}
            fadeOutEnd={TIMING.fadeOut.end}
            disappearStart={TIMING.fusionFlash.start}
            disappearEnd={TIMING.fusionMerge.start}
          />
          <LightTracer
            cx={c2x}
            cy={CENTER_Y}
            radius={CIRCLE_RADIUS}
            color={METHOD.primary}
            mode="smooth"
            rotations={4}
            activeStart={TIMING.methodLoop.start}
            activeEnd={TIMING.methodLoop.end}
            fadeOutStart={TIMING.fusionFlash.start}
            fadeOutEnd={TIMING.fusionMerge.start}
          />
          {CIRCLE2_NODES.map((node, i) => (
            <NodeLabel
              key={`c2n-${i}`}
              node={node}
              index={i}
              cx={c2x}
              cy={CENTER_Y}
              radius={CIRCLE_RADIUS}
              color={METHOD.primary}
              glowColor={METHOD.glow}
              appearStart={TIMING.circle2Nodes.start}
              fadeOutStart={TIMING.nodesFadeOut.start}
              fadeOutEnd={TIMING.nodesFadeOut.end}
            />
          ))}
          {CIRCLE2_WORDS.map((word, i) => (
            <FlashWord
              key={`c2w-${i}`}
              text={word.text}
              startFrame={word.startFrame}
              angle={word.angle}
              distance={word.distance}
              cx={c2x}
              cy={CENTER_Y}
              size={word.size}
              rotateZ={word.rotateZ}
              glowColor="rgba(123, 94, 255, 0.6)"
            />
          ))}
        </div>
      )}

      {/* === Venn intersection glow === */}
      <VennGlow />

      {/* === Fused Circle (Results — Gradient) === */}
      <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
        <FusedCircleRing />
        <LightTracer
          cx={CENTER_X}
          cy={CENTER_Y}
          radius={FUSED_RADIUS}
          color={FUSED.primary}
          mode="smooth"
          rotations={6}
          activeStart={TIMING.fusedLoop.start}
          activeEnd={TIMING.fusedLoop.end}
          fadeOutStart={TIMING.fadeOut.start}
          fadeOutEnd={TIMING.fadeOut.end}
        />
        {FUSED_NODES.map((node, i) => (
          <NodeLabel
            key={`fn-${i}`}
            node={node}
            index={i}
            cx={CENTER_X}
            cy={CENTER_Y}
            radius={FUSED_RADIUS}
            color={FUSED.primary}
            glowColor={FUSED.glow}
            appearStart={TIMING.fusedNodes.start}
            fadeOutStart={TIMING.fadeOut.start}
            fadeOutEnd={TIMING.fadeOut.end}
          />
        ))}
        {FUSED_WORDS.map((word, i) => (
          <FlashWord
            key={`fw-${i}`}
            text={word.text}
            startFrame={word.startFrame}
            angle={word.angle}
            distance={word.distance}
            cx={CENTER_X}
            cy={CENTER_Y}
            size={word.size}
            rotateZ={word.rotateZ}
            glowColor="rgba(123, 94, 255, 0.5)"
          />
        ))}
      </div>

      {/* Transition effects */}
      <TransitionEffect />

      {/* Film grain */}
      <GrainOverlay opacity={0.035} />
    </AbsoluteFill>
  );
};
