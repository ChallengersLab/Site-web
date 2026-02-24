import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface SplitScreenProps {
  leftLabel: string;
  rightLabel: string;
  startFrame: number;
}

export const SplitScreen: React.FC<SplitScreenProps> = ({
  leftLabel,
  rightLabel,
  startFrame,
}) => {
  const frame = useCurrentFrame();

  const animProgress = interpolate(
    frame,
    [startFrame, startFrame + 25],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Left text: slides in from -80px
  const leftX = interpolate(animProgress, [0, 1], [-80, 0]);
  const leftOpacity = animProgress;

  // Right text: slides in from +80px
  const rightX = interpolate(animProgress, [0, 1], [80, 0]);
  const rightOpacity = animProgress;

  // Center divider grows from 0 to 60% height
  const dividerHeight = interpolate(animProgress, [0, 1], [0, 60]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      {/* Left text */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: leftOpacity,
          transform: `translateX(${leftX}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 36,
            color: "#FFFFFF",
            textAlign: "center",
            textShadow: "0 0 40px rgba(123,94,255,0.3)",
            lineHeight: 1.3,
            padding: "0 40px",
          }}
        >
          {leftLabel}
        </span>
      </div>

      {/* Center divider */}
      <div
        style={{
          width: 2,
          height: `${dividerHeight}%`,
          background: "linear-gradient(180deg, #7B5EFF, #00F5FF)",
          flexShrink: 0,
        }}
      />

      {/* Right text */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: rightOpacity,
          transform: `translateX(${rightX}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 36,
            color: "#FFFFFF",
            textAlign: "center",
            textShadow: "0 0 40px rgba(0,245,255,0.3)",
            lineHeight: 1.3,
            padding: "0 40px",
          }}
        >
          {rightLabel}
        </span>
      </div>
    </div>
  );
};
