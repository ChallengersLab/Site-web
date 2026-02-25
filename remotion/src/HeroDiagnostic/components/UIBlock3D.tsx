import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import type { BlockType, BlockState } from "../types";
import { PURPLE, CYAN, DEAD_GRAY, DEAD_RED, GRID_CELL_W, GRID_CELL_H } from "../config";

interface Props {
  type: BlockType;
  state: BlockState;
  x: number;
  y: number;
  delay?: number;
  opacity?: number;
  transform?: string;
  scale?: number;
  halo?: boolean;
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
  const elapsed = frame - delay;

  if (elapsed < 0) return null;

  const fadeIn = interpolate(elapsed, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isActive = state === "active" || state === "solid";
  const isDead = state === "dead";

  const driftX = Math.sin(frame * 0.015 + x * 0.01) * 4;
  const driftY = Math.cos(frame * 0.012 + y * 0.01) * 3;

  const cardBg = isActive
    ? "rgba(255,255,255,0.06)"
    : isDead
      ? "rgba(255,255,255,0.02)"
      : "rgba(255,255,255,0.04)";

  const borderColor = isActive
    ? "rgba(123,94,255,0.3)"
    : isDead
      ? "rgba(255,255,255,0.05)"
      : "rgba(123,94,255,0.15)";

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
        transform:
          transformOverride ??
          `translate(${driftX}px, ${driftY}px) scale(${finalScale}) rotateX(2deg) rotateY(-3deg)`,
        transformStyle: "preserve-3d",
        zIndex: Math.round(y),
      }}
    >
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

        <BlockContent type={type} state={state} frame={frame} />
      </div>
    </div>
  );
};

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
                  {checked ? "\u2713" : ""}
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
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {[0, 1, 2].map((i) => {
            const maxW = [30, 15, 8][i];
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
                    : "rgba(255,255,255,0.06)",
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
