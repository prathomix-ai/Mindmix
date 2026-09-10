/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Production Web Service Optimization (Render / Vercel / Docker) ───────
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  poweredByHeader: false,
  reactStrictMode: true,

  // ── Package Transpilation ────────────────────────────────────────────────
  transpilePackages: [
    '@tldraw/tldraw',
    '@tldraw/editor',
    '@tldraw/store',
    '@tldraw/tlschema',
  ],

  // ── Webpack Fallbacks for Browser Runtime ────────────────────────────────
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      fs: false,
      path: false,
    };
    return config;
  },

  // ── Remote Image Domains ─────────────────────────────────────────────────
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'prathomix.tech' },
    ],
  },

  // ── Security Headers (without restrictive COEP that breaks Pyodide CDN) ──
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
