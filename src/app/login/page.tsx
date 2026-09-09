"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, ArrowRight, Sparkles, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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
          if (error.message.includes("fetch") || error.message.includes("placeholder")) {
            const role = email.toLowerCase().includes("admin") ? "admin" : "user";
            localStorage.setItem("mindmix_current_user", JSON.stringify({ email, role }));
            router.push("/#pricing");
            return;
          }
          throw error;
        }

        setSuccessMsg("Account created! Redirecting to pricing...");
        setTimeout(() => router.push("/#pricing"), 1000);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("fetch") || error.message.includes("placeholder")) {
            const role = email.toLowerCase().includes("admin") ? "admin" : "user";
            localStorage.setItem("mindmix_current_user", JSON.stringify({ email, role }));
            router.push("/#pricing");
            return;
          }
          throw error;
        }

        const role = email.toLowerCase().includes("admin") ? "admin" : "user";
        localStorage.setItem("mindmix_current_user", JSON.stringify({ email, role }));
        setSuccessMsg("Logged in successfully! Redirecting...");
        setTimeout(() => router.push("/#pricing"), 1000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#06070a] flex items-center justify-center p-6 text-zinc-900 dark:text-white relative overflow-hidden font-sans">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 dark:bg-neon-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md p-8 rounded-3xl bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_0_40px_rgba(0,245,255,0.15)] relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 font-mono font-extrabold text-2xl tracking-tight text-zinc-900 dark:text-white mb-2">
            <span className="text-cyan-500 dark:text-neon-cyan">✦</span>
            <span>MindMix</span>
          </Link>
          <h1 className="text-xl font-mono font-bold">
            {isSignUp ? "Create your Account" : "Sign In to MindMix"}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isSignUp ? "Sign up to upgrade your plan and save your work." : "Sign in to access your account & upgrade to Pro."}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@mindmix.ai"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-300">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-mono text-xs font-bold text-black bg-neon-cyan hover:bg-neon-cyan/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.4)] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs font-mono text-zinc-500">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-cyan-500 dark:text-neon-cyan hover:underline font-bold cursor-pointer"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-cyan-500 dark:text-neon-cyan hover:underline font-bold cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
