import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand ──
        primary:   "#102347",
        accent:    "#2472C8",
        "accent-hover": "#3D8FE0",
        // ── Backgrounds ──
        "bg-page":    "#F4F7FB",
        "bg-section": "#EAF2FC",
        "bg-card":    "#F0F5FB",
        "bg-dark":    "#102347",
        "bg-footer":  "#0A1628",
        // ── Text ──
        "text-heading":        "#0A1628",
        "text-body":           "#163360",
        "text-muted":          "#1E4D8C",
        "text-on-dark":        "#7AB4EE",
        "text-heading-on-dark":"#EAF2FC",
        // ── Borders ──
        "border-light": "#B8D4F7",
        "border-dark":  "#1E4D8C",
        // ── Scale ──
        "scale-50":  "#EAF2FC",
        "scale-100": "#B8D4F7",
        "scale-200": "#7AB4EE",
        "scale-300": "#3D8FE0",
        "scale-400": "#2472C8",
        "scale-500": "#1E4D8C",
        "scale-600": "#163360",
        "scale-700": "#102347",
        "scale-800": "#0E1E3A",
        "scale-900": "#091526",
        "scale-950": "#050D1A",
        // ── Status — form feedback only, never decorative ──
        "status-success":        "#22A05A",
        "status-success-bg":     "#F0FAF4",
        "status-success-border": "#A8D5B5",
        "status-success-text":   "#1A6B3A",
        "status-error":          "#D93636",
        "status-error-bg":       "#FDF2F2",
        "status-error-border":   "#F0AAAA",
        "status-error-text":     "#8B1A1A",
        "status-warning":        "#D4A017",
        "status-warning-bg":     "#FFFBF0",
        "status-warning-border": "#F0D98A",
        "status-warning-text":   "#7A5500",
        "status-info":           "#2472C8",
        "status-info-bg":        "#F0F6FF",
        "status-info-border":    "#B8D4F7",
        "status-info-text":      "#102347",
        // ── Terminal UI ──
        "terminal-green": "#4ADE80",
        "bg-terminal":    "#080F1E",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        sans:   ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono:   ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // ── Display — hero headline only ──
        "display": ["clamp(42px, 5.5vw, 68px)", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        // ── Headings ──
        "h1":      ["clamp(32px, 4vw, 52px)",   { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "h2":      ["clamp(22px, 2.8vw, 34px)", { lineHeight: "1.12", letterSpacing: "-0.025em" }],
        "h3":      ["17px",                     { lineHeight: "1.3",  letterSpacing: "-0.01em" }],
        "closing": ["clamp(24px, 3vw, 38px)",   { lineHeight: "1.1",  letterSpacing: "-0.03em" }],
        // ── Body ──
        "body-lg": ["17px",                     { lineHeight: "1.8" }],
        "body":    ["16px",                     { lineHeight: "1.75" }],
        "body-sm": ["13.5px",                   { lineHeight: "1.65" }],
        // ── UI labels ──
        "eyebrow": ["11px",                     { lineHeight: "1",   letterSpacing: "0.17em" }],
        "nav":     ["14px",                     { lineHeight: "1",   letterSpacing: "0.01em" }],
        "button":  ["14px",                     { lineHeight: "1",   letterSpacing: "0.01em" }],
        "caption": ["12.5px",                   { lineHeight: "1.5", letterSpacing: "0.02em" }],
        "label":   ["10px",                     { lineHeight: "1",   letterSpacing: "0.12em" }],
        // ── Numbers ──
        "stat":    ["24px",                     { lineHeight: "1",   letterSpacing: "-0.03em" }],
        // ── Logo ──
        "logo":    ["13.5px",                   { lineHeight: "1",   letterSpacing: "0.09em" }],
      },
      maxWidth: {
        site: "1120px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "from": { transform: "translateX(0)" },
          "to":   { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "grid-light": "linear-gradient(#B8D4F7 1px, transparent 1px), linear-gradient(90deg, #B8D4F7 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "56px 56px",
      },
    },
  },
  plugins: [],
};

export default config;
