import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { PURPLE } from "../config";

interface Props {
  startFrame: number;
  targetX: number;
  targetY: number;
  fromX?: number;
  fromY?: number;
  travelFrames?: number;
}

export const CursorClick: React.FC<Props> = ({
  startFrame,
  targetX,
  targetY,
  fromX = 1600,
  fromY = 800,
  travelFrames = 20,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = frame - startFrame;

  if (elapsed < 0) return null;

  const moveProgress = interpolate(elapsed, [0, travelFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const easedMove = 1 - Math.pow(1 - moveProgress, 3);
  const curX = fromX + (targetX - fromX) * easedMove;
  const curY = fromY + (targetY - fromY) * easedMove;

  const clickFrame = elapsed - travelFrames;
  const clicked = clickFrame >= 0;

  const clickScale = clicked
    ? spring({
        frame: clickFrame,
        fps,
        config: { damping: 10, stiffness: 300, mass: 0.3 },
      })
    : 0;

  const rippleProgress = clicked
    ? interpolate(clickFrame, [0, 15], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 50, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: curX,
          top: curY,
          transform: `scale(${clicked ? 0.85 + clickScale * 0.15 : 1})`,
        }}
      >
        <svg width={24} height={32} viewBox="0 0 24 32" fill="none">
          <path
            d="M2 2L2 26L8 20L14 30L18 28L12 18L20 18L2 2Z"
            fill="white"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth={1}
          />
        </svg>
      </div>

      {clicked && rippleProgress < 1 && (
        <div
          style={{
            position: "absolute",
            left: targetX - 50,
            top: targetY - 50,
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: `2px solid ${PURPLE}`,
            transform: `scale(${1 + rippleProgress * 3})`,
            opacity: 1 - rippleProgress,
          }}
        />
      )}
    </div>
  );
};
