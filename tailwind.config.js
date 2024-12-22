/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: '#4A148C',
        orange: '#FF7043',
        lightOrange: '#FFA270',
        white: '#FDFDFD',
        darkGray: '#3E3E3E',
        crimson: '#D32F2F',
        limeGreen: '#81C784',
      },
    },
  },
  plugins: [],
}

