# Circle Animation (Cercle Vicieux / Vertueux) — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a cinematic 12-second Remotion animation showing a vicious circle transforming into a virtuous circle, with floating flash-words and atmospheric lighting.

**Architecture:** New `CircleAnimation` Remotion composition alongside existing `HeroDiagnostic`. Reuses `ParticleField` from HeroDiagnostic. All new components live in `remotion/src/CircleAnimation/`. SVG for circle + stroke animation, CSS for glow/bloom, interpolate/spring for motion.

**Tech Stack:** Remotion 4.0.428, React 19, SVG animations, CSS 3D transforms, DM Sans font (already loaded).

---

### Task 1: Config — colors, timings, texts, positions

**Files:**
- Create: `remotion/src/CircleAnimation/config.ts`

**Step 1: Create config file with all constants**

```typescript
// remotion/src/CircleAnimation/config.ts

// === Dimensions ===
export const W = 1920;
export const H = 1080;
export const CENTER_X = W / 2;
export const CENTER_Y = H / 2;
export const CIRCLE_RADIUS = 280;

// === Timing (30fps, 360 frames = 12s) ===
export const FPS = 30;
export const TOTAL_FRAMES = 360;

export const TIMING = {
  // Phase 1: Vicious circle
  fadeIn: { start: 0, end: 10 },
  circleDraw: { start: 10, end: 25 },
  nodesAppear: { start: 20, end: 35 },
  viciousLoop: { start: 30, end: 120 },

  // Phase 2: Transition
  slowDown: { start: 120, end: 130 },
  pulse: { start: 130, end: 136 },
  fragment: { start: 135, end: 142 },
  flash: { start: 140, end: 144 },
  blackout: { start: 144, end: 158 },
  reform: { start: 158, end: 180 },

  // Phase 3: Virtuous circle
  virtuousLoop: { start: 180, end: 345 },
  fadeOut: { start: 345, end: 360 },
} as const;

// === Colors ===
export const BG = "#08080C";

export const VICIOUS = {
  primary: "#FF4444",
  secondary: "#FF6B35",
  tertiary: "#FF8800",
  glow: "rgba(255, 68, 68, 0.4)",
  glowSoft: "rgba(255, 68, 68, 0.15)",
} as const;

export const VIRTUOUS = {
  primary: "#00F5FF",
  secondary: "#00D4AA",
  tertiary: "#7B5EFF",
  glow: "rgba(0, 245, 255, 0.4)",
  glowSoft: "rgba(0, 245, 255, 0.15)",
} as const;

// === Node positions (angle in degrees, 0 = top, clockwise) ===
export interface NodeConfig {
  angle: number; // degrees, 0 = top
  viciousLabel: string;
  virtuousLabel: string;
}

export const NODES: NodeConfig[] = [
  { angle: 0, viciousLabel: "Tâches manuelles", virtuousLabel: "Process automatisés" },
  { angle: 90, viciousLabel: "Prospection au hasard", virtuousLabel: "Prospection structurée" },
  { angle: 180, viciousLabel: "Données en silo", virtuousLabel: "Données qui circulent" },
  { angle: 270, viciousLabel: "Croissance bloquée", virtuousLabel: "Croissance composée" },
];

// === Flash words ===
export interface FlashWordConfig {
  text: string;
  startFrame: number;
  x: number; // percentage of viewport width (0-100)
  y: number; // percentage of viewport height (0-100)
  size: number; // font size in px
  rotateZ: number; // slight tilt in degrees
}

export const VICIOUS_WORDS: FlashWordConfig[] = [
  { text: "Encore un tableur", startFrame: 35, x: 12, y: 18, size: 52, rotateZ: -2 },
  { text: "Relance manuelle", startFrame: 52, x: 72, y: 22, size: 44, rotateZ: 1.5 },
  { text: "Pas de suivi", startFrame: 68, x: 8, y: 75, size: 60, rotateZ: -1 },
  { text: "Aucune visibilité", startFrame: 82, x: 68, y: 72, size: 48, rotateZ: 2 },
  { text: "Réunion de plus", startFrame: 96, x: 18, y: 45, size: 42, rotateZ: -1.5 },
  { text: "Perdu dans le CRM", startFrame: 108, x: 65, y: 48, size: 56, rotateZ: 1 },
];

export const VIRTUOUS_WORDS: FlashWordConfig[] = [
  { text: "Automatisé", startFrame: 195, x: 10, y: 20, size: 56, rotateZ: -1.5 },
  { text: "Pipeline clair", startFrame: 218, x: 74, y: 18, size: 48, rotateZ: 2 },
  { text: "Données en temps réel", startFrame: 245, x: 6, y: 72, size: 44, rotateZ: -1 },
  { text: "Relance intelligente", startFrame: 268, x: 70, y: 75, size: 52, rotateZ: 1.5 },
  { text: "Score prédictif", startFrame: 295, x: 15, y: 48, size: 60, rotateZ: -2 },
  { text: "Croissance visible", startFrame: 318, x: 68, y: 45, size: 50, rotateZ: 1 },
];

// === Utility: convert angle + radius to x/y ===
export function angleToXY(angleDeg: number, radius: number): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180; // -90 so 0deg = top
  return {
    x: CENTER_X + Math.cos(rad) * radius,
    y: CENTER_Y + Math.sin(rad) * radius,
  };
}
```

