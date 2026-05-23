import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ala Eh Eatery Brand Colors
        "brand-dark": "#1a0e05",          // Deep brown-black
        "brand-maroon": "#8B1A1A",        // Deep red
        "brand-gold": "#D4A017",          // Warm gold
        "brand-gold-light": "#F0C040",    // Light gold
        "brand-cream": "#FDF6E3",         // Warm cream
        "brand-warm-beige": "#F5E6C8",    // Warm beige
        "brand-text-dark": "#2a1810",     // Dark text
      },
      fontFamily: {
        sans: ['var(--font-lora)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
