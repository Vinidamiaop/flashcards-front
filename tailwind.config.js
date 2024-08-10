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
      width: {
        '128': '32rem',
      },
      keyframes: {
        slideRight: {
          'from': { transform: 'translateX(-20px)' },
          'to': { transform: 'translateX(0)' }
        },
        slideTop: {
          'from': { transform: 'translateY(-20px)' },
          'to': { transform: 'translateY(0)' }
        },
        slideBottom: {
          'from': { transform: 'translateY(40px)' },
          'to': { transform: 'translateY(0)' }
        },
        lineLoading: {
          'from': { transform: 'translateX(-100%)' },
          'to': { transform: 'translateX(200%)' }
        }
      },
      animation: {
        slideRight: 'slideRight 0.3s ease-in-out forwards',
        slideTop: 'slideTop 0.3s ease-in-out forwards',
        slideBottom: 'slideBottom 0.3s ease-in-out forwards',
        lineLoading: 'lineLoading 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
