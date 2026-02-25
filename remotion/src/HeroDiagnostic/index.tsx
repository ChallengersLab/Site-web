import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Act1Mirror } from "./scenes/Act1Mirror";
import { Act2Rupture } from "./scenes/Act2Rupture";
import { Act3Diagnostic } from "./scenes/Act3Diagnostic";
import { Act4Construction } from "./scenes/Act4Construction";

export const HeroDiagnostic: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0F" }}>
      <Sequence from={0} durationInFrames={240} name="Act 1 — Miroir">
        <Act1Mirror />
      </Sequence>
      <Sequence from={240} durationInFrames={120} name="Act 2 — Rupture">
        <Act2Rupture />
      </Sequence>
      <Sequence from={360} durationInFrames={180} name="Act 3 — Diagnostic">
        <Act3Diagnostic />
      </Sequence>
      <Sequence from={540} durationInFrames={210} name="Act 4 — Construction">
        <Act4Construction />
      </Sequence>
    </AbsoluteFill>
  );
};
