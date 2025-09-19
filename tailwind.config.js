/* @type {import('tailwindcss').Config.js} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    container: {
      screens: {
        mobile: "600px",
        tablet: "900px",
        desktop: "1200px",
      },
    },
    extend: {
      colors: {
        main: {
          yellow: "#FAB417",
          orange: "#4B3419",
          black: "#111010",
        },
        light: {
          yellow: "#FAB417",
        },
      },
      backgroundOpacity: {
        10: "0.1",
        20: "0.2",
        95: "0.95",
      },
      backgroundImage: {
        paws: "url('/src/assets/Images/paws.png')",
      },
      backgroundColor: {
        primary: "#181820",
        secondary: "#FFB803",
        tertiary: "#F46036", //#181820
        gray: "#e2e8f0",
        changecol: "#f7f7ff", //#181820
        treebg: "#21212D",
        treeNode: "#353546",
        dark: {
          blue: "#1C1E2A",
          yellow: "#FAB417",
        },
        main: {
          yellow: "#FAB417",
          orange: "#4B3419",
          black: "#111010",
        },
        light: {
          yellow: "#FAB417",
        },
      },
      textColor: {
        primary: "#21212e",
        secondary: "#f7f7ff",
        tertiary: "#FFB803",
        changecol: "#F46036",
        dark: {
          blue: "#1C1E2A",
          yellow: "#FAB417",
        },
        yellow: "#FAB417",
        orange: "#4B3419",
        black: "#111010",
        light: {
          yellow: "#FAB417",
        },
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      lato: ["Lato", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
