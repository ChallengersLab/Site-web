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
export const FUSED_RADIUS = 300;

// === Timing (30fps, 540 frames = 18s) ===
export const FPS = 30;
export const TOTAL_FRAMES = 600;

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

  // Phase 5: Benefits (13.3-16s)
  fusedNodes: { start: 400, end: 420 },
  fusedWords: { start: 420, end: 480 },
  fusedLoop: { start: 400, end: 490 },

  // Phase 6: Fade to black (16.3-17.3s)
  fadeToBlack: { start: 490, end: 520 },

  // Phase 7: CTA on black (17.3-20s)
  ctaIn: { start: 525, end: 540 },
  ctaOut: { start: 580, end: 600 },

  // Global fade (used for particles/grain)
  fadeOut: { start: 580, end: 600 },
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
  { angle: 350, label: "Tâches manuelles" },
  { angle: 300, label: "Prospection au hasard" },
  { angle: 190, label: "Données en silo" },
  { angle: 250, label: "Croissance bloquée" },
];

export const CIRCLE2_NODES: NodeConfig[] = [
  { angle: 10, label: "Audit Sales & IA" },
  { angle: 60, label: "Stratégie data-driven" },
  { angle: 120, label: "Automatisation IA" },
  { angle: 170, label: "Pilotage performance" },
];

export const FUSED_NODES: NodeConfig[] = [
  { angle: 0, label: "Temps libéré" },
  { angle: 90, label: "Zéro tâche manuelle" },
  { angle: 180, label: "Croissance prévisible" },
  { angle: 270, label: "Équipe qui scale" },
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
  { text: "Encore un tableur", startFrame: 55, angle: 30, distance: 440, size: 34, rotateZ: -2 },
  { text: "Relance manuelle", startFrame: 70, angle: 330, distance: 450, size: 32, rotateZ: 1.5 },
  { text: "Aucune visibilité", startFrame: 85, angle: 150, distance: 445, size: 34, rotateZ: -1 },
  { text: "Pas de suivi", startFrame: 100, angle: 210, distance: 450, size: 32, rotateZ: 2 },
  { text: "Reporting à la main", startFrame: 115, angle: 75, distance: 440, size: 30, rotateZ: -1.5 },
  { text: "Perdu dans le CRM", startFrame: 130, angle: 255, distance: 455, size: 32, rotateZ: 1 },
];

export const CIRCLE2_WORDS: FlashWordConfig[] = [
  { text: "Scoring IA", startFrame: 200, angle: 15, distance: 430, size: 34, rotateZ: -1.5 },
  { text: "Agents IA", startFrame: 212, angle: 50, distance: 420, size: 32, rotateZ: 2 },
  { text: "Playbook sales", startFrame: 224, angle: 90, distance: 390, size: 34, rotateZ: -1 },
  { text: "Process automatisé", startFrame: 234, angle: 130, distance: 420, size: 32, rotateZ: 1.5 },
  { text: "Workflows IA", startFrame: 244, angle: 160, distance: 430, size: 30, rotateZ: -2 },
  { text: "Formation continue", startFrame: 254, angle: 185, distance: 420, size: 32, rotateZ: 1 },
];

export const FUSED_WORDS: FlashWordConfig[] = [
  { text: "Fini les tableurs", startFrame: 415, angle: 45, distance: 560, size: 38, rotateZ: -1 },
  { text: "Des heures récupérées", startFrame: 428, angle: 100, distance: 580, size: 34, rotateZ: 1.5 },
  { text: "Revenu prévisible", startFrame: 441, angle: 135, distance: 540, size: 38, rotateZ: -2 },
  { text: "L'IA bosse pour vous", startFrame: 452, angle: 225, distance: 540, size: 36, rotateZ: 1 },
  { text: "Pipeline qui roule", startFrame: 462, angle: 260, distance: 580, size: 34, rotateZ: -1.5 },
  { text: "Équipe focus", startFrame: 472, angle: 315, distance: 560, size: 34, rotateZ: 2 },
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
