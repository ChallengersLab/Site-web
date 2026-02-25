# Two-Circle Fusion Animation — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the single-circle vicious/virtuous animation with a two-circle narrative: client problem (red) + CL method (purple) → fusion (purple-cyan gradient) → client benefits.

**Architecture:** Rewrite config.ts with new timeline, two circle centers, and three color palettes. Refactor all components to accept dynamic center coordinates. Add VennGlow overlay component. Flash words positioned by angle+distance from circle center instead of screen %.

**Tech Stack:** Remotion, React, TypeScript, SVG

**Design doc:** `docs/plans/2026-02-25-two-circle-fusion-design.md`

---

### Task 1: Rewrite config.ts — dimensions, colors, timing

**Files:**
- Modify: `remotion/src/CircleAnimation/config.ts` (full rewrite)

**Step 1: Replace entire config.ts**

```typescript
// remotion/src/CircleAnimation/config.ts

// === Dimensions ===
export const W = 1920;
export const H = 1080;
export const CENTER_X = W / 2; // 960 — fusion center
export const CENTER_Y = H / 2; // 540

// Two circles start positions
export const CIRCLE1_START_X = 620;
export const CIRCLE2_START_X = 1300;
export const CIRCLE_RADIUS = 200; // reduced from 280 to fit side-by-side
export const FUSED_RADIUS = 240;

// === Timing (30fps, 540 frames = 18s) ===
export const FPS = 30;
export const TOTAL_FRAMES = 540;

export const TIMING = {
  // Phase 1: Vicious circle (0-5.5s)
  fadeIn: { start: 0, end: 15 },
  circle1Draw: { start: 15, end: 35 },
  circle1Nodes: { start: 30, end: 50 },
  circle1Words: { start: 55, end: 155 },
  viciousLoop: { start: 45, end: 165 },

  // Phase 2: Method circle enters (5.5-9s)
  circle2Draw: { start: 165, end: 185 },
  circle2Nodes: { start: 180, end: 200 },
  circle2Words: { start: 200, end: 260 },
  methodLoop: { start: 185, end: 270 },

  // Phase 3: Rapprochement (9-12s)
  slideStart: { start: 270, end: 270 },
  slideEnd: { start: 360, end: 360 },
  vennGlow: { start: 310, end: 360 },
  nodesFadeOut: { start: 270, end: 330 },

  // Phase 4: Fusion (12-13.3s)
  fusionPulse: { start: 360, end: 375 },
  fusionFlash: { start: 365, end: 378 },
  fusionMerge: { start: 370, end: 400 },

  // Phase 5: Benefits (13.3-17s)
  fusedNodes: { start: 400, end: 420 },
  fusedWords: { start: 420, end: 500 },
  fusedLoop: { start: 400, end: 510 },

  // Phase 6: Outro (17-18s)
  fadeOut: { start: 510, end: 540 },
} as const;

// === Colors (aligned with site theme) ===
export const BG = "#030303";

export const VICIOUS = {
  primary: "#FF4444",
  secondary: "#FF6B35",
  glow: "rgba(255, 68, 68, 0.4)",
  glowSoft: "rgba(255, 68, 68, 0.15)",
} as const;

export const METHOD = {
  primary: "#7B5EFF",
  secondary: "#6344e0",
  glow: "rgba(123, 94, 255, 0.4)",
  glowSoft: "rgba(123, 94, 255, 0.15)",
} as const;

export const FUSED = {
  primary: "#7B5EFF",
  secondary: "#00F5FF",
  glow: "rgba(123, 94, 255, 0.4)",
  glowSoft: "rgba(0, 245, 255, 0.15)",
  gradient: "url(#fusedGradient)",
} as const;

// === Node configs ===
export interface NodeConfig {
  angle: number;
  label: string;
}

export const CIRCLE1_NODES: NodeConfig[] = [
  { angle: 0, label: "Tâches manuelles" },
  { angle: 150, label: "Données en silo" },
  { angle: 210, label: "Croissance bloquée" },
];

export const CIRCLE2_NODES: NodeConfig[] = [
  { angle: 0, label: "Audit & Diagnostic" },
  { angle: 150, label: "Stratégie sur-mesure" },
  { angle: 210, label: "Automatisation IA" },
];

export const FUSED_NODES: NodeConfig[] = [
  { angle: 0, label: "Visibilité totale" },
  { angle: 90, label: "Équipe alignée" },
  { angle: 180, label: "Process qui scale" },
  { angle: 270, label: "Croissance prévisible" },
];

// === Flash words — positioned by angle (deg) + distance from center ===
export interface FlashWordConfig {
  text: string;
  startFrame: number;
  angle: number;       // degrees from center (0=top, clockwise)
  distance: number;    // px from circle center
  size: number;
  rotateZ: number;
}

export const CIRCLE1_WORDS: FlashWordConfig[] = [
  { text: "Encore un tableur", startFrame: 55, angle: 30, distance: 340, size: 44, rotateZ: -2 },
  { text: "Relance manuelle", startFrame: 80, angle: 330, distance: 350, size: 40, rotateZ: 1.5 },
  { text: "Pas de suivi", startFrame: 105, angle: 120, distance: 330, size: 48, rotateZ: -1 },
  { text: "Aucune visibilité", startFrame: 130, angle: 240, distance: 345, size: 42, rotateZ: 2 },
];

export const CIRCLE2_WORDS: FlashWordConfig[] = [
  { text: "CRM optimisé", startFrame: 200, angle: 30, distance: 330, size: 44, rotateZ: -1.5 },
  { text: "Playbook sales", startFrame: 220, angle: 330, distance: 340, size: 40, rotateZ: 2 },
  { text: "Scoring IA", startFrame: 238, angle: 120, distance: 335, size: 48, rotateZ: -1 },
  { text: "Process scalable", startFrame: 252, angle: 240, distance: 345, size: 42, rotateZ: 1.5 },
];

export const FUSED_WORDS: FlashWordConfig[] = [
  { text: "Pipeline structuré", startFrame: 425, angle: 45, distance: 380, size: 44, rotateZ: -1 },
  { text: "Décisions data-driven", startFrame: 450, angle: 135, distance: 370, size: 38, rotateZ: 1.5 },
  { text: "Revenue prévisible", startFrame: 472, angle: 225, distance: 375, size: 44, rotateZ: -2 },
  { text: "Temps retrouvé", startFrame: 492, angle: 315, distance: 365, size: 42, rotateZ: 1 },
];

// === Utility: convert angle + radius to x/y from arbitrary center ===
export function angleToXY(
  angleDeg: number,
  radius: number,
  cx: number = CENTER_X,
  cy: number = CENTER_Y
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + Math.cos(rad) * radius,
    y: cy + Math.sin(rad) * radius,
  };
}
```

