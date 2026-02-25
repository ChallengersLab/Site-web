export function getCameraShake(
  frame: number,
  startFrame: number,
  durationFrames: number,
  intensity: number = 15,
): { offsetX: number; offsetY: number } {
  const elapsed = frame - startFrame;
  if (elapsed < 0 || elapsed > durationFrames) {
    return { offsetX: 0, offsetY: 0 };
  }

  const decay = Math.exp(-elapsed / (durationFrames * 0.3));
  const t = elapsed * 0.8;

  return {
    offsetX: Math.sin(t * 7.3) * intensity * decay,
    offsetY: Math.cos(t * 5.1) * intensity * decay * 0.7,
  };
}
