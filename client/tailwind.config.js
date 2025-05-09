// client/tailwind.config.js

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
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
          primary: '#0FA3B1', // For buttons, links, or headers
          secondary: '#B5E2FA', // For subtle accents or borders
          background: '#F9F7F3', // For the app background
          accent: '#cfb961', // For secondary highlights
          hover: '#F7A072', // For button or link hover states
        },
      },
    },
    plugins: [],
  }
  