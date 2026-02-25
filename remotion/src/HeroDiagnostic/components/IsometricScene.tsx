import React from "react";
import { AbsoluteFill } from "remotion";
import type { CameraState } from "../types";
import { BG } from "../config";

interface Props {
  camera: CameraState;
  children: React.ReactNode;
}

export const IsometricScene: React.FC<Props> = ({ camera, children }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: `${camera.perspective}px`,
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: [
              `scale(${camera.scale})`,
              `rotateY(${camera.orbitDeg}deg)`,
              `rotateX(12deg)`,
              `translate(${camera.offsetX}px, ${camera.offsetY}px)`,
            ].join(" "),
            transformStyle: "preserve-3d",
            transition: "none",
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
