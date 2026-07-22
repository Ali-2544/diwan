import type { Config } from "tailwindcss";

/**
 * Diwan design tokens — from design_handoff_diwan_marketing/README.md.
 * This file is the single source of truth for colour, type, spacing, radius
 * and shadow. Values are hi-fi and final; do not inline raw hexes in components.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0E2A47", 2: "#173A5E", deep: "#08192B" },
        ink: "#132639",
        slate: "#56697E",
        muted: "#8492A3",
        line: "#E8EDF3",
        tint: "#F4F7FB",
        cream: "#FBF7EF",
        gold: {
          DEFAULT: "#B7822A",
          2: "#DDB05A",
          soft: "#F5EAD2",
          text: "#9A6B14",
          textHover: "#7A520C",
        },
        green: { DEFAULT: "#1E8A63", bg: "#E7F4EE", line: "#BFE6D3" },
        amber: { DEFAULT: "#B07A16", bg: "#FCF1DE" },
        danger: { DEFAULT: "#C24A2E", bg: "#FBEAE4", line: "#F1C9BB" },
        // Browser-frame traffic-light dots.
        dot: { red: "#E2574C", amber: "#E9B740", green: "#4BBE7C" },
      },

      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },

      fontSize: {
        eyebrow: ["12px", { lineHeight: "1", letterSpacing: "0.24em", fontWeight: "700" }],
      },

      maxWidth: {
        content: "1200px",
        showcase: "1120px",
        prose: "760px",
        "prose-sm": "680px",
      },

      spacing: {
        section: "104px", // standard section vertical padding
        gutter: "32px",
      },

      borderRadius: {
        pill: "999px",
        btn: "13px",
        "btn-sm": "11px",
        card: "18px",
        "card-lg": "22px",
      },

      boxShadow: {
        card: "0 24px 44px -34px rgba(14,42,71,.3)",
        "card-hover": "0 30px 50px -30px rgba(14,42,71,.3)",
        float: "0 40px 80px -44px rgba(14,42,71,.45)",
        hero: "0 40px 80px -40px rgba(14,42,71,.4)",
        showcase: "0 60px 120px -50px rgba(14,42,71,.5)",
        tile: "0 30px 60px -44px rgba(14,42,71,.4)",
        gold: "0 10px 24px -12px rgba(183,130,42,.75)",
        "gold-btn": "0 14px 30px -14px rgba(183,130,42,.8)",
        "gold-btn-hover": "0 20px 36px -14px rgba(183,130,42,.9)",
        nav: "0 1px 0 rgba(14,42,71,.06), 0 10px 30px -20px rgba(14,42,71,.5)",
      },

      transitionTimingFunction: {
        // The site-wide reveal/hover curve from the spec.
        diwan: "cubic-bezier(.16,.8,.24,1)",
      },

      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(20px,-18px) scale(1.08)" },
        },
      },
      animation: {
        floaty: "floaty 8s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        blob: "blob 14s ease-in-out infinite",
        "blob-slow": "blob 18s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [],
};

export default config;
