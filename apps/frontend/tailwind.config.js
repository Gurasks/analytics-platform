export default {
  content: [
    "./apps/frontend/index.html",
    "./apps/frontend/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0f0f1a",
        card: "#1a1a2e",
        primary: "#7c3aed",
        accent: "#a78bfa",
        'accent-hover': "#8b5cf6",
      },
    },
  },
  plugins: [],
};