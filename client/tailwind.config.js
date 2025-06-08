const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#E94F37',          // Rich Coral
        bgMain: '#F9F7F3',           // Off-White
        bgSecondary: '#E0DDD8',      // Light Warm Gray
        textPrimary: '#222222',      // Charcoal Black
      },
    },
  },
  plugins: [],
}
