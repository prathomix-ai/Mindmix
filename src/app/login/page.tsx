"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mode state: Sign-Up or Sign-In
  const [isSignUp, setIsSignUp] = useState(false);

  // Form input states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Check URL query param e.g. /login?mode=signup or /signup
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "signup") {
      setIsSignUp(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // 1. Validation check for Sign-Up
    if (isSignUp) {
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match. Please verify and try again.");
        return;
      }
      if (password.length < 6) {
        setErrorMsg("Password must be at least 6 characters long.");
        return;
      }
    }

    setLoading(true);

    try {
      const supabase = createClient();

      if (isSignUp) {
        // Supabase Auth Sign-Up with metadata (full_name and phone_number)
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone_number: phoneNumber,
            },
          },
        });

        if (error) {
          // Dev / Offline fallback
          if (error.message.includes("fetch") || error.message.includes("placeholder")) {
            const role = email.toLowerCase().includes("admin") ? "admin" : "user";
            localStorage.setItem(
              "mindmix_current_user",
              JSON.stringify({
                email,
                name: fullName,
                phone: phoneNumber,
                role,
              })
            );
            setSuccessMsg("Account created! Redirecting to pricing...");
            setTimeout(() => router.push("/#pricing"), 1000);
            return;
          }
          throw error;
        }

        setSuccessMsg("Account created successfully! Redirecting...");
        setTimeout(() => router.push("/#pricing"), 1200);
      } else {
        // Supabase Auth Sign-In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("fetch") || error.message.includes("placeholder")) {
            const role = email.toLowerCase().includes("admin") ? "admin" : "user";
            localStorage.setItem(
              "mindmix_current_user",
              JSON.stringify({ email, role })
            );
            router.push("/#pricing");
            return;
          }
          throw error;
        }

        const role = email.toLowerCase().includes("admin") ? "admin" : "user";
        localStorage.setItem(
          "mindmix_current_user",
          JSON.stringify({
            email,
            name: data?.user?.user_metadata?.full_name || email.split("@")[0],
            role,
          })
        );

        setSuccessMsg("Logged in successfully! Redirecting...");
        setTimeout(() => router.push("/#pricing"), 1000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-white/85 dark:bg-zinc-950/85 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_0_40px_rgba(0,245,255,0.15)] relative z-10 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-mono font-extrabold text-2xl tracking-tight text-zinc-900 dark:text-white mb-1 group"
        >
          <div className="w-10 h-10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
            <Image
              src="/mindmix-logo-v2.png"
              alt="MindMix Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain drop-shadow-[0_0_14px_rgba(168,85,247,0.55)]"
              priority
            />
          </div>
          <span>MindMix</span>
        </Link>
        <h1 className="text-xl font-mono font-bold tracking-tight text-zinc-900 dark:text-white">
          {isSignUp ? "Create Your Account" : "Sign In to MindMix"}
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {isSignUp
            ? "Join thousands of creators building with MindMix AI."
            : "Sign in to access your cloud whiteboards & superpowers."}
        </p>
      </div>

      {/* Error Message with Red Glow */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2.5 animate-fade-in shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span className="font-mono text-[11px] leading-snug">{errorMsg}</span>
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5 animate-fade-in shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          <span className="font-mono text-[11px] leading-snug">{successMsg}</span>
        </div>
      )}

      {/* Authentication Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name (Required on Sign-Up) */}
        {isSignUp && (
          <div className="space-y-1.5 animate-fade-in">
            <label className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
              <span>Full Name</span>
              <span className="text-[10px] text-red-500 font-mono">*Required</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-cyan-500 dark:focus:border-neon-cyan focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
              />
            </div>
          </div>
        )}

        {/* Email Address (Required) */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
            <span>Email Address</span>
            <span className="text-[10px] text-red-500 font-mono">*Required</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@mindmix.ai"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-cyan-500 dark:focus:border-neon-cyan focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
            />
          </div>
        </div>

        {/* Contact Number (Phone) - Optional on Sign-Up */}
        {isSignUp && (
          <div className="space-y-1.5 animate-fade-in">
            <label className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
              <span>Contact Number (Phone)</span>
              <span className="text-[10px] text-zinc-400 font-mono">Optional</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-cyan-500 dark:focus:border-neon-cyan focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
              />
            </div>
          </div>
        )}

        {/* Password (Required) with Visibility Toggle */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
            <span>Password</span>
            <span className="text-[10px] text-red-500 font-mono">*Required</span>
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-cyan-500 dark:focus:border-neon-cyan focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded transition-colors cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-cyan-500 dark:text-neon-cyan" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password (Required on Sign-Up) with Visibility Toggle */}
        {isSignUp && (
          <div className="space-y-1.5 animate-fade-in">
            <label className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
              <span>Confirm Password</span>
              <span className="text-[10px] text-red-500 font-mono">*Required</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 transition-all font-sans ${
                  confirmPassword && password !== confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-black/10 dark:border-white/10 focus:border-cyan-500 dark:focus:border-neon-cyan focus:ring-cyan-500"
                }`}
              />
              <button
                type="button"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded transition-colors cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4 text-cyan-500 dark:text-neon-cyan" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-[11px] font-mono text-red-500 animate-fade-in">
                Passwords do not match
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-mono text-xs font-bold text-black bg-neon-cyan hover:bg-neon-cyan/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.4)] disabled:opacity-50 cursor-pointer pt-2.5"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </span>
          ) : (
            <>
              <span>{isSignUp ? "Create Account" : "Sign In"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Switch Between Sign-In and Sign-Up */}
      <div className="pt-2 text-center text-xs font-mono text-zinc-500 dark:text-zinc-400">
        {isSignUp ? (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="text-cyan-600 dark:text-neon-cyan hover:underline font-bold cursor-pointer"
            >
              Sign In
            </button>
          </p>
        ) : (
          <p>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="text-cyan-600 dark:text-neon-cyan hover:underline font-bold cursor-pointer"
            >
              Create Account
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#06070a] flex items-center justify-center p-6 text-zinc-900 dark:text-white relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 dark:bg-neon-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <Suspense
        fallback={
          <div className="w-full max-w-md p-8 rounded-3xl bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border border-black/10 dark:border-white/10 text-center font-mono text-xs text-zinc-400">
            Loading...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}

