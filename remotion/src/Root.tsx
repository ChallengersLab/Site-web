import React from "react";
import { Composition } from "remotion";
import { HeroDiagnostic } from "./HeroDiagnostic";
import { CircleAnimation } from "./CircleAnimation";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroDiagnostic"
        component={HeroDiagnostic}
        durationInFrames={750}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CircleAnimation"
        component={CircleAnimation}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
