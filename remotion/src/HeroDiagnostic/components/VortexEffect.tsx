interface VortexInput {
  x: number;
  y: number;
  attraction: number;
}

interface VortexOutput {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
}

export function useVortex(
  elements: VortexInput[],
  centerX: number,
  centerY: number,
  progress: number,
  frame: number,
): VortexOutput[] {
  return elements.map((el, i) => {
    const dx = centerX - el.x;
    const dy = centerY - el.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const pull = Math.pow(progress, 1.5) * el.attraction;

    const spiralAngle = angle + pull * Math.PI * 1.5;
    const spiralDist = dist * (1 - pull);

    const newX = centerX - Math.cos(spiralAngle) * spiralDist;
    const newY = centerY - Math.sin(spiralAngle) * spiralDist;

    const rotation = pull * 360 * (i % 2 === 0 ? 1 : -1) + Math.sin(frame * 0.1 + i) * pull * 30;
    const scale = 1 - pull * 0.7;
    const opacity = 1 - Math.pow(pull, 2);

    return { x: newX, y: newY, scale, rotation, opacity };
  });
}
