import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";

interface WordEffect {
  word: string;
  style?: React.CSSProperties;
  onRevealFrame?: number;
}

interface Props {
  text: string;
  startFrame: number;
  framePersChar?: number;
  style?: React.CSSProperties;
  wordEffects?: WordEffect[];
  fontFamily?: string;
  blueprint?: boolean;
}

export const KineticText: React.FC<Props> = ({
  text,
  startFrame,
  framePersChar = 2,
  style,
  wordEffects = [],
  fontFamily = "'Instrument Serif', serif",
  blueprint = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = frame - startFrame;

  if (elapsed < 0) return null;

  const chars = text.split("");

  const words = text.split(" ");
  let charIndex = 0;
  const charToWord: number[] = [];
  words.forEach((word, wordIdx) => {
    for (let i = 0; i < word.length; i++) {
      charToWord[charIndex] = wordIdx;
      charIndex++;
    }
    if (wordIdx < words.length - 1) {
      charToWord[charIndex] = wordIdx;
      charIndex++;
    }
  });

  const getWordStyle = (wordIdx: number): React.CSSProperties => {
    const word = words[wordIdx];
    const effect = wordEffects.find((e) => word.includes(e.word));
    return effect?.style ?? {};
  };

  const baseFont = blueprint ? "'JetBrains Mono', monospace" : fontFamily;

  return (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        fontFamily: baseFont,
        fontSize: 52,
        color: "#FFFFFF",
        lineHeight: 1.3,
        textAlign: "center",
        ...style,
      }}
    >
      {chars.map((char, i) => {
        const charDelay = i * framePersChar;
        const charElapsed = elapsed - charDelay;

        if (charElapsed < 0)
          return (
            <span key={i} style={{ opacity: 0 }}>
              {char === " " ? "\u00A0" : char}
            </span>
          );

        const s = spring({
          frame: charElapsed,
          fps,
          config: { damping: 12, stiffness: 200, mass: 0.5 },
        });

        const wordIdx = charToWord[i] ?? 0;
        const wordStyle = getWordStyle(wordIdx);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: s,
              transform: `translateY(${(1 - s) * 20}px) scale(${0.8 + s * 0.2})`,
              ...wordStyle,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};
