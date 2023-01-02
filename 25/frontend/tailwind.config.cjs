/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
      dropShadow: {
        'blue': '0 0 2em #646cffaa',
      },
    },
  },
  plugins: [],
}
