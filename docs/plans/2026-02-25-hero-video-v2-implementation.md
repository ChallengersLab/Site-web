# HeroDiagnostic v2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Remotion hero video from text-on-black to a full motion graphics experience with 3D isometric scene, kinetic typography, physics, camera movements, and Challengers Lab brand reveal.

**Architecture:** 9 new components replace most existing ones. Scenes are rewritten to compose these components with precise frame-by-frame choreography. The IsometricScene container manages 3D perspective and camera state (orbit, shake, pullback). All visual elements (UIBlock3D) persist across acts, transforming from alive/dead → fractured → ghost → solid.

**Tech Stack:** Remotion 4.0.428, React 19, TypeScript, CSS 3D transforms (perspective, rotateX/Y/Z, translateZ), SVG animations (stroke-dasharray), spring physics (Remotion spring())

**Design doc:** `docs/plans/2026-02-25-hero-video-v2-design.md`

---

## Shared Constants

Before any task, create this shared config file that all components reference:

### Task 0: Shared constants and types

**Files:**
- Create: `remotion/src/HeroDiagnostic/config.ts`
- Create: `remotion/src/HeroDiagnostic/types.ts`

**Step 1: Create types file**

```typescript
// remotion/src/HeroDiagnostic/types.ts

export type BlockType = "inbox" | "tasks" | "calendar" | "pipeline" | "deals" | "metrics" | "crm" | "chat";

export type BlockState = "active" | "dead" | "fragment" | "ghost" | "solid";

export interface BlockConfig {
  id: string;
  type: BlockType;
  state: BlockState;
  /** Grid position in isometric scene (column, row) */
  gridPos: { col: number; row: number };
  /** Whether this block belongs to the "team" (survives Act 2) or "deals" (gets destroyed) */
  team: "team" | "deals";
}

export interface CameraState {
  /** Orbit angle in degrees */
  orbitDeg: number;
  /** CSS perspective value in px */
  perspective: number;
  /** Scale factor (1 = normal, <1 = zoomed out) */
  scale: number;
  /** Translate offset for shake/pan */
  offsetX: number;
  offsetY: number;
}
```

**Step 2: Create config file**

```typescript
// remotion/src/HeroDiagnostic/config.ts

import type { BlockConfig } from "./types";

// === Frame boundaries ===
export const ACT1_START = 0;
export const ACT1_END = 239;
export const ACT2_START = 240;
export const ACT2_END = 359;
export const ACT3_START = 360;
export const ACT3_END = 539;
export const ACT4_START = 540;
export const ACT4_END = 749;

// === Colors ===
export const PURPLE = "#7B5EFF";
export const CYAN = "#00F5FF";
export const BG = "#0A0A0F";
export const DEAD_GRAY = "#333333";
export const DEAD_RED = "#FF4444";

// === Block definitions ===
export const BLOCKS: BlockConfig[] = [
  // Team blocks (survive Act 2)
  { id: "inbox", type: "inbox", state: "active", gridPos: { col: 0, row: 0 }, team: "team" },
  { id: "tasks", type: "tasks", state: "active", gridPos: { col: 1, row: 0 }, team: "team" },
  { id: "calendar", type: "calendar", state: "active", gridPos: { col: 0, row: 1 }, team: "team" },
  { id: "chat", type: "chat", state: "active", gridPos: { col: 1, row: 1 }, team: "team" },
  // Deal blocks (destroyed in Act 2)
  { id: "pipeline", type: "pipeline", state: "dead", gridPos: { col: 2, row: 0 }, team: "deals" },
  { id: "deals", type: "deals", state: "dead", gridPos: { col: 3, row: 0 }, team: "deals" },
  { id: "metrics", type: "metrics", state: "dead", gridPos: { col: 2, row: 1 }, team: "deals" },
  { id: "crm", type: "crm", state: "dead", gridPos: { col: 3, row: 1 }, team: "deals" },
];

// === Isometric grid ===
export const GRID_CELL_W = 320;
export const GRID_CELL_H = 240;
export const GRID_GAP = 40;
export const GRID_ORIGIN_X = 960; // center of 1920
export const GRID_ORIGIN_Y = 540; // center of 1080

// Convert grid position to pixel position (centered)
export function gridToPixel(col: number, row: number): { x: number; y: number } {
  const totalCols = 4;
  const totalRows = 2;
  const totalW = totalCols * GRID_CELL_W + (totalCols - 1) * GRID_GAP;
  const totalH = totalRows * GRID_CELL_H + (totalRows - 1) * GRID_GAP;
  const startX = GRID_ORIGIN_X - totalW / 2;
  const startY = GRID_ORIGIN_Y - totalH / 2;
  return {
    x: startX + col * (GRID_CELL_W + GRID_GAP) + GRID_CELL_W / 2,
    y: startY + row * (GRID_CELL_H + GRID_GAP) + GRID_CELL_H / 2,
  };
}
```

**Step 3: Verify in Remotion Studio**

Run: `cd remotion && npx remotion studio`
Expected: Studio opens, no TypeScript errors. These files are just imports, no visual output yet.

**Step 4: Commit**

```bash
git add remotion/src/HeroDiagnostic/config.ts remotion/src/HeroDiagnostic/types.ts
git commit -m "feat(video-v2): add shared config, types, and grid layout constants"
```

---

## Layer 0 — Foundation Components

### Task 1: IsometricScene container

The 3D perspective container that wraps ALL scene content. Manages camera orbit, shake, scale, and parallax layers.

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/IsometricScene.tsx`

**Step 1: Implement IsometricScene**

```tsx
// remotion/src/HeroDiagnostic/components/IsometricScene.tsx

import React from "react";
import { AbsoluteFill } from "remotion";
import type { CameraState } from "../types";
import { BG } from "../config";

interface Props {
  camera: CameraState;
  children: React.ReactNode;
}

