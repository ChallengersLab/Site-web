# HeroDiagnostic v2 — Design Document

## Overview

Complete visual redesign of the Remotion hero video. Shift from text-on-dark-background to a full motion graphics experience with 3D isometric scene, kinetic typography, physics-based animations, camera movements, and a narrative arc told visually — not just with text.

## Message

**Core message:** "Ton equipe est bonne, il manque le systeme."

**Script (4 phrases, direct et cash):**

1. "Vos equipes bossent. Les deals trainent."
2. "Le probleme, ce n'est pas eux."
3. "C'est le systeme qui n'existe pas encore."
4. "On le construit avec vous." + Challengers Lab brand reveal

## Narrative Arc

| Act | Emotion | Viewer thinks |
|-----|---------|---------------|
| 1. Miroir | Recognition | "C'est exactement ca chez moi" |
| 2. Rupture | Relief | "OK, c'est pas mes gens le probleme" |
| 3. Diagnostic | Awareness | "Il me manque le systeme" |
| 4. Construction | Trust | "Challengers Lab sait le construire" |

## Technical Specs

- **Resolution:** 1920x1080 @ 30fps
- **Duration:** 750 frames (25 seconds)
- **Codec:** JPEG (existing config)
- **Fonts:** Instrument Serif, JetBrains Mono, DM Sans

## Act Breakdown

### Act 1 — Miroir (frames 0–239, 8s)

**Script:** "Vos equipes bossent. Les deals trainent."

**Visual concept:** 3D isometric workspace scene. Camera orbits slowly. Some UI blocks are alive (team tools), others are dead (pipeline, deals). The contrast between active and dead tells the story before any text appears.

**Frame-by-frame:**

- **0–20:** Fade in isometric scene. Camera at 30deg rotation. Perspective 1200px. 6-8 UIBlock3D elements at grid positions. Grid background appears.
- **20–60:** Camera begins slow orbit (30deg -> 35deg over full act). Active blocks have micro-animations: blinking cursors, progress bars filling, checkmarks popping. Dead blocks are greyed out: infinite loaders, flat metric curves, stalled pipeline.
- **60–90:** 3-layer parallax visible through orbit. Depth of field: CSS blur on elements far from center focal point.
- **90–130:** KineticText — "Vos equipes" appears per-character (spring stagger). Active blocks pulse with each letter. "bossent" triggers white flash on active blocks. 10-frame pause.
- **130–180:** "Les deals" — dead blocks briefly illuminate red. "trainent" — dead blocks physically slide down 20px with gravity spring. Loaders slow further.
- **180–239:** Maximum tension. Active blocks alive at top, dead blocks sinking at bottom. Camera continues orbit. Slow particles in foreground (fast parallax layer).

### Act 2 — Rupture (frames 240–359, 4s)

**Script:** "Le probleme, ce n'est pas eux."

**Visual concept:** Gravity inverts. Dead blocks get sucked into a central vortex. Active blocks resist with a protective halo. Whip-pan camera. Text appears letter-by-letter, each letter sending a ripple.

**Frame-by-frame:**

- **240–260:** Perspective warps 1200px -> 800px (compression). Dead blocks attracted toward center (VortexEffect). Spring physics: progressive acceleration.
- **260–275:** Active blocks resist — animated box-shadow halo (purple/cyan). They float, stable. Dead blocks fragment into 3-4 pieces each with random 3D rotation.
- **275–285:** WHIP-PAN — camera rotation 35deg -> 215deg in 10 frames. Motion blur (transitional scale + blur).
- **285–295:** WHITE FLASH (2 frames) then BLACK.
- **295–330:** KineticText per-character — "Le probleme," — each letter triggers a miniature ShockwaveEffect (200px radius). "ce n'est pas eux." — surviving active blocks pulse and stabilize with glow.
- **330–359:** Active blocks fade gently. Transition to void. Camera stabilizes, facing empty center.

### Act 3 — Diagnostic (frames 360–539, 6s)

**Script:** "C'est le systeme qui n'existe pas encore."

**Visual concept:** In the void, a blueprint draws itself — SVG lines tracing where a system SHOULD exist. UI blocks reappear as ghostly holograms occupying blueprint positions. The absence is made visible.

**Frame-by-frame:**

- **360–380:** Void. Black with residual particles. Breathing space. Very subtle purple orb at center.
- **380–420:** BLUEPRINT begins. SVG lines draw themselves (stroke-dasharray animation) from center outward. They trace organized grid positions — where each element SHOULD be. Color: purple at 30% opacity, technical/architect style.
- **420–460:** UI blocks reappear as HOLOGRAMS — 20% opacity, dashed borders, scanlines. They occupy blueprint positions. Each element vibrates slightly — not anchored yet.
- **460–490:** KineticText blueprint-style — JetBrains Mono, construction lines animated around letters. "C'est le systeme" — blueprint lines pulse. "qui n'existe pas encore." — ghost blocks flicker, semi-transparent.
- **490–539:** Blueprint lines pulse with purple-to-cyan gradient rhythm. The image of a system exists in negative. Dotted lines begin to densify, transitioning into Act 4.

