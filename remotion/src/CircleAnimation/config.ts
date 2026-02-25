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
  angle: number;
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
  x: number;
  y: number;
  size: number;
  rotateZ: number;
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
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER_X + Math.cos(rad) * radius,
    y: CENTER_Y + Math.sin(rad) * radius,
  };
}
