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
export const TOTAL_FRAMES = 660;

export const TIMING = {
  // Phase 1: Vicious circle (0-6s)
  fadeIn: { start: 0, end: 15 },
  circle1Draw: { start: 15, end: 35 },
  circle1Nodes: { start: 30, end: 50 },
  circle1Words: { start: 70, end: 175 },
  viciousLoop: { start: 45, end: 180 },

  // Phase 2: Method circle enters (6-10s)
  circle2Draw: { start: 180, end: 200 },
  circle2Nodes: { start: 195, end: 215 },
  circle2Words: { start: 235, end: 310 },
  methodLoop: { start: 200, end: 315 },

  // Phase 3: Rapprochement (10.5-13s)
  slideStart: { start: 315, end: 315 },
  slideEnd: { start: 390, end: 390 },
  vennGlow: { start: 350, end: 390 },
  nodesFadeOut: { start: 315, end: 370 },

  // Phase 4: Fusion (13-14s)
  fusionPulse: { start: 390, end: 405 },
  fusionFlash: { start: 395, end: 408 },
  fusionMerge: { start: 400, end: 425 },

  // Phase 5: Benefits (14-17.3s)
  fusedNodes: { start: 425, end: 450 },
  fusedWords: { start: 470, end: 545 },
  fusedLoop: { start: 425, end: 550 },

  // Phase 6: Fade to black (18.3-19s)
  fadeToBlack: { start: 550, end: 575 },

  // Phase 7: CTA on black (19.2-22s)
  ctaIn: { start: 580, end: 595 },
  ctaOut: { start: 640, end: 660 },

  // Global fade (used for particles/grain)
  fadeOut: { start: 640, end: 660 },
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
  { angle: 90, label: "Données en silo" },
  { angle: 180, label: "Croissance bloquée" },
  { angle: 270, label: "Prospection au hasard" },
];

export const CIRCLE2_NODES: NodeConfig[] = [
  { angle: 0, label: "Audit Sales & IA" },
  { angle: 90, label: "Stratégie data-driven" },
  { angle: 180, label: "Pilotage performance" },
  { angle: 270, label: "Automatisation IA" },
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
  { text: "Encore un tableur", startFrame: 70, angle: 30, distance: 440, size: 34, rotateZ: -2 },
  { text: "Relance manuelle", startFrame: 90, angle: 330, distance: 450, size: 32, rotateZ: 1.5 },
  { text: "Aucune visibilité", startFrame: 110, angle: 150, distance: 445, size: 34, rotateZ: -1 },
  { text: "Pas de suivi", startFrame: 128, angle: 210, distance: 450, size: 32, rotateZ: 2 },
  { text: "Reporting à la main", startFrame: 145, angle: 75, distance: 440, size: 30, rotateZ: -1.5 },
  { text: "Perdu dans le CRM", startFrame: 160, angle: 255, distance: 455, size: 32, rotateZ: 1 },
];

export const CIRCLE2_WORDS: FlashWordConfig[] = [
  { text: "Scoring IA", startFrame: 235, angle: 15, distance: 430, size: 34, rotateZ: -1.5 },
  { text: "Agents IA", startFrame: 250, angle: 50, distance: 420, size: 32, rotateZ: 2 },
  { text: "Playbook sales", startFrame: 265, angle: 90, distance: 390, size: 34, rotateZ: -1 },
  { text: "Process automatisé", startFrame: 278, angle: 130, distance: 420, size: 32, rotateZ: 1.5 },
  { text: "Workflows IA", startFrame: 290, angle: 160, distance: 430, size: 30, rotateZ: -2 },
  { text: "Formation continue", startFrame: 302, angle: 185, distance: 420, size: 32, rotateZ: 1 },
];

export const FUSED_WORDS: FlashWordConfig[] = [
  { text: "Fini les tableurs", startFrame: 470, angle: 45, distance: 560, size: 38, rotateZ: -1 },
  { text: "Des heures récupérées", startFrame: 488, angle: 100, distance: 580, size: 34, rotateZ: 1.5 },
  { text: "Revenu prévisible", startFrame: 504, angle: 135, distance: 540, size: 38, rotateZ: -2 },
  { text: "L'IA bosse pour vous", startFrame: 518, angle: 225, distance: 540, size: 36, rotateZ: 1 },
  { text: "Pipeline qui roule", startFrame: 530, angle: 260, distance: 580, size: 34, rotateZ: -1.5 },
  { text: "Équipe focus", startFrame: 540, angle: 315, distance: 560, size: 34, rotateZ: 2 },
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
