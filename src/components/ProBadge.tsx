"use client";

import React from "react";
import { Crown } from "lucide-react";

interface ProBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "cyan" | "gold";
}

export function ProBadge({
  className = "",
  size = "sm",
  variant = "cyan",
}: ProBadgeProps) {
  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-[10px] gap-1",
    md: "px-2 py-0.5 text-[11px] gap-1.5",
    lg: "px-2.5 py-1 text-xs gap-1.5",
  }[size];

  const iconSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5",
  }[size];

  const variantClasses =
    variant === "gold"
      ? "bg-gradient-to-r from-amber-500/20 via-yellow-400/15 to-amber-500/20 border-amber-400/60 dark:border-yellow-400/70 text-amber-700 dark:text-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.35)]"
      : "bg-cyan-500/15 dark:bg-neon-cyan/20 border-cyan-400/50 dark:border-neon-cyan/60 text-cyan-700 dark:text-neon-cyan shadow-[0_0_8px_rgba(0,245,255,0.3)]";

  return (
    <span
      className={`inline-flex items-center rounded-md font-mono font-black uppercase tracking-wider border shrink-0 select-none ${sizeClasses} ${variantClasses} ${className}`}
    >
      <Crown
        className={`${iconSizes} ${
          variant === "gold"
            ? "fill-amber-500 dark:fill-yellow-400 text-amber-500 dark:text-yellow-400"
            : "fill-cyan-500 dark:fill-neon-cyan text-cyan-500 dark:text-neon-cyan"
        }`}
      />
      <span>PRO</span>
    </span>
  );
}

export default ProBadge;
