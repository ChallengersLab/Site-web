"use client";

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
  const { ref, style, onMouseMove, onMouseLeave } = useTilt(intensity);

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
