"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export type AnimationVariant = "fade-up" | "fade-scale" | "fade-blur";

const variants = {
  "fade-up": {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  "fade-scale": {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
  "fade-blur": {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
};

export function useScrollAnimation(
  variant: AnimationVariant = "fade-up",
  options?: { once?: boolean; margin?: string }
) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: (options?.margin ?? "-100px") as `${number}px`,
  });

  return {
    ref,
    isInView,
    initial: variants[variant].initial,
    animate: isInView ? variants[variant].animate : variants[variant].initial,
  };
}
