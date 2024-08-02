/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #4a148c, #f44336)",
      },
      colors: {
        btnColor: "#0172F4",
      },
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        dancingScript: ["Dancing Script"],
        montserrat: ["Montserrat"],
      },
      backgroundColor: {
        customRed: "rgba(172, 30, 35, 1)",
        testimonialCard: "#F9F9F9",
      },
    },
  },
  plugins: [],
};