/**
 * 3D perspective container for the entire scene.
 * Applies camera orbit (rotateY), perspective, scale, and offset.
 * Children are rendered inside the 3D context.
 */
export const IsometricScene: React.FC<Props> = ({ camera, children }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: `${camera.perspective}px`,
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: [
              `scale(${camera.scale})`,
              `rotateY(${camera.orbitDeg}deg)`,
              `rotateX(12deg)`, // slight tilt for isometric feel
              `translate(${camera.offsetX}px, ${camera.offsetY}px)`,
            ].join(" "),
            transformStyle: "preserve-3d",
            transition: "none",
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Quick smoke test — create a temporary test scene**

Add a test scene in `remotion/src/HeroDiagnostic/scenes/Act1Mirror.tsx` that imports IsometricScene with a simple colored div inside. Open Remotion Studio, scrub through frames, verify the 3D perspective rotates correctly.

**Step 3: Commit**

```bash
git add remotion/src/HeroDiagnostic/components/IsometricScene.tsx
git commit -m "feat(video-v2): add IsometricScene 3D perspective container"
```

---

### Task 2: KineticText per-character typography

Replaces `Typewriter`. Each character animates in with spring physics. Supports callbacks per word to trigger scene effects.

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/KineticText.tsx`

**Step 1: Implement KineticText**

```tsx
// remotion/src/HeroDiagnostic/components/KineticText.tsx

import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";

interface WordEffect {
  /** The word (or phrase) that triggers this effect */
  word: string;
  /** CSS class or inline style to apply to this word */
  style?: React.CSSProperties;
  /** Callback frame offset: how many frames after word appears to fire */
  onRevealFrame?: number;
}

interface Props {
  /** Full text to display */
  text: string;
  /** Frame at which the animation starts */
  startFrame: number;
  /** Frames between each character reveal */
  framePersChar?: number;
  /** Base font style */
  style?: React.CSSProperties;
  /** Per-word effects */
  wordEffects?: WordEffect[];
  /** Font family override */
  fontFamily?: string;
  /** Whether to use blueprint/technical style */
  blueprint?: boolean;
}

export const KineticText: React.FC<Props> = ({
  text,
  startFrame,
  framePersChar = 2,
  style,
  wordEffects = [],
  fontFamily = "'Instrument Serif', serif",
  blueprint = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = frame - startFrame;

  if (elapsed < 0) return null;

  // Split text into characters, preserving word boundaries
  const chars = text.split("");
  const totalFrames = chars.length * framePersChar;

  // Find which word each character belongs to
  const words = text.split(" ");
  let charIndex = 0;
  const charToWord: number[] = [];
  words.forEach((word, wordIdx) => {
    for (let i = 0; i < word.length; i++) {
      charToWord[charIndex] = wordIdx;
      charIndex++;
    }
    // Space between words
    if (wordIdx < words.length - 1) {
      charToWord[charIndex] = wordIdx;
      charIndex++;
    }
  });

  // Get effect style for a word
  const getWordStyle = (wordIdx: number): React.CSSProperties => {
    const word = words[wordIdx];
    const effect = wordEffects.find((e) => word.includes(e.word));
    return effect?.style ?? {};
  };

  const baseFont = blueprint
    ? "'JetBrains Mono', monospace"
    : fontFamily;

  return (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        fontFamily: baseFont,
        fontSize: 52,
        color: "#FFFFFF",
        lineHeight: 1.3,
        textAlign: "center",
        ...style,
      }}
    >
      {chars.map((char, i) => {
        const charDelay = i * framePersChar;
        const charElapsed = elapsed - charDelay;

        if (charElapsed < 0) return <span key={i} style={{ opacity: 0 }}>{char === " " ? "\u00A0" : char}</span>;

        // Spring animation for each character
        const s = spring({
          frame: charElapsed,
          fps,
          config: { damping: 12, stiffness: 200, mass: 0.5 },
        });

        const wordIdx = charToWord[i] ?? 0;
        const wordStyle = getWordStyle(wordIdx);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: s,
              transform: `translateY(${(1 - s) * 20}px) scale(${0.8 + s * 0.2})`,
              ...wordStyle,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};
```

**Step 2: Visual test in Remotion Studio**

Temporarily render KineticText in Act1Mirror with text "Vos equipes bossent." at startFrame={10}. Verify each character springs in with stagger. Check blueprint mode with blueprint={true}.

**Step 3: Commit**

```bash
git add remotion/src/HeroDiagnostic/components/KineticText.tsx
git commit -m "feat(video-v2): add KineticText per-character spring typography"
```

---

### Task 3: UIBlock3D with micro-animations

Replaces `FloatingUIBlocks`. Each block is a 3D card with configurable internal micro-animations (cursor blink, progress bar, checkmarks, infinite loaders, flat charts).

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/UIBlock3D.tsx`

**Step 1: Implement UIBlock3D**

The component renders a card with slight 3D rotation (CSS transform rotateX/rotateY for the isometric feel) and internal animated content based on block type. Active blocks get white/purple styling with working animations. Dead blocks get gray styling with stalled animations.

```tsx
// remotion/src/HeroDiagnostic/components/UIBlock3D.tsx

import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import type { BlockType, BlockState } from "../types";
import { PURPLE, CYAN, DEAD_GRAY, DEAD_RED, GRID_CELL_W, GRID_CELL_H } from "../config";

interface Props {
  type: BlockType;
  state: BlockState;
  /** Absolute pixel position (center of block) */
  x: number;
  y: number;
  /** Delay before fade-in (frames) */
  delay?: number;
  /** Override opacity (for external animation control) */
  opacity?: number;
  /** Override transform (for external animation: vortex, slide, etc.) */
  transform?: string;
  /** Scale override */
  scale?: number;
  /** Whether to show protective halo (Act 2) */
  halo?: boolean;
  /** Glow color for halo */
  haloColor?: string;
}

export const UIBlock3D: React.FC<Props> = ({
  type,
  state,
  x,
  y,
  delay = 0,
  opacity: opacityOverride,
  transform: transformOverride,
  scale: scaleOverride,
  halo = false,
  haloColor = PURPLE,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = frame - delay;

  if (elapsed < 0) return null;

  const fadeIn = interpolate(elapsed, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isActive = state === "active" || state === "solid";
  const isDead = state === "dead";

  // Subtle floating drift
  const driftX = Math.sin(frame * 0.015 + x * 0.01) * 4;
  const driftY = Math.cos(frame * 0.012 + y * 0.01) * 3;

  const cardBg = isActive
    ? "rgba(255,255,255,0.06)"
    : isDead
      ? "rgba(255,255,255,0.02)"
      : "rgba(255,255,255,0.04)";

  const borderColor = isActive
    ? `rgba(123,94,255,0.3)`
    : isDead
      ? `rgba(255,255,255,0.05)`
      : `rgba(123,94,255,0.15)`;

  const finalOpacity = opacityOverride ?? fadeIn;
  const finalScale = scaleOverride ?? 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x - GRID_CELL_W / 2,
        top: y - GRID_CELL_H / 2,
        width: GRID_CELL_W,
        height: GRID_CELL_H,
        opacity: finalOpacity,
        transform: transformOverride
          ?? `translate(${driftX}px, ${driftY}px) scale(${finalScale}) rotateX(2deg) rotateY(-3deg)`,
        transformStyle: "preserve-3d",
        zIndex: Math.round(y),
      }}
    >
      {/* Halo glow */}
      {halo && (
        <div
          style={{
            position: "absolute",
            inset: -12,
            borderRadius: 16,
            boxShadow: `0 0 30px ${haloColor}, 0 0 60px ${haloColor}40`,
            opacity: 0.5 + Math.sin(frame * 0.1) * 0.2,
          }}
        />
      )}

      {/* Card body */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 12,
          border: `1px solid ${borderColor}`,
          background: cardBg,
          backdropFilter: "blur(8px)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          overflow: "hidden",
        }}
      >
        {/* Block title bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isActive ? PURPLE : isDead ? DEAD_RED : PURPLE,
              opacity: isActive ? 0.5 + Math.sin(frame * 0.08) * 0.3 : 0.3,
            }}
          />
          <div
            style={{
              height: 6,
              width: 60,
              borderRadius: 3,
              background: isActive ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Internal content based on type */}
        <BlockContent type={type} state={state} frame={frame} />
      </div>
    </div>
  );
};

/** Internal micro-animations per block type */
const BlockContent: React.FC<{ type: BlockType; state: BlockState; frame: number }> = ({
  type,
  state,
  frame,
}) => {
  const isActive = state === "active" || state === "solid";
  const baseColor = isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)";
  const accentColor = isActive ? PURPLE : DEAD_GRAY;

  switch (type) {
    case "inbox":
    case "chat":
      // Lines appearing one by one (active) or static (dead)
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
          {[0, 1, 2, 3].map((i) => {
            const lineW = [85, 70, 90, 60][i];
            const lineDelay = isActive ? i * 30 : 0;
            const lineOpacity = isActive
              ? Math.min(1, Math.max(0, Math.sin((frame - lineDelay) * 0.05) * 0.5 + 0.5))
              : 0.3;
            return (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: accentColor,
                    opacity: lineOpacity * 0.4,
                  }}
                />
                <div
                  style={{
                    height: 8,
                    width: `${lineW}%`,
                    borderRadius: 4,
                    background: baseColor,
                    opacity: lineOpacity,
                  }}
                />
              </div>
            );
          })}
        </div>
      );

    case "tasks":
    case "calendar":
      // Checkmarks that pop (active) or empty boxes (dead)
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          {[0, 1, 2].map((i) => {
            const checked = isActive && frame > 30 + i * 40;
            return (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    border: `2px solid ${checked ? PURPLE : baseColor}`,
                    background: checked ? `${PURPLE}40` : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: PURPLE,
                  }}
                >
                  {checked ? "✓" : ""}
                </div>
                <div
                  style={{
                    height: 6,
                    width: `${[75, 55, 65][i]}%`,
                    borderRadius: 3,
                    background: baseColor,
                    opacity: checked ? 0.6 : 0.3,
                  }}
                />
              </div>
            );
          })}
        </div>
      );

    case "pipeline":
    case "deals":
      // Progress bars (active = filling, dead = stalled with red)
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {[0, 1, 2].map((i) => {
            const maxW = [30, 15, 8][i]; // stalled at low %
            const fillW = isActive
              ? interpolate(frame, [0, 200], [10, 90], { extrapolateRight: "clamp" })
              : maxW;
            return (
              <div key={i}>
                <div
                  style={{
                    height: 8,
                    width: "100%",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.05)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${fillW}%`,
                      borderRadius: 4,
                      background: isActive
                        ? `linear-gradient(90deg, ${PURPLE}, ${CYAN})`
                        : DEAD_RED,
                      opacity: isActive ? 0.8 : 0.4,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      );

    case "metrics":
    case "crm":
      // Chart bars (active = growing, dead = flat)
      return (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 6,
            flex: 1,
            paddingTop: 10,
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const activeH = 20 + Math.sin(frame * 0.03 + i) * 15 + i * 8;
            const deadH = 12 + Math.random() * 3; // flat
            const h = isActive ? activeH : 15;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  minHeight: 8,
                  maxHeight: "80%",
                  borderRadius: 3,
                  background: isActive
                    ? `linear-gradient(180deg, ${PURPLE}80, ${PURPLE}20)`
                    : `rgba(255,255,255,0.06)`,
                }}
              />
            );
          })}
        </div>
      );

    default:
      return null;
  }
};
```

**Step 2: Visual test**

Render a few UIBlock3D instances in a temporary scene — one active inbox, one dead pipeline. Verify micro-animations: cursor blinks on active, stalled loaders on dead, 3D rotation, drift.

**Step 3: Commit**

```bash
git add remotion/src/HeroDiagnostic/components/UIBlock3D.tsx
git commit -m "feat(video-v2): add UIBlock3D with 3D cards and micro-animations"
```

---

### Task 4: VortexEffect

Gravitational pull toward a center point. Used in Act 2 to suck dead blocks into a black hole.

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/VortexEffect.tsx`

