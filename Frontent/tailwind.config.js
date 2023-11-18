/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-purple":"#607d8b",
        "light-white":"rgba(255,255,255,0.17)",
      }
    },
  },
  plugins: [], 
}




   