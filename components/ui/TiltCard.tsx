"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/use-tilt";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard({
  children,
  className = "",
  intensity = 6,
}: TiltCardProps) {
  const { ref, style, onMouseMove: tiltMove, onMouseLeave: tiltLeave } = useTilt(intensity);
  const glowRef = useRef<HTMLDivElement>(null);
  const [glowVisible, setGlowVisible] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      tiltMove(e);
      if (glowRef.current) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        glowRef.current.style.left = `${e.clientX - rect.left}px`;
        glowRef.current.style.top = `${e.clientY - rect.top}px`;
      }
      setGlowVisible(true);
    },
    [tiltMove]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      tiltLeave();
      setGlowVisible(false);
    },
    [tiltLeave]
  );

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(123,94,255,0.08) 0%, transparent 70%)",
          opacity: glowVisible ? 1 : 0,
        }}
      />
      {children}
    </motion.div>
  );
}
