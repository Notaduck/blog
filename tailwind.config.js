module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "gray-light": "#f3f3f3",
        "orange-primary": "#e28743",
        "blue-primary": "#1e81b0",
        "blue-secondary": "#063970",
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'main-text': 'var(--text-main)',
        accent: 'var(--accent)',
        'secondary-text': 'var(--text-secondary)',
        tag:  'var(--text-secondary)',
        highlight:  'var(--highlight)',
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
  plugins: [require("@tailwindcss/forms")],
};
