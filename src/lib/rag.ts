import {
  type IndexRequest,
  type IndexResponse,
  type SearchRequest,
  type SearchResponse,
} from "@/types/rag";

const AI_BACKEND_URL =
  process.env.NEXT_PUBLIC_AI_BACKEND_URL ?? "http://localhost:8000";

// ─────────────────────────────────────────────────────────────────────────────
// Index a canvas session for RAG search
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Embeds and indexes a canvas session snapshot so it becomes
 * searchable via `searchCanvasSessions`.
 *
 * Call this after saving a board or after the AI summary is generated
 * to keep the vector store up-to-date.
 */
export async function indexCanvasSession(
  request: IndexRequest
): Promise<IndexResponse> {
  const response = await fetch(`${AI_BACKEND_URL}/api/rag/index`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const err = await _extractError(response);
    throw new Error(`Indexing failed: ${err}`);
  }

  return response.json() as Promise<IndexResponse>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Natural-language search over indexed canvas sessions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Performs a vector (or hybrid) similarity search over the user's
 * indexed canvas sessions.
 *
 * @param request - Natural-language query + owner_id + optional mode/limit
 * @returns Ranked list of matching sessions with board_id for navigation
 *
 * @example
 * const results = await searchCanvasSessions({
 *   query: "Find the login architecture diagram from last week",
 *   owner_id: user.id,
 *   mode: "hybrid",
 *   limit: 5,
 * });
 */
export async function searchCanvasSessions(
  request: SearchRequest
): Promise<SearchResponse> {
  const response = await fetch(`${AI_BACKEND_URL}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode: "vector",
      limit: 5,
      similarity_threshold: 0.3,
      ...request,
    }),
  });

  if (!response.ok) {
    const err = await _extractError(response);
    throw new Error(`Search failed: ${err}`);
  }

  return response.json() as Promise<SearchResponse>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal
// ─────────────────────────────────────────────────────────────────────────────

async function _extractError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return data.detail ?? response.statusText;
  } catch {
    return response.statusText || `HTTP ${response.status}`;
  }
}
