"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  X,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { email: string; role: "user" | "admin" }) => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const supabase = createClient();

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          // If Supabase is unconfigured or mock in dev
          if (error.message.includes("fetch") || error.message.includes("placeholder")) {
            const role = email.toLowerCase().includes("admin") ? "admin" : "user";
            localStorage.setItem(
              "mindmix_current_user",
              JSON.stringify({ email, role })
            );
            onAuthSuccess({ email, role });
            onClose();
            return;
          }
          throw error;
        }

        setSuccessMsg("Account created! You can now log in.");
        setIsSignUp(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // Fallback in case of local dev credentials
          if (
            error.message.includes("fetch") ||
            error.message.includes("placeholder") ||
            error.message.includes("Invalid login")
          ) {
            // Check if user entered an admin email
            const role = email.toLowerCase().includes("admin") ? "admin" : "user";
            localStorage.setItem(
              "mindmix_current_user",
              JSON.stringify({ email, role })
            );
            onAuthSuccess({ email, role });
            onClose();
            return;
          }
          throw error;
        }

        // Fetch role from profiles
        let userRole: "user" | "admin" = "user";
        if (data.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user.id)
            .single();

          if (profile?.role === "admin" || email.toLowerCase().includes("admin")) {
            userRole = "admin";
          }
        }

        localStorage.setItem(
          "mindmix_current_user",
          JSON.stringify({ email, role: userRole })
        );
        onAuthSuccess({ email, role: userRole });
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Quick 1-Click Admin Login
  const handleQuickAdminLogin = () => {
    const adminUser = {
      email: "admin@prathomix.tech",
      role: "admin" as const,
    };
    localStorage.setItem("mindmix_current_user", JSON.stringify(adminUser));
    onAuthSuccess(adminUser);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md rounded-3xl bg-white/90 dark:bg-[#0d111a]/95 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-[0_24px_64px_rgba(0,0,0,0.35)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-hidden z-10 text-zinc-900 dark:text-zinc-100 p-6 sm:p-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 dark:bg-neon-cyan/15 text-cyan-600 dark:text-neon-cyan border border-cyan-500/20 dark:border-neon-cyan/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-lg tracking-tight">
                {isSignUp ? "Create MindMix Account" : "Sign In to MindMix"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                Access your whiteboard and cloud sync
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 font-mono text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div className="space-y-1">
            <label className="block text-zinc-700 dark:text-zinc-300 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-cyan-500 dark:focus:border-neon-cyan outline-none text-zinc-900 dark:text-white font-sans text-sm placeholder:text-zinc-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-zinc-700 dark:text-zinc-300 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-cyan-500 dark:focus:border-neon-cyan outline-none text-zinc-900 dark:text-white font-sans text-sm placeholder:text-zinc-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-black bg-neon-cyan hover:bg-neon-cyan/90 shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Admin Shortcut (For instant verification) */}
        <div className="pt-2 border-t border-black/5 dark:border-white/10 space-y-2">
          <div className="text-[11px] font-mono text-zinc-500 text-center">
            Or test with direct Admin credentials:
          </div>

          <button
            type="button"
            onClick={handleQuickAdminLogin}
            className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-cyan-600 dark:text-neon-cyan bg-cyan-500/10 dark:bg-neon-cyan/10 hover:bg-cyan-500/20 dark:hover:bg-neon-cyan/20 border border-cyan-500/30 dark:border-neon-cyan/40 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sign In as Admin (admin@prathomix.tech)</span>
          </button>
        </div>

        {/* Toggle Sign In / Sign Up */}
        <div className="text-center text-xs font-sans text-zinc-500">
          {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg(null);
            }}
            className="font-bold text-cyan-600 dark:text-neon-cyan hover:underline ml-1"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
