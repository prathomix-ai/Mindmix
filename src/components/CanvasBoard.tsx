"use client";

import React from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

export interface CanvasBoardProps {
  initialData?: any;
  onChange?: (elements: readonly any[], appState: any, files: any) => void;
  excalidrawRef?: (api: any) => void;
}

/**
 * Isolated Excalidraw Client Component
 * -------------------------------------
 * Encapsulates the Excalidraw whiteboard engine and its mandatory stylesheet.
 * This component must ONLY be rendered on the client via `next/dynamic` with `ssr: false`.
 */
export default function CanvasBoard({ onChange, excalidrawRef }: CanvasBoardProps) {
  return (
    <div className="w-full h-full relative">
      <Excalidraw
        excalidrawAPI={excalidrawRef}
        theme="dark"
        zenModeEnabled={true}
        viewModeEnabled={false}
        onChange={onChange}
        UIOptions={{
          canvasActions: {
            toggleTheme: false,
            saveAsImage: false,
            export: false,
            loadScene: false,
            saveToActiveFile: false,
          },
        }}
      />
    </div>
  );
}
