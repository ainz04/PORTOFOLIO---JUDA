import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      colors: {
        "bg-light": "#fafafa",
        "bg-dark": "#0a0a0a",
        "card-light": "#ffffff",
        "card-dark": "#141414",
        "border-light": "#e5e5e5",
        "border-dark": "#2a2a2a",
        "ink-light": "#0a0a0a",
        "ink-dark": "#ffffff",
        "muted-light": "#6b6b6b",
        "muted-dark": "#a3a3a3",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
