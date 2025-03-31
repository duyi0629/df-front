/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        headerH: 'var(--header-height)' 
      },
      height: {
        headerH: 'var(--header-height)' 
      }
    },
  },
  plugins: [],
}