**Step 1: Implement VortexEffect**

This is a utility hook rather than a visual component. It takes element positions and returns their vortex-affected positions based on progress.

```tsx
// remotion/src/HeroDiagnostic/components/VortexEffect.tsx

import { interpolate, spring, useVideoConfig } from "remotion";

interface VortexInput {
  x: number;
  y: number;
  /** 0-1, how attracted this element is */
  attraction: number;
}

interface VortexOutput {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
}

/**
 * Hook: compute vortex-pulled positions for elements.
 * centerX/Y is the vortex center. progress 0-1 drives the pull.
 */
export function useVortex(
  elements: VortexInput[],
  centerX: number,
  centerY: number,
  progress: number,
  frame: number,
): VortexOutput[] {
  return elements.map((el, i) => {
    const dx = centerX - el.x;
    const dy = centerY - el.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    // Eased pull: accelerates toward center
    const pull = Math.pow(progress, 1.5) * el.attraction;

    // Spiral: add rotation as elements get pulled in
    const spiralAngle = angle + pull * Math.PI * 1.5;
    const spiralDist = dist * (1 - pull);

    const newX = centerX - Math.cos(spiralAngle) * spiralDist;
    const newY = centerY - Math.sin(spiralAngle) * spiralDist;

    // Fragments rotate faster as they approach center
    const rotation = pull * 360 * (i % 2 === 0 ? 1 : -1) + Math.sin(frame * 0.1 + i) * pull * 30;

    // Scale down as sucked in
    const scale = 1 - pull * 0.7;

    // Fade out near center
    const opacity = 1 - Math.pow(pull, 2);

    return { x: newX, y: newY, scale, rotation, opacity };
  });
}
```

