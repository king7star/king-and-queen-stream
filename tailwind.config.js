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
        primary: {
          DEFAULT: '#E91E63',
          dark: '#C2185B',
          light: '#F06292',
        },
        background: {
          dark: '#121212',
          light: '#F5F5F5',
        }
      },
    },
  },
  plugins: [],
}
