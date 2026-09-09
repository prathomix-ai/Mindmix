"use client";

import { useState, useCallback, useRef } from "react";
import {
  type PyodideStatus,
  type PyodideExecutionResult,
} from "@/types/codeRunner";
import {
  getPyodideInstance,
  runPythonCode,
} from "@/lib/pyodideRunner";

export interface UsePyodideReturn {
  status: PyodideStatus;
  statusMessage: string;
  result: PyodideExecutionResult | null;
  isRunning: boolean;
  isReady: boolean;
  run: (code: string) => Promise<PyodideExecutionResult>;
  clearOutput: () => void;
  initialize: () => Promise<void>;
}

export function usePyodide(): UsePyodideReturn {
  const [status, setStatus] = useState<PyodideStatus>("unloaded");
  const [statusMessage, setStatusMessage] = useState<string>("Pyodide not loaded");
  const [result, setResult] = useState<PyodideExecutionResult | null>(null);
  const isInitializingRef = useRef(false);

  // Pre-warm or initialize Pyodide
  const initialize = useCallback(async () => {
    if (status === "ready" || status === "running" || isInitializingRef.current) {
      return;
    }

    try {
      isInitializingRef.current = true;
      setStatus("loading_wasm");
      setStatusMessage("Loading Pyodide WebAssembly runtime...");

      await getPyodideInstance((msg) => {
        setStatusMessage(msg);
      });

      setStatus("ready");
      setStatusMessage("Python WASM runtime ready");
    } catch (err: any) {
      setStatus("error");
      setStatusMessage(err?.message || "Failed to initialize Pyodide");
    } finally {
      isInitializingRef.current = false;
    }
  }, [status]);

  const run = useCallback(
    async (code: string): Promise<PyodideExecutionResult> => {
      setStatus("running");
      setStatusMessage("Executing Python in WebAssembly...");

      try {
        const execResult = await runPythonCode(code, (msg) => {
          setStatusMessage(msg);
        });

        setResult(execResult);
        setStatus("ready");
        setStatusMessage(
          execResult.error
            ? `Execution encountered error (${execResult.executionTimeMs}ms)`
            : `Completed in ${execResult.executionTimeMs}ms`
        );
        return execResult;
      } catch (err: any) {
        const fallbackResult: PyodideExecutionResult = {
          stdout: "",
          stderr: "",
          returnValue: null,
          executionTimeMs: 0,
          error: err?.message || String(err),
          timestamp: new Date().toLocaleTimeString(),
        };
        setResult(fallbackResult);
        setStatus("error");
        setStatusMessage("Execution failed");
        return fallbackResult;
      }
    },
    []
  );

  const clearOutput = useCallback(() => {
    setResult(null);
  }, []);

  return {
    status,
    statusMessage,
    result,
    isRunning: status === "running",
    isReady: status === "ready",
    run,
    clearOutput,
    initialize,
  };
}
