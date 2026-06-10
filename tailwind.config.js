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
          DEFAULT: "#111827",
          muted: "#475569",
        },
        surface: "#F8FAFC",
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
