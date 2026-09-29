import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ---- Backgrounds (synced with globals.css) ----
        bg: "#0E0E10",           // ✅ deep charcoal (was grey #6b6968)
        bg1: "#08080A",          // ✅ deepest black (was "black")
        "bg-deep": "#08080A",    // ✅ synced
        "bg-elev": "#16151A",    // ✅ cards, elevated surfaces
        "bg-soft": "#1F1D22",    // ✅ hover surfaces

        // ---- Text ----
        ink: "#F7F2E7",          // ✅ warm cream
        muted: "#AD9F8F",        // ✅ secondary text

        // ---- Gold (unchanged — already correct) ----
        gold: "#F2A53D",
        "gold-soft": "#F7C589",
        "gold-deep": "#C9791A",
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
      // Optional: gold-glow utility as a Tailwind class
      boxShadow: {
        "gold-glow": "0 0 40px rgba(242, 165, 61, 0.12)",
        "gold-glow-lg": "0 0 60px rgba(242, 165, 61, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;