**Step 2: Verify file saved correctly**

Run: `head -5 remotion/src/CircleAnimation/config.ts`
Expected: Shows the new comment header

**Step 3: Commit**

```bash
git add remotion/src/CircleAnimation/config.ts
git commit -m "refactor(animation): rewrite config for two-circle fusion layout"
```

---

### Task 2: Refactor CircleRing to accept dynamic center and color

**Files:**
- Modify: `remotion/src/CircleAnimation/components/CircleRing.tsx` (full rewrite)

**Step 1: Rewrite CircleRing.tsx**

The component now accepts `cx`, `cy`, `radius`, `color`, and timing props so it can be reused for both circles and the fused circle.

```tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface CircleRingProps {
  cx: number;
  cy: number;
  radius: number;
  color: string;
  drawStart: number;
  drawEnd: number;
  fadeOutStart: number;
  fadeOutEnd: number;
  /** Optional: if set, ring fades out between these frames (for pre-fusion disappear) */
  disappearStart?: number;
  disappearEnd?: number;
}

export const CircleRing: React.FC<CircleRingProps> = ({
  cx,
  cy,
  radius,
  color,
  drawStart,
  drawEnd,
  fadeOutStart,
  fadeOutEnd,
  disappearStart,
  disappearEnd,
}) => {
  const frame = useCurrentFrame();
  const circumference = 2 * Math.PI * radius;

  // Draw-in
  const drawProgress = interpolate(
    frame,
    [drawStart, drawEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const dashOffset = circumference * (1 - drawProgress);

  // Opacity
  let ringOpacity: number;
  if (disappearStart !== undefined && disappearEnd !== undefined) {
    ringOpacity = interpolate(
      frame,
      [drawStart - 5, drawStart, disappearStart, disappearEnd, fadeOutStart, fadeOutEnd],
      [0, 0.6, 0.6, 0, 0, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  } else {
    ringOpacity = interpolate(
      frame,
      [drawStart - 5, drawStart, fadeOutStart, fadeOutEnd],
      [0, 0.6, 0.6, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  }

  if (ringOpacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: ringOpacity,
      }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        {/* Outer glow */}
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ filter: "blur(20px)" }}
          opacity={0.5}
        />
        {/* Mid glow */}
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ filter: "blur(8px)" }}
          opacity={0.7}
        />
        {/* Core */}
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none" stroke={color} strokeWidth={2}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add remotion/src/CircleAnimation/components/CircleRing.tsx
git commit -m "refactor(animation): CircleRing accepts dynamic center, radius, color"
```

