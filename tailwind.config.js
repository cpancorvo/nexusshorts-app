/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0c0c0a",        // off-black, warmer than pure black
        bone: "#f4f1ea",       // warm off-white
        ash: "#1a1a17",        // raised surface
        smoke: "#2a2a25",      // borders
        fog: "#8b8b80",        // muted text
        chalk: "#d4d2c8",      // primary text on dark
        acid: "#d4ff3a",       // signature accent — acid lime
        rust: "#c14a26",       // secondary accent
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter Tight"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};
