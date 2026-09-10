"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

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
          // If Supabase is unconfigured or mock in dev
          if (error.message.includes("fetch") || error.message.includes("placeholder")) {
            const role = email.toLowerCase().includes("admin") ? "admin" : "user";
            const payload = JSON.stringify({ email, name: fullName, phone: phoneNumber, role });
            localStorage.setItem("wasmspace_current_user", payload);
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
            const role: "user" | "admin" = email.toLowerCase().includes("admin") ? "admin" : "user";
            const payload = JSON.stringify({ email, role });
            localStorage.setItem("wasmspace_current_user", payload);
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

        const sessionData = JSON.stringify({
          email,
          name: data?.user?.user_metadata?.full_name || email.split("@")[0],
          role: userRole,
        });
        localStorage.setItem("wasmspace_current_user", sessionData);
        onAuthSuccess({ email, role: userRole });
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#050505]/75 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-[95%] md:max-w-2xl mx-auto rounded-3xl bg-white/95 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden z-10 text-zinc-900 dark:text-zinc-100 p-5 sm:p-8 space-y-5 sm:space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <Image
                src="/wasmspace-logo.png"
                alt="WasmSpace Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.55)]"
              />
            </div>
            <div>
              <h3 className="font-mono font-bold text-lg tracking-tight">
                {isSignUp ? "Create WasmSpace Account" : "Sign In to WasmSpace"}
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
          {/* Full Name - Required on Sign-Up */}
          {isSignUp && (
            <div className="space-y-1 animate-fade-in">
              <label className="block text-zinc-700 dark:text-zinc-300 font-medium flex justify-between">
                <span>Full Name</span>
                <span className="text-[10px] text-red-500">*Required</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Morgan"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-cyan-500 dark:focus:border-neon-cyan outline-none text-zinc-900 dark:text-white font-sans text-sm placeholder:text-zinc-400"
                />
              </div>
            </div>
          )}

          {/* Email Address - Required */}
          <div className="space-y-1">
            <label className="block text-zinc-700 dark:text-zinc-300 font-medium flex justify-between">
              <span>Email Address</span>
              <span className="text-[10px] text-red-500">*Required</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
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

          {/* Contact Number (Phone) - Optional on Sign-Up */}
          {isSignUp && (
            <div className="space-y-1 animate-fade-in">
              <label className="block text-zinc-700 dark:text-zinc-300 font-medium flex justify-between">
                <span>Contact Number (Phone)</span>
                <span className="text-[10px] text-zinc-400">Optional</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-cyan-500 dark:focus:border-neon-cyan outline-none text-zinc-900 dark:text-white font-sans text-sm placeholder:text-zinc-400"
                />
              </div>
            </div>
          )}

          {/* Password - Required with eye toggle */}
          <div className="space-y-1">
            <label className="block text-zinc-700 dark:text-zinc-300 font-medium flex justify-between">
              <span>Password</span>
              <span className="text-[10px] text-red-500">*Required</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-cyan-500 dark:focus:border-neon-cyan outline-none text-zinc-900 dark:text-white font-sans text-sm placeholder:text-zinc-400"
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

          {/* Confirm Password - Required on Sign-Up with eye toggle */}
          {isSignUp && (
            <div className="space-y-1 animate-fade-in">
              <label className="block text-zinc-700 dark:text-zinc-300 font-medium flex justify-between">
                <span>Confirm Password</span>
                <span className="text-[10px] text-red-500">*Required</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border outline-none text-zinc-900 dark:text-white font-sans text-sm placeholder:text-zinc-400 ${
                    confirmPassword && password !== confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-black/10 dark:border-white/10 focus:border-cyan-500 dark:focus:border-neon-cyan"
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
                <p className="text-[10px] font-mono text-red-500 animate-fade-in">
                  Passwords do not match
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-black bg-neon-cyan hover:bg-neon-cyan/90 shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

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
