"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  User,
  Mail,
  Grid,
  Palette,
  Sparkles,
  Languages,
  AlertTriangle,
  Trash2,
  X,
  Check,
  Moon,
  Sun,
  Laptop,
  Sliders,
  Save,
} from "lucide-react";

import { AIUsageTracker } from "./AIUsageTracker";

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearAllData?: () => void;
  onOpenUpgradeModal?: () => void;
  actionsUsed?: number;
  actionLimit?: number;
  tier?: string;
}

type TabType = "profile" | "canvas" | "ai" | "danger";

export function SettingsModal({
  isOpen,
  onClose,
  onClearAllData,
  onOpenUpgradeModal,
  actionsUsed = 4,
  actionLimit = 15,
  tier = "free",
}: SettingsModalProps) {
  const { theme, setTheme } = useTheme();

  // Tab State
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  // Profile Settings State
  const [name, setName] = useState("Prathomix Admin");
  const [email, setEmail] = useState("admin@prathomix.tech");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Canvas Settings State
  const [snapToGrid, setSnapToGrid] = useState(true);

  // AI Features State
  const [summarizationLanguage, setSummarizationLanguage] = useState("English (US)");
  const [autoShapeCorrection, setAutoShapeCorrection] = useState(true);

  // Danger Zone Confirmation State
  const [confirmClear, setConfirmClear] = useState(false);
  const [dataCleared, setDataCleared] = useState(false);

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExecuteClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    if (onClearAllData) {
      onClearAllData();
    } else {
      localStorage.clear();
      sessionStorage.clear();
    }
    setDataCleared(true);
    setTimeout(() => {
      setDataCleared(false);
      setConfirmClear(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* ── Glass Backdrop ──────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Main Modal Container (Glassmorphism Card) ────────────────────── */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white/80 dark:bg-[#0d111a]/85 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 transition-all text-zinc-900 dark:text-zinc-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 dark:bg-neon-cyan/15 text-cyan-600 dark:text-neon-cyan border border-cyan-500/20 dark:border-neon-cyan/30">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-base sm:text-lg font-mono font-bold tracking-tight">
                Settings &amp; Preferences
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Configure your workspace, AI engine, and personal profile
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Settings"
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-neon-cyan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Left Tab List + Right Tab Content */}
        <div className="flex-1 flex flex-col sm:flex-row min-h-[380px] overflow-hidden">
          {/* Left Vertical Tab List */}
          <nav
            aria-label="Settings navigation"
            className="w-full sm:w-52 p-3 sm:p-4 border-b sm:border-b-0 sm:border-r border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] flex sm:flex-col gap-1.5 overflow-x-auto sm:overflow-x-visible shrink-0"
          >
            {/* Profile Tab */}
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 w-full text-left whitespace-nowrap ${
                activeTab === "profile"
                  ? "bg-cyan-500/15 dark:bg-neon-cyan/20 text-cyan-700 dark:text-neon-cyan border border-cyan-500/30 dark:border-neon-cyan/40 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Profile</span>
            </button>

            {/* Canvas Tab */}
            <button
              onClick={() => setActiveTab("canvas")}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 w-full text-left whitespace-nowrap ${
                activeTab === "canvas"
                  ? "bg-cyan-500/15 dark:bg-neon-cyan/20 text-cyan-700 dark:text-neon-cyan border border-cyan-500/30 dark:border-neon-cyan/40 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <Grid className="w-4 h-4 shrink-0" />
              <span>Canvas</span>
            </button>

            {/* AI Features Tab */}
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 w-full text-left whitespace-nowrap ${
                activeTab === "ai"
                  ? "bg-purple-500/15 dark:bg-neon-purple/20 text-purple-700 dark:text-neon-purple border border-purple-500/30 dark:border-neon-purple/40 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>AI Features</span>
            </button>

            {/* Danger Zone Tab */}
            <button
              onClick={() => setActiveTab("danger")}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 w-full text-left whitespace-nowrap sm:mt-auto ${
                activeTab === "danger"
                  ? "bg-red-500/15 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-500/30 dark:border-red-500/40 shadow-sm"
                  : "text-red-500/80 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10"
              }`}
            >
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Danger Zone</span>
            </button>
          </nav>

          {/* Right Tab Content Viewport */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {/* 1. Profile Tab */}
            {activeTab === "profile" && (
              <form onSubmit={handleSaveProfile} className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="font-mono font-bold text-sm tracking-tight">Public Profile</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Your avatar and details displayed during collaborative multiplayer sessions.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl font-sans text-xs sm:text-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-cyan-500 dark:focus:border-neon-cyan focus:ring-1 focus:ring-cyan-500 dark:focus:ring-neon-cyan outline-none transition-all placeholder:text-zinc-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl font-sans text-xs sm:text-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-cyan-500 dark:focus:border-neon-cyan focus:ring-1 focus:ring-cyan-500 dark:focus:ring-neon-cyan outline-none transition-all placeholder:text-zinc-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {savedSuccess ? (
                    <span className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 animate-fade-in">
                      <Check className="w-3.5 h-3.5" /> Changes saved successfully!
                    </span>
                  ) : <span />}

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl font-mono text-xs font-bold text-black bg-neon-cyan hover:bg-neon-cyan/90 shadow-[0_0_16px_rgba(0,245,255,0.3)] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Profile</span>
                  </button>
                </div>
              </form>
            )}

            {/* 2. Canvas Tab */}
            {activeTab === "canvas" && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="font-mono font-bold text-sm tracking-tight">Canvas Customization</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Control precision snapping, view guides, and theme appearance.
                  </p>
                </div>

                {/* Snap to Grid Toggle */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <div className="space-y-0.5 pr-4">
                    <div className="text-xs sm:text-sm font-mono font-bold">Snap to Grid</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Automatically aligns shapes and connectors to a 20px grid matrix.
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={snapToGrid}
                    onClick={() => setSnapToGrid(!snapToGrid)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-neon-cyan/40 ${
                      snapToGrid ? "bg-neon-cyan" : "bg-zinc-300 dark:bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        snapToGrid ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Theme Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-cyan-500 dark:text-neon-cyan" />
                    <span>Theme Mode</span>
                  </label>

                  <div className="grid grid-cols-3 gap-2.5">
                    {/* Light Button */}
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 font-mono text-xs transition-all ${
                        theme === "light"
                          ? "border-cyan-500 dark:border-neon-cyan bg-cyan-500/10 dark:bg-neon-cyan/15 text-cyan-700 dark:text-neon-cyan font-bold shadow-sm"
                          : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:border-black/20 dark:hover:border-white/20"
                      }`}
                    >
                      <Sun className="w-5 h-5 text-amber-500" />
                      <span>Light</span>
                    </button>

                    {/* Dark Button */}
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 font-mono text-xs transition-all ${
                        theme === "dark"
                          ? "border-cyan-500 dark:border-neon-cyan bg-cyan-500/10 dark:bg-neon-cyan/15 text-cyan-700 dark:text-neon-cyan font-bold shadow-sm"
                          : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:border-black/20 dark:hover:border-white/20"
                      }`}
                    >
                      <Moon className="w-5 h-5 text-indigo-400" />
                      <span>Dark</span>
                    </button>

                    {/* System Button */}
                    <button
                      type="button"
                      onClick={() => setTheme("system")}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 font-mono text-xs transition-all ${
                        theme === "system"
                          ? "border-cyan-500 dark:border-neon-cyan bg-cyan-500/10 dark:bg-neon-cyan/15 text-cyan-700 dark:text-neon-cyan font-bold shadow-sm"
                          : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:border-black/20 dark:hover:border-white/20"
                      }`}
                    >
                      <Laptop className="w-5 h-5 text-zinc-400" />
                      <span>System</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. AI Features Tab */}
            {activeTab === "ai" && (
              <div className="space-y-6 animate-fade-in">
                {/* Live AI Usage & Quota Tracker */}
                <AIUsageTracker
                  actionsUsed={actionsUsed}
                  actionLimit={actionLimit}
                  tier={tier}
                  onOpenUpgradeModal={() => {
                    onClose();
                    onOpenUpgradeModal?.();
                  }}
                />

                <div className="space-y-1 pt-2">
                  <h3 className="font-mono font-bold text-sm tracking-tight">AI &amp; Smart Assistants</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Configure machine learning summarization language and real-time geometry snapping.
                  </p>
                </div>

                {/* Summarization Language Dropdown */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-purple-500 dark:text-neon-purple" />
                    <span>Summarization Language</span>
                  </label>
                  <select
                    value={summarizationLanguage}
                    onChange={(e) => setSummarizationLanguage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl font-mono text-xs sm:text-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-purple-500 dark:focus:border-neon-purple focus:ring-1 focus:ring-purple-500 outline-none transition-all text-zinc-800 dark:text-zinc-200"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="Spanish (Español)">Spanish (Español)</option>
                    <option value="French (Français)">French (Français)</option>
                    <option value="German (Deutsch)">German (Deutsch)</option>
                    <option value="Japanese (日本語)">Japanese (日本語)</option>
                    <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
                    <option value="Mandarin (中文)">Mandarin (中文)</option>
                  </select>
                  <p className="text-[11px] text-zinc-400">
                    The Board Brain LLM synthesizes whiteboard nodes and transcripts in this language.
                  </p>
                </div>

                {/* Auto-Shape Correction Toggle */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <div className="space-y-0.5 pr-4">
                    <div className="text-xs sm:text-sm font-mono font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-500 dark:text-neon-purple" />
                      <span>Auto-Shape Correction</span>
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Snap freehand sketches to mathematically perfect rectangles, ellipses, and arrows.
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={autoShapeCorrection}
                    onClick={() => setAutoShapeCorrection(!autoShapeCorrection)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-neon-purple/40 ${
                      autoShapeCorrection ? "bg-neon-purple" : "bg-zinc-300 dark:bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        autoShapeCorrection ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* 4. Danger Zone Tab */}
            {activeTab === "danger" && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="font-mono font-bold text-sm text-red-600 dark:text-red-400 tracking-tight">
                    Danger Zone
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Irreversible actions that purge local cache and saved whiteboard sessions.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-red-500/10 dark:bg-red-950/20 border border-red-500/20 dark:border-red-500/30 space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-mono font-bold text-red-600 dark:text-red-300">
                        Purge All Local Boards &amp; Cache
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        This action will immediately erase all whiteboard canvas elements, local files, Python execution history, and custom presets from this browser. This cannot be undone.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    {dataCleared ? (
                      <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold text-center">
                        ✓ All Local Data Has Been Cleared
                      </div>
                    ) : confirmClear ? (
                      <div className="space-y-2">
                        <p className="text-xs font-mono font-bold text-red-500">
                          Are you completely sure? Click confirm to proceed.
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleExecuteClear}
                            className="px-4 py-2 rounded-xl font-mono text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-[0_0_16px_rgba(239,68,68,0.5)] transition-all flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Confirm &amp; Erase Everything</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmClear(false)}
                            className="px-3 py-2 rounded-xl font-mono text-xs font-medium text-zinc-400 hover:text-white bg-black/10 dark:bg-white/10 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleExecuteClear}
                        className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-red-600/90 hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Clear All Data</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
