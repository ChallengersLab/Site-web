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

/** Convert grid position to pixel position (centered on 1920x1080) */
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
