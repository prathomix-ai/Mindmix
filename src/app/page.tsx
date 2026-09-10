"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AuthModal } from "@/components/AuthModal";
import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/PricingSection";
import { ProBadge } from "@/components/ProBadge";
import {
  Sparkles,
  Search,
  Code2,
  Mic,
  FileText,
  Presentation,
  ArrowRight,
  Terminal,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Features data for Architectural Superpowers
  const features = [
    {
      icon: Sparkles,
      title: "AI Shape Auto-Correction",
      description:
        "Draw rough sketches, diagrams, or flowcharts. Our on-device computer vision and geometry recognizer instantly converts them into clean, aligned vector shapes.",
      color: "cyan",
      isPro: false,
    },
    {
      icon: Search,
      title: "Never Lose a Single Idea",
      description:
        "Ask your canvas anything in plain English (e.g., “Find that auth flow from Tuesday”). WasmSpace instantly remembers and retrieves your past architectures.",
      color: "purple",
      isPro: true,
    },
    {
      icon: Code2,
      title: "Code Meets Canvas",
      description:
        "Test algorithms and plot charts directly on the board. Paste the output as sticky notes. It all runs instantly in your browser, no servers required.",
      color: "emerald",
      isPro: false,
    },
    {
      icon: Mic,
      title: "Hands-Free Voice Control",
      description:
        "Control the canvas with your voice via the Web Speech API. Say “draw rectangle”, “clear board”, or “summarise meeting” to command your canvas effortlessly.",
      color: "orange",
      isPro: false,
    },
    {
      icon: FileText,
      title: "PDF & Document Import",
      description:
        "Drag and drop multi-page PDF documents onto the canvas. Pages render as high-resolution images so you and your team can annotate, highlight, and sketch over them.",
      color: "cyan",
      isPro: false,
    },
    {
      icon: Presentation,
      title: "Presentation & Explain Mode",
      description:
        "One-click distraction-free presenter view. Hides all toolbars, enables a neon laser pointer cursor, and steps smoothly through your diagram nodes slide by slide.",
      color: "purple",
      isPro: true,
    },
  ];

  // Tailored Workflows data
  const useCases = [
    {
      emoji: "🏛️",
      role: "System Architects",
      desc: "Map microservices, event streams, and database topologies with auto-snapping shapes and vector memory.",
    },
    {
      emoji: "🎨",
      role: "Product Designers",
      desc: "Wireframe user journeys, import customer PDF personas, and run real-time design critique sessions.",
    },
    {
      emoji: "💻",
      role: "Engineering Teams",
      desc: "Code-on-Board execution with Pyodide WASM allows testing algorithm logic directly alongside diagrams.",
    },
    {
      emoji: "🎓",
      role: "Educators & Speakers",
      desc: "Explain Mode with neon laser pointer provides seamless lectures, keynotes, and sprint presentations.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300 relative overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-600 dark:selection:text-neon-cyan">
      {/* ── Ambient Background Glows (Subtle in Light, Vibrant Neon in Dark) ── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Adaptive Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,245,255,0.05),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,245,255,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_40%,rgba(168,85,247,0.05),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_80%_40%,rgba(168,85,247,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(249,250,251,0.85)_100%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(5,5,5,0.85)_100%)]" />

        {/* Slow-pulsing Cyan glowing orb */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.55, 0.3],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-cyan-400/20 dark:bg-neon-cyan/25 rounded-full blur-[130px] dark:blur-[160px]"
        />

        {/* Slow-pulsing Purple glowing orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-purple-400/20 dark:bg-neon-purple/20 rounded-full blur-[130px] dark:blur-[170px]"
        />

        {/* Ambient bottom subtle glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-emerald-400/15 dark:bg-emerald-400/15 rounded-full blur-[130px] dark:blur-[150px]"
        />

        {/* Subtle cyber grid lines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          1. NAVBAR (TOP)
          ═════════════════════════════════════════════════════════════════ */}
      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />

      {/* ═════════════════════════════════════════════════════════════════
          2. HERO SECTION (WITH FRAMER MOTION STAGGER & WOW FACTOR)
          ═════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-36 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-cyan-600 dark:text-neon-cyan shadow-sm dark:shadow-[0_0_20px_rgba(0,245,255,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-neon-cyan animate-pulse" />
            <span>AI-Powered Infinite Collaboration Studio</span>
          </motion.div>

          {/* Hero Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white font-mono leading-[1.15]">
              Your Brain&apos;s Operating System. Sketch, Code, and Build—At the Speed of Thought.
            </h1>
          </motion.div>

          {/* Hero Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
              WasmSpace isn&apos;t just a whiteboard. It&apos;s your AI co-pilot. Draw messy diagrams, and we&apos;ll perfect them. Write Python code, and watch it run right on the canvas. No context switching, just pure flow.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            {/* Primary CTA: "Start Your Free Canvas" */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/canvas"
                id="hero-start-free-canvas"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-mono text-base font-bold text-black bg-neon-cyan hover:bg-neon-cyan/95 shadow-[0_0_30px_rgba(0,245,255,0.35)] hover:shadow-[0_0_45px_rgba(0,245,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <span>Start Your Free Canvas</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </Link>
            </motion.div>

            {/* Secondary CTA: "Launch Canvas" */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/canvas"
                id="hero-launch-canvas"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl font-mono text-sm font-semibold text-gray-700 dark:text-zinc-200 bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-neon-cyan/50 shadow-md dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-cyan-600 dark:text-neon-cyan" />
                <span>Launch Canvas</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Live Interactive Hero Showcase Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-16 p-2 sm:p-4 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <div className="rounded-2xl bg-white/90 dark:bg-zinc-950/80 border border-gray-200/80 dark:border-white/10 p-6 sm:p-8 space-y-6 text-left">
              {/* Fake Window Header */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-gray-500 dark:text-zinc-500">architecture-diagram.wasmspace</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-neon-cyan">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-neon-cyan animate-ping" />
                  <span>Excalidraw Engine Active</span>
                </div>
              </div>

              {/* Showcase Diagram Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-cyan-500/10 dark:bg-cyan-950/40 border border-cyan-500/20 dark:border-neon-cyan/30 text-cyan-700 dark:text-cyan-300 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-neon-cyan">
                    <Sparkles className="w-4 h-4" /> AI Shape Auto-Correct
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-zinc-400 leading-relaxed font-sans">
                    Hand-drawn squiggles snap into crisp mathematical vectors in milliseconds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-500/10 dark:bg-purple-950/40 border border-purple-500/20 dark:border-neon-purple/30 text-purple-700 dark:text-purple-300 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-purple-600 dark:text-purple-300">
                    <Terminal className="w-4 h-4" /> Code Meets Canvas
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-zinc-400 leading-relaxed font-sans">
                    Test algorithms and plot charts directly on the board. Runs 100% locally in browser memory.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/20 dark:border-neon-green/30 text-emerald-700 dark:text-emerald-300 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <Search className="w-4 h-4" /> Never Lose a Single Idea
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-zinc-400 leading-relaxed font-sans">
                    Ask your canvas anything in plain English. WasmSpace instantly remembers and retrieves past architectures.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          3. CORE FEATURES SECTION (ARCHITECTURAL SUPERPOWERS)
          ═════════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-24 border-t border-gray-200 dark:border-white/10 relative">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 px-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-neon-cyan">
              Architectural Superpowers
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-gray-900 dark:text-white tracking-tight">
              Built for Infinite Thinking
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Everything high-performance teams need to design systems, brainstorm ideas, and capture insights without friction.
            </p>
          </div>

          {/* Strictly Defined Responsive Feature Cards Grid */}
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    delay: (index % 3) * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -4 }}
                  className="group bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-xl dark:shadow-none hover:border-cyan-500/50 dark:hover:border-neon-cyan/40 hover:shadow-2xl dark:hover:shadow-[0_0_30px_rgba(0,245,255,0.18)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          item.color === "cyan"
                            ? "bg-cyan-500/15 dark:bg-neon-cyan/15 border border-cyan-500/30 dark:border-neon-cyan/30 text-cyan-600 dark:text-neon-cyan group-hover:shadow-[0_0_20px_rgba(0,245,255,0.35)]"
                            : item.color === "purple"
                            ? "bg-purple-500/15 dark:bg-neon-purple/15 border border-purple-500/30 dark:border-neon-purple/30 text-purple-600 dark:text-neon-purple group-hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                            : item.color === "emerald"
                            ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.35)]"
                            : "bg-orange-500/15 border border-orange-500/30 text-orange-600 dark:text-orange-400 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      {item.isPro && <ProBadge size="sm" />}
                    </div>

                    <h4 className="text-xl font-bold font-mono text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          4. USE CASES SECTION (TAILORED WORKFLOWS)
          ═════════════════════════════════════════════════════════════════ */}
      <section id="use-cases" className="py-24 border-t border-gray-200 dark:border-white/10 bg-gray-100/50 dark:bg-white/[0.01]">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 px-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-600 dark:text-neon-purple">
              Tailored Workflows
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-gray-900 dark:text-white tracking-tight">
              Who Thinks on MindMix?
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Built for forward-thinking specialists who need speed, clarity, and zero context switching.
            </p>
          </div>

          {/* Workflow Cards Grid */}
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
            {useCases.map((useCase, idx) => (
              <motion.div
                key={useCase.role}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl dark:shadow-none hover:border-purple-500/50 dark:hover:border-purple-500/40 hover:shadow-2xl dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all duration-300 space-y-3"
              >
                <div className="text-3xl">{useCase.emoji}</div>
                <h4 className="font-bold font-mono text-lg text-gray-900 dark:text-white">{useCase.role}</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                  {useCase.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          5. PRICING SECTION ("Simple Plans for Every Stage")
          ═════════════════════════════════════════════════════════════════ */}
      <PricingSection onOpenAuth={() => setAuthModalOpen(true)} />

      {/* ═════════════════════════════════════════════════════════════════
          6. FOOTER (WITH BRAND LOGO AND POWERED BY PRATHOMIX)
          ═════════════════════════════════════════════════════════════════ */}
      <footer id="contact" className="border-t border-gray-200 dark:border-white/10 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Brand & Contact Info */}
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2.5 font-mono font-bold text-lg text-gray-900 dark:text-white group">
                <div className="w-8 h-8 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                  <Image
                    src="/mindmix-logo-v2.png"
                    alt="MindMix Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  />
                </div>
                <span>MindMix</span>
              </Link>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
                The infinite collaborative whiteboard OS for engineers, architects, and designers. Built with Next.js 14, Excalidraw, Pyodide WASM, and Supabase.
              </p>
              <div className="text-xs font-mono text-gray-500 dark:text-zinc-400 space-y-1.5 pt-2">
                <p>
                  Support:{" "}
                  <a href="mailto:support@prathomix.tech" className="text-cyan-600 dark:text-neon-cyan hover:underline">
                    support@prathomix.tech
                  </a>
                </p>
                <p>
                  Inquiries:{" "}
                  <a href="mailto:hello@prathomix.tech" className="text-cyan-600 dark:text-neon-cyan hover:underline">
                    hello@prathomix.tech
                  </a>
                </p>
              </div>
            </div>

            {/* Column 2: Navigation Quick Links */}
            <div>
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 dark:text-zinc-300 mb-4">
                Navigation
              </h5>
              <ul className="space-y-2 text-xs font-mono text-gray-600 dark:text-zinc-400">
                <li>
                  <Link href="/canvas" className="hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors">
                    Canvas Studio
                  </Link>
                </li>
                <li>
                  <a href="#features" className="hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#use-cases" className="hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors">
                    Use Cases
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Policy */}
            <div>
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 dark:text-zinc-300 mb-4">
                Legal &amp; Policy
              </h5>
              <ul className="space-y-2 text-xs font-mono text-gray-600 dark:text-zinc-400">
                <li>
                  <Link href="/cookies" className="hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Branding */}
          <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-zinc-500 font-mono">
            <div>
              © {new Date().getFullYear()} WasmSpace AI OS. All rights reserved.
            </div>

            {/* Required exact text with hyperlink and hover glow */}
            <div className="text-center sm:text-right">
              Powered by{" "}
              <a
                href="https://prathomix.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-800 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-neon-cyan transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(0,245,255,0.8)] inline-block tracking-wide"
              >
                PRATHOMIX
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Authentication Modal (Sign In / Sign Up & Admin Access) ───── */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={() => {
          setAuthModalOpen(false);
          window.location.reload();
        }}
      />
    </div>
  );
}
