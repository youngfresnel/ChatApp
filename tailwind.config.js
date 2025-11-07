// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   // NOTE: Update this to include the paths to all files that contain Nativewind classes.
//   content: [
//     "./App.tsx", 
//     "./srcs/screens/**/*.{js,ts,jsx,tsx}",
//     "./srcs/components/**/*.{js,ts,jsx,tsx}",
//     "./srcs/navigation/**/*.{js,ts,jsx,tsx}",
//     ],
//   presets: [require("nativewind/preset")],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
