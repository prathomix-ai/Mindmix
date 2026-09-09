"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Camera, Settings, FolderClosed, Trash2, Crown, Sparkles } from "lucide-react";

interface FloatingToolsMenuProps {
  onTakeScreenshot: () => void;
  onOpenSettings: () => void;
  onToggleExplorer: () => void;
  isExplorerOpen?: boolean;
  onResetCanvas?: () => void;
  onOpenProModal?: () => void;
  isProUser?: boolean;
}

export function FloatingToolsMenu({
  onTakeScreenshot,
  onOpenSettings,
  onToggleExplorer,
  isExplorerOpen = false,
  onResetCanvas,
  onOpenProModal,
  isProUser = false,
}: FloatingToolsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute left-4 top-20 z-40 flex flex-col items-start gap-2 select-none pointer-events-auto">
      {/* '+' Trigger Button */}
      <motion.button
        type="button"
        id="btn-floating-tools-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-10 h-10 rounded-2xl flex items-center justify-center border shadow-xl backdrop-blur-xl transition-colors cursor-pointer ${
          isOpen
            ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
            : "bg-black/30 hover:bg-black/50 border-white/10 hover:border-cyan-400/40 text-zinc-300 hover:text-white"
        }`}
        title={isOpen ? "Close Secondary Tools" : "Secondary Tools (+)"}
        aria-label="Toggle Secondary Tools Menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
        >
          <Plus className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Floating Dropdown / Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -8, y: -4 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -8, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-48 p-1.5 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl space-y-1 overflow-hidden"
          >
            <div className="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-500 border-b border-white/5 flex items-center justify-between">
              <span>Tools</span>
              <Sparkles className="w-3 h-3 text-cyan-400/70" />
            </div>

            {/* Screenshot Tool */}
            <button
              type="button"
              id="menu-btn-screenshot"
              onClick={() => {
                onTakeScreenshot();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer text-left group"
            >
              <Camera className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span>Screenshot</span>
                <span className="text-[9px] text-zinc-500 font-mono">
                  {isProUser ? "Clean 4K" : "Free Watermark"}
                </span>
              </div>
            </button>

            {/* Project Files Explorer */}
            <button
              type="button"
              id="menu-btn-explorer"
              onClick={() => {
                onToggleExplorer();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer text-left group ${
                isExplorerOpen
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                  : "text-zinc-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <FolderClosed className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span>Project Files</span>
                <span className="text-[9px] text-zinc-500 font-mono">VS Code Tree</span>
              </div>
            </button>

            {/* Canvas Settings */}
            <button
              type="button"
              id="menu-btn-settings"
              onClick={() => {
                onOpenSettings();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer text-left group"
            >
              <Settings className="w-4 h-4 text-zinc-400 group-hover:rotate-45 transition-transform" />
              <div className="flex flex-col">
                <span>Settings</span>
                <span className="text-[9px] text-zinc-500 font-mono">Preferences</span>
              </div>
            </button>

            {/* Reset Canvas */}
            {onResetCanvas && (
              <button
                type="button"
                id="menu-btn-reset-canvas"
                onClick={() => {
                  onResetCanvas();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-red-300/80 hover:text-red-200 hover:bg-red-500/10 transition-all cursor-pointer text-left group"
              >
                <Trash2 className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span>Reset Canvas</span>
                  <span className="text-[9px] text-zinc-500 font-mono">Clear elements</span>
                </div>
              </button>
            )}

            {/* Pro Upgrade / Badge button */}
            {!isProUser && onOpenProModal && (
              <button
                type="button"
                id="menu-btn-upgrade-pro"
                onClick={() => {
                  onOpenProModal();
                  setIsOpen(false);
                }}
                className="w-full mt-1 flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold hover:from-cyan-500/30 hover:to-blue-500/30 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                  <span>Get PRO</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-cyan-400">⚡</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FloatingToolsMenu;
