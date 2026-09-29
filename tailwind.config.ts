import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        "bg-deep": "#F7F1E7",
        ink: "#1A140C",
        muted: "#6E6153",
        gold: "#B8860B",
        "gold-soft": "#F7C589",
        "gold-deep": "#8C660A",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        "8xl": "1600px",
      },
    },
  },
  plugins: [],
};

export default config;
