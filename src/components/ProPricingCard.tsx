"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Zap, Crown, Sparkles, Lock, Loader2 } from "lucide-react";
import { ProBadge } from "@/components/ProBadge";

interface ProPricingCardProps {
  onUpgradeClick?: () => void;
  ctaHref?: string;
  className?: string;
}

// Dynamically load the standard Razorpay checkout script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export function ProPricingCard({
  onUpgradeClick,
  className = "",
}: ProPricingCardProps) {
  // 1. Billing toggle state
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Final Pricing Configuration ($5/mo and $49/yr)
  const monthlyPrice = 5;
  const yearlyPrice = 49;
  const effectiveMonthly = "4.08";

  const features = [
    { text: "Everything in Starter (Forever Free)", isHighlight: true },
    { text: "AI Meeting Summaries & Action Items", hasProBadge: true },
    { text: "Board Brain: Semantic Vector Canvas Search", hasProBadge: true },
    { text: "Real-time Multiplayer Collaboration Sync", hasProBadge: true },
    { text: "Laser Pointer & Interactive Presentation Mode", hasProBadge: true },
    { text: "Watermark-Free Clean 4K Ultra-HD Exports", hasProBadge: true },
    { text: "Priority Cloud AI Compute (Qwen2.5 / Llama 3.3)", hasProBadge: true },
    { text: "Unlimited Infinite Canvases & Cloud Backup", hasProBadge: true },
  ];

  // 3. Razorpay Payment Handler
  const handleRazorpayPayment = async () => {
    try {
      setIsLoading(true);

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Razorpay checkout failed to load. Please verify your internet connection.");
        setIsLoading(false);
        return;
      }

      // Call backend route to generate order ID
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: isYearly ? "yearly" : "monthly",
          amount: isYearly ? yearlyPrice : monthlyPrice,
          currency: "USD",
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to create payment order. Please try again.");
      }

      const orderData = await res.json();

      const options = {
        key:
          orderData.key_id ||
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
          "rzp_test_placeholder",
        amount: orderData.amount,
        currency: orderData.currency || "USD",
        name: "PRATHOMIX MindMix Pro",
        description: isYearly
          ? `MindMix Pro Yearly Membership ($${yearlyPrice}/year)`
          : `MindMix Pro Monthly Membership ($${monthlyPrice}/month)`,
        order_id: orderData.id,
        theme: {
          color: "#00f5ff",
        },
        handler: function (response: any) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

          // Activate local Pro status
          try {
            const currentUser = localStorage.getItem("mindmix_current_user");
            if (currentUser) {
              const parsed = JSON.parse(currentUser);
              parsed.role = "pro";
              localStorage.setItem("mindmix_current_user", JSON.stringify(parsed));
            }
          } catch (e) {
            console.error("Failed to store pro role:", e);
          }

          if (onUpgradeClick) onUpgradeClick();
        },
        prefill: {
          name: "MindMix Creator",
          email: "creator@mindmix.ai",
        },
        modal: {
          ondismiss: function () {
            console.log("Razorpay checkout popup closed by user.");
          },
        },
      };

      const rzpInstance = new (window as any).Razorpay(options);
      rzpInstance.open();
    } catch (error: any) {
      console.error("Razorpay payment error:", error);
      alert(error?.message || "Failed to initiate payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -6,
        boxShadow: "0 0 45px rgba(0, 245, 255, 0.35), 0 20px 40px -15px rgba(0, 0, 0, 0.8)",
      }}
      className={`relative p-6 sm:p-7 rounded-3xl bg-black/40 backdrop-blur-xl border border-cyan-500/50 shadow-[0_0_35px_rgba(0,245,255,0.22)] flex flex-col justify-between space-y-5 z-10 transition-all duration-300 text-white overflow-hidden group ${className}`}
    >
      {/* ── Background Ambient Neon Glows ── */}
      <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-all duration-500" />
      <div className="absolute -bottom-24 -left-24 w-52 h-52 rounded-full bg-blue-600/15 blur-3xl pointer-events-none group-hover:bg-blue-600/25 transition-all duration-500" />

      {/* ── Glowing Softly-Pulsing "Most Popular" Badge ── */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 14px rgba(0, 245, 255, 0.5)",
            "0 0 24px rgba(0, 245, 255, 0.85)",
            "0 0 14px rgba(0, 245, 255, 0.5)",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
        }}
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 to-cyan-300 text-black uppercase flex items-center gap-1 z-20 border border-cyan-200/40"
      >
        <Zap className="w-3 h-3 fill-black" />
        <span>Most Popular</span>
      </motion.div>

      <div className="space-y-4 relative z-10">
        {/* ── Plan Header & Category ── */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.3)]">
              <Crown className="w-3.5 h-3.5 fill-cyan-400" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                PRO PLAN
              </span>
              <p className="text-[10px] text-zinc-400 font-mono">Creators &amp; Builders</p>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 tracking-wide">
            Indie &amp; Pro
          </span>
        </div>

        {/* ── Interactive Monthly / Yearly Toggle Switch ── */}
        <div className="p-1 rounded-xl bg-zinc-900/70 border border-white/10 backdrop-blur-md relative flex items-center">
          {/* Monthly Button */}
          <button
            type="button"
            onClick={() => setIsYearly(false)}
            className={`relative flex-1 py-1.5 px-3 text-xs font-mono font-bold rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer ${!isYearly ? "text-black" : "text-zinc-400 hover:text-zinc-200"
              }`}
          >
            {!isYearly && (
              <motion.div
                layoutId="billingTogglePill"
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-lg shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10">Monthly</span>
          </button>

          {/* Yearly Button with "Save 18%" Badge */}
          <button
            type="button"
            onClick={() => setIsYearly(true)}
            className={`relative flex-1 py-1.5 px-3 text-xs font-mono font-bold rounded-lg transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${isYearly ? "text-black" : "text-zinc-400 hover:text-zinc-200"
              }`}
          >
            {isYearly && (
              <motion.div
                layoutId="billingTogglePill"
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-lg shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10">Yearly</span>

            {/* Glowing Clean Savings Badge */}
            <motion.span
              animate={isYearly ? { scale: [1, 1.08, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`relative z-10 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-tight uppercase border transition-all ${isYearly
                  ? "bg-black/90 text-cyan-300 border-cyan-400/50 shadow-[0_0_10px_rgba(0,245,255,0.5)]"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-400/40 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                }`}
            >
              Save 18%
            </motion.span>
          </button>
        </div>

        {/* ── Price Display with Smooth Animation ── */}
        <div className="space-y-0.5">
          <div className="flex items-baseline gap-2">
            <div className="overflow-hidden min-w-[95px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={isYearly ? "yearly-price" : "monthly-price"}
                  initial={{ opacity: 0, y: -12, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 12, filter: "blur(3px)" }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="inline-block text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight drop-shadow-[0_0_16px_rgba(0,245,255,0.3)]"
                >
                  ${isYearly ? yearlyPrice : monthlyPrice}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex flex-col justify-end">
              <AnimatePresence mode="wait">
                <motion.span
                  key={isYearly ? "yearly-sub" : "monthly-sub"}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs sm:text-sm font-mono text-cyan-300 font-semibold"
                >
                  {isYearly ? "/ year" : "/ month"}
                </motion.span>
              </AnimatePresence>
              <span className="text-[10px] font-mono text-zinc-400">
                {isYearly ? `(≈ $${effectiveMonthly}/mo billed annually)` : "billed monthly"}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-zinc-400 leading-snug">
            {isYearly
              ? "All-access for 1 full year (~$4.08/mo). Clean savings for builders."
              : "Flexible month-to-month access. Cancel anytime."}
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* ── Fixed-Height Scrollable Features Container ── */}
        <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="flex items-start gap-2.5 text-zinc-200 text-xs"
            >
              <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_8px_rgba(0,245,255,0.2)]">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap leading-snug">
                {feature.hasProBadge && <ProBadge size="sm" />}
                <span
                  className={
                    feature.isHighlight
                      ? "font-semibold text-white tracking-wide"
                      : "text-zinc-300"
                  }
                >
                  {feature.text}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Exclusivity / Guarantee Note ── */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1.5 rounded-lg shadow-inner">
          <Lock className="w-3 h-3 text-cyan-400 shrink-0" />
          <span>Instant activation &bull; 14-day money-back guarantee</span>
        </div>
      </div>

      {/* ── Bottom Interactive Razorpay CTA Button ── */}
      <div className="relative z-10 pt-1">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <button
            type="button"
            id="upgrade-to-pro-btn"
            onClick={handleRazorpayPayment}
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl font-mono text-xs sm:text-sm font-extrabold text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-[0_0_26px_rgba(0,245,255,0.45)] hover:shadow-[0_0_36px_rgba(0,245,255,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Preparing Checkout...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-black" />
                <span>Upgrade to Pro — ${isYearly ? `${yearlyPrice}/yr` : `${monthlyPrice}/mo`}</span>
                <ArrowRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </motion.div>

        <p className="text-center text-[10px] font-mono text-zinc-500 mt-2">
          Secure Razorpay checkout &bull; Cancel anytime with 1-click
        </p>
      </div>
    </motion.div>
  );
}

export default ProPricingCard;