**Step 2: Commit**

```bash
git add remotion/src/HeroDiagnostic/components/VortexEffect.tsx
git commit -m "feat(video-v2): add useVortex hook for gravitational pull physics"
```

---

### Task 5: CameraShake utility

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/CameraShake.tsx`

**Step 1: Implement CameraShake**

```tsx
// remotion/src/HeroDiagnostic/components/CameraShake.tsx

/**
 * Returns camera offset values for shake effect.
 * Usage: add returned offsetX/offsetY to CameraState.
 */
export function getCameraShake(
  frame: number,
  startFrame: number,
  durationFrames: number,
  intensity: number = 15,
): { offsetX: number; offsetY: number } {
  const elapsed = frame - startFrame;
  if (elapsed < 0 || elapsed > durationFrames) {
    return { offsetX: 0, offsetY: 0 };
  }

  // Decay envelope: intensity drops off exponentially
  const decay = Math.exp(-elapsed / (durationFrames * 0.3));
  const t = elapsed * 0.8;

  return {
    offsetX: Math.sin(t * 7.3) * intensity * decay,
    offsetY: Math.cos(t * 5.1) * intensity * decay * 0.7,
  };
}
```

**Step 2: Commit**

```bash
git add remotion/src/HeroDiagnostic/components/CameraShake.tsx
git commit -m "feat(video-v2): add getCameraShake utility for camera tremor"
```

---

### Task 6: BlueprintGrid

SVG animated grid that draws itself — the "system blueprint" in Act 3. Lines trace from center outward, showing where blocks SHOULD be positioned.

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/BlueprintGrid.tsx`

**Step 1: Implement BlueprintGrid**

