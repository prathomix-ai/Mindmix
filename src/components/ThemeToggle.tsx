"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="relative p-2.5 rounded-xl border border-zinc-300/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:border-neon-cyan dark:hover:border-neon-cyan text-zinc-700 dark:text-zinc-300 hover:text-neon-cyan dark:hover:text-neon-cyan backdrop-blur-md shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan/40 cursor-pointer"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 scale-100 hover:rotate-45 duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 transition-transform rotate-0 scale-100 hover:-rotate-12 duration-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
      )}
    </button>
  );
}
export default ThemeToggle;
