"use client";

import React, { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

export default function LandingPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#06070a] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200 selection:bg-neon-cyan/20 selection:text-neon-cyan">
      {/* ── Ambient Background Glows ──────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-cyan-400/15 dark:bg-neon-cyan/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-purple-500/15 dark:bg-neon-purple/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-emerald-400/10 dark:bg-neon-green/5 rounded-full blur-[140px]" />
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          1. NAVBAR (TOP)
          ═════════════════════════════════════════════════════════════════ */}
      {/* ── 1. NAVBAR (SMART ADMIN CONDITIONAL NAVIGATION) ─────────── */}
      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />

      {/* ═════════════════════════════════════════════════════════════════
          2. HERO SECTION
          ═════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-20 pb-20 md:pt-28 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 text-cyan-600 dark:text-neon-cyan shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-neon-cyan" />
            <span>AI-Powered Infinite Collaboration Studio</span>
          </div>

          {/* Exact Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-mono leading-[1.1]">
            The Infinite AI Canvas for Modern Teams &amp; Thinkers.
          </h1>

          {/* Exact Subheadline */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
            Draw, code, present, and brainstorm. Let our AI auto-correct your shapes, generate code from text, and summarize your meetings in real-time.
          </p>

          {/* Exact Call to Action (CTA) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/canvas"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-mono text-base font-bold text-black bg-neon-cyan hover:bg-neon-cyan/90 shadow-[0_0_32px_rgba(0,245,255,0.45)] hover:shadow-[0_0_48px_rgba(0,245,255,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
            >
              <span>Start Your Free Canvas</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </Link>

            <a
              href="#features"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-mono text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 backdrop-blur-md border border-black/10 dark:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Features</span>
            </a>
          </div>

          {/* Live Interactive Hero Showcase Glass Card */}
          <div className="mt-14 p-2 sm:p-4 rounded-3xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 shadow-2xl">
            <div className="rounded-2xl bg-white/90 dark:bg-zinc-950/90 border border-black/5 dark:border-white/10 p-6 sm:p-8 space-y-6 text-left">
              {/* Fake Window Header */}
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-zinc-500">architecture-diagram.mindmix</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-neon-cyan">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-neon-cyan animate-ping" />
                  <span>Excalidraw Engine Active</span>
                </div>
              </div>

              {/* Showcase Diagram Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-cyan-500/10 dark:bg-cyan-950/30 border border-cyan-500/30 dark:border-neon-cyan/30 text-cyan-700 dark:text-cyan-300 space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> AI Shape Auto-Correct
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Hand-drawn squiggles snap into crisp mathematical vectors in milliseconds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-500/10 dark:bg-purple-950/30 border border-purple-500/30 dark:border-neon-purple/30 text-purple-700 dark:text-purple-300 space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <Terminal className="w-4 h-4" /> Python Pyodide WASM
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Execute code blocks 100% locally in browser memory without sending data to servers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 dark:border-neon-green/30 text-emerald-700 dark:text-emerald-300 space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <Search className="w-4 h-4" /> Board Brain Vector RAG
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Search past architectural sessions using natural human queries and vector embeddings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          3. CORE FEATURES SECTION (RESPONSIVE CSS GRID & GLASSMORPHISM)
          ═════════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-20 px-6 border-t border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-neon-cyan">
              Architectural Superpowers
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-900 dark:text-white">
              Built for Infinite Thinking
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Everything high-performance teams need to design systems, brainstorm ideas, and capture insights.
            </p>
          </div>

          {/* Responsive CSS Grid with Glassmorphism Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group p-6 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 hover:border-cyan-500 dark:hover:border-neon-cyan shadow-xl transition-all duration-300 hover:scale-[1.02] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 dark:bg-neon-cyan/20 border border-cyan-500/30 dark:border-neon-cyan/40 flex items-center justify-center text-cyan-600 dark:text-neon-cyan group-hover:shadow-[0_0_16px_rgba(0,245,255,0.4)] transition-all">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-mono text-zinc-900 dark:text-white">
                AI Shape Auto-Correction
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Draw rough sketches, diagrams, or flowcharts. Our on-device computer vision and geometry recognizer instantly converts them into clean, aligned vector shapes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-6 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 hover:border-purple-500 dark:hover:border-neon-purple shadow-xl transition-all duration-300 hover:scale-[1.02] space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-500/15 dark:bg-neon-purple/20 border border-purple-500/30 dark:border-neon-purple/40 flex items-center justify-center text-purple-600 dark:text-neon-purple group-hover:shadow-[0_0_16px_rgba(168,85,247,0.4)] transition-all">
                  <Search className="w-6 h-6" />
                </div>
                <ProBadge size="sm" />
              </div>
              <h4 className="text-lg font-bold font-mono text-zinc-900 dark:text-white">
                Board Brain (Vector RAG)
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Connect your whiteboard sessions to a Supabase pgvector embedding database. Query the canvas with plain English (e.g., &ldquo;Find the auth flow from Tuesday&rdquo;) for instant recall.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-6 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 hover:border-emerald-500 dark:hover:border-neon-green shadow-xl transition-all duration-300 hover:scale-[1.02] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 dark:bg-neon-green/20 border border-emerald-500/30 dark:border-neon-green/40 flex items-center justify-center text-emerald-600 dark:text-neon-green group-hover:shadow-[0_0_16px_rgba(34,197,94,0.4)] transition-all">
                <Code2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-mono text-zinc-900 dark:text-white">
                Code-on-Board (Pyodide WASM)
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Run real Python code directly inside the browser using WebAssembly. Test algorithms, plot charts, and paste the stdout output straight onto the whiteboard as sticky notes.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group p-6 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 hover:border-orange-500 dark:hover:border-neon-orange shadow-xl transition-all duration-300 hover:scale-[1.02] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 dark:bg-orange-500/20 border border-orange-500/30 dark:border-orange-500/40 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:shadow-[0_0_16px_rgba(249,115,22,0.4)] transition-all">
                <Mic className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-mono text-zinc-900 dark:text-white">
                Hands-Free Voice Control
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Control the canvas with your voice via the Web Speech API. Say &ldquo;draw rectangle&rdquo;, &ldquo;clear board&rdquo;, or &ldquo;summarise meeting&rdquo; to command your canvas effortlessly.
              </p>
            </div>

            {/* Card 5 */}
            <div className="group p-6 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 hover:border-cyan-500 dark:hover:border-neon-cyan shadow-xl transition-all duration-300 hover:scale-[1.02] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 dark:bg-neon-cyan/20 border border-cyan-500/30 dark:border-neon-cyan/40 flex items-center justify-center text-cyan-600 dark:text-neon-cyan group-hover:shadow-[0_0_16px_rgba(0,245,255,0.4)] transition-all">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-mono text-zinc-900 dark:text-white">
                PDF &amp; Document Import
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Drag and drop multi-page PDF documents onto the canvas. Pages render as high-resolution images so you and your team can annotate, highlight, and sketch over them.
              </p>
            </div>

            {/* Card 6 */}
            <div className="group p-6 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 hover:border-purple-500 dark:hover:border-neon-purple shadow-xl transition-all duration-300 hover:scale-[1.02] space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-500/15 dark:bg-neon-purple/20 border border-purple-500/30 dark:border-neon-purple/40 flex items-center justify-center text-purple-600 dark:text-neon-purple group-hover:shadow-[0_0_16px_rgba(168,85,247,0.4)] transition-all">
                  <Presentation className="w-6 h-6" />
                </div>
                <ProBadge size="sm" />
              </div>
              <h4 className="text-lg font-bold font-mono text-zinc-900 dark:text-white">
                Presentation &amp; Explain Mode
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                One-click distraction-free presenter view. Hides all toolbars, enables a neon laser pointer cursor, and steps smoothly through your diagram nodes slide by slide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          4. USE CASES SECTION
          ═════════════════════════════════════════════════════════════════ */}
      <section id="use-cases" className="py-20 px-6 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-600 dark:text-neon-purple">
              Tailored Workflows
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-900 dark:text-white">
              Who Thinks on MindMix?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 shadow-lg space-y-3">
              <div className="text-2xl">🏛️</div>
              <h4 className="font-bold font-mono text-zinc-900 dark:text-white">System Architects</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Map microservices, event streams, and database topologies with auto-snapping shapes and vector memory.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 shadow-lg space-y-3">
              <div className="text-2xl">🎨</div>
              <h4 className="font-bold font-mono text-zinc-900 dark:text-white">Product Designers</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Wireframe user journeys, import customer PDF personas, and run real-time design critique sessions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 shadow-lg space-y-3">
              <div className="text-2xl">💻</div>
              <h4 className="font-bold font-mono text-zinc-900 dark:text-white">Engineering Teams</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Code-on-Board execution with Pyodide WASM allows testing algorithm logic directly alongside diagrams.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 shadow-lg space-y-3">
              <div className="text-2xl">🎓</div>
              <h4 className="font-bold font-mono text-zinc-900 dark:text-white">Educators &amp; Speakers</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Explain Mode with neon laser pointer provides seamless lectures, keynotes, and sprint presentations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          5. PRICING SECTION ("Simple Plans for Every Stage")
          ═════════════════════════════════════════════════════════════════ */}
      {/* ── 5. PRICING SECTION (FRAMER MOTION MASTERPIECE) ──────────── */}
      <PricingSection onOpenAuth={() => setAuthModalOpen(true)} />

      {/* ═════════════════════════════════════════════════════════════════
          6. FOOTER
          ═════════════════════════════════════════════════════════════════ */}
      <footer id="contact" className="border-t border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Brand & Contact Info */}
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2 font-mono font-bold text-lg text-zinc-900 dark:text-white">
                <span className="text-neon-cyan">✦</span>
                <span>MindMix</span>
              </Link>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
                The infinite collaborative whiteboard OS for engineers, architects, and designers. Built with Next.js 14, Excalidraw, Pyodide WASM, and Supabase.
              </p>
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 space-y-1">
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
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-300 mb-4">
                Navigation
              </h5>
              <ul className="space-y-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
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
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-300 mb-4">
                Legal &amp; Policy
              </h5>
              <ul className="space-y-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
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
          <div className="pt-8 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
            <div>
              © {new Date().getFullYear()} MindMix AI OS. All rights reserved.
            </div>

            {/* Required exact text with hyperlink and hover glow */}
            <div className="text-center sm:text-right">
              Powered by{" "}
              <a
                href="https://prathomix.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-zinc-800 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-neon-cyan transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(0,245,255,0.8)] inline-block tracking-wide"
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
