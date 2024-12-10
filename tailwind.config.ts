import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#2F6457",
        secondary: "#F9F9F9",
        textPrimary: "#2F6457",
      },
      fontFamily: {
        sans: ['"Playfair Display"', "serif"],
      },
      spacing: {
        headerHeight: "4rem", // Estimated header height
      },
      borderRadius: {
        button: "0.375rem", // Smooth button corners
      },
    },
  },
  plugins: [],
};
export default config;