### Act 4 — Construction (frames 540–749, 7s)

**Script:** "On le construit avec vous." + Challengers Lab brand reveal

**Visual concept:** Ghost blocks materialize one by one with satisfying springs. Dotted lines become solid circuit lines. Everything connects. Pulse. Camera pulls back. Brand reveal.

**Frame-by-frame:**

- **540–580:** MATERIALIZATION. One by one (6-frame stagger), ghost blocks become SOLID. Spring animation (overshoot 1.1x -> settle 1x). Micro-shockwave at each snap. Opacity 20% -> 100%.
- **580–630:** CIRCUIT. Blueprint dotted lines become SOLID lines. Left-to-right animation like electric current. Purple-to-cyan gradient pulses along lines. Glow on connections.
- **630–660:** All elements connected. SINGLE PULSE — wave traverses entire system from center to edges. Like a heartbeat. Scale 1x -> 1.02x -> 1x. All elements react simultaneously.
- **660–700:** CAMERA PULLBACK — progressive zoom out (scale 1x -> 0.85x). Full system visible, organized, alive. Micro-animations resume in all blocks (cursors, progress bars — now EVERYTHING works, including pipeline and deals).
- **700–720:** KineticText — "On le construit avec vous." Spring stagger. System contracts slightly, "Challengers Lab" emerges from center in GradientText (purple->cyan), large size.
- **720–749:** Fade to black. Challengers Lab name remains visible longest. Last element on screen.

## New Components

| Component | Purpose |
|-----------|---------|
| `IsometricScene` | 3D container with CSS perspective + camera orbit/shake/pullback |
| `UIBlock3D` | UI block with 3D faces, configurable micro-animations (cursor, loader, progress, checkmark) |
| `VortexEffect` | Gravitational attraction toward center point with spring physics |
| `CameraShake` | Parametric camera shake (intensity, duration, decay) |
| `KineticText` | Per-character typography with spring stagger + visual callbacks on each word |
| `BlueprintGrid` | SVG animated lines drawing grid positions + dotted connection lines |
| `GhostBlock` | Holographic/transparent UI block with scanlines, vibration, flicker |
| `CircuitLines` | Connection lines that illuminate like electric circuits, left-to-right with gradient |
| `CursorClick` | Animated cursor with click ripple effect |

## Reused Components

- `ParticleField` — ambient particles, parallax foreground layer
- `Orb` — ambient glow (Act 1 background, Act 3 void)
- `ShockwaveEffect` — miniature per-letter ripples in Act 2, micro-shockwaves in Act 4
- `GradientText` — Challengers Lab brand reveal

## Removed Components

- `FloatingUIBlocks` -> replaced by `UIBlock3D`
- `Typewriter` -> replaced by `KineticText`
- `NetworkGraph` -> replaced by `BlueprintGrid` + `CircuitLines`
- `SplitScreen` -> removed (no longer needed)
- `GridOverlay` -> integrated into `IsometricScene`

## Scene Architecture

```
IsometricScene (perspective container + camera state)
  |-- Grid background layer (integrated)
  |-- Orb layer (ambient glow)
  |-- UIBlock3D[] (6-8 blocks, each with type + state)
  |-- ParticleField (foreground parallax)
  |-- KineticText (text layer, z-index above blocks)
  |-- VortexEffect (Act 2 only)
  |-- BlueprintGrid (Act 3-4)
  |-- GhostBlock[] (Act 3, transitions to UIBlock3D in Act 4)
  |-- CircuitLines (Act 4)
  |-- CursorClick (Act 4 finale)
  |-- Brand reveal text (Act 4 finale)
```

## Color Palette

- Purple: #7B5EFF (primary brand)
- Cyan: #00F5FF (secondary brand)
- Active blocks: white/light gray with purple accents
- Dead blocks: #333 gray, red (#FF4444) for negative indicators
- Blueprint lines: purple at 30% opacity
- Circuit lines: purple->cyan gradient at full opacity
- Background: #0A0A0F (near-black)

## Design Principles

1. **Show, don't tell** — the visual tells the story; text reinforces, not carries
2. **Continuity** — the same UI elements transform across all 4 acts
3. **Text lives IN the scene** — kinetic typography reacts to and affects the visual world
4. **Escalating complexity** — Act 1 simple orbit, Act 2 destruction, Act 3 revelation, Act 4 full system
5. **Brand as resolution** — Challengers Lab name emerges from the completed system, not slapped on top
