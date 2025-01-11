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
        background: "#E8F5E8",
        primary: {
          DEFAULT: "#FFB5A7",
          hover: "#FFA597",
        },
        secondary: {
          DEFAULT: "#FFE5E0",
          hover: "#FFD5CE",
        },
        accent: {
          DEFAULT: "#FEF7CD",
          hover: "#FFF2B2",
        },
        title: "#0FA0CE",
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