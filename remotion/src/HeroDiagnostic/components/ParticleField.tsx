import React, { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface ParticleFieldProps {
  count: number;
  color: string;
  speed: number;
  opacity: number;
  connectDistance?: number;
  connectColor?: string;
  seed?: number;
  fadeInFrames?: number;
}

interface Particle {
  initialX: number;
  initialY: number;
  size: number;
  opacityMultiplier: number;
}

// Canvas dimensions (1920x1080)
const W = 1920;
const H = 1080;

/**
 * Deterministic pseudo-random using sin.
 * Returns a value in [0, 1].
 */
const seededRandom = (a: number, b: number): number => {
  const val = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return val - Math.floor(val);
};

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count,
  color,
  speed,
  opacity,
  connectDistance,
  connectColor,
  seed = 42,
  fadeInFrames = 30,
}) => {
  const frame = useCurrentFrame();

  // Pre-compute particles and connection pairs (deterministic, memoized)
  const { particles, connectionPairs } = useMemo(() => {
    const pts: Particle[] = [];
    for (let i = 0; i < count; i++) {
      pts.push({
        initialX: seededRandom(i, seed) * W,
        initialY: seededRandom(i + 1000, seed + 7) * H,
        size: 2 + (i % 3),
        opacityMultiplier: 0.5 + 0.5 * Math.sin(i * 3.7),
      });
    }

    // Pre-compute connection pairs based on initial positions
    const pairs: Array<[number, number]> = [];
    if (connectDistance && connectDistance > 0) {
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].initialX - pts[j].initialX;
          const dy = pts[i].initialY - pts[j].initialY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // Use a slightly larger threshold for pre-computation since particles drift
          if (dist < connectDistance * 1.3) {
            pairs.push([i, j]);
          }
        }
      }
    }

    return { particles: pts, connectionPairs: pairs };
  }, [count, seed, connectDistance]);

  // Compute current positions for this frame
  const currentPositions = useMemo(() => {
    return particles.map((p, i) => ({
      x: p.initialX + Math.sin(frame * speed * 0.02 + i * 1.7) * 30,
      y: p.initialY + Math.cos(frame * speed * 0.015 + i * 2.3) * 20,
    }));
  }, [particles, frame, speed]);

  // Global fade-in
  const globalOpacity = interpolate(frame, [0, fadeInFrames], [0, opacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineColor = connectColor || "rgba(255,255,255,0.08)";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Connection lines SVG */}
      {connectDistance && connectDistance > 0 && connectionPairs.length > 0 && (
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: W,
            height: H,
          }}
        >
          {connectionPairs.map(([i, j]) => {
            const a = currentPositions[i];
            const b = currentPositions[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > connectDistance) return null;

            const lineOpacity =
              (1 - dist / connectDistance) * 0.08 * (globalOpacity / Math.max(opacity, 0.01));

            return (
              <line
                key={`${i}-${j}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={lineColor}
                strokeWidth={0.75}
                opacity={lineOpacity}
              />
            );
          })}
        </svg>
      )}

      {/* Particles */}
      {particles.map((p, i) => {
        const pos = currentPositions[i];
        const particleOpacity = globalOpacity * p.opacityMultiplier;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.x - p.size / 2,
              top: pos.y - p.size / 2,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: color,
              opacity: particleOpacity,
            }}
          />
        );
      })}
    </div>
  );
};
