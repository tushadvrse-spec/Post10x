/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0c0f",
        card: "#12151a",
        "card-hover": "#171b22",
        "card-inner": "#0d1014",
        border: "#1e232b",
        "border-light": "#2a313d",
        brand: {
          DEFAULT: "#00e599",
          hover: "#00c984",
          dark: "#053b2a",
          glow: "rgba(0, 229, 153, 0.2)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
