"use client";

import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/use-magnetic";
import { ArrowRight } from "lucide-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  size?: "default" | "large";
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
  arrow?: boolean;
}

export function MagneticButton({
  children,
  href,
  size = "default",
  variant = "primary",
  className = "",
  onClick,
  arrow = false,
}: MagneticButtonProps) {
  const { ref, style, onMouseMove, onMouseLeave } = useMagnetic(0.25);

  const sizeClasses =
    size === "large"
      ? "px-8 py-4 text-base gap-3"
      : "px-6 py-3 text-sm gap-2";

  const variantClasses =
    variant === "primary"
      ? "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
      : "border border-white/10 text-white/70 hover:border-white/20 hover:text-white";

  const content = (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        group inline-flex items-center justify-center font-semibold
        rounded-xl cursor-pointer transition-all duration-300
        ${sizeClasses} ${variantClasses} ${className}
      `}
      onClick={onClick}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      )}
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
