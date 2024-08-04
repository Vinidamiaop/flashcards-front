/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      dark: {},
      light: {},
      keyframes: {
        slideRight: {
          'from': { transform: 'translateX(-20px)' },
          'to': { transform: 'translateX(0)' }
        }
      },
      animation: {
        slideRight: 'slideRight 0.3s ease-in-out forwards'
      }
    },
  },
  plugins: [],
};
