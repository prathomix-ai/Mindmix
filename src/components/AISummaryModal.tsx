"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type SummarizeResponse, type ActionItem, type SessionMood } from "@/types/ai";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatMs(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
}

const MOOD_EMOJI: Record<SessionMood, string> = {
  productive: "⚡",
  brainstorming: "🌀",
  planning: "🗺️",
  retrospective: "🔍",
};

const MOOD_LABEL: Record<SessionMood, string> = {
  productive: "Productive",
  brainstorming: "Brainstorming",
  planning: "Planning",
  retrospective: "Retrospective",
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: ActionItem["priority"] }) {
  return (
    <span className={`priority-badge ${priority}`}>
      {priority === "high" ? "🔴" : priority === "medium" ? "🟡" : "🟢"} {priority}
    </span>
  );
}

function ActionCard({ item, index }: { item: ActionItem; index: number }) {
  return (
    <motion.div
      className="action-item-card"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <PriorityBadge priority={item.priority} />
      <div className="action-item-content">
        <span className="action-item-task">{item.task}</span>
        {(item.owner || item.due) && (
          <div className="action-item-meta">
            {item.owner && (
              <span>
                <span style={{ opacity: 0.6 }}>👤</span> {item.owner}
              </span>
            )}
            {item.due && (
              <span>
                <span style={{ opacity: 0.6 }}>📅</span> {item.due}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function BulletList({
  items,
  dotClass = "",
}: {
  items: string[];
  dotClass?: string;
}) {
  return (
    <ul className="modal-list">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
        >
          <span className={`list-dot ${dotClass}`} />
          {item}
        </motion.li>
      ))}
    </ul>
  );
}

function LoadingState() {
  return (
    <div className="modal-loading">
      <motion.div
        className="loading-orb"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        🧠
      </motion.div>
      <div className="loading-dots">
        <span />
        <span />
        <span />
      </div>
      <p className="loading-text">
        Analysing your whiteboard with Qwen AI…
      </p>
      <p style={{ fontSize: "12px", color: "var(--color-text-faint)", marginTop: -8 }}>
        This may take up to 30 seconds on first request
      </p>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="modal-error">
      <span className="error-icon">⚠️</span>
      <p className="error-title">AI Analysis Failed</p>
      <p className="error-message">{message}</p>
      <button className="btn-retry" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Modal Component
// ─────────────────────────────────────────────────────────────────────────────

export interface AISummaryModalProps {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  data: SummarizeResponse | null;
  boardTitle: string;
  onClose: () => void;
  onRetry: () => void;
}

export default function AISummaryModal({
  isOpen,
  isLoading,
  error,
  data,
  boardTitle,
  onClose,
  onRetry,
}: AISummaryModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close on backdrop click (not panel click)
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  const handleCopy = useCallback(async () => {
    if (!data) return;
    const text = [
      `# ${boardTitle} — AI Summary`,
      "",
      `## Summary`,
      data.summary,
      "",
      `## Key Points`,
      ...data.key_points.map((p) => `- ${p}`),
      "",
      `## Action Items`,
      ...data.action_items.map(
        (a) =>
          `- [${a.priority.toUpperCase()}] ${a.task}${a.owner ? ` (@${a.owner})` : ""}${a.due ? ` — due ${a.due}` : ""}`
      ),
      "",
      `## Decisions`,
      ...data.decisions.map((d) => `- ${d}`),
      "",
      `## Next Steps`,
      ...data.next_steps.map((s) => `- ${s}`),
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [data, boardTitle]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="AI Summary"
        >
          <motion.div
            ref={panelRef}
            className="modal-panel glass"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* ── Header ────────────────────────────────────────────────── */}
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-badge">
                  <span>✦</span> Board Brain
                </div>
                <h2 className="modal-title gradient-text">
                  AI Meeting Summary
                </h2>
                <div className="modal-meta">
                  <span className="modal-meta-item">
                    <span style={{ opacity: 0.6 }}>📋</span> {boardTitle}
                  </span>
                  {data && (
                    <>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span
                        className={`mood-chip ${data.mood}`}
                        title={`Session mood: ${MOOD_LABEL[data.mood as SessionMood]}`}
                      >
                        {MOOD_EMOJI[data.mood as SessionMood]}{" "}
                        {MOOD_LABEL[data.mood as SessionMood]}
                      </span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span className="modal-meta-item" style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>
                        ⏱ {formatMs(data.processing_time_ms)}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <button
                className="btn-close"
                onClick={onClose}
                aria-label="Close summary"
                id="ai-modal-close"
              >
                ✕
              </button>
            </div>

            {/* ── Body ──────────────────────────────────────────────────── */}
            <div className="modal-body">
              {isLoading && <LoadingState />}

              {!isLoading && error && (
                <ErrorState message={error} onRetry={onRetry} />
              )}

              {!isLoading && !error && data && (
                <>
                  {/* Summary */}
                  {data.summary && (
                    <motion.div
                      className="modal-section"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                    >
                      <div className="section-label">
                        <span className="section-label-icon">📝</span>
                        Summary
                      </div>
                      <p className="summary-text">{data.summary}</p>
                    </motion.div>
                  )}

                  {/* Key Points */}
                  {data.key_points.length > 0 && (
                    <motion.div
                      className="modal-section"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="section-label">
                        <span className="section-label-icon">💡</span>
                        Key Points
                      </div>
                      <BulletList items={data.key_points} />
                    </motion.div>
                  )}

                  {/* Action Items */}
                  {data.action_items.length > 0 && (
                    <motion.div
                      className="modal-section"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div className="section-label">
                        <span className="section-label-icon">✅</span>
                        Action Items
                        <span
                          style={{
                            marginLeft: "4px",
                            padding: "1px 7px",
                            borderRadius: "99px",
                            background: "var(--color-surface-2)",
                            fontSize: "10px",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {data.action_items.length}
                        </span>
                      </div>
                      <div className="action-items-grid">
                        {data.action_items.map((item, i) => (
                          <ActionCard key={i} item={item} index={i} />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Decisions */}
                  {data.decisions.length > 0 && (
                    <motion.div
                      className="modal-section"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="section-label">
                        <span className="section-label-icon">⚖️</span>
                        Decisions Made
                      </div>
                      <BulletList items={data.decisions} dotClass="accent" />
                    </motion.div>
                  )}

                  {/* Next Steps */}
                  {data.next_steps.length > 0 && (
                    <motion.div
                      className="modal-section"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <div className="section-label">
                        <span className="section-label-icon">🚀</span>
                        Next Steps
                      </div>
                      <BulletList items={data.next_steps} dotClass="green" />
                    </motion.div>
                  )}
                </>
              )}
            </div>

            {/* ── Footer ────────────────────────────────────────────────── */}
            {data && !isLoading && !error && (
              <div className="modal-footer">
                <span className="footer-info">
                  <span style={{ opacity: 0.5 }}>⚙</span>
                  {data.model_used.split("/").pop()}
                </span>
                <button
                  className="btn-copy"
                  onClick={handleCopy}
                  id="ai-modal-copy"
                  aria-label="Copy summary as markdown"
                >
                  {copied ? (
                    <>✓ Copied!</>
                  ) : (
                    <>
                      <span>📋</span> Copy as Markdown
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
