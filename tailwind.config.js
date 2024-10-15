/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "custom" : "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
        "custom-sm" : "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.01) 0px 1px 1px 0px",
        "custom-white" : "rgba(255, 255, 255, 0.2) 0px 2px 1px -1px, rgba(255, 255, 255, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px"
      },
      backgroundColor : {
        "custom-white" : "rgba(0, 0, 0, 0.75)",
        "custom-black" : "rgba(0, 0, 0, 0.25)"
      },
      fontFamily : {
        "mont" : 'var(--font-mont)'
      }
    },
  },
  plugins: [],
};
