"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShieldCheck, ArrowRight, Menu, X, LogIn } from "lucide-react";

export interface NavbarProps {
  onOpenAuth?: () => void;
}

export function Navbar({ onOpenAuth }: NavbarProps) {
  // ── Smart Admin Navigation: Live Production Auth State ────────────────────
  const [currentUser, setCurrentUser] = useState<{ role: "admin" | "user"; email: string } | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("mindmix_current_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.email) {
          setCurrentUser(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-[#06070a]/75 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.span
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
            className="text-xl font-mono font-bold text-neon-cyan drop-shadow-[0_0_12px_rgba(0,245,255,0.6)]"
          >
            ✦
          </motion.span>
          <span className="font-mono font-extrabold text-xl tracking-tight text-zinc-900 dark:text-white">
            MindMix
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-cyan-500/10 dark:bg-neon-cyan/10 border border-cyan-500/30 dark:border-neon-cyan/30 text-cyan-600 dark:text-neon-cyan">
            v2.0 OS
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300 font-sans">
          <a href="#features" className="hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors">
            Features
          </a>
          <a href="#use-cases" className="hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors">
            Use Cases
          </a>
          <a href="#pricing" className="hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors">
            Pricing
          </a>
          <a href="#contact" className="hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors">
            Contact
          </a>
        </nav>

        {/* Right: Theme Toggle, Conditionally Rendered Admin Button & Action CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />

          {/* ── 1. Smart Admin Navigation: Rendered ONLY if logged-in user is admin ── */}
          {currentUser?.role === "admin" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="/admin"
                id="navbar-admin-btn"
                className="relative px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold text-black bg-neon-cyan hover:bg-neon-cyan/90 border border-neon-cyan shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:shadow-[0_0_30px_rgba(0,245,255,0.7)] transition-all flex items-center gap-1.5 cursor-pointer"
                title="Admin Control Center"
              >
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Admin</span>
              </Link>
            </motion.div>
          )}

          {/* Sign In Trigger (if not logged in) */}
          {!currentUser && onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-200 hover:text-cyan-500 dark:hover:text-neon-cyan hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Canvas Launch CTA Button */}
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }}>
            <Link
              href="/canvas"
              className="relative group px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold text-white bg-zinc-900 dark:bg-zinc-950 border border-cyan-500/40 dark:border-neon-cyan/40 hover:border-cyan-400 dark:hover:border-neon-cyan shadow-[0_0_16px_rgba(0,245,255,0.25)] hover:shadow-[0_0_24px_rgba(0,245,255,0.5)] backdrop-blur-xl transition-all duration-300 flex items-center gap-2"
            >
              <span className="relative z-10">Launch Canvas</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 dark:text-neon-cyan group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-black/5 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl px-6 py-4 space-y-3 font-mono text-sm overflow-hidden"
          >
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-700 dark:text-zinc-300 hover:text-neon-cyan py-1"
            >
              Features
            </a>
            <a
              href="#use-cases"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-700 dark:text-zinc-300 hover:text-neon-cyan py-1"
            >
              Use Cases
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-700 dark:text-zinc-300 hover:text-neon-cyan py-1"
            >
              Pricing
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-700 dark:text-zinc-300 hover:text-neon-cyan py-1"
            >
              Contact
            </a>

            {/* Mobile Admin Link (Rendered only if admin) */}
            {currentUser?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-neon-cyan font-bold py-1 flex items-center gap-2 border-t border-black/5 dark:border-white/10 pt-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
