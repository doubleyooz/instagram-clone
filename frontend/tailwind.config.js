const colors = require("tailwindcss/colors");
const fontFamily = require("tailwindcss/")
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {
      backgroundImage: {
        icon: "url('https://www.instagram.com/static/bundles/es6/sprite_core_32f0a4f27407.png/32f0a4f27407.png')",
      },
      backgroundPosition: {
        title: "0 -130px",
      },
    },
    colors: {
      ...colors,
      transparent: "transparent",
      background: "#fafbfb",
      buttonReady: "#0764e6",
      button: "#0095f64d",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"), // import tailwind forms
  ],
};
