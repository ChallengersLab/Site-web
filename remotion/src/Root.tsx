import { Composition } from "remotion";
import { HeroDiagnostic } from "./HeroDiagnostic";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HeroDiagnostic"
      component={HeroDiagnostic}
      durationInFrames={750}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
