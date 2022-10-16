/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gold-primary": "#FFA134",
        "gold-secondary": "#FFB74D",
        "green-primary": "#909D85",
        "green-secondary": "#A7B39E",
        "green-tertiary": "#B2BBAE",
        "green-quaternary": "#F3F6F2",
      },
    },
  },
  plugins: [],
};