**Step 2: Verify file compiles**

Run: `cd /c/Users/abrah/challengerslab-v2/remotion && npx tsc --noEmit src/CircleAnimation/config.ts 2>&1 | head -5`
Expected: No errors (or "Cannot find module" which is fine since it's standalone)

**Step 3: Commit**

```bash
cd /c/Users/abrah/challengerslab-v2
git add remotion/src/CircleAnimation/config.ts
git commit -m "feat(circle): add config with colors, timings, texts, positions"
```

---

### Task 2: GrainOverlay — cinematic film grain texture

**Files:**
- Create: `remotion/src/CircleAnimation/components/GrainOverlay.tsx`

**Step 1: Create GrainOverlay component**

This renders a full-screen SVG noise filter that creates film grain. Uses SVG `<feTurbulence>` for deterministic noise seeded by frame number.

```tsx
// remotion/src/CircleAnimation/components/GrainOverlay.tsx
import React from "react";
import { useCurrentFrame } from "remotion";

interface GrainOverlayProps {
  opacity?: number;
}

export const GrainOverlay: React.FC<GrainOverlayProps> = ({ opacity = 0.035 }) => {
  const frame = useCurrentFrame();
  // Vary seed each frame for animated grain
  const seed = frame % 100;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
        opacity,
        mixBlendMode: "overlay",
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id={`grain-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </div>
  );
};
```

**Step 2: Commit**

```bash
cd /c/Users/abrah/challengerslab-v2
git add remotion/src/CircleAnimation/components/GrainOverlay.tsx
git commit -m "feat(circle): add GrainOverlay component for cinematic film grain"
```

---

### Task 3: AmbientGlow — colored pulsing light source behind the circle

**Files:**
- Create: `remotion/src/CircleAnimation/components/AmbientGlow.tsx`

**Step 1: Create AmbientGlow component**

A large blurred radial gradient that sits behind the circle and pulses. Color transitions from red (vicious) to cyan (virtuous) based on a `phase` prop driven by frame interpolation in the parent.

```tsx
// remotion/src/CircleAnimation/components/AmbientGlow.tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CENTER_X, CENTER_Y, TIMING } from "../config";

