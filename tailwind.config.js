/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      mb: "375px",
    },
    extend: {
      colors: {
        veryDarkBlue: "hsl(217, 54%, 11%)",
        darkBlueNormal: "hsl(216, 50%, 16%)",
        darkBlue: "hsl(215, 32%, 27%)",
        softBlue: "hsl(215, 51%, 70%)",
        Orange: "hsl(25, 97%, 53%)",
        White: "hsl(0, 0%, 100%)",
        LightGrey: "hsl(217, 12%, 63%)",
        MediumGrey: "hsl(216, 12%, 54%)",
        cyan: "hsl(178, 100%, 50%)",
      },
      fontFamily: {
        Orb: ["Orbitron", ...defaultTheme.fontFamily.sans],
        overpass: ["Overpass", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
        spin_reverse: {
          "0%": { transform: "rotate(1800deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "spin-fast": "spin 0.3s linear",
        "spin-reverse": "spin_reverse 0.4s linear",
      },
    },
  },
  plugins: [],
};
