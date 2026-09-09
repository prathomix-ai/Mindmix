"use client";

import React from "react";

export default function SubscriptionModule() {
  // Subscription stats
  const stats = [
    { title: "Monthly Recurring Revenue", value: "$4,218", change: "+18.4% this month", icon: "💰", glow: "text-neon-green" },
    { title: "Annual Run Rate (ARR)", value: "$50,616", change: "Projected FY2026", icon: "📈", glow: "text-neon-cyan" },
    { title: "Active Paid Seats", value: "222", change: "208 Pro / 14 Enterprise", icon: "⚡", glow: "text-neon-purple" },
    { title: "Average Churn Rate", value: "1.2%", change: "Industry top quartile", icon: "🛡️", glow: "text-zinc-300" },
  ];

  const recentSubscriptions = [
    { id: "sub_9012", email: "sarah.connor@cyberdyne.io", plan: "Pro Monthly", amount: "$19/mo", status: "Active", renewedAt: "2026-09-01" },
    { id: "sub_8411", email: "admin@prathomix.tech", plan: "Enterprise", amount: "Custom", status: "Active", renewedAt: "2026-08-15" },
    { id: "sub_7720", email: "marcus.vance@solaris.dev", plan: "Pro Annual", amount: "$190/yr", status: "Active", renewedAt: "2026-08-28" },
    { id: "sub_6519", email: "david.kim@quantumleap.ai", plan: "Pro Monthly", amount: "$19/mo", status: "Active", renewedAt: "2026-09-03" },
    { id: "sub_5190", email: "alicia.keys@soundtrack.io", plan: "Pro Monthly", amount: "$19/mo", status: "Past Due", renewedAt: "2026-08-30" },
  ];

  return (
    <div className="space-y-8">
      {/* ── Metric Cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl space-y-2"
          >
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider">
              <span>{stat.title}</span>
              <span>{stat.icon}</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${stat.glow}`}>
              {stat.value}
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* ── Plan Distribution & Tiers ──────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-xl space-y-6">
        <div>
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <span>⚡</span> SaaS Tier Breakdown
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Active distribution of subscribers across database profiles
          </p>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden flex">
            <div style={{ width: "62%" }} className="bg-neon-cyan" title="Free Tier (62%)" />
            <div style={{ width: "32%" }} className="bg-neon-purple" title="Pro Tier (32%)" />
            <div style={{ width: "6%" }} className="bg-neon-green" title="Enterprise Tier (6%)" />
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan" />
              <span>Free (62%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-purple" />
              <span>Pro $19 (32%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-green" />
              <span>Enterprise (6%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Transactions / Subscriptions Table ──────────────── */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-white font-mono">Recent Active Subscriptions</h3>
          <p className="text-xs text-zinc-400">Synced with Supabase profiles and Stripe/Payment Webhooks</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl shadow-xl">
          <table className="w-full text-left text-xs sm:text-sm text-zinc-300 font-mono">
            <thead className="bg-zinc-950/70 text-zinc-400 text-xs uppercase border-b border-zinc-800">
              <tr>
                <th className="p-4">Subscriber</th>
                <th className="p-4">Plan Tier</th>
                <th className="p-4">Billing Rate</th>
                <th className="p-4">Billing Status</th>
                <th className="p-4">Last Renewal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {recentSubscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-white">{sub.email}</div>
                    <div className="text-[11px] text-zinc-500">{sub.id}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neon-purple/15 text-neon-purple border border-neon-purple/30">
                      {sub.plan}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-200">{sub.amount}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        sub.status === "Active"
                          ? "bg-green-950/40 text-green-300 border border-green-500/40"
                          : "bg-red-950/40 text-red-300 border border-red-500/40"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          sub.status === "Active" ? "bg-green-400" : "bg-red-400"
                        }`}
                      />
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-400 text-xs">{sub.renewedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
