/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        "page-turn": "cubic-bezier(0.65, 0, 0.35, 1)", // Smoother, natural easing
      },
      keyframes: {
        "page-bend": {
          "0%, 100%": { transform: "rotateY(0) translateZ(0)" },
          "30%": { transform: "rotateY(-10deg) translateZ(20px)" }, // Adds visible bending
        },
        "page-flip-forward": {
          "0%": { transform: "rotateY(0deg) scaleX(1)", boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1)" },
          "20%": { transform: "rotateY(-10deg) translateZ(10px) scaleX(1.02)", boxShadow: "3px 0px 10px rgba(0, 0, 0, 0.2)" },
          "40%": { transform: "rotateY(-40deg) translateZ(30px) scaleX(1.03)", boxShadow: "6px 0px 14px rgba(0, 0, 0, 0.3)" },
          "60%": { transform: "rotateY(-90deg) translateZ(50px) scaleX(1.05)", boxShadow: "10px 0px 18px rgba(0, 0, 0, 0.4)" },
          "80%": { transform: "rotateY(-150deg) translateZ(30px) scaleX(1.02)", boxShadow: "5px 0px 12px rgba(0, 0, 0, 0.3)" },
          "100%": { transform: "rotateY(-180deg) translateZ(0px) scaleX(1)", boxShadow: "none" },
        },
        "page-flip-backward": {
          "0%": { transform: "rotateY(-180deg) translateZ(0px) scaleX(1)", boxShadow: "none" },
          "20%": { transform: "rotateY(-150deg) translateZ(30px) scaleX(1.02)", boxShadow: "5px 0px 12px rgba(0, 0, 0, 0.3)" },
          "40%": { transform: "rotateY(-90deg) translateZ(50px) scaleX(1.05)", boxShadow: "10px 0px 18px rgba(0, 0, 0, 0.4)" },
          "60%": { transform: "rotateY(-40deg) translateZ(30px) scaleX(1.03)", boxShadow: "6px 0px 14px rgba(0, 0, 0, 0.3)" },
          "80%": { transform: "rotateY(-10deg) translateZ(10px) scaleX(1.02)", boxShadow: "3px 0px 10px rgba(0, 0, 0, 0.2)" },
          "100%": { transform: "rotateY(0deg) translateZ(0px) scaleX(1)", boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1)" },
        },
      },
      animation: {
        "page-bend": "page-bend 1.5s cubic-bezier(0.65, 0, 0.35, 1)",
        "page-flip-forward":
          "page-flip-forward 3.5s cubic-bezier(0.65, 0, 0.35, 1) forwards",
        "page-flip-backward":
          "page-flip-backward 3.5s cubic-bezier(0.65, 0, 0.35, 1) forwards",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
