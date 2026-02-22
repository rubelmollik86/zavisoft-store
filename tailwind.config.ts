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
        kicks: {
          black: "#0a0a0a",
          blue: "#3B5BFF",
          "blue-light": "#5B7BFF",
          yellow: "#FFD600",
          gray: "#1a1a1a",
          "gray-2": "#2a2a2a",
          "gray-3": "#6b6b6b",
          "gray-4": "#3a3a3a",
        },
      },
      fontFamily: {
        display: ["'Barlow Condensed'", "sans-serif"],
        body: ["'Barlow'", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.4s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "marquee": "marquee 20s linear infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { transform: "translateY(24px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        slideInLeft: { "0%": { transform: "translateX(-24px)", opacity: "0" }, "100%": { transform: "translateX(0)", opacity: "1" } },
        scaleIn: { "0%": { transform: "scale(0.95)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
    },
  },
  plugins: [],
};
export default config;
