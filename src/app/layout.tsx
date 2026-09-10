import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "WasmSpace — The Infinite Coding Canvas",
  description:
    "The Infinite Coding & AI Canvas for Modern Teams & Thinkers. Draw, code, present, and brainstorm with auto-shape recognition, in-browser WASM runtime, and live meeting summaries.",
  keywords: [
    "wasmspace",
    "coding canvas",
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
    title: "WasmSpace — The Infinite Coding Canvas",
    description: "The Infinite Coding & AI Canvas for Modern Teams & Thinkers.",
    type: "website",
    url: "https://prathomix.tech",
  },
  icons: {
    icon: "/mindmix-logo-v2.png",
    shortcut: "/mindmix-logo-v2.png",
    apple: "/mindmix-logo-v2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </head>
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
