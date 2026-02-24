import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Act1Mirror } from "./scenes/Act1Mirror";

export const HeroDiagnostic: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0F" }}>
      <Sequence from={0} durationInFrames={240} name="Act 1 — Mirror">
        <Act1Mirror />
      </Sequence>
    </AbsoluteFill>
  );
};
