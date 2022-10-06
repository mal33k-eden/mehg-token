/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'node_modules/daisyui/dist/**/*.js'
  ],
  theme: {
  
    extend: {
      fontFamily:{
        bankGothic: ["BankGothic","sans-serif"],
      },
      fontSize: {
        'tiny': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': ['2.5rem',{
          letterSpacing: '-0.02em',
            lineHeight: '1.2',
        }],
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': ['4.5rem', {
            letterSpacing: '-0.02em',
            lineHeight: '1.2',
            fontWeight:'300', 
          }],
        '8xl': '5rem',
      },
    },
  },
  daisyui: {
    themes: [
       
      {
        "dark": {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#D09821",
          success: "#36D399",
          secondary: "#453643",
          fontFamily:{
            bankGothic: ["BankGothic","sans-serif"],
          }, 
        },
      }
      
    ],
  },
  plugins: [require('daisyui')],

}

