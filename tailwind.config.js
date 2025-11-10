

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.ts",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/component/**/*.{js,jsx,ts,tsx}",
    "./src/navigation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
