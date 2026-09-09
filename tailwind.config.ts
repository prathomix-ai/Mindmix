import type { Config } from 'tailwindcss';

const config: Config = {
  // Dark mode enabled via 'class' strategy for next-themes compatibility
  darkMode: 'class',

  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // ── Color Palette ───────────────────────────────────────────────────
      colors: {
        neon: {
          cyan:   '#00f5ff',
          purple: '#a855f7',
          orange: '#f97316',
          green:  '#22c55e',
          pink:   '#ec4899',
          yellow: '#eab308',
        },
        void: {
          DEFAULT: '#0a0a0f',
          dark:    '#0d0d14',
          surface: '#12121c',
          raised:  '#1a1a2e',
        },
      },

      // ── Typography ──────────────────────────────────────────────────────
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'monospace'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      // ── Animations ──────────────────────────────────────────────────────
      animation: {
        'pulse-neon':    'pulse-neon 2s ease-in-out infinite',
        'float':         'float 3s ease-in-out infinite',
        'glow-breathe':  'glow-breathe 3s ease-in-out infinite',
        'scan-line':     'scan-line 4s linear infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'glow-breathe': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,245,255,0.2)' },
          '50%':      { boxShadow: '0 0 40px rgba(0,245,255,0.5), 0 0 80px rgba(0,245,255,0.2)' },
        },
        'scan-line': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },

      // ── Backdrop blur ───────────────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },

      // ── Box shadows ─────────────────────────────────────────────────────
      boxShadow: {
        'neon-cyan':   '0 0 20px rgba(0,245,255,0.3), 0 0 60px rgba(0,245,255,0.1)',
        'neon-purple': '0 0 20px rgba(168,85,247,0.3), 0 0 60px rgba(168,85,247,0.1)',
        'glass':       '0 8px 32px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.05)',
      },
    },
  },

  plugins: [],
};

export default config;
