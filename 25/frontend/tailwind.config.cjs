/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
      boxShadow: {
        y1: '0 1px 8px rgba(0, 0, 0, 0.26)',
        y2: '0 2px 8px rgba(0, 0, 0, 0.26)',
        x1: '1px 0 8px rgba(0, 0, 0, 0.26)',
      },
      colors: {
        '$green': '#00b359',
        '$red': '#a30000',
        '$violet': '#3b0062',
        '$yellow': '#fab83f',
      },
      dropShadow: {
        'blue': '0 0 2em #646cffaa',
      },
    },
  },
  plugins: [],
}
