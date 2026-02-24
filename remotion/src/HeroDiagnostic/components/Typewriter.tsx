import React from "react";
import { useCurrentFrame } from "remotion";

interface TypewriterProps {
  text: string;
  startFrame: number;
  msPerChar?: number;
  style?: React.CSSProperties;
  cursorColor?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  startFrame,
  msPerChar = 40,
  style,
  cursorColor = "#888",
}) => {
  const frame = useCurrentFrame();

  const framesPerChar = Math.round((msPerChar / 1000) * 30);
  const elapsed = Math.max(0, frame - startFrame);
  const charsVisible = Math.min(text.length, Math.floor(elapsed / framesPerChar));

  const showCursor = frame % 20 < 14;

  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color: "#888",
        fontSize: 32,
        ...style,
      }}
    >
      {text.slice(0, charsVisible)}
      <span
        style={{
          opacity: showCursor ? 1 : 0,
          color: cursorColor,
        }}
      >
        |
      </span>
    </span>
  );
};
