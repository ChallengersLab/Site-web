import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { FPS, W, H } from "../config";

interface FlashWordProps {
  text: string;
  startFrame: number;
  x: number;
  y: number;
  size: number;
  rotateZ: number;
  glowColor: string;
}

const VISIBLE_DURATION = 20;
const FADE_OUT_DURATION = 12;

export const FlashWord: React.FC<FlashWordProps> = ({
  text,
  startFrame,
  x,
  y,
  size,
  rotateZ,
  glowColor,
}) => {
  const frame = useCurrentFrame();

  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame > VISIBLE_DURATION + FADE_OUT_DURATION + 5) {
    return null;
  }

  const scaleSpring = spring({
    frame: localFrame,
    fps: FPS,
    config: { damping: 15, stiffness: 120, mass: 0.8 },
  });
  const scale = interpolate(scaleSpring, [0, 1], [0.6, 1]);

  const rotateY = interpolate(
    localFrame,
    [0, 10],
    [15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const fadeIn = interpolate(
    localFrame,
    [0, 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const fadeOut = interpolate(
    localFrame,
    [VISIBLE_DURATION, VISIBLE_DURATION + FADE_OUT_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = fadeIn * fadeOut;

  if (opacity <= 0.01) return null;

  const pixelX = (x / 100) * W;
  const pixelY = (y / 100) * H;

  return (
    <div
      style={{
        position: "absolute",
        left: pixelX,
        top: pixelY,
        transform: `translate(-50%, -50%) scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        transformStyle: "preserve-3d",
        perspective: 800,
        opacity,
        pointerEvents: "none",
        zIndex: 15,
      }}
    >
      <span
        style={{
          color: "#FFFFFF",
          fontSize: size,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          whiteSpace: "nowrap",
          textShadow: `0 0 30px ${glowColor}, 0 0 60px ${glowColor}, 0 0 100px ${glowColor}`,
          letterSpacing: "-0.02em",
        }}
      >
        {text}
      </span>
    </div>
  );
};
