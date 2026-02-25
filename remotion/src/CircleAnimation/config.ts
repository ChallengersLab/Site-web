// remotion/src/CircleAnimation/config.ts

// === Dimensions ===
export const W = 1920;
export const H = 1080;
export const CENTER_X = W / 2;
export const CENTER_Y = H / 2;
export const CIRCLE_RADIUS = 280;

// === Timing (30fps, 540 frames = 18s) ===
export const FPS = 30;
export const TOTAL_FRAMES = 540;

export const TIMING = {
  // Phase 1: Vicious circle (0-6s)
  fadeIn: { start: 0, end: 15 },
  circleDraw: { start: 15, end: 38 },
  nodesAppear: { start: 30, end: 52 },
  viciousLoop: { start: 45, end: 180 },

  // Phase 2: Transition (6-9s)
  slowDown: { start: 180, end: 195 },
  pulse: { start: 195, end: 204 },
  fragment: { start: 202, end: 213 },
  flash: { start: 210, end: 216 },
  blackout: { start: 216, end: 237 },
  reform: { start: 238, end: 270 },

  // Phase 3: Virtuous circle (9-18s)
  virtuousLoop: { start: 270, end: 517 },
  fadeOut: { start: 517, end: 540 },
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
  { text: "Encore un tableur", startFrame: 55, x: 12, y: 18, size: 52, rotateZ: -2 },
  { text: "Relance manuelle", startFrame: 78, x: 72, y: 22, size: 44, rotateZ: 1.5 },
  { text: "Pas de suivi", startFrame: 100, x: 8, y: 75, size: 60, rotateZ: -1 },
  { text: "Aucune visibilité", startFrame: 122, x: 68, y: 72, size: 48, rotateZ: 2 },
  { text: "Réunion de plus", startFrame: 144, x: 18, y: 45, size: 42, rotateZ: -1.5 },
  { text: "Perdu dans le CRM", startFrame: 162, x: 65, y: 48, size: 56, rotateZ: 1 },
];

export const VIRTUOUS_WORDS: FlashWordConfig[] = [
  { text: "Automatisé", startFrame: 290, x: 10, y: 20, size: 56, rotateZ: -1.5 },
  { text: "Pipeline clair", startFrame: 325, x: 74, y: 18, size: 48, rotateZ: 2 },
  { text: "Données en temps réel", startFrame: 365, x: 6, y: 72, size: 44, rotateZ: -1 },
  { text: "Relance intelligente", startFrame: 400, x: 70, y: 75, size: 52, rotateZ: 1.5 },
  { text: "Score prédictif", startFrame: 440, x: 15, y: 48, size: 60, rotateZ: -2 },
  { text: "Croissance visible", startFrame: 475, x: 68, y: 45, size: 50, rotateZ: 1 },
];

// === Utility: convert angle + radius to x/y ===
export function angleToXY(angleDeg: number, radius: number): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER_X + Math.cos(rad) * radius,
    y: CENTER_Y + Math.sin(rad) * radius,
  };
}