---

### Task 3: Refactor NodeLabel to accept dynamic center and color

**Files:**
- Modify: `remotion/src/CircleAnimation/components/NodeLabel.tsx` (full rewrite)

**Step 1: Rewrite NodeLabel.tsx**

```tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CIRCLE_RADIUS, angleToXY } from "../config";
import type { NodeConfig } from "../config";

interface NodeLabelProps {
  node: NodeConfig;
  index: number;
  cx: number;
  cy: number;
  radius: number;
  color: string;
  glowColor: string;
  appearStart: number;
  fadeOutStart: number;
  fadeOutEnd: number;
}

export const NodeLabel: React.FC<NodeLabelProps> = ({
  node,
  index,
  cx,
  cy,
  radius,
  color,
  glowColor,
  appearStart,
  fadeOutStart,
  fadeOutEnd,
}) => {
  const frame = useCurrentFrame();
  const pos = angleToXY(node.angle, radius, cx, cy);

  const staggerStart = appearStart + index * 4;
  const opacity = interpolate(
    frame,
    [staggerStart, staggerStart + 10, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const capsuleWidth = 220;
  const capsuleHeight = 48;

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: pos.x - capsuleWidth / 2,
        top: pos.y - capsuleHeight / 2,
        width: capsuleWidth,
        height: capsuleHeight,
        borderRadius: capsuleHeight / 2,
        background: "rgba(3, 3, 3, 0.8)",
        border: `1px solid ${color}`,
        boxShadow: `0 0 20px ${glowColor}, 0 0 60px ${glowColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        pointerEvents: "none",
        backdropFilter: "blur(4px)",
      }}
    >
      <span
        style={{
          color: "#e8e8e8",
          fontSize: 18,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          textAlign: "center",
          lineHeight: 1.2,
          padding: "0 14px",
          whiteSpace: "nowrap",
        }}
      >
        {node.label}
      </span>
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add remotion/src/CircleAnimation/components/NodeLabel.tsx
git commit -m "refactor(animation): NodeLabel accepts dynamic center and color props"
```

---

### Task 4: Refactor FlashWord to use angle+distance positioning

**Files:**
- Modify: `remotion/src/CircleAnimation/components/FlashWord.tsx`

**Step 1: Rewrite FlashWord.tsx**

```tsx
import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { FPS, angleToXY } from "../config";

interface FlashWordProps {
  text: string;
  startFrame: number;
  angle: number;
  distance: number;
  cx: number;
  cy: number;
  size: number;
  rotateZ: number;
  glowColor: string;
}

const VISIBLE_DURATION = 20;
const FADE_OUT_DURATION = 12;

