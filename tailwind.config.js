/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#854DFF",
        lightGray: "#F0F0F0",
        darkGray: "#716F6F",
        danger: "#FF5959",
      },
      fontFamily: {
        display: ["monoton", "sans-serif"],
        body: ["poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
