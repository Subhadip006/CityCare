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
          'dark_moss_green': {
            DEFAULT: '#606c38',
            100: '#13160b',
            200: '#262b16',
            300: '#394121',
            400: '#4c562c',
            500: '#606c38',
            600: '#88994f',
            700: '#a9b876',
            800: '#c5d0a3',
            900: '#e2e7d1',
          },
          pakistan_green: {
            DEFAULT: '#283618',
            100: '#080b05',
            200: '#101509',
            300: '#18200e',
            400: '#1f2a13',
            500: '#283618',
            600: '#547133',
            700: '#80ac4d',
            800: '#aac987',
            900: '#d5e4c3',
          },
          cornsilk: {
            DEFAULT: '#fefae0',
            100: '#5d5103',
            200: '#baa206',
            300: '#f8dc27',
            400: '#fbeb84',
            500: '#fefae0',
            600: '#fefbe7',
            700: '#fefced',
            800: '#fffdf3',
            900: '#fffef9',
          },
          earth_yellow: {
            DEFAULT: '#dda15e',
            100: '#34210b',
            200: '#684216',
            300: '#9d6321',
            400: '#d1842c',
            500: '#dda15e',
            600: '#e4b57f',
            700: '#ebc79f',
            800: '#f1dabf',
            900: '#f8ecdf',
          },
          tiger_eye: {
            DEFAULT: '#bc6c25',
            100: '#251507',
            200: '#4b2b0f',
            300: '#704016',
            400: '#96561e',
            500: '#bc6c25',
            600: '#d98840',
            700: '#e3a570',
            800: '#ecc3a0',
            900: '#f6e1cf',
          },
        },
      },
    },
    plugins: [],
  }
  