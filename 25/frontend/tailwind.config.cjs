/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'loader': 'loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
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
      keyframes: {
        loader: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
