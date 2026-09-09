"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { searchCanvasSessions } from "@/lib/rag";
import { type SessionResult, type SearchMode } from "@/types/rag";

export interface UseRagSearchOptions {
  ownerId: string;
  defaultMode?: SearchMode;
  defaultLimit?: number;
}

export interface UseRagSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  results: SessionResult[];
  isSearching: boolean;
  error: string | null;
  mode: SearchMode;
  setMode: (m: SearchMode) => void;
  search: (q?: string) => Promise<void>;
  clearResults: () => void;
  modelUsed: string;
  resultCount: number;
}

/**
 * React hook that drives the Board Brain search panel.
 *
 * Calls the FastAPI /api/search endpoint with the current query,
 * manages loading / error state, and provides debounced search.
 */
export function useRagSearch({
  ownerId,
  defaultMode = "hybrid",
  defaultLimit = 5,
}: UseRagSearchOptions): UseRagSearchReturn {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SessionResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<SearchMode>(defaultMode);
  const [modelUsed, setModelUsed] = useState("");
  const [resultCount, setResultCount] = useState(0);

  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(
    async (overrideQuery?: string) => {
      const q = (overrideQuery ?? query).trim();
      if (!q) return;

      // Cancel any in-flight request
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setIsSearching(true);
      setError(null);

      try {
        const response = await searchCanvasSessions({
          query: q,
          owner_id: ownerId,
          mode,
          limit: defaultLimit,
        });

        setResults(response.results);
        setModelUsed(response.model_used);
        setResultCount(response.result_count);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(
          err instanceof Error ? err.message : "Search failed unexpectedly."
        );
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [query, ownerId, mode, defaultLimit]
  );

  const clearResults = useCallback(() => {
    setResults([]);
    setQuery("");
    setError(null);
    setResultCount(0);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  return {
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
  };
}
