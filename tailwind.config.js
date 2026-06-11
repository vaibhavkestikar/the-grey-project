/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#829CBC",
          dark: "#1D3461",
          heading: "#5B21B6",
          secondary: "#376996",
          accent: "#7C3AED",
          success: "#10B981",
        },
        ink: {
          DEFAULT: "#E2E8F0",
          muted: "#94A3B8",
        },
        surface: "#070B12",
      },
      fontSize: {
        base: ["16px", { lineHeight: "1.6" }],
      },
      fontFamily: {
        sans: [
          "var(--font-poppins)",
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
