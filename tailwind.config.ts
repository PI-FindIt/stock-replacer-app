import { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativeWind from "nativewind/preset";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [nativeWind],
  theme: {
    colors: {
      primary: "#fa784b",
      primaryVariant: {
        DEFAULT: "#fff3ed",
        dark: "#26120B",
      },
      grey: {
        DEFAULT: "#e0e0e0",
        dark: "##e0e0e0",
      },
      secondary: "#fe50d1",
      secondaryVariant: {
        DEFAULT: "#feedfa",
        dark: "#270C20",
      },
      black: "#000000",
      blackVariant: "#000000bb",
      white: "#ffffff",
      whiteVariant: "#ffffffbb",
      background: {
        DEFAULT: "#ffffff",
        dark: "#1b1b1b",
      },
      text: {
        DEFAULT: "#000",
        dark: "#fff",
      },
      textVariant: {
        DEFAULT: "#000000bb",
        dark: "#ffffffbb",
      },
    },
    boxShadow: {
      DEFAULT: "0 4px 16px rgba(0,0,0,0.05)",
      lg: "0 4px 16px rgba(0,0,0,0.15)",
      glow: "0 0px 16px rgba(254,80,209,0.5)",
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
