# Hero Video Remotion — Implementation Plan (v2 — Full Visual Upgrade)

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 25-second looping Remotion video ("Le diagnostic brutal") for the Hero section with cinema-grade motion graphics. Not just text on black — layered visuals, particle systems, network graphs, and cinematic transitions that look like a 10-person senior team produced it.

**Architecture:** Separate Remotion project in `remotion/` folder at repo root. 4 scene components (one per act) + rich shared component library (particles, UI mockups, network graph, constellation). Export to `public/videos/`. Hero.tsx updated to play the video.

**Tech Stack:** Remotion 4.x, React, TypeScript, @remotion/cli for rendering

**Design doc:** `docs/plans/2026-02-24-hero-video-remotion-design.md`

**Visual direction:** Every frame has movement. Text is never alone on black. Each act has a distinct visual metaphor:
- Act 1: Disintegrating UI blocks (chaos, disconnected tools)
- Act 2: Particle destruction + shockwave (rupture)
- Act 3: Network graph forming connections (structure, method)
- Act 4: Constellation enveloping text (resolution, trust)

---

### Task 1: Scaffold Remotion project ✅ DONE

Commit: `604c690` — Remotion 4.0.428, React 19, composition detected at 1920x1080 30fps 750 frames.

---

### Task 2: Build foundation components — Typewriter, GradientText, Fonts

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/Typewriter.tsx`
- Create: `remotion/src/HeroDiagnostic/components/GradientText.tsx`
- Create: `remotion/src/fonts.ts`

**Step 1: Install Google Fonts package**

```bash
cd remotion && npm install @remotion/google-fonts
```

**Step 2: Create fonts.ts**

```ts
import { loadFont as loadInstrumentSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";

loadInstrumentSerif();
loadJetBrainsMono();
loadDMSans();
```

Import in `src/index.ts` (or Root.tsx) so fonts load globally.

**Step 3: Create Typewriter component**

Same as original plan — typewriter with blinking cursor, uses JetBrains Mono. Parameters: text, startFrame, msPerChar, style, cursorColor.

**Step 4: Create GradientText component**

Same as original plan — gradient purple->cyan with optional italic. Used in Acts 3 and 4.

**Step 5: Verify fonts load and components render in studio**

**Step 6: Commit**

```bash
git add remotion/
git commit -m "feat(video): add foundation components — Typewriter, GradientText, fonts"
```

---

### Task 3: Build visual layer components — FloatingUIBlocks, ParticleField, Orb

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/FloatingUIBlocks.tsx`
- Create: `remotion/src/HeroDiagnostic/components/ParticleField.tsx`
- Create: `remotion/src/HeroDiagnostic/components/Orb.tsx`
- Create: `remotion/src/HeroDiagnostic/components/GridOverlay.tsx`

**Step 1: Create FloatingUIBlocks component**

This is the KEY visual for Act 1. Renders 5-7 abstract UI block "ghosts" floating behind the text — representing the disconnected tools and chaos a founder lives with. They are NOT literal screenshots — they are stylized rectangles with subtle internal detail (lines, dots, mini-charts) rendered at very low opacity, slightly rotated, drifting slowly.

```tsx
import { useCurrentFrame, interpolate } from "remotion";

interface UIBlock {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  type: "list" | "chart" | "inbox" | "table" | "calendar";
  delay: number;
}

const BLOCKS: UIBlock[] = [
  { x: 100, y: 80, width: 320, height: 220, rotation: -3, type: "list", delay: 0 },
  { x: 1450, y: 120, width: 280, height: 180, rotation: 4, type: "chart", delay: 5 },
  { x: 250, y: 650, width: 300, height: 200, rotation: 2, type: "inbox", delay: 10 },
  { x: 1300, y: 600, width: 260, height: 240, rotation: -5, type: "table", delay: 8 },
  { x: 800, y: 50, width: 240, height: 160, rotation: 1, type: "calendar", delay: 15 },
  { x: 50, y: 400, width: 200, height: 150, rotation: -2, type: "chart", delay: 12 },
  { x: 1550, y: 400, width: 280, height: 200, rotation: 3, type: "list", delay: 7 },
];

// Each block type renders different internal "detail lines" to look like a real UI element
// All very subtle — border: 1px solid rgba(255,255,255,0.04), internal lines at 0.03 opacity
// The point: you FEEL the UI clutter without reading any of it

interface FloatingUIBlocksProps {
  disintegrationProgress?: number; // 0 = normal, 1 = fully disintegrated (for Act 2 transition)
}
```

Each block:
- Has a subtle glass border (`rgba(255,255,255,0.04)`)
- Contains 3-5 horizontal lines or dots mimicking content (at 0.02-0.04 opacity)
- Drifts slowly (sinusoidal x/y movement, ~5-10px amplitude)
- Fades in with stagger based on `delay`
- Has a faint colored accent: some blocks have a tiny purple or cyan line (like status indicators)
- Accepts `disintegrationProgress` prop: as it goes 0->1, blocks rotate more, drift apart, and fade out (used by Act 2)

**Step 2: Create ParticleField component**

A canvas of floating particles that provides ambient movement across the entire video. Different acts configure it differently.

```tsx
interface ParticleFieldProps {
  count: number;           // number of particles
  color: string;           // base color
  speed: number;           // movement speed multiplier
  opacity: number;         // base opacity
  connectDistance?: number; // if set, draw lines between nearby particles (for Act 3)
  seed?: number;           // deterministic positions for Remotion
}
```

Particles are small circles (2-4px) that drift slowly. Positions calculated deterministically from seed + frame (no Math.random — Remotion needs deterministic rendering). Use `interpolate()` with modular arithmetic for looping drift.

When `connectDistance` is set, draw SVG lines between particles within that distance — this creates the "network graph" effect for Act 3.

**Step 3: Create Orb and GridOverlay**

Same as original plan. Orb = radial gradient blur circle with drift. GridOverlay = subtle purple grid lines with mask.

**Step 4: Verify all components in studio — test FloatingUIBlocks and ParticleField independently**

**Step 5: Commit**

```bash
git add remotion/src/HeroDiagnostic/components/
git commit -m "feat(video): add visual layer components — FloatingUIBlocks, ParticleField, Orb, Grid"
```

---

### Task 4: Build GlitchEffect + ShockwaveEffect components

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/GlitchEffect.tsx`
- Create: `remotion/src/HeroDiagnostic/components/ShockwaveEffect.tsx`

**Step 1: Create GlitchEffect**

Same as original plan — chromatic aberration with RGB channel separation, scanlines. Accepts `startFrame`, `durationFrames`, wraps children.

**Step 2: Create ShockwaveEffect**

A radial ring that expands outward from center, like a visual "pulse" or "boom". Used at the transition from Act 2 glitch to pivot text.

```tsx
interface ShockwaveEffectProps {
  startFrame: number;
  color?: string;        // gradient start color, default purple
  durationFrames?: number; // how long the ring expands, default 20
}
```

Implementation: An absolutely-positioned circle that starts at 0px diameter and expands to ~3000px over `durationFrames`. Border is a gradient line (2-3px) that fades as it expands. Creates a "reality reset" visual moment.

**Step 3: Verify both effects in studio**

**Step 4: Commit**

```bash
git add remotion/src/HeroDiagnostic/components/
git commit -m "feat(video): add GlitchEffect and ShockwaveEffect components"
```

---

### Task 5: Build Act 1 — Le miroir

**Files:**
- Create: `remotion/src/HeroDiagnostic/scenes/Act1Mirror.tsx`
- Modify: `remotion/src/HeroDiagnostic/index.tsx`

**Duration:** Frames 0-240 (0-8s)

**Visual concept:** Disconnected UI blocks float in the background — the visual representation of a founder's chaotic tool landscape. Text appears OVER this chaos. The chaos is felt, not read.

**Layers (back to front):**
1. Black background `#0A0A0F`
2. Very subtle grid overlay (0.3 opacity, fading in slowly)
3. FloatingUIBlocks — 7 blocks drifting, low opacity, slightly colored
4. Faint particle field — sparse, slow, adds "digital air"
5. Faint orb (purple, very low opacity ~0.1) — ambient light
6. Text layer — typewriter line 1, then fade-in line 2

**Timeline:**
```
[0-5]     Grid fades in. UI blocks start appearing with stagger.
[5-15]    Particles fade in. Background feels alive.
[15-90]   Typewriter: "Les bons elements, vous les avez." over the chaos
[90-105]  Second line fades up: "Le playbook pour les faire performer, non."
          Instrument Serif, white, larger size
[105-240] Both lines hold. UI blocks continue drifting. Breathing room.
```

**Key details:**
- Use proper French accents in all text ("elements" -> "éléments")
- Typewriter at 35ms/char, JetBrains Mono, #888 gray
- Second line: Instrument Serif, 52px, pure white, fadeUp animation
- FloatingUIBlocks pass `disintegrationProgress={0}` (stable in Act 1)
- ParticleField: ~40 particles, white, speed 0.3, opacity 0.15

**Integration:**

Wire into `HeroDiagnostic/index.tsx`:

```tsx
<Sequence from={0} durationInFrames={240} name="Act 1 — Mirror">
  <Act1Mirror />
</Sequence>
```

**Verify in studio:** Scrub 0-240. UI blocks visible but not distracting. Text is the focus. Background feels alive.

**Commit:**

```bash
git add remotion/src/HeroDiagnostic/
git commit -m "feat(video): implement Act 1 — Le miroir (floating UI chaos + typewriter)"
```

---

### Task 6: Build Act 2 — La rupture

**Files:**
- Create: `remotion/src/HeroDiagnostic/scenes/Act2Rupture.tsx`
- Modify: `remotion/src/HeroDiagnostic/index.tsx`

**Duration:** Frames 240-360 (8-12s)

**Visual concept:** The UI blocks from Act 1 DISINTEGRATE — glitch effect tears them apart, they scatter into particles. Brief blackout (0.5s). Then the shockwave brings the pivot text. The transition should feel like a system crash followed by clarity.

**Layers:**
1. Black background
2. FloatingUIBlocks with `disintegrationProgress` animating 0->1 over first 30 frames
3. GlitchEffect wrapping the remnants of Act 1 (text + blocks) — frames 0-40
4. ParticleField — particles accelerate during glitch, then slow down
5. Brief near-blackout: frames 40-50 (everything at ~0.05 opacity)
6. ShockwaveEffect — fires at frame 50, ring expands from center
7. Faint orb begins glowing (purple, very subtle)
8. Pivot text: "Le problème, c'est pas votre équipe." — appears with spring scale from 0.95->1

**Timeline:**
```
[0-10]    UI blocks start disintegrating (rotation increases, drift accelerates, opacity drops)
[0-40]    Glitch effect on everything — chromatic aberration, scanlines
[10-40]   Blocks scatter into particles (their opacity -> 0, particle count increases)
[40-50]   Near blackout — 0.5s of near-darkness. Visual silence.
[50-55]   Shockwave ring expands from center
[50-75]   Pivot text appears: spring animation, Instrument Serif, 64px, white
          Faint orb glow underneath
[75-120]  Text holds. Orb breathes gently. Particles very sparse and slow.
```

**Key details:**
- The Act 1 text content must be duplicated here (or passed as prop) for the glitch to work on it
- Shockwave: purple-cyan gradient ring, 2px border, expands to 3000px, fades as it grows
- After shockwave, everything feels CLEAN compared to Act 1's chaos — contrast is the point
- Particle field transitions: during glitch = fast/chaotic (speed 2), after blackout = slow/calm (speed 0.2)
- Use proper accents: "problème", "équipe"

**Commit:**

```bash
git add remotion/src/HeroDiagnostic/
git commit -m "feat(video): implement Act 2 — La rupture (disintegration + shockwave + pivot)"
```

---

### Task 7: Build Act 3 — La réponse (NetworkGraph + SplitScreen)

**Files:**
- Create: `remotion/src/HeroDiagnostic/components/NetworkGraph.tsx`
- Create: `remotion/src/HeroDiagnostic/components/SplitScreen.tsx`
- Create: `remotion/src/HeroDiagnostic/scenes/Act3Response.tsx`
- Modify: `remotion/src/HeroDiagnostic/index.tsx`

**Duration:** Frames 360-600 (12-20s)

**Visual concept:** From the clean void after Act 2, connection LINES start drawing themselves — a network graph forming from left (purple/Sales) and right (cyan/IA), meeting at the center. Nodes pulse. This illustrates "method" and "process" visually — structure emerging from chaos. Text overlays the network.

**Step 1: Create NetworkGraph component**

```tsx
interface NetworkNode {
  x: number;
  y: number;
  side: "left" | "right"; // left = purple/Sales, right = cyan/IA
  delay: number;          // frame at which this node appears
}

interface NetworkGraphProps {
  progress: number;       // 0-1, controls how much of the graph is drawn
  mergeProgress: number;  // 0-1, controls cross-center connections forming
  fadeOut?: number;        // 0-1, for transitioning out
}
```

Implementation:
- ~20 nodes spread across the canvas (10 on left half, 10 on right half)
- As `progress` increases, nodes appear (small circles, 4-6px, with glow)
- Lines draw between nearby same-side nodes (SVG lines with stroke-dasharray animation)
- Left-side nodes/lines: purple (#7B5EFF) at 0.4 opacity
- Right-side nodes/lines: cyan (#00F5FF) at 0.4 opacity
- As `mergeProgress` increases, cross-center lines form — purple nodes connect to cyan nodes
- Center connection lines use a gradient (purple -> cyan)
- Nodes pulse subtly (opacity oscillation)

**Step 2: Create SplitScreen component**

For the text overlay during the network phase. Left side shows "Un process de vente reproductible." in purple-tinted text, right side shows "Des automatisations qui tiennent." in cyan-tinted text. Separated by gradient center line.

Same structure as original plan but with textShadow matching each side's color for glow effect.

**Step 3: Create Act3Response**

**Layers:**
1. Black background
2. GridOverlay (fades in over first 20 frames)
3. Orbs — purple left, cyan right (strong, 0.25 opacity)
4. NetworkGraph — the hero visual of this act
5. Text overlays

**Timeline:**
```
[0-15]    Grid and orbs fade in. Clean, structured feeling.
[10-60]   NetworkGraph: left-side nodes/lines draw (progress 0->0.5)
          Right-side nodes/lines draw simultaneously
[30-60]   "Ce qu'on livre :" text appears (Instrument Serif, white, center)
[55-70]   "Ce qu'on livre :" fades out
[60-90]   NetworkGraph: cross-center connections form (mergeProgress 0->1)
          The two sides visually JOINING is powerful
[70-140]  SplitScreen text appears:
          Left: "Un process de vente reproductible." (purple glow)
          Right: "Des automatisations qui tiennent." (cyan glow)
          Center: gradient divider line
[140-160] Network and split fade out
[160-240] Final line: "Vos équipes performent. Votre croissance accélère."
          GradientText, centered, over fading network remnants
          Particles linger gently
```

**Key details:**
- NetworkGraph is the VISUAL STAR of this act. It should feel alive — nodes pulsing, lines drawing progressively
- The moment cross-center lines form should feel like "connection" / "coming together"
- Use proper accents everywhere
- SVG for network lines (easier to animate stroke-dasharray/dashoffset in Remotion)

**Commit:**

```bash
git add remotion/src/HeroDiagnostic/
git commit -m "feat(video): implement Act 3 — La réponse (network graph + split-screen)"
```

---

### Task 8: Build Act 4 — La promesse (Constellation)

**Files:**
- Create: `remotion/src/HeroDiagnostic/scenes/Act4Promise.tsx`
- Modify: `remotion/src/HeroDiagnostic/index.tsx`

**Duration:** Frames 600-750 (20-25s)

**Visual concept:** The network nodes from Act 3 transform into a constellation — spreading out, becoming smaller, dimmer, creating a vast starfield that envelops the final text. Everything slows down. The text is the star. The constellation provides gravity and grandeur.

**Layers:**
1. Black background
2. ParticleField — reconfigured as constellation: ~60 particles, very slow drift, mixed purple/cyan/white at low opacity
3. Faint connecting lines between some particles (constellation lines, very subtle)
4. Two orbs, breathing slowly
5. Faint grid overlay (barely visible)
6. Text

**Timeline:**
```
[0-15]    Constellation particles settle into place (continue from Act 3 network positions, spreading out)
          Orbs at steady glow
[10-30]   Line 1: "On ne vend pas des missions." — Instrument Serif, 60px, white, opacity fadeIn
[40-60]   Line 2: "On résout vos problèmes." — GradientText, italic, 60px, translateY up
[60-105]  Both lines hold. Constellation breathes. This is the apex — everything calm, confident.
[105-150] Fade to black — all layers fade together, slowly
          Constellation dims first, then orbs, then text last
          Creates seamless loop back to frame 0 (black)
```

**Key details:**
- The constellation should feel VAST — particles spread across the entire 1920x1080 canvas
- Some particles are brighter (0.3 opacity), most are dim (0.08-0.15 opacity) — depth illusion
- Connecting lines: very thin (0.5px), very low opacity (0.05-0.08), only between nearby particles
- The fade-to-black must be SLOW and graceful — not a cut. 1.5 seconds minimum.
- Text fades last during the fadeout (it's the most important thing on screen)
- Use proper accents: "résout", "problèmes"

**Integration: Complete index.tsx with all 4 sequences**

```tsx
import { AbsoluteFill, Sequence } from "remotion";
import { Act1Mirror } from "./scenes/Act1Mirror";
import { Act2Rupture } from "./scenes/Act2Rupture";
import { Act3Response } from "./scenes/Act3Response";
import { Act4Promise } from "./scenes/Act4Promise";

export const HeroDiagnostic: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0F" }}>
      <Sequence from={0} durationInFrames={240} name="Act 1 — Mirror">
        <Act1Mirror />
      </Sequence>
      <Sequence from={240} durationInFrames={120} name="Act 2 — Rupture">
        <Act2Rupture />
      </Sequence>
      <Sequence from={360} durationInFrames={240} name="Act 3 — Response">
        <Act3Response />
      </Sequence>
      <Sequence from={600} durationInFrames={150} name="Act 4 — Promise">
        <Act4Promise />
      </Sequence>
    </AbsoluteFill>
  );
};
```

**Commit:**

```bash
git add remotion/src/HeroDiagnostic/
git commit -m "feat(video): implement Act 4 — La promesse (constellation + finale)"
```

---

### Task 9: Polish pass — timing, transitions, visual coherence

**Files:**
- Modify: All scene files and components as needed

**Step 1: Full playthrough in Remotion Studio**

Play from frame 0 to 750 at 1x speed. Note:
- Any jarring transitions between acts
- Text that appears too fast or too slow
- Visual elements that feel disconnected between acts
- Particles/network that don't feel continuous

**Step 2: Transition continuity**

Ensure visual elements carry between acts:
- Act 1 → 2: UI blocks disintegrate INTO particles (not separate systems)
- Act 2 → 3: The clean void transitions to structured network (particles reorganize)
- Act 3 → 4: Network nodes spread out into constellation (same particle system, different config)

This means the ParticleField component may need a `mode` prop or each act needs to share particle position state. If cross-act continuity is too complex, ensure the FEEL is continuous even if technically separate.

**Step 3: Visual density check**

Each frame should have at minimum:
- Background texture (grid or particles)
- At least one light source (orb)
- Ambient movement (drifting particles or floating elements)
- The text content

No frame should be "text on flat black."

**Step 4: Commit**

```bash
git add remotion/
git commit -m "polish(video): tune timing, transitions, and visual coherence"
```

---

### Task 10: Render and integrate into Hero

**Files:**
- Create: `public/videos/` directory
- Modify: `components/sections/Hero.tsx`

**Step 1: Create output directory**

```bash
mkdir -p public/videos
```

**Step 2: Render video**

```bash
cd remotion
npm run render:webm
npm run render
```

Expected: `public/videos/hero-diagnostic.webm` and `public/videos/hero-diagnostic.mp4` created.

If render fails (common with complex compositions), check:
- Memory issues: reduce particle count
- Missing fonts: ensure fonts.ts is imported
- Transparent areas: all layers need explicit backgrounds

**Step 3: Update Hero.tsx**

In `components/sections/Hero.tsx`, replace the video placeholder:

Old:
```tsx
<div className="glass-card aspect-video w-full rounded-2xl overflow-hidden">
  <div className="flex h-full items-center justify-center">
    <p className="text-[13px] text-white/15">Vidéo à venir</p>
  </div>
</div>
```

New:
```tsx
<div className="glass-card aspect-video w-full rounded-2xl overflow-hidden">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
  >
    <source src="/videos/hero-diagnostic.webm" type="video/webm" />
    <source src="/videos/hero-diagnostic.mp4" type="video/mp4" />
  </video>
</div>
```

**Step 4: Verify locally**

```bash
npm run dev
```

Open http://localhost:3000 — video should autoplay in the Hero, looping silently.

Check:
- Video plays on desktop (`lg:block` container)
- Video hidden on mobile (`hidden lg:block`)
- No layout shift when video loads
- Loop is seamless (end -> start transition)
- Video looks good inside the glass-card (rounded corners, overflow hidden)

**Step 5: Check file sizes**

```bash
ls -la public/videos/
```

Target: WebM < 5MB, MP4 < 8MB. The visual complexity will produce larger files. If too large:
- Reduce particle count
- Lower resolution to 1280x720
- Reduce fps to 24

**Step 6: Commit**

```bash
git add public/videos/ components/sections/Hero.tsx
git commit -m "feat: integrate hero diagnostic video into homepage"
```
