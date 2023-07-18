/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./components/meeting/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#FFFFFF",
          200: "#EFEFEF",
          300: "#DADADA",
          400: "#818181",
          500: "#6F767E",
          600: "#404B53",
          650: "#202427",
          700: "#232830", //"#26282C", //"#2B3034",
          750: "#1A1C22",
          800: "#050A0E",
          850: "#26282C",
          900: "#95959E",
        },
        orange: {
          250: "#FF5810",
        },
        yellow: {
          150: "#FF900C",
        },
        purple: {
          350: "#5568FE",
          550: "#596BFF",
          600: "#586FEA",
          650: "#2B3480",
          700: "#4F63D2",
          750: "#6246FB",
          300: "#4658BB",
        },
        red: { 150: "#D32F2F" },
        pink: {
          150: "#EC4899",
          750: "#2c1a22",
        },
        green: {
          250: "#40A954",
          350: "#34A85333",
          450: "#34A85380",
          550: "#87E5A2",
          650: "#96F3D24D",
        },
        blue: {
          350: "#76d9e6",
        },
        customGray: {
          100: "#252A34",
          150: "#31353B",
          200: "#1E1E1E",
          300: "#454545",
          400: "#282828",
          500: "#848484",
          600: "#C4C4C4",
          700: "#272727",
          800: "#343434",
        },
      },
    },
    screens: {
      'mobile': {'max': '768px'},
      'hero-break': '880px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
};