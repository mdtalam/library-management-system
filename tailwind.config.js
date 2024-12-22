/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: '#008080',
        coral: '#FF6F61',
        beige: '#FAF3E0',
        charcoal: '#2C3E50',
        lightCoral: '#FF7F72',
        springGreen: '#00FA9A',
        tomato: '#E74C3C',
      },
    },
  },
  plugins: [],
}

