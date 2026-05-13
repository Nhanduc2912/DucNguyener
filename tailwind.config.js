/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        display: ["Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        sky: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        accent: {
          sky: "#0ea5e9",
          violet: "#8b5cf6",
          emerald: "#10b981",
          amber: "#f59e0b",
          pink: "#ec4899",
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "blob-float": "blob-float 8s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "blob-float": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(20px,-30px) scale(1.05)" },
          "66%": { transform: "translate(-15px,20px) scale(0.95)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)",
        "gradient-soft": "linear-gradient(135deg, #e0f2fe 0%, #ede9fe 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
