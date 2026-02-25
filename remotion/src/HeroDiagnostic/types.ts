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