```tsx
// remotion/src/HeroDiagnostic/components/BlueprintGrid.tsx

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { BLOCKS, gridToPixel, GRID_CELL_W, GRID_CELL_H, PURPLE, CYAN } from "../config";

interface Props {
  /** 0-1: how much of the grid has been drawn */
  drawProgress: number;
  /** 0-1: pulsation intensity of the lines */
  pulseIntensity?: number;
  /** Whether connection lines are dashed (true) or solid (false) */
  dashed?: boolean;
  /** Overall opacity */
  opacity?: number;
}

export const BlueprintGrid: React.FC<Props> = ({
  drawProgress,
  pulseIntensity = 0,
  dashed = true,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();

  // Generate grid cell outlines (rounded rects at each block position)
  const cells = BLOCKS.map((block) => {
    const pos = gridToPixel(block.gridPos.col, block.gridPos.row);
    return { ...pos, id: block.id };
  });

  // Generate connection lines between adjacent blocks
  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < BLOCKS.length; i++) {
    for (let j = i + 1; j < BLOCKS.length; j++) {
      const a = BLOCKS[i].gridPos;
      const b = BLOCKS[j].gridPos;
      // Connect horizontally or vertically adjacent blocks
      if (
        (Math.abs(a.col - b.col) === 1 && a.row === b.row) ||
        (Math.abs(a.row - b.row) === 1 && a.col === b.col)
      ) {
        const posA = gridToPixel(a.col, a.row);
        const posB = gridToPixel(b.col, b.row);
        connections.push({ x1: posA.x, y1: posA.y, x2: posB.x, y2: posB.y });
      }
    }
  }

  // Pulse effect on stroke opacity
  const pulseOsc = pulseIntensity > 0
    ? 0.3 + Math.sin(frame * 0.08) * 0.15 * pulseIntensity
    : 0.3;

  const strokeDasharray = dashed ? "8 6" : "none";

  return (
    <svg
      width={1920}
      height={1080}
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        zIndex: 5,
      }}
    >
      <defs>
        <linearGradient id="bp-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={PURPLE} />
          <stop offset="100%" stopColor={CYAN} />
        </linearGradient>
      </defs>

      {/* Cell outlines */}
      {cells.map((cell, i) => {
        const cellProgress = interpolate(
          drawProgress,
          [i / cells.length, (i + 1) / cells.length],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const perimeter = 2 * (GRID_CELL_W - 24 + GRID_CELL_H - 24);
        const dashOffset = perimeter * (1 - cellProgress);

        return (
          <rect
            key={cell.id}
            x={cell.x - (GRID_CELL_W - 24) / 2}
            y={cell.y - (GRID_CELL_H - 24) / 2}
            width={GRID_CELL_W - 24}
            height={GRID_CELL_H - 24}
            rx={12}
            fill="none"
            stroke="url(#bp-gradient)"
            strokeWidth={1.5}
            strokeOpacity={pulseOsc}
            strokeDasharray={perimeter}
            strokeDashoffset={dashOffset}
          />
        );
      })}

      {/* Connection lines */}
      {connections.map((conn, i) => {
        const lineProgress = interpolate(
          drawProgress,
          [0.3 + (i / connections.length) * 0.5, 0.5 + (i / connections.length) * 0.5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const len = Math.sqrt(
          (conn.x2 - conn.x1) ** 2 + (conn.y2 - conn.y1) ** 2,
        );
        const dashOff = len * (1 - lineProgress);

        return (
          <line
            key={`conn-${i}`}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="url(#bp-gradient)"
            strokeWidth={1}
            strokeOpacity={pulseOsc * 0.6}
            strokeDasharray={dashed ? `${len} ${len}` : `${len}`}
            strokeDashoffset={dashOff}
          />
        );
      })}
    </svg>
  );
};
```

**Step 2: Visual test**

Create temporary scene rendering BlueprintGrid with drawProgress animated from 0 to 1. Verify SVG lines draw themselves progressively.

**Step 3: Commit**

```bash
git add remotion/src/HeroDiagnostic/components/BlueprintGrid.tsx
git commit -m "feat(video-v2): add BlueprintGrid SVG with progressive draw animation"
```

---

### Task 7: GhostBlock

Holographic version of UIBlock3D — semi-transparent, scanlines, vibrating, flickering. Used in Act 3 for elements that "should be there but aren't yet".

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/GhostBlock.tsx`

**Step 1: Implement GhostBlock**

```tsx
// remotion/src/HeroDiagnostic/components/GhostBlock.tsx

import React from "react";
import { useCurrentFrame } from "remotion";
import type { BlockType } from "../types";
import { GRID_CELL_W, GRID_CELL_H, PURPLE } from "../config";

interface Props {
  type: BlockType;
  x: number;
  y: number;
  /** 0-1 overall visibility */
  visibility: number;
  /** Whether the block is flickering */
  flicker?: boolean;
}