export const AmbientGlow: React.FC = () => {
  const frame = useCurrentFrame();

  // Color transition: red → transparent → cyan
  const redOpacity = interpolate(
    frame,
    [TIMING.fadeIn.start, TIMING.fadeIn.end, TIMING.slowDown.start, TIMING.flash.start],
    [0, 0.2, 0.25, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cyanOpacity = interpolate(
    frame,
    [TIMING.blackout.end, TIMING.reform.end, TIMING.fadeOut.start, TIMING.fadeOut.end],
    [0, 0.2, 0.25, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Vicious: irregular pulse (fast sine)
  const viciousPulse = Math.sin(frame * 0.18) * 0.08 + Math.sin(frame * 0.31) * 0.04;
  // Virtuous: steady calm pulse
  const virtuousPulse = Math.sin(frame * 0.08) * 0.05;

  const redFinal = Math.max(0, redOpacity + (redOpacity > 0 ? viciousPulse : 0));
  const cyanFinal = Math.max(0, cyanOpacity + (cyanOpacity > 0 ? virtuousPulse : 0));

  return (
    <>
      {/* Red ambient glow */}
      {redFinal > 0 && (
        <div
          style={{
            position: "absolute",
            left: CENTER_X - 400,
            top: CENTER_Y - 400,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,68,68,0.5) 0%, rgba(255,107,53,0.2) 40%, transparent 70%)",
            filter: "blur(100px)",
            opacity: redFinal,
            pointerEvents: "none",
          }}
        />
      )}
      {/* Cyan ambient glow */}
      {cyanFinal > 0 && (
        <div
          style={{
            position: "absolute",
            left: CENTER_X - 400,
            top: CENTER_Y - 400,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,245,255,0.5) 0%, rgba(0,212,170,0.2) 40%, transparent 70%)",
            filter: "blur(100px)",
            opacity: cyanFinal,
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
};
```

**Step 2: Commit**

```bash
cd /c/Users/abrah/challengerslab-v2
git add remotion/src/CircleAnimation/components/AmbientGlow.tsx
git commit -m "feat(circle): add AmbientGlow pulsing light source"
```

---

### Task 4: CircleRing — SVG circle with animated stroke and multi-layered glow

**Files:**
- Create: `remotion/src/CircleAnimation/components/CircleRing.tsx`

**Step 1: Create CircleRing component**

The core SVG circle. Draws itself in (stroke-dashoffset animation), then shows a rotating glow. The stroke color transitions from red to cyan. Includes the fragmentation effect during transition.

```tsx
// remotion/src/CircleAnimation/components/CircleRing.tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CENTER_X, CENTER_Y, CIRCLE_RADIUS, TIMING, VICIOUS, VIRTUOUS } from "../config";

export const CircleRing: React.FC = () => {
  const frame = useCurrentFrame();
  const circumference = 2 * Math.PI * CIRCLE_RADIUS;

  // === Draw-in animation (frames 10-25) ===
  const drawProgress = interpolate(
    frame,
    [TIMING.circleDraw.start, TIMING.circleDraw.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const dashOffset = circumference * (1 - drawProgress);

  // === Visibility: hidden during blackout ===
  const ringOpacity = interpolate(
    frame,
    [
      TIMING.fadeIn.start,
      TIMING.circleDraw.start,
      TIMING.fragment.start,
      TIMING.flash.start,
      TIMING.blackout.start,
      TIMING.blackout.end,
      TIMING.reform.end,
      TIMING.fadeOut.start,
      TIMING.fadeOut.end,
    ],
    [0, 0.6, 0.6, 0.3, 0, 0, 0.6, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === Color transition ===
  const isVirtuous = frame >= TIMING.reform.start;
  const strokeColor = isVirtuous ? VIRTUOUS.primary : VICIOUS.primary;
  const glowColor = isVirtuous ? VIRTUOUS.glow : VICIOUS.glow;

  // === Fragmentation: dash-array gaps grow ===
  const fragmentProgress = interpolate(
    frame,
    [TIMING.fragment.start, TIMING.flash.start],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const isFragmenting = fragmentProgress > 0 && fragmentProgress < 1;

  // During fragment: 4 segments break apart
  const segmentLength = circumference / 4;
  const gapSize = fragmentProgress * segmentLength * 0.6;
  const fragmentDashArray = isFragmenting
    ? `${segmentLength - gapSize} ${gapSize}`
    : `${circumference}`;
  const fragmentDashOffset = isFragmenting ? 0 : dashOffset;

  // === Pulse scale during transition ===
  const pulseScale = interpolate(
    frame,
    [TIMING.pulse.start, TIMING.pulse.start + 3, TIMING.pulse.end],
    [1, 1.06, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === Reform draw-in ===
  const reformProgress = interpolate(
    frame,
    [TIMING.reform.start, TIMING.reform.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const isReforming = frame >= TIMING.blackout.end && frame <= TIMING.reform.end;
  const reformDashOffset = isReforming ? circumference * (1 - reformProgress) : 0;

  const finalDashArray = isReforming ? `${circumference}` : fragmentDashArray;
  const finalDashOffset = isReforming ? reformDashOffset : fragmentDashOffset;

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
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${pulseScale})`,
          transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
        }}
      >
        {/* Outer glow layer (wide blur) */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={CIRCLE_RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={6}
          strokeDasharray={finalDashArray}
          strokeDashoffset={finalDashOffset}
          strokeLinecap="round"
          style={{ filter: "blur(20px)" }}
          opacity={0.5}
        />
        {/* Mid glow layer */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={CIRCLE_RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={4}
          strokeDasharray={finalDashArray}
          strokeDashoffset={finalDashOffset}
          strokeLinecap="round"
          style={{ filter: "blur(8px)" }}
          opacity={0.7}
        />
        {/* Core stroke */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={CIRCLE_RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={2}
          strokeDasharray={finalDashArray}
          strokeDashoffset={finalDashOffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
```

**Step 2: Commit**

```bash
cd /c/Users/abrah/challengerslab-v2
git add remotion/src/CircleAnimation/components/CircleRing.tsx
git commit -m "feat(circle): add CircleRing SVG with draw-in, glow, and fragmentation"
```

---

### Task 5: LightTracer — bright arc that travels around the circle

**Files:**
- Create: `remotion/src/CircleAnimation/components/LightTracer.tsx`

**Step 1: Create LightTracer component**

A ~60-degree bright arc that orbits the circle. Vicious: jerky motion with easing. Virtuous: smooth and accelerating. Uses SVG arc with heavy glow.

```tsx
// remotion/src/CircleAnimation/components/LightTracer.tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CENTER_X, CENTER_Y, CIRCLE_RADIUS, TIMING, VICIOUS, VIRTUOUS } from "../config";

const ARC_SWEEP = 60; // degrees of the bright arc

export const LightTracer: React.FC = () => {
  const frame = useCurrentFrame();

  // === Determine which phase we're in ===
  const isViciousPhase = frame >= TIMING.nodesAppear.end && frame < TIMING.slowDown.start;
  const isSlowingDown = frame >= TIMING.slowDown.start && frame < TIMING.pulse.start;
  const isVirtuousPhase = frame >= TIMING.reform.end && frame < TIMING.fadeOut.start;

  if (!isViciousPhase && !isSlowingDown && !isVirtuousPhase) return null;

  // === Compute angle ===
  let angleDeg: number;
  let color: string;
  let glowIntensity: number;

  if (isViciousPhase) {
    // Jerky: use a stepped easing — fast bursts between nodes, slow in between
    const localFrame = frame - TIMING.nodesAppear.end;
    const totalFrames = TIMING.slowDown.start - TIMING.nodesAppear.end;
    const rawProgress = localFrame / totalFrames;
    // Create jerky motion: ease-in-out per quarter turn
    const quarterProgress = (rawProgress * 3) % 1; // ~3 full rotations
    const jerky = quarterProgress < 0.5
      ? 2 * quarterProgress * quarterProgress
      : 1 - Math.pow(-2 * quarterProgress + 2, 2) / 2;
    const fullRotations = Math.floor(rawProgress * 3);
    angleDeg = (fullRotations + jerky) * 360;
    color = VICIOUS.primary;
    glowIntensity = 0.8;
  } else if (isSlowingDown) {
    // Decelerate to stop
    const progress = interpolate(
      frame,
      [TIMING.slowDown.start, TIMING.slowDown.end],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    // Ease-out: starts fast, ends at 0 velocity
    const eased = 1 - Math.pow(1 - progress, 3);
    angleDeg = eased * 120; // last partial rotation
    // Offset from where vicious ended
    const viciousEndAngle = 3 * 360;
    angleDeg += viciousEndAngle;
    color = VICIOUS.primary;
    glowIntensity = interpolate(progress, [0, 1], [0.8, 0.2], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else {
    // Virtuous: smooth, accelerating
    const localFrame = frame - TIMING.reform.end;
    const totalFrames = TIMING.fadeOut.start - TIMING.reform.end;
    const rawProgress = localFrame / totalFrames;
    // Accelerating: ease-in cubic
    const eased = rawProgress * rawProgress;
    angleDeg = eased * 6 * 360; // up to ~6 rotations, accelerating
    color = VIRTUOUS.primary;
    glowIntensity = interpolate(rawProgress, [0, 0.3, 1], [0.4, 0.9, 0.9], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  // === Convert angle to SVG arc path ===
  const startAngle = angleDeg - ARC_SWEEP / 2;
  const endAngle = angleDeg + ARC_SWEEP / 2;
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;

  const x1 = CENTER_X + CIRCLE_RADIUS * Math.cos(toRad(startAngle));
  const y1 = CENTER_Y + CIRCLE_RADIUS * Math.sin(toRad(startAngle));
  const x2 = CENTER_X + CIRCLE_RADIUS * Math.cos(toRad(endAngle));
  const y2 = CENTER_Y + CIRCLE_RADIUS * Math.sin(toRad(endAngle));

  const largeArc = ARC_SWEEP > 180 ? 1 : 0;
  const arcPath = `M ${x1} ${y1} A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`;

  // Fade out during overall fade
  const fadeOut = interpolate(
    frame,
    [TIMING.fadeOut.start, TIMING.fadeOut.end],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: fadeOut,
      }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        {/* Wide glow */}
        <path
          d={arcPath}
          fill="none"
          stroke={color}
          strokeWidth={12}
          strokeLinecap="round"
          style={{ filter: "blur(16px)" }}
          opacity={glowIntensity * 0.6}
        />
        {/* Mid glow */}
        <path
          d={arcPath}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          style={{ filter: "blur(6px)" }}
          opacity={glowIntensity * 0.8}
        />
        {/* Core bright line */}
        <path
          d={arcPath}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={glowIntensity}
        />
      </svg>
    </div>
  );
};
```

**Step 2: Commit**

```bash
cd /c/Users/abrah/challengerslab-v2
git add remotion/src/CircleAnimation/components/LightTracer.tsx
git commit -m "feat(circle): add LightTracer arc with jerky/smooth motion"
```

---

### Task 6: NodeLabel — capsule with text, illumination on tracer passage

**Files:**
- Create: `remotion/src/CircleAnimation/components/NodeLabel.tsx`

**Step 1: Create NodeLabel component**

Each node is a capsule with text positioned on the circle. Text crossfades from vicious to virtuous labels during transition. Illuminates when the light tracer passes nearby.

```tsx
// remotion/src/CircleAnimation/components/NodeLabel.tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import {
  CIRCLE_RADIUS,
  TIMING,
  VICIOUS,
  VIRTUOUS,
  angleToXY,
} from "../config";
import type { NodeConfig } from "../config";

interface NodeLabelProps {
  node: NodeConfig;
  index: number;
}

export const NodeLabel: React.FC<NodeLabelProps> = ({ node, index }) => {
  const frame = useCurrentFrame();

  const pos = angleToXY(node.angle, CIRCLE_RADIUS);

  // === Appear (staggered) ===
  const appearStart = TIMING.nodesAppear.start + index * 4;
  const opacity = interpolate(
    frame,
    [
      appearStart,
      appearStart + 10,
      TIMING.fragment.start,
      TIMING.flash.start,
      TIMING.blackout.start,
      TIMING.blackout.end,
      TIMING.reform.start,
      TIMING.reform.end,
      TIMING.fadeOut.start,
      TIMING.fadeOut.end,
    ],
    [0, 1, 1, 0.5, 0, 0, 0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === Label crossfade ===
  const labelTransition = interpolate(
    frame,
    [TIMING.reform.start, TIMING.reform.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const isVirtuous = labelTransition >= 0.5;
  const label = isVirtuous ? node.virtuousLabel : node.viciousLabel;

  // === Border / glow color ===
  const borderColor = isVirtuous ? VIRTUOUS.primary : VICIOUS.primary;
  const glowColor = isVirtuous ? VIRTUOUS.glow : VICIOUS.glow;

  // === Capsule dimensions ===
  const capsuleWidth = 220;
  const capsuleHeight = 52;

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
        background: "rgba(8, 8, 12, 0.75)",
        border: `1px solid ${borderColor}`,
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
          color: "#FFFFFF",
          fontSize: 20,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          textAlign: "center",
          lineHeight: 1.2,
          padding: "0 16px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
};
```

**Step 2: Commit**

```bash
cd /c/Users/abrah/challengerslab-v2
git add remotion/src/CircleAnimation/components/NodeLabel.tsx
git commit -m "feat(circle): add NodeLabel capsule with crossfade and glow"
```

---

### Task 7: FlashWord — cinematic floating word with 3D scale and glow

**Files:**
- Create: `remotion/src/CircleAnimation/components/FlashWord.tsx`

**Step 1: Create FlashWord component**

Each word appears from scale 0.6 with slight 3D rotation, settles to full size, then fades out. Has colored glow (text-shadow). Positioned in viewport percentage coordinates.

```tsx
// remotion/src/CircleAnimation/components/FlashWord.tsx
import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { FPS, W, H } from "../config";

interface FlashWordProps {
  text: string;
  startFrame: number;
  x: number; // viewport % (0-100)
  y: number; // viewport % (0-100)
  size: number; // font size px
  rotateZ: number; // tilt degrees
  glowColor: string; // e.g. "rgba(255,68,68,0.6)"
}

const VISIBLE_DURATION = 20; // frames the word is fully visible
const FADE_OUT_DURATION = 12; // frames to fade out

export const FlashWord: React.FC<FlashWordProps> = ({
  text,
  startFrame,
  x,
  y,
  size,
  rotateZ,
  glowColor,
}) => {
  const frame = useCurrentFrame();

  const localFrame = frame - startFrame;

  // Not yet visible or fully faded
  if (localFrame < 0 || localFrame > VISIBLE_DURATION + FADE_OUT_DURATION + 5) {
    return null;
  }

  // === Spring-in for scale ===
  const scaleSpring = spring({
    frame: localFrame,
    fps: FPS,
    config: { damping: 15, stiffness: 120, mass: 0.8 },
  });
  const scale = interpolate(scaleSpring, [0, 1], [0.6, 1]);

  // === 3D rotation: starts tilted, settles to face ===
  const rotateY = interpolate(
    localFrame,
    [0, 10],
    [15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === Opacity: spring in, hold, fade out ===
  const fadeIn = interpolate(
    localFrame,
    [0, 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const fadeOut = interpolate(
    localFrame,
    [VISIBLE_DURATION, VISIBLE_DURATION + FADE_OUT_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = fadeIn * fadeOut;

  if (opacity <= 0.01) return null;

  const pixelX = (x / 100) * W;
  const pixelY = (y / 100) * H;

  return (
    <div
      style={{
        position: "absolute",
        left: pixelX,
        top: pixelY,
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
cd /c/Users/abrah/challengerslab-v2
git add remotion/src/CircleAnimation/components/FlashWord.tsx
git commit -m "feat(circle): add FlashWord cinematic floating text with 3D spring"
```

---

### Task 8: TransitionEffect — pulse, white flash, blackout silence

**Files:**
- Create: `remotion/src/CircleAnimation/components/TransitionEffect.tsx`

**Step 1: Create TransitionEffect component**

Handles the dramatic transition between vicious and virtuous phases: pulse glow intensification, white flash, and blackout period.

```tsx
// remotion/src/CircleAnimation/components/TransitionEffect.tsx
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { TIMING, VICIOUS } from "../config";

export const TransitionEffect: React.FC = () => {
  const frame = useCurrentFrame();

  // === Pulse glow intensification (frames 130-136) ===
  const pulseGlow = interpolate(
    frame,
    [TIMING.pulse.start, TIMING.pulse.start + 3, TIMING.pulse.end],
    [0, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === White flash (frames 140-144) ===
  const flashOpacity = interpolate(
    frame,
    [TIMING.flash.start, TIMING.flash.start + 2, TIMING.flash.end],
    [0, 0.85, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // === Blackout (frames 144-158): everything dark ===
  const blackoutOpacity = interpolate(
    frame,
    [TIMING.blackout.start, TIMING.blackout.start + 2, TIMING.blackout.end - 4, TIMING.blackout.end],
    [0, 0.95, 0.95, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const showPulse = pulseGlow > 0;
  const showFlash = flashOpacity > 0;
  const showBlackout = blackoutOpacity > 0;

  if (!showPulse && !showFlash && !showBlackout) return null;

  return (
    <>
      {/* Pulse: red glow intensification */}
      {showPulse && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, ${VICIOUS.glow} 0%, transparent 60%)`,
            opacity: pulseGlow,
            pointerEvents: "none",
            zIndex: 30,
          }}
        />
      )}

      {/* White flash */}
      {showFlash && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#FFFFFF",
            opacity: flashOpacity,
            pointerEvents: "none",
            zIndex: 40,
          }}
        />
      )}

      {/* Blackout */}
      {showBlackout && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#08080C",
            opacity: blackoutOpacity,
            pointerEvents: "none",
            zIndex: 35,
          }}
        />
      )}
    </>
  );
};
```

**Step 2: Commit**

```bash
cd /c/Users/abrah/challengerslab-v2
git add remotion/src/CircleAnimation/components/TransitionEffect.tsx
git commit -m "feat(circle): add TransitionEffect with pulse, flash, blackout"
```

---

### Task 9: Main composition — assemble all layers

**Files:**
- Create: `remotion/src/CircleAnimation/index.tsx`

**Step 1: Create the main composition**

Layers everything together: background → atmosphere (particles + ambient glow) → circle (ring + tracer + nodes) → flash words → transition effects → grain overlay.

```tsx
// remotion/src/CircleAnimation/index.tsx
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
  VICIOUS,
  VIRTUOUS,
  TIMING,
} from "./config";

export const CircleAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  // Global fade in/out
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

      {/* Layer 1b: Ambient glow (pulsing colored light behind circle) */}
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

      {/* Layer 3: Flash words — vicious (red glow) */}
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

      {/* Layer 3: Flash words — virtuous (cyan glow) */}
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

      {/* Layer 4: Transition effects (pulse, flash, blackout) */}
      <TransitionEffect />

      {/* Layer 5: Film grain overlay (topmost) */}
      <GrainOverlay opacity={0.035} />
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
cd /c/Users/abrah/challengerslab-v2
git add remotion/src/CircleAnimation/index.tsx
git commit -m "feat(circle): assemble main composition with all layers"
```

---

### Task 10: Register composition in Root.tsx and add render scripts

**Files:**
- Modify: `remotion/src/Root.tsx`
- Modify: `remotion/package.json`

**Step 1: Add CircleAnimation composition to Root.tsx**

```tsx
// remotion/src/Root.tsx
import React from "react";
import { Composition } from "remotion";
import { HeroDiagnostic } from "./HeroDiagnostic";
import { CircleAnimation } from "./CircleAnimation";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroDiagnostic"
        component={HeroDiagnostic}
        durationInFrames={750}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CircleAnimation"
        component={CircleAnimation}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

**Step 2: Add render scripts to package.json**

Add to the `"scripts"` section:

```json
"render:circle": "remotion render src/index.ts CircleAnimation --output ../public/videos/circle-animation.mp4",
"render:circle:webm": "remotion render src/index.ts CircleAnimation --codec vp8 --output ../public/videos/circle-animation.webm"
```

**Step 3: Verify TypeScript compiles**

Run: `cd /c/Users/abrah/challengerslab-v2/remotion && npx tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
cd /c/Users/abrah/challengerslab-v2
git add remotion/src/Root.tsx remotion/package.json
git commit -m "feat(circle): register CircleAnimation composition + render scripts"
```

---

### Task 11: Render and verify output

**Step 1: Open Remotion Studio to preview**

Run: `cd /c/Users/abrah/challengerslab-v2/remotion && npx remotion studio src/index.ts`
Expected: Studio opens, select "CircleAnimation" from dropdown, preview plays.

**Step 2: Render MP4**

Run: `cd /c/Users/abrah/challengerslab-v2/remotion && npm run render:circle`
Expected: MP4 rendered to `../public/videos/circle-animation.mp4`

**Step 3: Render WebM**

Run: `cd /c/Users/abrah/challengerslab-v2/remotion && npm run render:circle:webm`
Expected: WebM rendered to `../public/videos/circle-animation.webm`

**Step 4: Commit rendered assets**

```bash
cd /c/Users/abrah/challengerslab-v2
git add public/videos/circle-animation.mp4 public/videos/circle-animation.webm
git commit -m "feat(circle): render circle animation MP4 + WebM"
```
