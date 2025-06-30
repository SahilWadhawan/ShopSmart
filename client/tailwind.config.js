/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'primary-bg': '#0f172a',
      'card-bg': '#1a1f2e',
      'header-bg': '#141b2d',
      'footer-bg': '#101827'
      }
    },
  },
  plugins: [],
}