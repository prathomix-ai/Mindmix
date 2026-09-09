"use client";

import React, { useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type SessionResult, type SearchMode } from "@/types/rag";
import { useRagSearch } from "@/hooks/useRagSearch";

// ─────────────────────────────────────────────────────────────────────────────
// Styles (injected via a <style> tag — avoids needing a separate CSS file)
// ─────────────────────────────────────────────────────────────────────────────
const PANEL_STYLES = `
.rag-backdrop {
  position: fixed;
  inset: 0;
  background: hsla(230, 30%, 4%, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 450;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 80px;
  padding-left: 16px;
  padding-right: 16px;
}

.rag-panel {
  position: relative;
  width: 100%;
  max-width: 620px;
  border-radius: 20px;
  overflow: hidden;
  background: hsla(230, 18%, 10%, 0.9);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid hsla(195, 90%, 60%, 0.18);
  box-shadow:
    0 28px 64px hsla(0, 0%, 0%, 0.5),
    0 0 0 1px hsla(195, 90%, 60%, 0.1) inset,
    0 0 48px hsla(195, 90%, 60%, 0.06);
}

/* Animated top-accent bar */
.rag-panel::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-primary));
  background-size: 200% 100%;
  animation: shimmer 2.4s ease-in-out infinite;
}

.rag-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid hsla(230, 16%, 22%, 0.8);
}

.rag-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, hsla(195, 90%, 60%, 0.2), hsla(265, 85%, 65%, 0.15));
  border: 1px solid hsla(195, 90%, 60%, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.rag-title {
  flex: 1;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.rag-mode-toggle {
  display: flex;
  gap: 3px;
  padding: 3px;
  border-radius: 8px;
  background: hsla(230, 16%, 14%, 0.8);
  border: 1px solid hsla(230, 16%, 22%, 0.6);
}

.rag-mode-btn {
  padding: 4px 10px;
  border-radius: 5px;
  border: none;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s;
  color: var(--color-text-muted);
  background: transparent;
  font-family: var(--font-sans);
}

.rag-mode-btn.active {
  background: linear-gradient(135deg, hsla(195, 90%, 60%, 0.2), hsla(265, 85%, 65%, 0.15));
  color: var(--color-accent);
  border: 1px solid hsla(195, 90%, 60%, 0.3);
}

.rag-search-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
}

.rag-input-wrap {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.rag-input-icon {
  position: absolute;
  left: 12px;
  font-size: 15px;
  pointer-events: none;
  opacity: 0.5;
}

.rag-input {
  width: 100%;
  padding: 10px 12px 10px 38px;
  border-radius: 10px;
  border: 1px solid hsla(195, 90%, 60%, 0.2);
  background: hsla(230, 18%, 8%, 0.7);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  caret-color: var(--color-accent);
}

.rag-input::placeholder {
  color: var(--color-text-faint);
}

.rag-input:focus {
  border-color: hsla(195, 90%, 60%, 0.5);
  box-shadow: 0 0 0 3px hsla(195, 90%, 60%, 0.1);
}

.rag-search-btn {
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px solid hsla(195, 90%, 60%, 0.3);
  background: linear-gradient(135deg, hsla(195, 90%, 60%, 0.15), hsla(265, 85%, 65%, 0.1));
  color: var(--color-accent);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
}

.rag-search-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, hsla(195, 90%, 60%, 0.25), hsla(265, 85%, 65%, 0.18));
  box-shadow: 0 0 16px hsla(195, 90%, 60%, 0.2);
  transform: translateY(-1px);
}

.rag-search-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.rag-results {
  max-height: 400px;
  overflow-y: auto;
  padding: 0 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rag-empty {
  padding: 28px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.rag-empty-icon { font-size: 28px; }

.rag-empty-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

.rag-empty-text {
  font-size: 12px;
  color: var(--color-text-muted);
  max-width: 340px;
  line-height: 1.5;
}

.rag-result-card {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid hsla(230, 16%, 22%, 0.6);
  background: hsla(230, 18%, 12%, 0.5);
  cursor: pointer;
  transition: all 0.18s;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rag-result-card:hover {
  border-color: hsla(195, 90%, 60%, 0.35);
  background: hsla(230, 18%, 14%, 0.7);
  box-shadow: 0 4px 16px hsla(0, 0%, 0%, 0.2);
  transform: translateY(-1px);
}

.rag-result-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.rag-result-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.35;
  flex: 1;
}

.rag-score-bar-wrap {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}

.rag-score-label {
  font-size: 10px;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--color-accent);
}

.rag-score-bar {
  width: 40px;
  height: 4px;
  border-radius: 99px;
  background: hsla(230, 16%, 22%, 0.8);
  overflow: hidden;
}

.rag-score-fill {
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, var(--color-accent), var(--color-primary));
  transition: width 0.4s ease;
}

.rag-result-excerpt {
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rag-result-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.rag-meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--color-text-faint);
}

.rag-tag {
  padding: 1px 7px;
  border-radius: 99px;
  background: hsla(195, 90%, 60%, 0.1);
  color: var(--color-accent);
  border: 1px solid hsla(195, 90%, 60%, 0.18);
  font-size: 10px;
  font-weight: 500;
}

.rag-footer {
  padding: 10px 20px 14px;
  border-top: 1px solid hsla(230, 16%, 16%, 0.6);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rag-footer-info {
  font-size: 10px;
  color: var(--color-text-faint);
  font-family: var(--font-mono);
}

.rag-close-btn {
  font-size: 11px;
  color: var(--color-text-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  font-family: var(--font-sans);
  transition: all 0.15s;
}

.rag-close-btn:hover {
  background: hsla(230, 16%, 18%, 0.8);
  color: var(--color-text);
}

.rag-error {
  padding: 14px 20px;
  margin: 0 12px 10px;
  border-radius: 10px;
  background: hsla(0, 70%, 60%, 0.08);
  border: 1px solid hsla(0, 70%, 60%, 0.2);
  font-size: 13px;
  color: var(--priority-high);
  line-height: 1.5;
}

.rag-suggestions {
  padding: 4px 20px 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.rag-suggestion-chip {
  padding: 5px 12px;
  border-radius: 99px;
  border: 1px solid hsla(265, 70%, 60%, 0.2);
  background: hsla(265, 70%, 60%, 0.07);
  color: var(--color-text-muted);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.rag-suggestion-chip:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: hsla(265, 85%, 65%, 0.12);
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// Suggested queries
// ─────────────────────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "Login architecture diagram",
  "Last sprint retrospective",
  "Payment flow refactor",
  "System design session",
  "Q4 planning meeting",
];

// ─────────────────────────────────────────────────────────────────────────────
// Result Card
// ─────────────────────────────────────────────────────────────────────────────
function ResultCard({
  result,
  index,
  onNavigate,
}: {
  result: SessionResult;
  index: number;
  onNavigate: (boardId: string, sessionId: string) => void;
}) {
  const scorePercent = Math.round(
    result.mode === "vector"
      ? result.score * 100
      : Math.min(result.score * 100 * 8, 100) // RRF scores are small (0-0.03 range)
  );

  const formattedDate = result.session_date
    ? new Date(result.session_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <motion.div
      className="rag-result-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      onClick={() => onNavigate(result.board_id, result.session_id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onNavigate(result.board_id, result.session_id)}
      aria-label={`Open board: ${result.title}`}
    >
      <div className="rag-result-top">
        <span className="rag-result-title">{result.title}</span>
        <div className="rag-score-bar-wrap" title={`Match score: ${scorePercent}%`}>
          <span className="rag-score-label">{scorePercent}%</span>
          <div className="rag-score-bar">
            <div
              className="rag-score-fill"
              style={{ width: `${Math.min(scorePercent, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {result.extracted_text && (
        <p className="rag-result-excerpt">{result.extracted_text}</p>
      )}

      <div className="rag-result-meta">
        {formattedDate && (
          <span className="rag-meta-item">
            <span style={{ opacity: 0.6 }}>📅</span> {formattedDate}
          </span>
        )}
        {result.shape_count != null && result.shape_count > 0 && (
          <span className="rag-meta-item">
            <span style={{ opacity: 0.6 }}>⬡</span> {result.shape_count} shapes
          </span>
        )}
        {result.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rag-tag">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Panel
// ─────────────────────────────────────────────────────────────────────────────
export interface BoardBrainSearchProps {
  isOpen: boolean;
  ownerId?: string;
  onClose: () => void;
  /** Called when user clicks a result to navigate to a board */
  onNavigateToBoard?: (boardId: string, sessionId: string) => void;
}

export default function BoardBrainSearch({
  isOpen,
  ownerId = "anonymous",
  onClose,
  onNavigateToBoard = () => {},
}: BoardBrainSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    query,
    setQuery,
    results,
    isSearching,
    error,
    mode,
    setMode,
    search,
    clearResults,
    modelUsed,
    resultCount,
  } = useRagSearch({ ownerId });

  // Auto-focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      clearResults();
    }
  }, [isOpen, clearResults]);

  // Escape to close
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") search();
    },
    [search]
  );

  const handleSuggestion = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      search(suggestion);
    },
    [setQuery, search]
  );

  const hasResults = results.length > 0;
  const hasSearched = !isSearching && (hasResults || error || (query && resultCount === 0));

  return (
    <>
      {/* Inject styles */}
      <style dangerouslySetInnerHTML={{ __html: PANEL_STYLES }} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="rag-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
            role="dialog"
            aria-modal="true"
            aria-label="Board Brain Search"
          >
            <motion.div
              className="rag-panel"
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Header */}
              <div className="rag-header">
                <div className="rag-icon">🔍</div>
                <span className="rag-title">Board Brain Search</span>

                {/* Mode toggle */}
                <div className="rag-mode-toggle" role="group" aria-label="Search mode">
                  {(["vector", "hybrid"] as SearchMode[]).map((m) => (
                    <button
                      key={m}
                      id={`rag-mode-${m}`}
                      className={`rag-mode-btn ${mode === m ? "active" : ""}`}
                      onClick={() => setMode(m)}
                      title={
                        m === "vector"
                          ? "Semantic similarity search"
                          : "Semantic + keyword (BM25) fusion"
                      }
                    >
                      {m === "vector" ? "⚡ Vector" : "🔀 Hybrid"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search input */}
              <div className="rag-search-row">
                <div className="rag-input-wrap">
                  <span className="rag-input-icon">🔎</span>
                  <input
                    ref={inputRef}
                    id="rag-search-input"
                    className="rag-input"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Find the login architecture diagram from last week…"
                    aria-label="Search query"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
                <button
                  id="rag-search-submit"
                  className="rag-search-btn"
                  onClick={() => search()}
                  disabled={isSearching || !query.trim()}
                  aria-label="Search"
                >
                  {isSearching ? (
                    <>
                      <span className="spinner" style={{ width: 12, height: 12, borderWidth: 2 }} />
                      Searching…
                    </>
                  ) : (
                    "Search"
                  )}
                </button>
              </div>

              {/* Suggestion chips (shown when no results) */}
              {!hasResults && !isSearching && (
                <div className="rag-suggestions" aria-label="Suggested searches">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      className="rag-suggestion-chip"
                      onClick={() => handleSuggestion(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Error */}
              {error && !isSearching && (
                <div className="rag-error" role="alert">
                  ⚠️ {error}
                </div>
              )}

              {/* Empty state */}
              {!isSearching && !error && query && resultCount === 0 && hasSearched && (
                <div className="rag-empty">
                  <span className="rag-empty-icon">🗂️</span>
                  <p className="rag-empty-title">No boards found</p>
                  <p className="rag-empty-text">
                    Try different keywords or lower the similarity threshold. Make sure boards are indexed first via <strong>"Save &amp; Index"</strong>.
                  </p>
                </div>
              )}

              {/* Results */}
              {hasResults && (
                <div className="rag-results" role="list" aria-label="Search results">
                  {results.map((result, i) => (
                    <ResultCard
                      key={result.session_id}
                      result={result}
                      index={i}
                      onNavigate={onNavigateToBoard}
                    />
                  ))}
                </div>
              )}

              {/* Footer */}
              {(hasResults || modelUsed) && (
                <div className="rag-footer">
                  <span className="rag-footer-info">
                    {resultCount > 0
                      ? `${resultCount} result${resultCount > 1 ? "s" : ""} · `
                      : ""}
                    {modelUsed.split("/").pop() ?? ""}
                  </span>
                  <button className="rag-close-btn" onClick={onClose}>
                    Close ✕
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
