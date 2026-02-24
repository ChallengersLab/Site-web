"use client";

import { useCallback, useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const particleOptions: ISourceOptions = {
  fullScreen: false,
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    color: { value: ["#7B5EFF", "#00F5FF"] },
    links: {
      color: "#7B5EFF",
      distance: 150,
      enable: true,
      opacity: 0.1,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    number: {
      value: 80,
      density: { enable: true },
    },
    opacity: {
      value: { min: 0.3, max: 0.5 },
    },
    shape: { type: "circle" },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
  responsive: [
    {
      maxWidth: 768,
      options: {
        particles: {
          number: { value: 30 },
        },
      },
    },
  ],
};

export function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    loadSlim(window.tsParticles as unknown as Engine).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0"
      options={particleOptions}
    />
  );
}
