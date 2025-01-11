import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#F0F9F0",
        primary: {
          DEFAULT: "#9ED5C5",
          hover: "#8BC5B5",
        },
        secondary: {
          DEFAULT: "#FFB5A7",
          hover: "#FFA597",
        },
        accent: {
          DEFAULT: "#FCD5CE",
          hover: "#FFBEB4",
        },
        text: "#374151",
      },
      animation: {
        "button-pop": "button-pop 0.3s ease-out",
      },
      keyframes: {
        "button-pop": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;