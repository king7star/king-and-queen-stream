/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        king: {
          blue: {
            DEFAULT: '#0A192F',
            light: '#112240',
            deep: '#020C1B',
          },
          gold: {
            DEFAULT: '#D4AF37',
            light: '#F4D03F',
            dim: '#996515',
          }
        },
        background: {
          dark: '#0A192F',
          light: '#F5F5F5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