export const FlashWord: React.FC<FlashWordProps> = ({
  text,
  startFrame,
  angle,
  distance,
  cx,
  cy,
  size,
  rotateZ,
  glowColor,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame > VISIBLE_DURATION + FADE_OUT_DURATION + 5) {
    return null;
  }

  const scaleSpring = spring({
    frame: localFrame,
    fps: FPS,
    config: { damping: 15, stiffness: 120, mass: 0.8 },
  });
  const scale = interpolate(scaleSpring, [0, 1], [0.6, 1]);

  const rotateY = interpolate(
    localFrame, [0, 10], [15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const fadeIn = interpolate(
    localFrame, [0, 6], [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const fadeOut = interpolate(
    localFrame, [VISIBLE_DURATION, VISIBLE_DURATION + FADE_OUT_DURATION], [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = fadeIn * fadeOut;

  if (opacity <= 0.01) return null;

  // Position by angle + distance from circle center
  const pos = angleToXY(angle, distance, cx, cy);

  return (
    <div
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        transformStyle: "preserve-3d",
        perspective: 800,
        opacity,
        pointerEvents: "none",
        zIndex: 15,
      }}
    >
      <span
        style={{
          color: "#FFFFFF",
          fontSize: size,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          whiteSpace: "nowrap",
          textShadow: `0 0 30px ${glowColor}, 0 0 60px ${glowColor}, 0 0 100px ${glowColor}`,
          letterSpacing: "-0.02em",
        }}
      >
        {text}
      </span>
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add remotion/src/CircleAnimation/components/FlashWord.tsx
git commit -m "refactor(animation): FlashWord uses angle+distance positioning from center"
```

---

### Task 5: Refactor LightTracer to accept dynamic center and color

**Files:**
- Modify: `remotion/src/CircleAnimation/components/LightTracer.tsx` (full rewrite)

**Step 1: Rewrite LightTracer.tsx**

```tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface LightTracerProps {
  cx: number;
  cy: number;
  radius: number;
  color: string;
  /** Phase start/end for this tracer's active window */
  activeStart: number;
  activeEnd: number;
  /** "jerky" for vicious circle, "smooth" for method/fused */
  mode: "jerky" | "smooth";
  /** Number of full rotations during active window */
  rotations: number;
  fadeOutStart: number;
  fadeOutEnd: number;
}

const ARC_SWEEP = 60;

export const LightTracer: React.FC<LightTracerProps> = ({
  cx,
  cy,
  radius,
  color,
  activeStart,
  activeEnd,
  mode,
  rotations,
  fadeOutStart,
  fadeOutEnd,
}) => {
  const frame = useCurrentFrame();

  if (frame < activeStart || frame >= fadeOutEnd) return null;

  const localFrame = frame - activeStart;
  const totalFrames = activeEnd - activeStart;
  const rawProgress = Math.min(localFrame / totalFrames, 1);

  let angleDeg: number;
  let glowIntensity: number;

  if (mode === "jerky") {
    const quarterProgress = (rawProgress * rotations) % 1;
    const jerky = quarterProgress < 0.5
      ? 2 * quarterProgress * quarterProgress
      : 1 - Math.pow(-2 * quarterProgress + 2, 2) / 2;
    const fullRotations = Math.floor(rawProgress * rotations);
    angleDeg = (fullRotations + jerky) * 360;
    glowIntensity = 0.8;
  } else {
    // Smooth accelerating
    const eased = rawProgress * rawProgress;
    angleDeg = eased * rotations * 360;
    glowIntensity = interpolate(rawProgress, [0, 0.3, 1], [0.4, 0.9, 0.9], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });
  }

  const startAngle = angleDeg - ARC_SWEEP / 2;
  const endAngle = angleDeg + ARC_SWEEP / 2;
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;

  const x1 = cx + radius * Math.cos(toRad(startAngle));
  const y1 = cy + radius * Math.sin(toRad(startAngle));
  const x2 = cx + radius * Math.cos(toRad(endAngle));
  const y2 = cy + radius * Math.sin(toRad(endAngle));

  const largeArc = ARC_SWEEP > 180 ? 1 : 0;
  const arcPath = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;

  const fadeOpacity = interpolate(
    frame,
    [fadeOutStart, fadeOutEnd],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: fadeOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <path d={arcPath} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round"
          style={{ filter: "blur(16px)" }} opacity={glowIntensity * 0.6} />
        <path d={arcPath} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round"
          style={{ filter: "blur(6px)" }} opacity={glowIntensity * 0.8} />
        <path d={arcPath} fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round"
          opacity={glowIntensity} />
      </svg>
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add remotion/src/CircleAnimation/components/LightTracer.tsx
git commit -m "refactor(animation): LightTracer accepts dynamic center, mode, rotations"
```

---

### Task 6: Rewrite AmbientGlow for three phases

**Files:**
- Modify: `remotion/src/CircleAnimation/components/AmbientGlow.tsx` (full rewrite)

**Step 1: Rewrite AmbientGlow.tsx**

```tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CIRCLE1_START_X, CIRCLE2_START_X, CENTER_X, CENTER_Y, TIMING } from "../config";

export const AmbientGlow: React.FC = () => {
  const frame = useCurrentFrame();

  // Red glow follows circle 1
  const redOpacity = interpolate(
    frame,
    [TIMING.fadeIn.end, TIMING.circle1Draw.start, TIMING.slideStart.start, TIMING.fusionFlash.start],
    [0, 0.2, 0.2, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Purple glow follows circle 2
  const purpleOpacity = interpolate(
    frame,
    [TIMING.circle2Draw.start, TIMING.circle2Draw.end, TIMING.slideStart.start, TIMING.fusionFlash.start],
    [0, 0.2, 0.2, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Fused glow (purple-cyan) at center
  const fusedOpacity = interpolate(
    frame,
    [TIMING.fusionMerge.start, TIMING.fusionMerge.end, TIMING.fadeOut.start, TIMING.fadeOut.end],
    [0, 0.25, 0.25, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Animated center X for sliding circles
  const circle1X = interpolate(
    frame,
    [TIMING.slideStart.start, TIMING.slideEnd.start],
    [CIRCLE1_START_X, CENTER_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const circle2X = interpolate(
    frame,
    [TIMING.slideStart.start, TIMING.slideEnd.start],
    [CIRCLE2_START_X, CENTER_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const pulse = Math.sin(frame * 0.12) * 0.05;

  return (
    <>
      {redOpacity > 0 && (
        <div style={{
          position: "absolute",
          left: circle1X - 350, top: CENTER_Y - 350,
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,68,68,0.5) 0%, rgba(255,68,68,0.15) 40%, transparent 70%)",
          filter: "blur(80px)",
          opacity: Math.max(0, redOpacity + pulse),
          pointerEvents: "none",
        }} />
      )}
      {purpleOpacity > 0 && (
        <div style={{
          position: "absolute",
          left: circle2X - 350, top: CENTER_Y - 350,
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,94,255,0.5) 0%, rgba(123,94,255,0.15) 40%, transparent 70%)",
          filter: "blur(80px)",
          opacity: Math.max(0, purpleOpacity + pulse),
          pointerEvents: "none",
        }} />
      )}
      {fusedOpacity > 0 && (
        <div style={{
          position: "absolute",
          left: CENTER_X - 400, top: CENTER_Y - 400,
          width: 800, height: 800, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,94,255,0.5) 0%, rgba(0,245,255,0.2) 40%, transparent 70%)",
          filter: "blur(100px)",
          opacity: Math.max(0, fusedOpacity + pulse),
          pointerEvents: "none",
        }} />
      )}
    </>
  );
};
```

**Step 2: Commit**

```bash
git add remotion/src/CircleAnimation/components/AmbientGlow.tsx
git commit -m "refactor(animation): AmbientGlow tracks two circles + fused glow"
```

---

### Task 7: Rewrite TransitionEffect for fusion (no blackout)

**Files:**
- Modify: `remotion/src/CircleAnimation/components/TransitionEffect.tsx` (full rewrite)

**Step 1: Rewrite TransitionEffect.tsx**

```tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { TIMING, METHOD, FUSED } from "../config";

export const TransitionEffect: React.FC = () => {
  const frame = useCurrentFrame();

  // Fusion pulse — radial energy burst
  const pulseGlow = interpolate(
    frame,
    [TIMING.fusionPulse.start, TIMING.fusionPulse.start + 5, TIMING.fusionPulse.end],
    [0, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // White flash
  const flashOpacity = interpolate(
    frame,
    [TIMING.fusionFlash.start, TIMING.fusionFlash.start + 3, TIMING.fusionFlash.end],
    [0, 0.7, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const showPulse = pulseGlow > 0;
  const showFlash = flashOpacity > 0;

  if (!showPulse && !showFlash) return null;

  return (
    <>
      {showPulse && (
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${METHOD.glow} 0%, ${FUSED.glowSoft} 40%, transparent 70%)`,
          opacity: pulseGlow,
          pointerEvents: "none",
          zIndex: 30,
        }} />
      )}
      {showFlash && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "#FFFFFF",
          opacity: flashOpacity,
          pointerEvents: "none",
          zIndex: 40,
        }} />
      )}
    </>
  );
};
```

**Step 2: Commit**

```bash
git add remotion/src/CircleAnimation/components/TransitionEffect.tsx
git commit -m "refactor(animation): TransitionEffect uses fusion pulse+flash, no blackout"
```

---

### Task 8: Create VennGlow component

**Files:**
- Create: `remotion/src/CircleAnimation/components/VennGlow.tsx`

**Step 1: Create VennGlow.tsx**

This component renders an additive glow in the overlapping zone of the two circles as they slide together.

```tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import {
  CENTER_X, CENTER_Y, CIRCLE1_START_X, CIRCLE2_START_X,
  CIRCLE_RADIUS, TIMING,
} from "../config";

export const VennGlow: React.FC = () => {
  const frame = useCurrentFrame();

  const glowOpacity = interpolate(
    frame,
    [TIMING.vennGlow.start, TIMING.vennGlow.start + 15, TIMING.vennGlow.end - 5, TIMING.vennGlow.end],
    [0, 0.6, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (glowOpacity <= 0) return null;

  // Animated circle centers
  const c1x = interpolate(
    frame,
    [TIMING.slideStart.start, TIMING.slideEnd.start],
    [CIRCLE1_START_X, CENTER_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const c2x = interpolate(
    frame,
    [TIMING.slideStart.start, TIMING.slideEnd.start],
    [CIRCLE2_START_X, CENTER_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Midpoint between the two circles
  const midX = (c1x + c2x) / 2;

  // Distance between centers — glow size grows as they get closer
  const dist = c2x - c1x;
  const overlap = Math.max(0, 2 * CIRCLE_RADIUS - dist);
  if (overlap <= 0) return null;

  const glowSize = overlap * 1.5;

  return (
    <div
      style={{
        position: "absolute",
        left: midX - glowSize / 2,
        top: CENTER_Y - glowSize / 2,
        width: glowSize,
        height: glowSize,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(123,94,255,0.3) 30%, rgba(0,245,255,0.15) 60%, transparent 85%)",
        filter: "blur(30px)",
        opacity: glowOpacity,
        mixBlendMode: "screen",
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
};
```

**Step 2: Commit**

```bash
git add remotion/src/CircleAnimation/components/VennGlow.tsx
git commit -m "feat(animation): add VennGlow component for circle intersection effect"
```

---

### Task 9: Create FusedCircleRing component with gradient stroke

**Files:**
- Create: `remotion/src/CircleAnimation/components/FusedCircleRing.tsx`

**Step 1: Create FusedCircleRing.tsx**

The fused circle uses an SVG gradient stroke (purple→cyan) and has a scale-in entrance animation.

```tsx
import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { CENTER_X, CENTER_Y, FUSED_RADIUS, FPS, TIMING } from "../config";

export const FusedCircleRing: React.FC = () => {
  const frame = useCurrentFrame();
  const circumference = 2 * Math.PI * FUSED_RADIUS;

  // Appears during fusion merge
  const opacity = interpolate(
    frame,
    [TIMING.fusionMerge.start, TIMING.fusionMerge.end, TIMING.fadeOut.start, TIMING.fadeOut.end],
    [0, 0.8, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (opacity <= 0) return null;

  // Scale spring entrance
  const localFrame = Math.max(0, frame - TIMING.fusionMerge.start);
  const scaleSpring = spring({
    frame: localFrame,
    fps: FPS,
    config: { damping: 12, stiffness: 80, mass: 1.2 },
  });
  const scale = interpolate(scaleSpring, [0, 1], [0.3, 1]);

  // Gentle breathing pulse after settling
  const breathe = frame > TIMING.fusionMerge.end
    ? Math.sin((frame - TIMING.fusionMerge.end) * 0.06) * 0.02
    : 0;

  // Draw-in animation
  const drawProgress = interpolate(
    frame,
    [TIMING.fusionMerge.start, TIMING.fusionMerge.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const dashOffset = circumference * (1 - drawProgress);

  return (
    <div style={{
      position: "absolute", inset: 0,
      pointerEvents: "none",
      opacity,
    }}>
      <svg
        width="1920" height="1080" viewBox="0 0 1920 1080"
        style={{
          position: "absolute", inset: 0,
          transform: `scale(${scale + breathe})`,
          transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
        }}
      >
        <defs>
          <linearGradient id="fusedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B5EFF" />
            <stop offset="100%" stopColor="#00F5FF" />
          </linearGradient>
        </defs>
        {/* Outer glow */}
        <circle
          cx={CENTER_X} cy={CENTER_Y} r={FUSED_RADIUS}
          fill="none" stroke="url(#fusedGradient)" strokeWidth={8}
          strokeDasharray={`${circumference}`} strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ filter: "blur(25px)" }} opacity={0.5}
        />
        {/* Mid glow */}
        <circle
          cx={CENTER_X} cy={CENTER_Y} r={FUSED_RADIUS}
          fill="none" stroke="url(#fusedGradient)" strokeWidth={5}
          strokeDasharray={`${circumference}`} strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ filter: "blur(10px)" }} opacity={0.7}
        />
        {/* Core */}
        <circle
          cx={CENTER_X} cy={CENTER_Y} r={FUSED_RADIUS}
          fill="none" stroke="url(#fusedGradient)" strokeWidth={2.5}
          strokeDasharray={`${circumference}`} strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add remotion/src/CircleAnimation/components/FusedCircleRing.tsx
git commit -m "feat(animation): add FusedCircleRing with gradient stroke and spring entrance"
```

---

### Task 10: Rewrite main index.tsx — orchestrate all layers

**Files:**
- Modify: `remotion/src/CircleAnimation/index.tsx` (full rewrite)

**Step 1: Rewrite index.tsx**

This is the main composition that orchestrates all layers with animated circle positions.

```tsx
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
  BG, TIMING,
  CIRCLE1_START_X, CIRCLE2_START_X, CENTER_X, CENTER_Y,
  CIRCLE_RADIUS, FUSED_RADIUS,
  VICIOUS, METHOD, FUSED,
  CIRCLE1_NODES, CIRCLE2_NODES, FUSED_NODES,
  CIRCLE1_WORDS, CIRCLE2_WORDS, FUSED_WORDS,
} from "./config";

export const CircleAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  const globalOpacity = interpolate(
    frame,
    [TIMING.fadeIn.start, TIMING.fadeIn.end, TIMING.fadeOut.start, TIMING.fadeOut.end],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Animated circle positions during slide phase
  const c1x = interpolate(
    frame,
    [TIMING.slideStart.start, TIMING.slideEnd.start],
    [CIRCLE1_START_X, CENTER_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const c2x = interpolate(
    frame,
    [TIMING.slideStart.start, TIMING.slideEnd.start],
    [CIRCLE2_START_X, CENTER_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Hide individual circles after fusion
  const preFusion = frame < TIMING.fusionMerge.end;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Background gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, rgba(20,20,30,1) 0%, rgba(3,3,3,1) 70%)",
        opacity: globalOpacity,
      }} />

      {/* Particles */}
      <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
        <ParticleField count={25} color="#FFFFFF" speed={0.15} opacity={0.06} seed={777} fadeInFrames={20} />
      </div>

      {/* Ambient glows */}
      <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
        <AmbientGlow />
      </div>

      {/* === Circle 1 (Vicious — Red) === */}
      {preFusion && (
        <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
          <CircleRing
            cx={c1x} cy={CENTER_Y} radius={CIRCLE_RADIUS}
            color={VICIOUS.primary}
            drawStart={TIMING.circle1Draw.start} drawEnd={TIMING.circle1Draw.end}
            fadeOutStart={TIMING.fadeOut.start} fadeOutEnd={TIMING.fadeOut.end}
            disappearStart={TIMING.fusionFlash.start} disappearEnd={TIMING.fusionMerge.start}
          />
          <LightTracer
            cx={c1x} cy={CENTER_Y} radius={CIRCLE_RADIUS}
            color={VICIOUS.primary} mode="jerky" rotations={3}
            activeStart={TIMING.viciousLoop.start} activeEnd={TIMING.viciousLoop.end}
            fadeOutStart={TIMING.fusionFlash.start} fadeOutEnd={TIMING.fusionMerge.start}
          />
          {CIRCLE1_NODES.map((node, i) => (
            <NodeLabel key={`c1n-${i}`} node={node} index={i}
              cx={c1x} cy={CENTER_Y} radius={CIRCLE_RADIUS}
              color={VICIOUS.primary} glowColor={VICIOUS.glow}
              appearStart={TIMING.circle1Nodes.start}
              fadeOutStart={TIMING.nodesFadeOut.start} fadeOutEnd={TIMING.nodesFadeOut.end}
            />
          ))}
          {CIRCLE1_WORDS.map((word, i) => (
            <FlashWord key={`c1w-${i}`}
              text={word.text} startFrame={word.startFrame}
              angle={word.angle} distance={word.distance}
              cx={c1x} cy={CENTER_Y}
              size={word.size} rotateZ={word.rotateZ}
              glowColor="rgba(255, 68, 68, 0.6)"
            />
          ))}
        </div>
      )}

      {/* === Circle 2 (Method — Purple) === */}
      {preFusion && (
        <div style={{ position: "absolute", inset: 0, opacity: globalOpacity }}>
          <CircleRing
            cx={c2x} cy={CENTER_Y} radius={CIRCLE_RADIUS}
            color={METHOD.primary}
            drawStart={TIMING.circle2Draw.start} drawEnd={TIMING.circle2Draw.end}
            fadeOutStart={TIMING.fadeOut.start} fadeOutEnd={TIMING.fadeOut.end}
            disappearStart={TIMING.fusionFlash.start} disappearEnd={TIMING.fusionMerge.start}
          />
          <LightTracer
            cx={c2x} cy={CENTER_Y} radius={CIRCLE_RADIUS}
            color={METHOD.primary} mode="smooth" rotations={4}
            activeStart={TIMING.methodLoop.start} activeEnd={TIMING.methodLoop.end}
            fadeOutStart={TIMING.fusionFlash.start} fadeOutEnd={TIMING.fusionMerge.start}
          />
          {CIRCLE2_NODES.map((node, i) => (
            <NodeLabel key={`c2n-${i}`} node={node} index={i}
              cx={c2x} cy={CENTER_Y} radius={CIRCLE_RADIUS}
              color={METHOD.primary} glowColor={METHOD.glow}
              appearStart={TIMING.circle2Nodes.start}
              fadeOutStart={TIMING.nodesFadeOut.start} fadeOutEnd={TIMING.nodesFadeOut.end}
            />
          ))}
          {CIRCLE2_WORDS.map((word, i) => (
            <FlashWord key={`c2w-${i}`}
              text={word.text} startFrame={word.startFrame}
              angle={word.angle} distance={word.distance}
              cx={c2x} cy={CENTER_Y}
              size={word.size} rotateZ={word.rotateZ}
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
          cx={CENTER_X} cy={CENTER_Y} radius={FUSED_RADIUS}
          color={FUSED.primary} mode="smooth" rotations={6}
          activeStart={TIMING.fusedLoop.start} activeEnd={TIMING.fusedLoop.end}
          fadeOutStart={TIMING.fadeOut.start} fadeOutEnd={TIMING.fadeOut.end}
        />
        {FUSED_NODES.map((node, i) => (
          <NodeLabel key={`fn-${i}`} node={node} index={i}
            cx={CENTER_X} cy={CENTER_Y} radius={FUSED_RADIUS}
            color={FUSED.primary} glowColor={FUSED.glow}
            appearStart={TIMING.fusedNodes.start}
            fadeOutStart={TIMING.fadeOut.start} fadeOutEnd={TIMING.fadeOut.end}
          />
        ))}
        {FUSED_WORDS.map((word, i) => (
          <FlashWord key={`fw-${i}`}
            text={word.text} startFrame={word.startFrame}
            angle={word.angle} distance={word.distance}
            cx={CENTER_X} cy={CENTER_Y}
            size={word.size} rotateZ={word.rotateZ}
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
```

**Step 2: Commit**

```bash
git add remotion/src/CircleAnimation/index.tsx
git commit -m "feat(animation): orchestrate two-circle fusion with all layers"
```

---

### Task 11: Preview in Remotion Studio and iterate

**Step 1: Start Remotion preview**

Run: `cd remotion && npx remotion studio`

**Step 2: Visual check**

Scrub through all 540 frames and verify:
- Frame 0-35: Circle 1 (red) draws in at left
- Frame 30-50: Nodes appear around circle 1
- Frame 55-155: Flash words pop around circle 1 (no overflow!)
- Frame 165-185: Circle 2 (purple) draws in at right
- Frame 200-260: Flash words pop around circle 2
- Frame 270-360: Both circles slide toward center
- Frame 310-360: Venn glow appears at intersection
- Frame 360-400: Flash + merge into gradient circle
- Frame 400-510: Fused circle with benefits
- Frame 510-540: Fade out

**Step 3: Fix any timing/position issues found during preview**

Adjust config values if needed (word positions, timing boundaries, glow intensities).

---

### Task 12: Render final video

**Step 1: Render MP4**

Run: `cd remotion && npx remotion render CircleAnimation out/circle-animation.mp4 --codec h264`

**Step 2: Render WebM**

Run: `cd remotion && npx remotion render CircleAnimation out/circle-animation.webm --codec vp8`

**Step 3: Copy to public folder**

Run: `cp remotion/out/circle-animation.mp4 public/videos/ && cp remotion/out/circle-animation.webm public/videos/`

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: two-circle fusion animation — rendered and deployed"
```
