import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MindMix — Infinite AI Smart Whiteboard",
  description:
    "The Infinite AI Canvas for Modern Teams & Thinkers. Draw, code, present, and brainstorm with auto-shape recognition, in-browser Python WASM, and live meeting summaries.",
  keywords: [
    "whiteboard",
    "collaboration",
    "AI",
    "brainstorming",
    "excalidraw",
    "python wasm",
    "pyodide",
    "meeting summary",
  ],
  openGraph: {
    title: "MindMix — Infinite AI Smart Whiteboard",
    description: "The Infinite AI Canvas for Modern Teams & Thinkers.",
    type: "website",
    url: "https://prathomix.tech",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-void text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
