import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Act1Mirror } from "./scenes/Act1Mirror";
import { Act2Rupture } from "./scenes/Act2Rupture";

export const HeroDiagnostic: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0F" }}>
      <Sequence from={0} durationInFrames={240} name="Act 1 — Mirror">
        <Act1Mirror />
      </Sequence>
      <Sequence from={240} durationInFrames={120} name="Act 2 — Rupture">
        <Act2Rupture />
      </Sequence>
    </AbsoluteFill>
  );
};
