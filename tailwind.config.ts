import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "templar-red": {
          DEFAULT: "var(--color-templar-red)",
          dark: "var(--color-templar-red-dark)",
          light: "var(--color-templar-red-light)",
        },
        vellum: {
          DEFAULT: "var(--color-vellum)",
          warm: "var(--color-vellum-warm)",
        },
        cream: "var(--color-cream)",
        "iron-gall": {
          DEFAULT: "var(--color-iron-gall)",
          soft: "var(--color-iron-gall-soft)",
        },
        illumination: {
          DEFAULT: "var(--color-illumination)",
          soft: "var(--color-illumination-soft)",
        },
        "cloister-stone": "var(--color-stone)",
        "seal-wax": "var(--color-seal-wax)",
      },
      fontFamily: {
        display: ["Cinzel", "Trajan Pro", "Georgia", "serif"],
        body: ["EB Garamond", "Crimson Pro", "Georgia", "serif"],
        ui: ["Inter", "Helvetica Neue", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: {
        subtle: "2px",
        card: "4px",
      },
      boxShadow: {
        parchment: "var(--shadow-parchment)",
        elevated: "var(--shadow-elevated)",
        illuminated: "var(--shadow-illuminated)",
      },
      transitionDuration: {
        quick: "var(--duration-quick)",
        deliberate: "var(--duration-deliberate)",
        ceremonial: "var(--duration-ceremonial)",
      },
      transitionTimingFunction: {
        quick: "var(--ease-quick)",
        ceremonial: "var(--ease-ceremonial)",
        decisive: "var(--ease-decisive)",
        "out-soft": "var(--ease-out-soft)",
      },
    },
  },
  plugins: [],
};
export default config;
