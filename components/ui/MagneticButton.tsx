"use client";

import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/use-magnetic";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  size?: "default" | "large";
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  href,
  size = "default",
  className = "",
  onClick,
}: MagneticButtonProps) {
  const { ref, style, onMouseMove, onMouseLeave } = useMagnetic(0.3);

  const sizeClasses =
    size === "large"
      ? "px-10 py-5 text-lg rounded-2xl"
      : "px-7 py-3 text-sm rounded-xl";

  const content = (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative inline-flex items-center justify-center font-semibold
        bg-gradient-to-r from-accent-start to-accent-end text-white
        shadow-[0_0_20px_rgba(123,94,255,0.3),0_0_40px_rgba(123,94,255,0.15)]
        hover:shadow-[0_0_30px_rgba(123,94,255,0.4),0_0_60px_rgba(123,94,255,0.2)]
        transition-shadow duration-300 cursor-pointer overflow-hidden
        ${sizeClasses} ${className}
      `}
      onClick={onClick}
    >
      {/* Shine effect */}
      <span
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background:
            "linear-gradient(30deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)",
          animation: "shine 8s infinite",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}
