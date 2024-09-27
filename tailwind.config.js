module.exports = {
  mode: "jit",
  content:[
 "./src/pages/*.{js,jsx,ts,tsx}",
   "./src/components/**/*.{js,jsx,ts,tsx}"
  ] ,
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      bottom: {
        14: "6rem",
      },
      colors: {
        "gray-light": "#f3f3f3",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "main-text": "var(--text-main)",
        accent: "var(--accent)",
        "secondary-text": "var(--text-secondary)",
        highlight: "var(--highlight)",
        red: {
          100: "#f2d9df",
          200: "#e4b4be",
          300: "#d78e9e",
          400: "#c9697d",
          500: "#bc435d",
          600: "#96364a",
          700: "#712838",
          800: "#4b1b25",
          900: "#260d13",
        },
      },
      minHeight: {
        content: "calc(100vh - 4.0rem - 7.6rem )",
        "full-minus-nav": "calc(100vh - 4.0rem)",
      },

      maxHeight: {
        content: "calc(100vh - 4.0rem - 7.6rem )",
        "full-minus-nav": "calc(100vh - 4.0rem)",
      },
      fontFamily: {
        montserrat: "'Montserrat', sans-serif;",
        inconsolata: "'Inconsolata', sans-serif;",
      },
      transitionDuration: {
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1000: "1000ms",
        2000: "2000ms",
      },
      transitionDelay: {
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1000: "1000ms",
      },
      animation: {
        none: "none",
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 2s infinite",
        float: "float 3s infinite",
        refloat: "refloat 3s infinite",
      },
    },
    screens: {
      xs: "300px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
