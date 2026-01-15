/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'scum-black': '#000000', // Deep black
        'scum-dark-gray': '#1a1a1a', // For cards/sections
        'scum-white': '#FFFFFF',
        'scum-yellow': '#FFFF00', // Acid Yellow
        'scum-red': '#FF0000',    // Bright Red
        'scum-concrete': '#888888', // Secondary text
      },
      borderWidth: {
        'thick': '4px',
        'thin': '1px',
      },
      fontFamily: {
        display: ['"Inter"', 'sans-serif'], // Headlines
        mono: ['"Courier New"', 'monospace'], // Data, Dates, Prices
        body: ['"Inter"', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}
