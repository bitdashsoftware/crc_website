import plugin from "tailwindcss/plugin";

let font_base = 16;
let font_scale = 1.25;

let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;

let fontPrimary = "Quicksand";
let fontPrimaryType = "sans-serif";
let fontSecondary = "Quicksand";
let fontSecondaryType = "sans-serif";

fontPrimary = fontPrimary
  .replace(/\+/g, " ")
  .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");

fontSecondary = fontSecondary
  .replace(/\+/g, " ")
  .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  safelist: [],
  darkMode: "class",
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        txt: {
          p: "var(--color-txt-p)",
          s: "var(--color-txt-s)",
          light: "var(--color-txt-light)",
        },
        bg: {
          p: "var(--color-bg-p)",
          s: "var(--color-bg-s)",
          t: "var(--color-bg-t)",
        },
        border: "var(--color-border)",
        glass: {
          txt: {
            p: "var(--color-glass-txt-p)",
            s: "var(--color-glass-txt-s)",
            light: "var(--color-glass-txt-light)",
          },
        },
        lightgreen: {
          txt: {
            p: "var(--color-lightgreen-txt-p)",
            s: "var(--color-lightgreen-txt-s)",
            light: "var(--color-lightgreen-txt-light)",
          },
        },
        beige: {
          txt: {
            p: "var(--color-beige-txt-p)",
            s: "var(--color-beige-txt-s)",
            light: "var(--color-beige-txt-light)",
          },
        },
        light: {
          txt: {
            p: "var(--color-light-txt-p)",
            s: "var(--color-light-txt-s)",
            light: "var(--color-light-txt-light)",
          },
          bg: {
            p: "var(--color-light-bg-p)",
            s: "var(--color-light-bg-s)",
            t: "var(--color-light-bg-t)",
          },
          border: "var(--color-light-border)",
          glass: {
            txt: {
              p: "var(--color-light-glass-txt-p)",
              s: "var(--color-light-glass-txt-s)",
              light: "var(--color-light-glass-txt-light)",
            },
          },
        },
        // Nature theme colors
        nature: {
          txt: {
            p: "var(--color-nature-txt-p)",
            s: "var(--color-nature-txt-s)",
            light: "var(--color-nature-txt-light)",
          },
          bg: {
            p: "var(--color-nature-bg-p)",
            s: "var(--color-nature-bg-s)",
            t: "var(--color-nature-bg-t)",
          },
          border: "var(--color-nature-border)",
          glass: {
            txt: {
              p: "var(--color-nature-glass-txt-p)",
              s: "var(--color-nature-glass-txt-s)",
              light: "var(--color-nature-glass-txt-light)",
            },
          },
        },
      },
      minHeight: {
        static_sidemenu: "calc(100vh - 6rem)",
      },
      maxHeight: {
        static_sidemenu: "calc(100vh - 6rem)",
      },
      fontSize: {
        base: font_base + "px",
        h1: h1 + "rem",
        "h1-sm": h1 * 0.8 + "rem",
        h2: h2 + "rem",
        "h2-sm": h2 * 0.8 + "rem",
        h3: h3 + "rem",
        "h3-sm": h3 * 0.8 + "rem",
        h4: h4 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
      },
      spacing: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
      },
      animation: {
        // Intersect
        fade: "fadeIn 1000ms both",
        fadeUp: "fadeInUp 1000ms both",
        fadeDown: "fadeInDown 1000ms both",
        fadeRight: "fadeInRight 1000ms both",
        fadeLeft: "fadeInLeft 1000ms both",
        scale: "scaleOut 1000ms both",
        // Star Background
        twinkle: "twinkle 5s infinite ease-in-out",
        // Cycle Background
        cycleBg: "cycleBg 60s ease infinite",
      },
      keyframes: {
        // Intersect
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(2rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-2rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInRight: {
          "0%": { opacity: 0, transform: "translateX(-2rem)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: 0, transform: "translateX(2rem)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        scaleOut: {
          "0%": { opacity: 0, transform: "scale(0.5)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        // Star Background
        twinkle: {
          "0%, 20%, 100%": { opacity: 1 },
          "10%": { opacity: 0.25 },
        },
        // Cycle Background
        cycleBg: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({
      generateContainer: false,
      gridGutterWidth: "2rem",
      gridGutters: {
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
      },
    }),
    plugin(({ addVariant }) => {
      addVariant("intersect", "&:not([no-intersect])");
    }),
    plugin(function ({ addBase, theme }) {
      addBase({
        // Default theme (dark) CSS custom properties
        ":root": {
          // Default theme colors - Updated to use beige
          "--color-txt-p": "rgba(233,221,175,1)",           // Beige primary text
          "--color-txt-s": "rgba(233,221,175,0.8)",         // Beige secondary text
          "--color-txt-light": "rgba(233,221,175,0.6)",     // Beige light text
          "--color-bg-p": "rgba(43, 70, 60, 1)",            // Dark green background
          "--color-bg-s": "rgba(233,221,175,0.9)",          // Beige glass background
          "--color-bg-t": "rgba(233,221,175,0.8)",          // Beige tertiary background
          "--color-border": "rgba(233,221,175,0.7)",        // Beige border
          "--color-glass-txt-p": "rgba(43, 70, 60, 0.9)",  // Dark text on beige glass
          "--color-glass-txt-s": "rgba(43, 70, 60, 0.8)",  // Dark text on beige glass
          "--color-glass-txt-light": "rgba(43, 70, 60, 0.7)", // Dark text on beige glass
          "--color-lightgreen-txt-p": "rgba(119,162,144,1)",
          "--color-lightgreen-txt-s": "rgba(119,162,144,1)",
          "--color-lightgreen-txt-light": "rgba(119,162,144,1)",
          "--color-beige-txt-p": "rgba(233,221,175,1)",
          "--color-beige-txt-s": "rgba(233,221,175,0.8)",
          "--color-beige-txt-light": "rgba(233,221,175,0.6)",
          
          // light theme - Updated to use rgb(246 242 232) instead of white
          "--color-light-txt-p": "rgb(246, 242, 232)",         // Light cream text
          "--color-light-txt-s": "rgba(246, 242, 232, 0.9)",   // Light cream text
          "--color-light-txt-light": "rgba(246, 242, 232, 0.8)", // Light cream text
          "--color-light-bg-p": "rgba(43, 70, 60, 1)",         // Dark green background
          "--color-light-bg-s": "rgba(246, 242, 232, 0.9)",    // Light cream glass
          "--color-light-bg-t": "rgba(246, 242, 232, 0.8)",    // Light cream tertiary
          "--color-light-border": "rgba(246, 242, 232, 0.7)",  // Light cream border
          "--color-light-glass-txt-p": "rgba(43, 70, 60, 1)", // Dark green text on light cream glass
          "--color-light-glass-txt-s": "rgba(43, 70, 60, 0.9)", // Dark green text on light cream glass
          "--color-light-glass-txt-light": "rgba(43, 70, 60, 0.8)", // Dark green text on light cream glass
          
          // Nature theme colors - Keep as is
          "--color-nature-txt-p": "rgba(34, 139, 34, 0.9)",
          "--color-nature-txt-s": "rgba(34, 139, 34, 0.8)",
          "--color-nature-txt-light": "rgba(34, 139, 34, 0.6)",
          "--color-nature-bg-p": "#f0f8f0",
          "--color-nature-bg-s": "#e0f0e0",
          "--color-nature-bg-t": "#d0e8d0",
          "--color-nature-border": "#90c090",
          "--color-nature-glass-txt-p": "rgba(34, 139, 34, 0.9)",
          "--color-nature-glass-txt-s": "rgba(34, 139, 34, 0.8)",
          "--color-nature-glass-txt-light": "rgba(34, 139, 34, 0.6)",
          
          // Notice colors - Keep as is
          "--color-note": "#24a9ab",
          "--color-tip": "#65ab24",
          "--color-info": "#d7af2d",
          "--color-warning": "#f43633",
          
          // Gradient colors - Keep as is
          "--color-gradient-1": "#ee7752",
          "--color-gradient-2": "#e73c7e",
          "--color-gradient-3": "#23a6d5",
          "--color-gradient-4": "#23d5ab",
        },
        
        // Nature theme styles
        ".theme-nature": {
          "--tw-bg-opacity": "1",
          backgroundColor: "var(--color-nature-bg-p)",
          color: "var(--color-nature-txt-s)",
        },
        ".theme-nature body": {
          backgroundColor: "var(--color-nature-bg-p)",
          color: "var(--color-nature-txt-s)",
        },
        ".theme-nature h1, .theme-nature h2, .theme-nature h3, .theme-nature h4, .theme-nature h5, .theme-nature h6": {
          color: "var(--color-nature-txt-p)",
        },
        ".theme-nature .glass": {
          backgroundColor: "var(--color-nature-bg-s)",
          borderColor: "var(--color-nature-border)",
          color: "var(--color-nature-glass-txt-p)",
        },
        ".theme-nature .glass-t": {
          backgroundColor: "var(--color-nature-bg-t)",
          borderColor: "var(--color-nature-border)",
        },
        ".theme-nature .border": {
          borderColor: "var(--color-nature-border)",
        },
        
        // Light theme (light class) styles
        ".light .glass": {
          backgroundColor: "var(--color-light-bg-s)",
          borderColor: "var(--color-light-border)",
          color: "var(--color-light-glass-txt-p)",
        },
        ".light .glass-t": {
          backgroundColor: "var(--color-light-bg-t)",
          borderColor: "var(--color-light-border)",
          color: "var(--color-light-glass-txt-p)",
        },
      });
    }),
  ],
};