export const GhostBlock: React.FC<Props> = ({
  type,
  x,
  y,
  visibility,
  flicker = true,
}) => {
  const frame = useCurrentFrame();

  // Flicker: rapid opacity oscillation
  const flickerOp = flicker
    ? 0.7 + Math.sin(frame * 0.5 + x * 0.1) * 0.3
    : 1;

  // Vibration: small random-ish offset
  const vibX = Math.sin(frame * 0.3 + x * 0.05) * 2;
  const vibY = Math.cos(frame * 0.25 + y * 0.05) * 1.5;

  const opacity = visibility * flickerOp;

  return (
    <div
      style={{
        position: "absolute",
        left: x - GRID_CELL_W / 2,
        top: y - GRID_CELL_H / 2,
        width: GRID_CELL_W,
        height: GRID_CELL_H,
        opacity,
        transform: `translate(${vibX}px, ${vibY}px)`,
        zIndex: Math.round(y),
      }}
    >
      {/* Scanlines overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 4px
          )`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Ghost card */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 12,
          border: `1px dashed ${PURPLE}40`,
          background: `rgba(123,94,255,0.03)`,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {/* Simplified ghost content — just shapes */}
        <div style={{
          width: 60,
          height: 6,
          borderRadius: 3,
          background: `${PURPLE}20`,
        }} />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              height: 8,
              width: `${[85, 60, 70][i]}%`,
              borderRadius: 4,
              background: `rgba(255,255,255,0.04)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add remotion/src/HeroDiagnostic/components/GhostBlock.tsx
git commit -m "feat(video-v2): add GhostBlock holographic component with scanlines"
```

---

### Task 8: CircuitLines

Connection lines that illuminate like an electric circuit. Used in Act 4 when the system comes alive.

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/CircuitLines.tsx`

**Step 1: Implement CircuitLines**

```tsx
// remotion/src/HeroDiagnostic/components/CircuitLines.tsx

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { BLOCKS, gridToPixel, PURPLE, CYAN } from "../config";

interface Props {
  /** 0-1: how much of the circuit is illuminated (left to right) */
  illumination: number;
  /** Glow intensity */
  glowIntensity?: number;
}

export const CircuitLines: React.FC<Props> = ({
  illumination,
  glowIntensity = 1,
}) => {
  const frame = useCurrentFrame();

  // Build connections (same as BlueprintGrid but rendered differently)
  const connections: { x1: number; y1: number; x2: number; y2: number; avgX: number }[] = [];
  for (let i = 0; i < BLOCKS.length; i++) {
    for (let j = i + 1; j < BLOCKS.length; j++) {
      const a = BLOCKS[i].gridPos;
      const b = BLOCKS[j].gridPos;
      if (
        (Math.abs(a.col - b.col) === 1 && a.row === b.row) ||
        (Math.abs(a.row - b.row) === 1 && a.col === b.col)
      ) {
        const posA = gridToPixel(a.col, a.row);
        const posB = gridToPixel(b.col, b.row);
        connections.push({
          x1: posA.x,
          y1: posA.y,
          x2: posB.x,
          y2: posB.y,
          avgX: (posA.x + posB.x) / 2,
        });
      }
    }
  }

  // Sort left-to-right for progressive illumination
  connections.sort((a, b) => a.avgX - b.avgX);

  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", inset: 0, zIndex: 6 }}
    >
      <defs>
        <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={PURPLE} />
          <stop offset="100%" stopColor={CYAN} />
        </linearGradient>
        <filter id="circuit-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {connections.map((conn, i) => {
        const lineIllum = interpolate(
          illumination,
          [i / connections.length, (i + 0.8) / connections.length],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        if (lineIllum <= 0) return null;

        const len = Math.sqrt(
          (conn.x2 - conn.x1) ** 2 + (conn.y2 - conn.y1) ** 2,
        );

        // Animated dash: the "current" flowing through the line
        const dashOff = len * (1 - lineIllum);
        const pulseOp = 0.6 + Math.sin(frame * 0.1 + i * 2) * 0.2;

        return (
          <g key={i} filter={glowIntensity > 0 ? "url(#circuit-glow)" : undefined}>
            {/* Glow line (wider, dimmer) */}
            <line
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke="url(#circuit-grad)"
              strokeWidth={6}
              strokeOpacity={lineIllum * 0.2 * glowIntensity}
              strokeDasharray={len}
              strokeDashoffset={dashOff}
              strokeLinecap="round"
            />
            {/* Core line */}
            <line
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke="url(#circuit-grad)"
              strokeWidth={2}
              strokeOpacity={lineIllum * pulseOp}
              strokeDasharray={len}
              strokeDashoffset={dashOff}
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
};
```

**Step 2: Commit**

```bash
git add remotion/src/HeroDiagnostic/components/CircuitLines.tsx
git commit -m "feat(video-v2): add CircuitLines with progressive circuit illumination"
```

---

### Task 9: CursorClick

Animated mouse cursor that moves to a position, clicks, and creates a ripple. Final stamp of Act 4.

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/CursorClick.tsx`

**Step 1: Implement CursorClick**

```tsx
// remotion/src/HeroDiagnostic/components/CursorClick.tsx

import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { PURPLE } from "../config";

interface Props {
  /** Frame when cursor starts moving */
  startFrame: number;
  /** Target position */
  targetX: number;
  targetY: number;
  /** Starting position */
  fromX?: number;
  fromY?: number;
  /** Frames to travel */
  travelFrames?: number;
}

export const CursorClick: React.FC<Props> = ({
  startFrame,
  targetX,
  targetY,
  fromX = 1600,
  fromY = 800,
  travelFrames = 20,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = frame - startFrame;

  if (elapsed < 0) return null;

  // Phase 1: Move cursor
  const moveProgress = interpolate(elapsed, [0, travelFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Ease out
  const easedMove = 1 - Math.pow(1 - moveProgress, 3);
  const curX = fromX + (targetX - fromX) * easedMove;
  const curY = fromY + (targetY - fromY) * easedMove;

  // Phase 2: Click (happens at travelFrames)
  const clickFrame = elapsed - travelFrames;
  const clicked = clickFrame >= 0;

  // Click scale animation
  const clickScale = clicked
    ? spring({
        frame: clickFrame,
        fps,
        config: { damping: 10, stiffness: 300, mass: 0.3 },
      })
    : 0;

  // Ripple
  const rippleProgress = clicked
    ? interpolate(clickFrame, [0, 15], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 50, pointerEvents: "none" }}>
      {/* Cursor */}
      <div
        style={{
          position: "absolute",
          left: curX,
          top: curY,
          transform: `scale(${clicked ? 0.85 + clickScale * 0.15 : 1})`,
        }}
      >
        {/* Simple arrow cursor */}
        <svg width={24} height={32} viewBox="0 0 24 32" fill="none">
          <path
            d="M2 2L2 26L8 20L14 30L18 28L12 18L20 18L2 2Z"
            fill="white"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth={1}
          />
        </svg>
      </div>

      {/* Click ripple */}
      {clicked && rippleProgress < 1 && (
        <div
          style={{
            position: "absolute",
            left: targetX - 50,
            top: targetY - 50,
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: `2px solid ${PURPLE}`,
            transform: `scale(${1 + rippleProgress * 3})`,
            opacity: 1 - rippleProgress,
          }}
        />
      )}
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add remotion/src/HeroDiagnostic/components/CursorClick.tsx
git commit -m "feat(video-v2): add CursorClick with animated cursor and ripple"
```

---

## Layer 2 — Scene Rewrites

### Task 10: Rewrite Act1Mirror

Complete rewrite using IsometricScene, UIBlock3D, KineticText. Camera orbit, 3D parallax, micro-animations, kinetic text with scene reactions.

**Files:**
- Rewrite: `remotion/src/HeroDiagnostic/scenes/Act1Mirror.tsx`

**Step 1: Implement the full scene**

Replace entire file. Use `IsometricScene` with camera orbit (30deg -> 35deg), render 8 `UIBlock3D` instances from config (4 active, 4 dead), 3-layer parallax with `ParticleField` foreground + `Orb` background, `KineticText` for "Vos equipes bossent. Les deals trainent." with word-synced visual effects:
- "Vos equipes" (frame 90): active blocks pulse
- "bossent" (frame 115): white flash on active blocks
- "Les deals" (frame 140): dead blocks illuminate red
- "trainent" (frame 165): dead blocks slide down 20px

The camera state should be computed with `useCurrentFrame()` + `interpolate()`:
- orbitDeg: 30 -> 35 over 240 frames
- perspective: 1200 (constant)
- scale: 1 (constant)
- offsetX/Y: 0 (no shake yet)

Depth of field: blocks at gridPos col 0-1 get no blur, col 2-3 get CSS filter blur(1px).

**Step 2: Preview in Remotion Studio**

Scrub through frames 0-239. Verify:
- 3D isometric scene with orbiting camera
- Active blocks have micro-animations (checkmarks, progress bars)
- Dead blocks are gray/red and stalled
- Text appears per-character with spring
- Visual reactions on word reveals
- Parallax on particles vs blocks

**Step 3: Commit**

```bash
git add remotion/src/HeroDiagnostic/scenes/Act1Mirror.tsx
git commit -m "feat(video-v2): rewrite Act1Mirror with 3D isometric scene and kinetic text"
```

---

### Task 11: Rewrite Act2Rupture

Gravity inversion, vortex pull on dead blocks, active blocks with halos, whip-pan camera, flash + blackout, per-letter shockwave text.

**Files:**
- Rewrite: `remotion/src/HeroDiagnostic/scenes/Act2Rupture.tsx`

**Step 1: Implement the full scene**

Replace entire file. Use `IsometricScene` with animated camera:
- Frames 0-20: perspective warps 1200 -> 800
- Frames 35-45: WHIP-PAN orbit 35deg -> 215deg (10 frames) + getCameraShake
- Frames 45-55: flash (white div opacity 0->1->0 over 4 frames) then black

`useVortex` hook drives dead block positions:
- Frames 0-35: vortex progress 0 -> 1, dead blocks spiral into center (960, 540)
- Active blocks: halo=true, remain at positions with gentle float

Frames 55-90: `KineticText` "Le probleme, ce n'est pas eux." with per-letter mini `ShockwaveEffect`. Active blocks pulse on "pas eux".

Frames 90-120: fade to void. Active blocks fade out. Camera settles.

**Step 2: Preview in Remotion Studio**

Scrub frames 240-359 (scene-local 0-119). Verify:
- Dead blocks spiral into center vortex
- Active blocks resist with purple/cyan halo
- Whip-pan is disorienting but brief
- Flash to black works
- Text letters each trigger a ripple
- Smooth transition to black/void

**Step 3: Commit**

```bash
git add remotion/src/HeroDiagnostic/scenes/Act2Rupture.tsx
git commit -m "feat(video-v2): rewrite Act2Rupture with vortex physics and whip-pan"
```

---

### Task 12: Rewrite Act3 as Act3Diagnostic

The diagnostic moment. Blueprint draws itself, ghost blocks appear, text in blueprint style.

**Files:**
- Create: `remotion/src/HeroDiagnostic/scenes/Act3Diagnostic.tsx` (new file, replaces Act3Response.tsx)

**Step 1: Implement the full scene**

New file. Structure:
- Frames 0-20: void, residual particles, subtle purple orb at center
- Frames 20-60: `BlueprintGrid` drawProgress 0 -> 1 (lines trace from center outward)
- Frames 60-100: `GhostBlock` instances fade in at blueprint positions (visibility 0 -> 0.2, staggered by 6 frames each)
- Frames 100-130: `KineticText` blueprint=true: "C'est le systeme qui n'existe pas encore." Blueprint lines pulse (pulseIntensity 0 -> 1).
- Frames 130-180: hold. Ghost blocks flicker. Blueprint pulses. Dotted connection lines begin to densify (prep for Act 4).

No `IsometricScene` here — flat composition. The void is the point. Camera is static.

**Step 2: Preview in Remotion Studio**

Scrub frames 360-539. Verify:
- Blueprint lines draw themselves progressively (SVG stroke animation)
- Ghost blocks appear as holograms with scanlines
- Text appears in JetBrains Mono (technical/blueprint feel)
- Blueprint pulses with purple->cyan gradient
- Ghosts flicker convincingly

**Step 3: Commit**

```bash
git add remotion/src/HeroDiagnostic/scenes/Act3Diagnostic.tsx
git commit -m "feat(video-v2): add Act3Diagnostic with blueprint grid and ghost blocks"
```

---

### Task 13: Rewrite Act4 as Act4Construction

Materialization, circuit illumination, pulse, camera pullback, brand reveal.

**Files:**
- Create: `remotion/src/HeroDiagnostic/scenes/Act4Construction.tsx` (new file, replaces Act4Promise.tsx)

**Step 1: Implement the full scene**

New file. Uses `IsometricScene` again (return to 3D). Structure:
- Frames 0-40: Ghost blocks materialize one by one (spring stagger, 5-frame intervals). Each block transitions from `GhostBlock` to `UIBlock3D` state="solid". Micro `ShockwaveEffect` at each snap (radius 100px). BlueprintGrid still visible but fading.
- Frames 40-90: `CircuitLines` illumination 0 -> 1. Lines light up left-to-right. `BlueprintGrid` dashed=false now (solid lines).
- Frames 90-120: PULSE. All elements scale 1 -> 1.02 -> 1 (spring). A `ShockwaveEffect` from center (radius 3000px, purple). All UIBlock3D micro-animations resume — now including pipeline and deals blocks which are now "active".
- Frames 120-160: Camera pullback (IsometricScene scale 1 -> 0.85). System visible in full.
- Frames 160-180: `KineticText` "On le construit avec vous." `CursorClick` starts at frame 170, travels to center, clicks at frame 190.
- Frames 180-195: Brand reveal — "Challengers Lab" in `GradientText`, large (72px), emerges from center with spring scale.
- Frames 195-210: Fade to black. Brand text remains visible longest.

**Step 2: Preview in Remotion Studio**

Scrub frames 540-749. Verify:
- Ghost-to-solid transitions are satisfying (spring overshoot)
- Circuit lines light up progressively with glow
- Pulse feels like a heartbeat
- Camera pullback reveals the whole system
- Cursor appears, moves, clicks with ripple
- "Challengers Lab" emerges with gradient
- Clean fade to black

**Step 3: Commit**

```bash
git add remotion/src/HeroDiagnostic/scenes/Act4Construction.tsx
git commit -m "feat(video-v2): add Act4Construction with materialization and brand reveal"
```

---

## Layer 3 — Integration

### Task 14: Update HeroDiagnostic index and clean up

Wire new scenes, remove old scene files, remove unused components.

**Files:**
- Modify: `remotion/src/HeroDiagnostic/index.tsx`
- Delete: `remotion/src/HeroDiagnostic/scenes/Act3Response.tsx`
- Delete: `remotion/src/HeroDiagnostic/scenes/Act4Promise.tsx`
- Delete: `remotion/src/HeroDiagnostic/components/SplitScreen.tsx`
- Delete: `remotion/src/HeroDiagnostic/components/Typewriter.tsx`
- Delete: `remotion/src/HeroDiagnostic/components/NetworkGraph.tsx`
- Delete: `remotion/src/HeroDiagnostic/components/FloatingUIBlocks.tsx`

**Step 1: Update index.tsx**

```tsx
// remotion/src/HeroDiagnostic/index.tsx

import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Act1Mirror } from "./scenes/Act1Mirror";
import { Act2Rupture } from "./scenes/Act2Rupture";
import { Act3Diagnostic } from "./scenes/Act3Diagnostic";
import { Act4Construction } from "./scenes/Act4Construction";

export const HeroDiagnostic: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0F" }}>
      <Sequence from={0} durationInFrames={240} name="Act 1 — Miroir">
        <Act1Mirror />
      </Sequence>
      <Sequence from={240} durationInFrames={120} name="Act 2 — Rupture">
        <Act2Rupture />
      </Sequence>
      <Sequence from={360} durationInFrames={180} name="Act 3 — Diagnostic">
        <Act3Diagnostic />
      </Sequence>
      <Sequence from={540} durationInFrames={210} name="Act 4 — Construction">
        <Act4Construction />
      </Sequence>
    </AbsoluteFill>
  );
};
```

**Step 2: Delete old files**

```bash
rm remotion/src/HeroDiagnostic/scenes/Act3Response.tsx
rm remotion/src/HeroDiagnostic/scenes/Act4Promise.tsx
rm remotion/src/HeroDiagnostic/components/SplitScreen.tsx
rm remotion/src/HeroDiagnostic/components/Typewriter.tsx
rm remotion/src/HeroDiagnostic/components/NetworkGraph.tsx
rm remotion/src/HeroDiagnostic/components/FloatingUIBlocks.tsx
```

**Step 3: Verify in Remotion Studio**

Run the full 750-frame composition. Check:
- No TypeScript errors
- All 4 acts render correctly
- Transitions between acts are smooth
- Act 3 -> Act 4 transition (ghost to solid) is continuous
- Act 4 ends with Challengers Lab brand and clean fade

**Step 4: Commit**

```bash
git add -A remotion/src/HeroDiagnostic/
git commit -m "feat(video-v2): wire new scenes, remove deprecated components"
```

---

### Task 15: Polish pass — timing, easing, visual coherence

Final adjustments after seeing the full composition.

**Files:**
- Modify: any scene or component file that needs tweaking

**Step 1: Full playthrough in Remotion Studio**

Watch the entire 25 seconds at 1x speed. Note:
- Any jarring transitions between acts
- Timing issues (text appearing too fast/slow)
- Visual inconsistencies (colors, opacity levels)
- Camera movements that feel off
- Any component that looks flat/underwhelming

**Step 2: Fix issues**

Adjust interpolation ranges, spring configs, opacity values, timing offsets based on playthrough notes.

**Step 3: Verify no TypeScript errors**

Run: `cd remotion && npx tsc --noEmit`

**Step 4: Commit**

```bash
git add -A remotion/src/
git commit -m "polish(video-v2): timing, easing, and visual coherence adjustments"
```

---

### Task 16: Render final video

**Step 1: Render MP4**

Run: `cd remotion && npm run render`

**Step 2: Render WebM**

Run: `cd remotion && npm run render:webm`

**Step 3: Verify output**

Check `public/videos/hero-diagnostic.mp4` and `public/videos/hero-diagnostic.webm` exist and play correctly.

**Step 4: Commit**

```bash
git add public/videos/
git commit -m "feat(video-v2): render final hero video (mp4 + webm)"
```

---

## Task Summary

| Task | Component | Dependencies | Est. Complexity |
|------|-----------|-------------|-----------------|
| 0 | Config + Types | None | Low |
| 1 | IsometricScene | Config | Medium |
| 2 | KineticText | None | Medium |
| 3 | UIBlock3D | Config, Types | High |
| 4 | VortexEffect (hook) | None | Low |
| 5 | CameraShake (util) | None | Low |
| 6 | BlueprintGrid | Config | Medium |
| 7 | GhostBlock | Config, Types | Low |
| 8 | CircuitLines | Config | Medium |
| 9 | CursorClick | None | Low |
| 10 | Act1Mirror scene | Tasks 0-3 | High |
| 11 | Act2Rupture scene | Tasks 0-5 | High |
| 12 | Act3Diagnostic scene | Tasks 0,2,6,7 | High |
| 13 | Act4Construction scene | Tasks 0-3,6-9 | Very High |
| 14 | Integration + cleanup | Tasks 10-13 | Medium |
| 15 | Polish pass | Task 14 | Medium |
| 16 | Render | Task 15 | Low |

**Parallelizable:** Tasks 1-9 (all components) can be built in parallel. Tasks 10-13 (scenes) depend on components but are independent of each other. Task 14+ is sequential.
