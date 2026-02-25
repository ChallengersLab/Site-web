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
  angle: number; // degrees from center (0=top, clockwise)
  distance: number; // px from circle center
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
  cy: number = CENTER_Y,
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + Math.cos(rad) * radius,
    y: cy + Math.sin(rad) * radius,
  };
}
