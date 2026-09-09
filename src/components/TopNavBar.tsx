"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Tv, Search, Brain, Share2, Code2, Bot } from "lucide-react";

interface TopNavBarProps {
  boardTitle: string;
  onBoardTitleChange: (title: string) => void;
  // Feature Callbacks (handled with handleProClick)
  onPresentClick: () => void;
  onSearchClick: () => void;
  onBoardBrainClick: () => void;
  onShareClick: () => void;
  // Free / Studio features
  onCodeStudioClick: () => void;
  isCodeOpen?: boolean;
  onVoiceClick: () => void;
  isVoiceListening?: boolean;
  liveTranscript?: string;
  isSummarising?: boolean;
  isProUser?: boolean;
}

export function TopNavBar({
  boardTitle,
  onBoardTitleChange,
  onPresentClick,
  onSearchClick,
  onBoardBrainClick,
  onShareClick,
  onCodeStudioClick,
  isCodeOpen = false,
  onVoiceClick,
  isVoiceListening = false,
  liveTranscript = "",
  isSummarising = false,
  isProUser = false,
}: TopNavBarProps) {
  // Reusable glowing PRO badge element
  const ProTag = () => (
    <span
      className={`absolute -top-2 -right-2 text-[9px] rounded-full px-1.5 py-0.5 font-mono font-bold leading-none select-none pointer-events-none ${
        isProUser
          ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
          : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
      }`}
    >
      PRO
    </span>
  );

  return (
    <header className="relative w-full max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto select-none">
      {/* ── 1. Minimalist MindMix Logo & Board Title ── */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 group transition-opacity hover:opacity-90"
          title="MindMix Whiteboard OS"
        >
          {/* Subtle glowing SVG spark icon */}
          <svg
            className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.85)] group-hover:rotate-12 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
          <span className="font-semibold text-white tracking-tight text-sm sm:text-base font-sans">
            MindMix
          </span>
        </Link>

        <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

        {/* Board Title Input */}
        <div className="hidden sm:flex items-center">
          <input
            id="top-nav-board-title"
            type="text"
            value={boardTitle}
            onChange={(e) => onBoardTitleChange(e.target.value)}
            placeholder="Untitled Board"
            maxLength={50}
            className="bg-transparent border-none outline-none text-xs font-medium text-zinc-300 placeholder-zinc-500 hover:text-white focus:text-cyan-300 transition-colors w-32 md:w-44 truncate"
            title="Rename Whiteboard"
            spellCheck={false}
          />
        </div>
      </div>

      {/* ── 2. Core Action Tools Bar (Clean flex flow with no overlap) ── */}
      <div className="flex flex-row items-center gap-3 sm:gap-4 shrink-0">
        {/* Present (PRO) */}
        <button
          type="button"
          id="btn-nav-present"
          onClick={onPresentClick}
          className="relative flex flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer shrink-0"
          title="Present Mode (Laser & Slide deck)"
        >
          <Tv className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="hidden md:inline">Present</span>
          <ProTag />
        </button>

        {/* Search (PRO) */}
        <button
          type="button"
          id="btn-nav-search"
          onClick={onSearchClick}
          className="relative flex flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer shrink-0"
          title="Vector RAG Search across board sessions"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="hidden md:inline">Search</span>
          <ProTag />
        </button>

        {/* Board Brain (PRO) */}
        <button
          type="button"
          id="btn-nav-board-brain"
          onClick={onBoardBrainClick}
          disabled={isSummarising}
          className="relative flex flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer disabled:opacity-50 shrink-0"
          title="AI Board Brain: Meeting Action Items & Summaries"
        >
          <Brain className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="hidden md:inline">
            {isSummarising ? "Analysing…" : "Board Brain"}
          </span>
          <ProTag />
        </button>

        {/* Share (PRO) */}
        <button
          type="button"
          id="btn-nav-share"
          onClick={onShareClick}
          className="relative flex flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer shrink-0"
          title="Live Multiplayer Collaboration"
        >
          <Share2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="hidden md:inline">Share</span>
          <ProTag />
        </button>

        <div className="h-4 w-[1px] bg-white/10 mx-0.5 shrink-0" />

        {/* Python / Multi-Language Code Studio */}
        <button
          type="button"
          id="btn-nav-code-studio"
          onClick={onCodeStudioClick}
          className={`relative flex flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer shrink-0 ${
            isCodeOpen
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
              : "text-zinc-300 hover:text-white hover:bg-white/10 border border-white/5"
          }`}
          title="Python & Multi-Language Studio (C, C++, Java, JS, TS, Python, SQL)"
        >
          <Code2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="hidden lg:inline">Code</span>
        </button>

        {/* Animated Robot Voice AI Button (Contained inside flex flow) */}
        <div className="relative flex items-center shrink-0">
          <motion.button
            type="button"
            id="btn-nav-voice-robot"
            onClick={onVoiceClick}
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer shrink-0 ${
              isVoiceListening
                ? "bg-purple-900/50 border border-purple-400/80 text-purple-200 shadow-[0_0_16px_rgba(168,85,247,0.4)]"
                : "bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white hover:border-cyan-400/40"
            }`}
            title={
              isVoiceListening
                ? "Listening… Click to stop"
                : "Voice AI (Speak commands to draw, create shapes, clear)"
            }
          >
            <Bot
              className={`w-3.5 h-3.5 shrink-0 ${
                isVoiceListening ? "text-purple-400 animate-pulse" : "text-cyan-400"
              }`}
            />
            <span className="hidden sm:inline font-mono text-[11px]">
              {isVoiceListening ? "Listening…" : "Voice AI"}
            </span>
          </motion.button>

          {/* Live Transcript Pill */}
          <AnimatePresence>
            {isVoiceListening && liveTranscript && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                className="absolute top-10 right-0 min-w-[180px] max-w-[240px] px-2.5 py-1 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-purple-400/40 text-[10px] text-purple-200 font-mono shadow-xl pointer-events-none z-50 truncate"
              >
                &ldquo;{liveTranscript}&rdquo;
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default TopNavBar;
